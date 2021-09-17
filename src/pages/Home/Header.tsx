import { NavLink } from 'umi';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.Header}>
      <div className={styles.content}>
        <a href="/" className={styles.logo}>
          Mercury
        </a>

        <div className={styles.menus}>
          <span className={styles.menuItem}>
            <NavLink to="/" activeClassName={styles.activeMenuItem}>
              Home
            </NavLink>
          </span>
          <span className={styles.menuItem}>
            <NavLink to="/yuyanji" activeClassName={styles.activeMenuItem}>
              预言机
            </NavLink>
          </span>
          <span className={styles.menuItem}>
            <NavLink to="/suanlichi" activeClassName={styles.activeMenuItem}>
              算力池
            </NavLink>
          </span>
          <span className={styles.menuItem}>
            <NavLink to="/moniqi" activeClassName={styles.activeMenuItem}>
              模拟器
            </NavLink>
          </span>
          <span className={styles.menuItem}>
            <NavLink to="/white-pager" activeClassName={styles.activeMenuItem}>
              白皮书
            </NavLink>
          </span>
        </div>
      </div>
    </div>
  );
};
