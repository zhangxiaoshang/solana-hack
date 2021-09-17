import Title from './Title';
import classNames from 'classnames';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.Product}>
      <div className={styles.content}>
        <Title className={styles.title}>产品特性</Title>

        <div className={styles.wrapItems}>
          <span className={classNames(styles.item, styles.item1)}>
            无需准入机制用户即可使用平台购买、交易份额化比特币挖矿算力；
          </span>
          <span className={classNames(styles.item, styles.item2)}>
            通过算力难度预言机与去中心化结算系统计算挖矿收益，确保投资回报公开透明，解决传统中心化收益分配作恶问题；
          </span>
          <span className={classNames(styles.item, styles.item3)}>
            ⽤户可以通过区块链⽹络将NFT转移到去中⼼化交易平台进⾏交易流通，解决云算⼒缺乏流动性问题；
          </span>
          <span className={classNames(styles.item, styles.item4)}>
            具有未来收益权的NFT类似未来应收账款，可以接⼊到DeFi⽣态中进⾏类似抵押借贷、衍⽣品设计等多种⾦融操作；
          </span>
        </div>
      </div>
    </div>
  );
};
