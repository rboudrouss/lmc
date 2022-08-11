import styles from './App.css';
import Header from './components/Header/Header';
import Dropdown from './components/Dropdown/Dropdown';
import drop_data from "./data/dropdowns.json"
import header_data from "./data/header.json"

function App() {
  return (
    <div className={styles.main}>
      <Header text={header_data.text}/>
      <Dropdown
        title={drop_data.title}
        text={drop_data.text}
        children={drop_data.children}
      />
    </div>
  );
}

export default App;
