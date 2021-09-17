import slogan from '@/assets/images/home-slogan.png';
import Arrow from '@/assets/images/home-banner-arrow.png';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.Banner}>
      <img src={slogan} alt="slogan" className={styles.slogan} />
      <img src={Arrow} alt="arrow" className={styles.arrow} />
    </div>
  );
};
