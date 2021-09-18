import { NavLink } from 'umi';
import logo from '@/assets/images/logo.png';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.Header}>
      <div className={styles.content}>
        <a href="/" className={styles.logo}>
          <img src={logo} alt="logo" />
        </a>

        <div className={styles.menus}>
          <span className={styles.menuItem}>
            <NavLink to="/" activeClassName={styles.activeMenuItem}>
              Home
            </NavLink>
          </span>
          <span className={styles.menuItem}>
            <NavLink to="/hash-pool" activeClassName={styles.activeMenuItem}>
              Hash pool
            </NavLink>
          </span>
          <span className={styles.menuItem}>
            <NavLink
              to="/preview-machine"
              activeClassName={styles.activeMenuItem}
            >
              Preview machine
            </NavLink>
          </span>
          <span className={styles.menuItem}>
            <NavLink to="/emulator" activeClassName={styles.activeMenuItem}>
              Emulator
            </NavLink>
          </span>
          <span className={styles.menuItem}>
            <NavLink to="/white-pager" activeClassName={styles.activeMenuItem}>
              White paper
            </NavLink>
          </span>
        </div>
      </div>
    </div>
  );
};
