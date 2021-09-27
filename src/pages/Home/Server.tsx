import classNames from 'classnames';
import Title from './Title';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.Server}>
      <div className={styles.content}>
        <Title className={styles.title}>Technical and service</Title>

        <div className={styles.wrapItems}>
          <span className={classNames(styles.Item, styles.Item1)}>
            <span className={styles.name}>Difficulty preview machine</span>
            <span className={styles.text}>
              Mercury uses a decentralized pre-machine network to ensure that
              the mining difficulty on the chain is consistent with the actual
              mining difficulty. Developers can monitor changes in mining
              difficulty through smart contract subscriptions. The preview
              machine provides multiple sets of revenue forecast templates for
              developers to use
            </span>
          </span>
          <span className={classNames(styles.Item, styles.Item2)}>
            <span className={styles.name}>
              Decentralized Liquidation and Settlement System
            </span>
            <span className={styles.text}>
              The decentralized settlement system is a financial service
              facility that runs on the blockchain. The system maintains
              multiple sets of mining revenue distribution algorithms to solve
              the problem of unfair revenue distribution in traditional
              centralized cloud mining
            </span>
          </span>
          <span className={classNames(styles.Item, styles.Item3)}>
            <span className={styles.name}>Beneficial right NFT</span>
            <span className={styles.text}>
              Mercury will send NFTs representing their cloud mining ownership
              to the users who participate in cloud mining. NFTs can be
              circulated in Cex and Dex easily, and the NFTs held by the user's
              exchange are equivalent to transactions. Calculating ownership can
              solve the problem of cloud mining and low liquidity.
            </span>
          </span>
        </div>

        <div className={styles.wrapCloud}>
          <div className={styles.name}>
            Decentralize cloud mining aggregation platform
          </div>
          <div className={styles.text}>
            Based on blockchain technology, DCM combines cloud mining and DeFi,
            and solves the moral hazard problem in traditional cloud mining
            platforms by using the decentralized benefit distribution method.
            Mercury will issue NFTs representing their cloud mining ownership to
            users participating in decentralized cloud mining. NFTs can be
            circulated in Cex and Dex easily. The NFT held by user exchanges is
            equivalent to transaction cloud mining ownership, which solve the
            problem of low liquidity.
          </div>
        </div>
      </div>
    </div>
  );
};
