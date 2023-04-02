import { EthProvider } from "./contexts/EthContext";
import Test from "./components/Test";
import LayoutInflator from "./layouts/LayoutInflator";

const App = () => {
  return (
    <EthProvider>
      <div id="App">
        <LayoutInflator />
        {/* <Test /> */}
      </div>
    </EthProvider>
  );
};

export default App;
