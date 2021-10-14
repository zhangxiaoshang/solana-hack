import { useState, useEffect } from 'react';
import { Input, Button, Tag, message } from 'antd';
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  TransactionInstruction,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';

import { binary_to_base58 } from 'base58-js';

import styles from './index.less';

const splToken = require('@solana/spl-token');
const BN = require('bn.js');

interface IAccountInfo {
  is_initialized: boolean;
  total: number;
  price: number;
  begin_time: number;
  end_time: number;
  sold: number;
  atokenAccount: string;
  mbitcoinAccount: string;
  paymentAccount: string;
}

type DisplayEncoding = 'utf8' | 'hex';
type PhantomEvent = 'disconnect' | 'connect';
type PhantomRequestMethod =
  | 'connect'
  | 'disconnect'
  | 'signTransaction'
  | 'signAllTransactions'
  | 'signMessage';

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

interface PhantomProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  signMessage: (
    message: Uint8Array | string,
    display?: DisplayEncoding,
  ) => Promise<any>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, handler: (args: any) => void) => void;
  request: (method: PhantomRequestMethod, params: any) => Promise<unknown>;
}

const convertJsData = (arrayBuffer: Buffer): IAccountInfo => {
  const view_is_initialized = new DataView(arrayBuffer.buffer, 0, 1);
  const view_total = new DataView(arrayBuffer.buffer, 1, 8);
  const view_price = new DataView(arrayBuffer.buffer, 9, 8);
  const view_begin_time = new DataView(arrayBuffer.buffer, 17, 8);
  const view_end_time = new DataView(arrayBuffer.buffer, 25, 8);
  const view_sold = new DataView(arrayBuffer.buffer, 33, 8);

  const int8_is_initialized = view_is_initialized.getInt8(0);
  const u64_total = view_total.getBigUint64(0, true);
  const u64_price = view_price.getBigUint64(0, true);
  const u64_begin_time = view_begin_time.getBigUint64(0, true);
  const u64_end_time = view_end_time.getBigUint64(0, true);
  const u64_sold = view_sold.getBigUint64(0, true);

  const arr1 = [];
  const arr2 = [];
  const arr3 = [];
  for (let i = 41; i <= 72; i++) {
    arr1.push(arrayBuffer[i]);
  }
  for (let i = 73; i <= 104; i++) {
    arr2.push(arrayBuffer[i]);
  }
  for (let i = 105; i <= 136; i++) {
    arr3.push(arrayBuffer[i]);
  }

  const atokenAccount = binary_to_base58(arr1);
  const mbitcoinAccount = binary_to_base58(arr2);
  const paymentAccount = binary_to_base58(arr3);

  const _accountInfo = {
    is_initialized: Boolean(int8_is_initialized),
    total: Number(u64_total),
    price: Number(u64_price),
    begin_time: Number(u64_begin_time),
    end_time: Number(u64_end_time),
    sold: Number(u64_sold),
    atokenAccount,
    mbitcoinAccount,
    paymentAccount,
  };

  return _accountInfo;
};

const getProvider = (): PhantomProvider | undefined => {
  if ('solana' in window) {
    const anyWindow: any = window;
    const provider = anyWindow.solana;
    if (provider.isPhantom) {
      return provider;
    }
  }
  // window.open('https://phantom.app/', '_blank');
};

const getPoolInfo = async () => {
  const publicKey = new PublicKey(POOL_ACCOUNT);

  const { data }: any = await connection.getAccountInfo(publicKey);

  const poolData = convertJsData(data);

  return poolData;
};

const getATokenMint = async (accountInfo: IAccountInfo) => {
  try {
    const { atokenAccount } = accountInfo;
    const publicKey = new PublicKey(atokenAccount);
    const info = await connection.getParsedAccountInfo(publicKey);
    // const mint = info.value.data.parsed.info.mint;

    console.log('ataInfo', info);

    return info;
  } catch (error) {
    return null;
  }
};

const getMyAccountInfo = async () => {
  const resp = await connection.getParsedAccountInfo(fromTokenAccount.address);

  console.log('getMyAccountInfo', resp);
  return resp;
};

const POOL_ACCOUNT = 'CFEqmTL1Scw43g8RkB6KxXRTsYNx65JrFyFx6RWKp5n5';
const URL = 'https://api.devnet.solana.com';

const fromWallet = {
  publicKey: new PublicKey('29thr5pNLD6vgh7HfFCuieT6RWbjqKprYRA2H8kDSFNH'),
  secretKey: Uint8Array.from([
    32, 116, 57, 52, 16, 61, 181, 175, 49, 154, 14, 49, 53, 249, 62, 223, 64,
    198, 66, 94, 252, 221, 140, 151, 241, 118, 88, 32, 153, 127, 33, 87, 17, 34,
    203, 170, 224, 96, 174, 119, 15, 156, 31, 125, 118, 43, 102, 165, 33, 252,
    201, 143, 41, 74, 155, 254, 28, 67, 172, 121, 153, 112, 16, 18,
  ]),
};

let connection: any = null;
let programId;
let fromTokenAccount: any; // ata
let toTokenAccount: any; // mint
// let paymentAccount: any; // pool getAccountInfo().mint
let stateAccount;

export default () => {
  const provider = getProvider();
  const [poolInfo, setPoolInfo] = useState<null | IAccountInfo>(null);
  const [volume, setVolume] = useState<null | number>(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [mbitcoinInfo, setMbitcoinInfo] = useState<any>(null);
  // const [ataInfo, setAtaInfo] = useState<any>(null);
  const [myAccountInfo, setMyAccountInfo] = useState<any>(null);

  useEffect(() => {
    setup();
  }, []);

  const setup = async () => {
    // 链接钱包
    const _account = await eagerlyConnecting();
    // 创建连接
    connection = await new Connection(URL);
    // 获取余额
    const publicKey = new PublicKey(_account);
    const _balance = await connection.getBalance(publicKey);
    // 获取mint地址
    const _poolInfo = await getPoolInfo();
    const _ataInfo = await getATokenMint(_poolInfo);
    const mintAddr = _ataInfo.value.data.parsed.info.mint;

    // 获取挖矿收益
    const _mbitcoinInfo = await connection.getParsedAccountInfo(
      new PublicKey(_poolInfo.mbitcoinAccount),
    );
    console.log('_poolInfo', _poolInfo);
    console.log('_mbitcoinInfo', _mbitcoinInfo);

    // 构建mint实例
    const mint = new splToken.Token(
      connection,
      new PublicKey(mintAddr),
      splToken.TOKEN_PROGRAM_ID,
      fromWallet,
    );

    // Get the token account of the fromWallet Solana address, if it does not exist, create it
    fromTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
      fromWallet.publicKey,
    );

    //get the token account of the toWallet Solana address, if it does not exist, create it
    toTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
      new PublicKey(mintAddr),
    );

    const _myAccountInfo = await getMyAccountInfo();
    console.log('_myAccountInfo', _myAccountInfo);

    setBalance(_balance);
    setPoolInfo(_poolInfo);
    // setAtaInfo(_ataInfo.value.data.parsed.info);
    setMyAccountInfo(_myAccountInfo.value.data.parsed.info);
    setMbitcoinInfo(_mbitcoinInfo.value.data.parsed.info);
  };

  /** 链接钱包，获取钱包地址 */
  const eagerlyConnecting = async () => {
    try {
      const resp = await window.solana.connect({ onlyIfTrusted: true });
      const _account = resp.publicKey.toString();
      setAccount(_account);

      console.log(resp);

      return _account;
    } catch (error) {
      console.error(error);
    }
  };

  /** 获取空投 */
  const airdropToken = async (_account: string) => {
    const publicKey = new PublicKey(_account);
    const fromAirdropSignature = await connection.requestAirdrop(
      publicKey,
      LAMPORTS_PER_SOL,
    );

    // Wait for airdrop confirmation
    await connection.confirmTransaction(fromAirdropSignature);
    message.success('success');
  };

  const handleBuy = async () => {
    programId = new PublicKey('9Gc4tyo14gQRxvajKvtqgoHRtTq1HimS1hFbTwDgJ6x8');
    stateAccount = new PublicKey(POOL_ACCOUNT); // CFEqmTL1Scw43g8RkB6KxXRTsYNx65JrFyFx6RWKp5n5

    const PDA = await PublicKey.findProgramAddress(
      [Buffer.from('atoken')],
      programId,
    );

    console.log('toTokenAccount.address', toTokenAccount.address.toBase58());

    // 用户购买数量
    const amount = volume;
    const buyix = new TransactionInstruction({
      programId: programId,
      keys: [
        { pubkey: stateAccount, isSigner: false, isWritable: true },
        { pubkey: fromWallet.publicKey, isSigner: true, isWritable: false }, // fromWallet 是用户钱包
        {
          pubkey: poolInfo.paymentAccount,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: SystemProgram.programId,
          isSigner: false,
          isWritable: false,
        },
        {
          pubkey: splToken.TOKEN_PROGRAM_ID,
          isSigner: false,
          isWritable: false,
        },
        {
          pubkey: poolInfo.atokenAccount,
          isSigner: false,
          isWritable: true,
        },
        { pubkey: fromTokenAccount.address, isSigner: false, isWritable: true },
        { pubkey: PDA[0], isSigner: false, isWritable: false },
      ],
      data: Buffer.from(Uint8Array.of(1, ...new BN(amount).toArray('le', 8))),
    });

    try {
      const sig = await connection.sendTransaction(
        new Transaction().add(buyix),
        [fromWallet],
        { skipPreflight: false, preflightCommitment: 'singleGossip' },
      );
      console.log(sig);
      message.success('success');
    } catch (error: any) {
      message.error(error.message);
    }
  };

  if (!account) {
    return (
      <div className={styles.errorContent}>
        <Button type="text">Connect wallet</Button>
      </div>
    );
  }

  const MintPannel = () => {
    if (!mbitcoinInfo) return null;

    return (
      <div>
        <h2>Mint</h2>
        <p>总算力: {poolInfo?.total}</p>
        <p>矿池收益: {mbitcoinInfo?.tokenAmount.uiAmount}</p>

        <p>我的算力: {myAccountInfo.tokenAmount.uiAmount}</p>
        <p>
          我的收益:
          {(myAccountInfo.tokenAmount.uiAmount / poolInfo?.total) *
            mbitcoinInfo?.tokenAmount.uiAmount}{' '}
        </p>
      </div>
    );
  };

  return (
    <div>
      <p>Address： {account}</p>
      <p>Balance：{balance / LAMPORTS_PER_SOL} SOL</p>
      <p>
        <Button onClick={() => airdropToken(account)}>airdrop</Button>
      </p>

      <MintPannel></MintPannel>

      <div className={styles.wrapInput}>
        <Input
          placeholder="请输入数量"
          addonAfter="T"
          size="large"
          type="number"
          onChange={(e: any) => setVolume(Number(e.target.value))}
        />
        <Input
          addonAfter="SOL"
          readOnly
          disabled
          size="large"
          value={poolInfo?.price / LAMPORTS_PER_SOL}
        />
        <Button onClick={handleBuy} size="large" className={styles.buyBtn}>
          购买
        </Button>
      </div>
    </div>
  );
};
