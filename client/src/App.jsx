import { EthProvider } from "./contexts/EthContext";
import Demo from "./components/Demo";
import Test from "./components/Test";

const App = () => {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <Demo />
          <Test />
        </div>
      </div>
    </EthProvider>
  );
};

export default App;
