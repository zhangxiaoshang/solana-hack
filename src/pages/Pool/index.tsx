import { useEffect, useState } from 'react';
import { Layout, Menu, Card } from 'antd';
import { Connection, PublicKey, ParsedAccountData } from '@solana/web3.js';
import OrderBook from './OrderBook';
import Rank from './Rank';
import styles from './index.less';
import moment from 'moment';

const { binary_to_base58, base58_to_binary } = require('base58-js');

const { Header, Footer, Sider, Content } = Layout;

interface IAccountInfo {
  is_initialized: boolean;
  total: number;
  price: number;
  begin_time: number;
  end_time: number;
  sold: number;
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
    const address = '2eRKQxuFv7xgzd6gYeyzmZCCNLzC2WWGJmTpG4yVWmCT';
    const publicKey = new PublicKey(address);
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

  const getsignaturesforaddress = async () => {
    if (!connection) return null;

    const address = '2tfTNiBZGkbF7iitcjhYrNhQeww6VPokHcebhjC5di4P';
    // const address = '2eRKQxuFv7xgzd6gYeyzmZCCNLzC2WWGJmTpG4yVWmCT';
    const publicKey = new PublicKey(address);
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
      <Card title="算力池展示数据（2eRKQxuFv7xgzd6gYeyzmZCCNLzC2WWGJmTpG4yVWmCT）">
        <p>
          <span>算力 </span>
          <span>{accountInfo?.total}</span>
        </p>
        <p>
          <span>开始时间 </span>
          <span>
            {moment((accountInfo?.begin_time ?? 0) * 1000).format(
              'YYYY-MM-DD HH:mm:ss',
            )}
          </span>
        </p>
        <p>
          <span>结束时间 </span>
          <span>
            {moment((accountInfo?.end_time ?? 0) * 1000).format(
              'YYYY-MM-DD HH:mm:ss',
            )}
          </span>
        </p>
        <p>
          <span>单位算力(T/D)价格 </span>
          <span>{accountInfo?.price}</span>
        </p>
      </Card>

      <Card title="Order Book（2tfTNiBZGkbF7iitcjhYrNhQeww6VPokHcebhjC5di4P）">
        {/* <OrderBook transactions={transactions}></OrderBook> */}
      </Card>

      <Card title="算力排行榜">
        <Rank></Rank>
      </Card>
    </div>
  );
};
