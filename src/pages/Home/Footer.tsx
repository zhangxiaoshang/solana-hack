import twitter from '@/assets/images/twitter.png';
import telegram from '@/assets/images/telegram.png';
import github from '@/assets/images/github.png';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.Footer}>
      <div className={styles.wrapInput}>
        <input type="text" className={styles.input} />
        <button className={styles.submitBtn}>提交</button>
      </div>

      <div className={styles.wrapLins}>
        <a href="" className={styles.twitter}>
          <img src={twitter} alt="twitter" />
        </a>
        <a href="" className={styles.telegram}>
          <img src={telegram} alt="telegram" />
        </a>
        <a href="" className={styles.github}>
          <img src={github} alt="github" />
        </a>
      </div>
    </div>
  );
};
