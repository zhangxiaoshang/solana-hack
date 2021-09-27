import Title from './Title';
import classNames from 'classnames';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.Product}>
      <div className={styles.content}>
        <Title className={styles.title}>Product Features</Title>

        <div className={styles.wrapItems}>
          <span className={classNames(styles.item, styles.item1)}>
            Users can use the platform to purchase and trade shares of Bitcoin
            cloud mining without access mechanism;
          </span>
          <span className={classNames(styles.item, styles.item2)}>
            Mercury ensure investment returns and solve the problem of
            traditional centralized income distribution by calculating mining
            income through the cloud mining difficulty prediction machine and
            decentralized settlement system;
          </span>
          <span className={classNames(styles.item, styles.item3)}>
            Users can transfer NFTs to the decentralized trading platform
            through the blockchain network, which solves the problem of lack of
            liquidity in cloud mining;
          </span>
          <span className={classNames(styles.item, styles.item4)}>
            The NFT, with future income rights, is similar to future accounts
            receivable. Also, it can be accessed in DeFi ecology to perform
            various financial operations, such as mortgage loan and derivative
            design;
          </span>
        </div>
      </div>
    </div>
  );
};
