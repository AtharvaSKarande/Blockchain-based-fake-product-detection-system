import { EthProvider } from "./contexts/EthContext";
import { ToastContainer } from "react-toastify";
import LayoutInflator from "./layouts/LayoutInflator";

import "react-toastify/dist/ReactToastify.css";
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
        <ToastContainer />
      </div>
    </EthProvider>
  );
};

export default App;
