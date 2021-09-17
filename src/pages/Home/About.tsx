import Title from './Title';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.About}>
      <div className={styles.content}>
        <Title className={styles.title}>项目介绍</Title>

        <span className={styles.text}>
          墨丘利是由Mercury
          Lab团队开发维护的去中⼼化云算⼒服务平台，平台通过区块链技术将云算⼒与DeFi相结合，通过去中⼼化的利益分配⽅式解决传统云算⼒平台道德⻛险的问题。墨丘利会向参与去中⼼云算⼒挖矿的⽤户发⾏代表其算⼒所有权的NFT（⾮同质化代币），NFT可以在中⼼化和去中⼼化交易所中流通，⽤户交易所持有的NFT即等价于交易算⼒所有权，从⽽解决云算⼒流通困难的问题。
        </span>
      </div>
    </div>
  );
};
