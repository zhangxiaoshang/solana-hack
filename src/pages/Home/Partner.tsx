import Title from './Title';
import solana from '@/assets/images/solana.png';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.Partner}>
      <div className={styles.content}>
        <Title>合作机构</Title>

        <div className={styles.wrapItems}>
          <img src={solana} alt="solana" />
        </div>
      </div>
    </div>
  );
};
