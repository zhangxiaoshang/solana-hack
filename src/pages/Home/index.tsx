import Header from './Header';
import Banner from './Banner';
import About from './About';
import Server from './Server';
import Product from './Product';
import Partner from './Partner';
import Footer from './Footer';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.Home}>
      <Header></Header>
      <Banner></Banner>
      <About></About>
      <Server></Server>
      <Product></Product>
      <Partner></Partner>
      <Footer></Footer>
    </div>
  );
};
