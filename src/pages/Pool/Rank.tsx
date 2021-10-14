import { Table } from 'antd';

const columns = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '账户',
    dataIndex: 'account',
    key: 'accout',
  },
  {
    title: '算力',
    dataIndex: 'total',
    key: 'total',
  },
];

const dataSource = [
  {
    time: '2021/10/06 22:42:10',
    account: '2eRKQxuFv7xgzd6gYeyzmZCCNLzC2WWGJmTpG4yVWmCT',
    total: '5.9 T',
  },
  {
    time: '2021/10/06 22:42:10',
    account: '2eRKQxuFv7xgzd6gYeyzmZCCNLzC2WWGJmTpG4yVWmCT',
    total: '4.6 T',
  },
  {
    time: '2021/10/06 22:42:10',
    account: '2eRKQxuFv7xgzd6gYeyzmZCCNLzC2WWGJmTpG4yVWmCT',
    total: '3.1 T',
  },
  {
    time: '2021/10/06 22:42:10',
    account: '2eRKQxuFv7xgzd6gYeyzmZCCNLzC2WWGJmTpG4yVWmCT',
    total: '2.8 T',
  },
  {
    time: '2021/10/06 22:42:10',
    account: '2eRKQxuFv7xgzd6gYeyzmZCCNLzC2WWGJmTpG4yVWmCT',
    total: '1.0 T',
  },
];

export default () => {
  return (
    <Table
      rowKey={(raw) => raw.time + raw.account + raw.total}
      columns={columns}
      dataSource={dataSource}
      pagination={false}
    ></Table>
  );
};
