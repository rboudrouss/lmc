import "./App.css";
import Page from "./components/Page/Page";
import { AppContextProvider } from "./context";
import footer_data from "./data/footer.json";

function App() {
  return (
    <AppContextProvider>
      <Page
        footer={
          footer_data as {
            mail: string;
            links: { icon: string; link: string }[];
          }
        }
      />
    </AppContextProvider>
  );
}

export default App;
