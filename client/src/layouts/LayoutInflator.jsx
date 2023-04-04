import React from "react";
import "../css/Inflator.css";
import { useState } from "react";
import useEth from "../contexts/EthContext/useEth";
import logo from "../../public/images/logo.png";
import Layouts from "../components/Constants";

import Home from "./Home";
import Signup from "./Signup";
import ProductDetails from "./ProductDetails";
import AddProduct from "./AddProduct";
import Products from "./Products";

const LayoutInflator = () => {
  const { state } = useEth();
  const [layout, setLayout] = useState(0);
  const [signedUserKey, setSignedUserKey] = useState(null);
  const [isCompany, setIsCompany] = useState(false);

  const updateLayout = (newLayout) => {
    setLayout(newLayout);
  };

  const SmartContractConnectionState = () => {
    return (
      <div className="error banner">
        {!state.artifact ? (
          <div className="flicker">
            <i className="bi bi-exclamation-circle mx-1"></i>Cannot find Product
            Chain contract artifact. Please check the MetaMask wallet connection
            and try again.
          </div>
        ) : !state.contract ? (
          <div className="flicker">
            <i className="bi bi-exclamation-triangle mx-1"></i> Smart contract
            Product Chain not found on the network to which MetaMask wallet is
            connected. Please make sure that you are connected to the correct
            network.
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  };

  const Header = () => {
    return (
      <div>
        <nav className="header navbar sticky-top navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top mx-3"
              alt="logo"
            />
            Product Chain
          </a>
          {signedUserKey && (
            <button
              type="button"
              className="btn btn-outline-danger mx-3"
              onClick={signOutClick}
            >
              Log Out
            </button>
          )}
        </nav>
      </div>
    );
  };

  const Footer = () => {
    return (
      <div>
        <footer
          id="sticky-footer"
          className="flex-shrink-0 py-2 bg-dark text-white-50 footer"
        >
          <div className="container text-center">
            <strong>&copy;</strong> Product Chain 2023
          </div>
        </footer>
      </div>
    );
  };

  const signOutClick = () => {
    setSignedUserKey(null);
  };

  return (
    <div className="row g-0 container-fluid">
      {/* Connection with smart contract. */}
      <SmartContractConnectionState />
      {/* Header */}
      <Header />

      {/* Layouts */}
      <div>
        {layout == Layouts.HOME_LAYOUT && (
          <Home
            signedUserKey={signedUserKey}
            isCompany={isCompany}
            updateLayout={updateLayout}
          />
        )}
        {layout == Layouts.SIGN_UP_LAYOUT && (
          <Signup updateLayout={updateLayout} />
        )}
        {layout == Layouts.PRODUCT_DETAILS_LAYOUT && (
          <ProductDetails updateLayout={updateLayout} />
        )}
        {layout == Layouts.ADD_PRODUCT_LAYOUT && (
          <AddProduct updateLayout={updateLayout} />
        )}
        {layout == Layouts.PRODUCTS_LAYOUT && (
          <Products updateLayout={updateLayout} />
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LayoutInflator;
