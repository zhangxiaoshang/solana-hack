import Title from './Title';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.About}>
      <div className={styles.content}>
        <Title className={styles.title}>Project Introduction</Title>

        <span className={styles.text}>
          Mercury is a decentralized cloud mining service platform developed and
          maintained by the Mercury Lab team. The platform combines cloud mining
          with DeFi through blockchain technology, and solves the problem of
          moral hazard in traditional cloud mining field, by using the
          decentralized benefit distribution method. Mercury will send NFTs
          (Non-Homogeneous Tokens) representing their cloud mining ownership to
          users participating in the decentralized cloud mining. NFTs can be
          circulated in the centralization and decentralization exchanges, The
          NFT held by the user's exchange is equivalent to the ownership of the
          transaction calculation, which solves the problem of cloud mining and
          low liquidity.
        </span>
      </div>
    </div>
  );
};
