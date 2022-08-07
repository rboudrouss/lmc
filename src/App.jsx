import styles from './App.css';
import Header from './components/Header/Header';
import Dropdown from './components/Dropdown/Dropdown';

function App() {
  return (
    <div className={styles.main}>
      <Header />
      <Dropdown
        title="ceci est un titre"
        text="le text uwu owo lorem ipsum mes couilles tout ça"
        children={[
          { title: "nyah", text: "lorem tout ça couilles" },
          {
            title: "nyah", text: "lorem tout ça couilles", children:[
              { title: "nyah", text: "lorem tout ça couilles" },
              { title: "nyah", text: "lorem tout ça couilles" },
            ]
          },
        ]}
      />
      <p>uwu</p>
    </div>
  );
}

export default App;
