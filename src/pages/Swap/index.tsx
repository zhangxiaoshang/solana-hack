import { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import {
  Connection,
  PublicKey,
  ParsedAccountData,
  Transaction,
  SystemProgram,
} from '@solana/web3.js';

import styles from './index.less';

interface IAccountInfo {
  is_initialized: boolean;
  total: number;
  price: number;
  begin_time: number;
  end_time: number;
  sold: number;
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

  const _accountInfo = {
    is_initialized: Boolean(int8_is_initialized),
    total: Number(u64_total),
    price: Number(u64_price),
    begin_time: Number(u64_begin_time),
    end_time: Number(u64_end_time),
    sold: Number(u64_sold),
  };

  return _accountInfo;
};

let connection: any = null;

const getProvider = (): PhantomProvider | undefined => {
  if ('solana' in window) {
    const anyWindow: any = window;
    const provider = anyWindow.solana;
    if (provider.isPhantom) {
      return provider;
    }
  }
  window.open('https://phantom.app/', '_blank');
};

export default () => {
  const provider = getProvider();

  const [poolInfo, setPoolInfo] = useState<null | IAccountInfo>(null);
  const [volume, setVolume] = useState<null | number>(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    getPoolInfo();
    getProvider();
  }, []);

  const eagerlyConnecting = async () => {
    const resp = await window.solana.connect({ onlyIfTrusted: true });
    setAccount(resp.publicKey.toString());
  };

  const getPoolInfo = async () => {
    const address = '2eRKQxuFv7xgzd6gYeyzmZCCNLzC2WWGJmTpG4yVWmCT';
    const publicKey = new PublicKey(address);

    const url = 'https://api.devnet.solana.com';
    connection = await new Connection(url);

    const { data }: any = await connection.getAccountInfo(publicKey);

    const poolData = convertJsData(data);

    setPoolInfo(poolData);
  };

  const handleBuy = () => {
    console.log({
      price: poolInfo?.price,
      volume: volume,
      amount: (poolInfo?.price || 0) * (volume || 0),
    });

    sendTransaction();
  };

  /** 发送交易 */
  const createTransferTransaction = async () => {
    if (!provider?.publicKey) {
      return;
    }
    let transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: provider.publicKey,
        toPubkey: provider.publicKey,
        lamports: 100,
      }),
    );
    transaction.feePayer = provider.publicKey;
    console.log('Getting recent blockhash');
    const anyTransaction: any = transaction;
    anyTransaction.recentBlockhash = (
      await connection.getRecentBlockhash()
    ).blockhash;
    return transaction;
  };

  const sendTransaction = async () => {
    const transaction = await createTransferTransaction();
    if (transaction) {
      try {
        let signed = await provider?.signTransaction(transaction);
        console.log('Got signature, submitting transaction');
        let signature = await connection.sendRawTransaction(
          signed?.serialize(),
        );
        console.log(
          'Submitted transaction ' + signature + ', awaiting confirmation',
        );
        await connection.confirmTransaction(signature);
        console.log('Transaction ' + signature + ' confirmed');
      } catch (err) {
        console.warn(err);
        console.log('Error: ' + JSON.stringify(err));
      }
    }
  };

  return (
    <div>
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
          value={poolInfo?.price}
        />
        <Button onClick={handleBuy} size="large" className={styles.buyBtn}>
          购买
        </Button>
      </div>
    </div>
  );
};
