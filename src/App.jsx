import styles from './App.css';
import Header from './components/Header/Header';
import Dropdown from './components/Dropdown/Dropdown';
import object from "./dropdowns/main.json"

function App() {
  return (
    <div className={styles.main}>
      <Header />
      <Dropdown
        title={object.title}
        text={object.text}
        children={object.children}
      />
      <p>uwu</p>
    </div>
  );
}

export default App;
