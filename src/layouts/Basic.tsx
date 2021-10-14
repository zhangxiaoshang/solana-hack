import { useEffect, useState } from 'react';
import { Layout, Button, message } from 'antd';
import { NavLink } from 'umi';
import logo from '@/assets/images/logo.png';
import styles from './basic.less';

const { Sider, Content } = Layout;

export default (props: any) => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState<null | string>(null);

  useEffect(() => {
    getProvider();
  }, []);

  const getProvider = () => {
    setTimeout(async () => {
      if ('solana' in window) {
        const _provider = window.solana;
        if (_provider.isPhantom) {
          eagerlyConnecting();
          setProvider(_provider);
          return _provider;
        }
      }
    }, 200);
  };

  const handleInstallPhantom = () => {
    window.open('https://phantom.app/', '_blank');
  };

  const handleConnectWallet = async () => {
    try {
      const resp = await window.solana.connect();
      const account = resp.publicKey.toString();
      setAccount(account);
      console.log('account', account);
    } catch (err: any) {
      // { code: 4001, message: 'User rejected the request.' }
      message.error(err.message);
    }
  };

  const eagerlyConnecting = async () => {
    const resp = await window.solana.connect({ onlyIfTrusted: true });
    setAccount(resp.publicKey.toString());
  };

  const handleDisconnect = () => {
    window.solana.on('disconnect', () => message.success('disconnected!'));
    window.solana.disconnect();
    setAccount(null);
  };

  const renderConnect = () => {
    if (account) {
      return (
        <>
          <Button size="large" className={styles.connectBtn}>
            {account.substr(0, 5)}...{account.substr(-4)}
          </Button>

          <Button
            size="large"
            className={styles.connectBtn}
            type="text"
            onClick={handleDisconnect}
          >
            Disconnect
          </Button>
        </>
      );
    }

    if (!provider) {
      <Button
        size="large"
        className={styles.connectBtn}
        onClick={handleInstallPhantom}
      >
        Install phantom
      </Button>;
    }

    if (provider) {
      return (
        <Button
          size="large"
          className={styles.connectBtn}
          onClick={handleConnectWallet}
        >
          Connect wallet
        </Button>
      );
    }

    return null;
  };

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

            {renderConnect()}
            {/* {provider ? (
              <Button
                size="large"
                className={styles.connectBtn}
                onClick={handleConnectWallet}
              >
                Connect wallet
              </Button>
            ) : (
              <Button
                size="large"
                className={styles.connectBtn}
                onClick={handleInstallPhantom}
              >
                Install phantom
              </Button>
            )} */}
          </div>
        </Sider>
        <Content className={styles.content}>{props.children}</Content>
      </Layout>
    </Layout>
  );
};
