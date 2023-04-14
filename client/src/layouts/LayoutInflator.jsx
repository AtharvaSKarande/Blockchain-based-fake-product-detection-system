import React from "react";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import useEth from "../contexts/EthContext/useEth";
import logo from "../../public/images/logo.png";
import Layouts from "../Constants/Layout";
import CookConst from "../Constants/CookConst";

import Home from "./Home";
import Signup from "./Signup";
import ProductDetails from "./ProductDetails";
import AddProduct from "./AddProduct";
import Products from "./Products";

import SearchBar from "../Components/SearchBar";
import { toast } from "react-toastify";
import ToastConfig from "../Constants/ToastConfig";

const LayoutInflator = () => {
  const [cookies, setCookie] = useCookies([
    CookConst.COOKIE_KEY_SIGNED_USER_KEY,
    CookConst.COOKIE_KEY_IS_COMPANY,
  ]);

  const { state } = useEth();
  const [checkForEth, setCheckForEth] = useState(false);
  const [layout, setLayout] = useState(Layouts.HOME_LAYOUT);
  const [signedUserKey, setSignedUserKey] = useState(null);
  const [isCompany, setIsCompany] = useState(false);
  const [productKey, setProductKey] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setCheckForEth(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (
      cookies[CookConst.COOKIE_KEY_SIGNED_USER_KEY] != null &&
      cookies[CookConst.COOKIE_KEY_SIGNED_USER_KEY] != CookConst.NULL
    ) {
      setSignedUserKey(cookies[CookConst.COOKIE_KEY_SIGNED_USER_KEY]);

      if (cookies[CookConst.COOKIE_KEY_IS_COMPANY] == CookConst.TRUE) {
        setIsCompany(true);

        if (cookies[CookConst.COOKIE_SIGN_IN_ALERT] != CookConst.TRUE) {
          setCookie(CookConst.COOKIE_SIGN_IN_ALERT, CookConst.TRUE);
          displayWelcomeMessage(true);
        }
      } else {
        if (cookies[CookConst.COOKIE_SIGN_IN_ALERT] != CookConst.TRUE) {
          setCookie(CookConst.COOKIE_SIGN_IN_ALERT, CookConst.TRUE);
          displayWelcomeMessage(false);
        }
      }
    }
  }, []);

  const displayWelcomeMessage = (isCompany) => {
    if (isCompany) {
      toast.success(`Company signed in successfully!`, ToastConfig.SUCCESS);
    } else {
      toast.success(`User signed in successfully!`, ToastConfig.SUCCESS);
    }
  };

  const updateLayout = (newLayout, prodKey = null) => {
    if (prodKey) setProductKey(prodKey);
    setLayout(newLayout);
  };

  const SmartContractConnectionState = () => {
    return (
      <div className="error banner">
        {!state.artifact ? (
          <div className="flicker">
            <i className="bi bi-exclamation-circle mx-1 svg-black"></i>Cannot
            find Product Chain contract artifact. Please check the MetaMask
            wallet connection and try again.
          </div>
        ) : !state.contract ? (
          <div className="flicker">
            <i className="bi bi-exclamation-triangle mx-1 svg-black"></i> Smart
            contract Product Chain not found on the network to which MetaMask
            wallet is connected. Please make sure that you are connected to the
            correct network.
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
              className="btn btn-outline-danger mx-2"
              onClick={logOutClick}
            >
              Log Out
            </button>
          )}
        </nav>
      </div>
    );
  };

  const BackButton = () => {
    return (
      <div>
        <button className="fab-back" onClick={backButtonClicked}>
          <i className="bi bi-arrow-left"></i>
        </button>
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

  const logOutClick = () => {
    setCookie(CookConst.COOKIE_KEY_SIGNED_USER_KEY, CookConst.NULL);
    setCookie(CookConst.COOKIE_KEY_IS_COMPANY, CookConst.NULL);
    setCookie(CookConst.COOKIE_SIGN_IN_ALERT, CookConst.NULL);
    window.location.reload();
  };

  const backButtonClicked = () => {
    window.location.reload();
    setLayout(Layouts.HOME_LAYOUT);
  };

  return (
    <div className="row g-0 container-fluid">
      {/* Connection with smart contract. */}
      {checkForEth && <SmartContractConnectionState />}
      {/* Header */}
      <Header />
      {/* Back Button */}
      {layout != Layouts.HOME_LAYOUT && <BackButton />}
      {/* Search Bar */}
      {signedUserKey &&
        (layout == Layouts.HOME_LAYOUT ||
          layout == Layouts.PRODUCT_DETAILS_LAYOUT) && (
          <SearchBar
            updateLayout={updateLayout}
            setProductKey={setProductKey}
          />
        )}

      {/* Layouts */}
      <div>
        {layout == Layouts.HOME_LAYOUT && (
          <Home
            signedUserKey={signedUserKey}
            isCompany={isCompany}
            updateLayout={updateLayout}
            setCookie={setCookie}
          />
        )}
        {layout == Layouts.SIGN_UP_LAYOUT && (
          <Signup updateLayout={updateLayout} />
        )}
        {layout == Layouts.PRODUCT_DETAILS_LAYOUT && (
          <ProductDetails
            signedUserKey={signedUserKey}
            productKey={productKey}
            updateLayout={updateLayout}
          />
        )}
        {layout == Layouts.ADD_PRODUCT_LAYOUT && (
          <AddProduct
            signedUserKey={signedUserKey}
            updateLayout={updateLayout}
          />
        )}
        {layout == Layouts.PRODUCTS_LAYOUT && (
          <Products signedUserKey={signedUserKey} updateLayout={updateLayout} />
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LayoutInflator;
