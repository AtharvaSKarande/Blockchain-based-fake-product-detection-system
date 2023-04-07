import { EthProvider } from "./contexts/EthContext";
import Test from "./components/Test";
import LayoutInflator from "./layouts/LayoutInflator";

import "./css/Inflator.css";
import "./css/Home.css";
import "./css/SignUp.css";
import "./css/AddProduct.css";
import "./css/ProductDetails.css";
import "./css/Products.css";
import "./css/ProductCard.css";

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
