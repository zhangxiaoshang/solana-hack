import { Layout, Menu, Card } from 'antd';
import { NavLink } from 'umi';
import logo from '@/assets/images/logo.png';
import styles from './basic.less';

const { Header, Footer, Sider, Content } = Layout;

export default (props: any) => {
  return (
    <Layout>
      <Layout>
        <Sider theme="light" width="440px">
          <div className={styles.siderContent}>
            <a href="">
              <img src={logo} alt="logo" />
            </a>
            <NavLink to="/mbtc" activeClassName={styles.activeNav}>
              mBTC介绍
            </NavLink>
            <NavLink to="/pool" activeClassName={styles.activeNav}>
              算力池
            </NavLink>
            <NavLink to="/swap" activeClassName={styles.activeNav}>
              算力Swap
            </NavLink>
            <NavLink to="/income" activeClassName={styles.activeNav}>
              收益
            </NavLink>
          </div>
        </Sider>
        <Content className={styles.content}>{props.children}</Content>
      </Layout>
    </Layout>
  );
};
