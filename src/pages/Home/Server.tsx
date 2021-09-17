import classNames from 'classnames';
import Title from './Title';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.Server}>
      <div className={styles.content}>
        <Title className={styles.title}>技术与服务</Title>

        <div className={styles.wrapItems}>
          <span className={classNames(styles.Item, styles.Item1)}>
            <span className={styles.name}>难度预⾔机</span>
            <span className={styles.text}>
              墨丘利采⽤去中⼼化预⾔机⽹络保证链上挖矿难度与实际挖矿难度⼀致，开发者可以通过智能合约订阅的⽅式监控挖矿难度变化，预⾔机同时提供多套收益预测模板供开发⼈员使⽤
            </span>
          </span>
          <span className={classNames(styles.Item, styles.Item2)}>
            <span className={styles.name}>去中⼼化清结算系统</span>
            <span className={styles.text}>
              去中⼼化清结算系统是运⾏在区块链上的⾦融服务设施，系统维护多套挖矿收益分配算法，解决传统中⼼化云算⼒收益分配不透明的问题
            </span>
          </span>
          <span className={classNames(styles.Item, styles.Item3)}>
            <span className={styles.name}>收益权NFT</span>
            <span className={styles.text}>
              墨丘利会向参与去中⼼云算⼒挖矿的⽤户发⾏代表其算⼒所有权的NFT，NFT可以在Cex和Dex中随意流通，⽤户交易所持有的NFT即等价于交易算⼒所有权，从⽽解决云算⼒流通困难的问题。
            </span>
          </span>
        </div>

        <div className={styles.wrapCloud}>
          <div className={styles.name}>去中⼼化云算⼒撮合平台</div>
          <div className={styles.text}>
            DCM基于区块链技术将云算力与Defi相结合，通过去中心化的利益分配方式解决传统云算力平台道德风险的问题。Mercury会向参与去中心云算力挖矿的用户发行代表其算力所有权的NFT，NFT可以在Cex和Dex中随意流通，用户交易所持有的NFT即等价于交易算力所有权，从而解决云算力流通困难的问题。
          </div>
        </div>
      </div>
    </div>
  );
};
