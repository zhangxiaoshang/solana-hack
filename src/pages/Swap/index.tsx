import { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import styles from './index.less';

export default () => {
  const [volume, setVolume] = useState<null | number>(null);
  const [price, setPrice] = useState<null | number>(5);
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    setAmount(Number(volume) * Number(price));
  }, [volume, price]);

  const handleBuy = () => {
    console.log('buy:', amount);
  };

  return (
    <div>
      <div className={styles.wrapInput}>
        <Input
          placeholder="请输入数量"
          addonAfter="T"
          size="large"
          type="number"
          onChange={(e: any) => setVolume(e.target.value)}
        />
        <Input addonAfter="SOL" readOnly disabled size="large" value={amount} />
        <Button onClick={handleBuy} size="large" className={styles.buyBtn}>
          购买
        </Button>
      </div>
    </div>
  );
};
