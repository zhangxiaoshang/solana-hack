import { useEffect, useState } from 'react';
import { Layout, Menu, Card } from 'antd';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import OrderBook from './OrderBook';
import Rank from './Rank';
import styles from './index.less';
import moment from 'moment';
import { binary_to_base58 } from 'base58-js';
const ab2str = require('arraybuffer-to-string');

const { Header, Footer, Sider, Content } = Layout;

const POOL_ACCOUNT = 'CFEqmTL1Scw43g8RkB6KxXRTsYNx65JrFyFx6RWKp5n5';
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

let connection: any;
export default () => {
  const [accountInfo, setAccountInfo] = useState<null | IAccountInfo>(null);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      await setup();

      const info = await getAccountInfo();
      setAccountInfo(info);

      const signatures = await getsignaturesforaddress();
      const _trans = await getTransactions(signatures);
      setTransactions(_trans);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (accountInfo) {
        /** 获取mint */
        const { atokenAccount } = accountInfo;
        const publicKey = new PublicKey(atokenAccount);
        const info = await connection.getParsedAccountInfo(publicKey);
        const mint = info.value.data.parsed.info.mint;

        console.log('mint', mint);
      }
    })();
  }, [accountInfo]);

  const setup = async () => {
    const url = 'https://api.devnet.solana.com';
    connection = await new Connection(url);
    const version = await connection.getVersion();

    console.log({
      url,
      version,
    });
  };

  const getAccountInfo = async () => {
    // const address = '2tfTNiBZGkbF7iitcjhYrNhQeww6VPokHcebhjC5di4P';
    // const address = '2eRKQxuFv7xgzd6gYeyzmZCCNLzC2WWGJmTpG4yVWmCT';
    // const address = 'CFEqmTL1Scw43g8RkB6KxXRTsYNx65JrFyFx6RWKp5n5';
    const publicKey = new PublicKey(POOL_ACCOUNT);
    const { data } = await connection.getAccountInfo(publicKey);

    return convertJsData(data);
  };

  const convertJsData = (arrayBuffer: Buffer): IAccountInfo => {
    const view_is_initialized = new DataView(arrayBuffer.buffer, 0, 1);
    const view_total = new DataView(arrayBuffer.buffer, 1, 8);
    const view_price = new DataView(arrayBuffer.buffer, 9, 8);
    const view_begin_time = new DataView(arrayBuffer.buffer, 17, 8);
    const view_end_time = new DataView(arrayBuffer.buffer, 25, 8);
    const view_sold = new DataView(arrayBuffer.buffer, 33, 8);

    // const view_addr1 = new DataView(arrayBuffer.buffer, 41, 32);
    // const view_addr2 = new DataView(arrayBuffer.buffer, 49, 32);
    // const view_addr3 = new DataView(arrayBuffer.buffer, 57, 32);

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

    console.log(_accountInfo);
    return _accountInfo;
  };

  const getsignaturesforaddress = async () => {
    if (!connection) return null;

    // const address = '2tfTNiBZGkbF7iitcjhYrNhQeww6VPokHcebhjC5di4P';
    // const address = '2eRKQxuFv7xgzd6gYeyzmZCCNLzC2WWGJmTpG4yVWmCT';
    const publicKey = new PublicKey(POOL_ACCOUNT);
    const signatures = await connection.getSignaturesForAddress(publicKey);

    return signatures;
  };

  const getTransactions = async (signatures: any[]) => {
    const _transactions = [];

    for (let i = 0; i < signatures.length; i++) {
      const { signature } = signatures[i];
      const transaction = await connection.getTransaction(signature);

      _transactions.push(transaction);
    }

    return _transactions;
  };

  return (
    <div className={styles.content}>
      <Card title={`Hash  Pool`}>
        <p>
          <span>HashRate: </span>
          <span>{accountInfo?.total} T</span>
        </p>
        <p>
          <span>Starting Time: </span>
          <span>
            {moment((accountInfo?.begin_time ?? 0) * 1000).format(
              'YYYY-MM-DD HH:mm:ss',
            )}
          </span>
        </p>
        <p>
          <span>End Time: </span>
          <span>
            {moment((accountInfo?.end_time ?? 0) * 1000).format(
              'YYYY-MM-DD HH:mm:ss',
            )}
          </span>
        </p>
        <p>
          <span>Unit Calculation (T/D) Price: </span>
          <span>{accountInfo?.price / LAMPORTS_PER_SOL} SOL/T</span>
        </p>
      </Card>

      <Card title="Order Book">
        <OrderBook transactions={transactions}></OrderBook>
      </Card>

      <Card title="HashRate Rankings">
        <Rank></Rank>
      </Card>
    </div>
  );
};
