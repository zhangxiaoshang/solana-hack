import { Table } from 'antd';
import moment from 'moment';

interface IOrderBookProps {
  transactions: any[];
}

const columns = [
  {
    title: 'BLOCKTIME',
    dataIndex: 'blockTime',
    key: 'blockTime',
    render: (bocktime: number) => {
      return moment(bocktime * 1000).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  {
    title: 'INSTRUCTION',
    dataIndex: 'meta',
    key: 'logMessages',
    render: (meta: any) => {
      const logMessages: string[] = meta.logMessages || [];
      const prefix = 'Program log: Instruction: ';

      const instructionLogMessage = logMessages.find((message) =>
        message.startsWith(prefix),
      );
      return instructionLogMessage?.replace(prefix, '');
    },
  },
  {
    title: 'POST BALANCE',
    key: 'POST BALANCE',
    dataIndex: 'meta',
    render: (meta: any) => {
      const postTokenBalances: any[] = meta.postTokenBalances || [];

      return postTokenBalances.reduce(
        (acc, cur) => acc + cur.uiTokenAmount.uiAmount,
        0,
      );
    },
  },
];

export default (props: IOrderBookProps) => {
  const { transactions } = props;

  return (
    <div>
      <Table
        rowKey={(row) => row.blockTime + row.slot}
        columns={columns}
        dataSource={transactions}
        pagination={false}
      />
    </div>
  );
};
