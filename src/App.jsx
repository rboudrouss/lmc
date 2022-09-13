import styles from './App.css';
import Header from './components/Header/Header';
import Dropdown from './components/Dropdown/Dropdown';
import Footer from './components/Footer/Footer';

import drop_data from "./data/dropdowns.json";
import header_data from "./data/header.json";
import footer_data from "./data/footer.json";

function App() {
  return (
    <div className={styles.main}>
      <Header text={header_data.text} />
      <section className="dropdowns">
        <Dropdown
          title={drop_data.title}
          text={drop_data.text}
          children={drop_data.children}
          opened={drop_data.opened}
        />
      </section>
      <Footer
        mail={footer_data.mail}
        links={footer_data.links}
      />
    </div>
  );
}

export default App;
