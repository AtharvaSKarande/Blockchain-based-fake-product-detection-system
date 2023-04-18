import React, { useState, useEffect } from "react";
import Layouts from "../Constants/Layout";
import useEth from "../contexts/EthContext/useEth";
import CookConst from "../Constants/CookConst";
import { toast } from "react-toastify";
import ToastConfig from "../Constants/ToastConfig";

const Home = ({ signedUserKey, isCompany, updateLayout, setCookie }) => {
  const {
    state: { contract, accounts },
  } = useEth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const updateAdminState = async () => {
      if (signedUserKey && contract) {
        const adminKey = await contract.methods
          .getAdminKey()
          .call({ from: accounts[0] });
        if (adminKey == accounts[0]) setIsAdmin(true);
      }
    };
    updateAdminState();
  }, [accounts]);

  const Description = () => {
    return (
      <div>
        <h2 className="d-flex justify-content-center fw-bold mt-3">
          Welcome to{" "}
          <span style={{ color: "#00b3ff", margin: "0rem 0.5rem 0rem 0.5rem" }}>
            Product Chain
          </span>{" "}
          application!
        </h2>
        <div className=" fw-bold my-3 mx-3" style={{ textAlign: "justify" }}>
          <div className="desc-text">
            &emsp;&emsp;&emsp;Want to make sure the products you bought from
            online sites/local stores are genuine? The product chain is here.
            Product Chain is a{" "}
            <a
              href="https://en.wikipedia.org/wiki/Blockchain"
              target="_blank"
              className="highlight"
            >
              blockchain-based
            </a>{" "}
            decentralized application(Dapp) that works on an{" "}
            <a
              href="https://ethereum.org/en/"
              target="_blank"
              className="highlight"
            >
              Ethereum
            </a>{" "}
            smart contract and has data of products manufactured by different
            manufacturing companies. With the trustless, secure, highly
            available features of blockchain, you can verify the product you
            have purchased is a genuine product or can transfer your product to
            your friend in a few clicks. Join us to stop the circulation of
            duplicate/fake products in the market.
          </div>
          <div className="desc-text">
            &emsp;&emsp;&emsp;
            {signedUserKey
              ? "Enter the product key of your product in search box to check genuninty."
              : "Get start by logging in to Product chain."}
          </div>
        </div>
      </div>
    );
  };

  const BtnsForNotSignedUser = () => {
    return (
      <div>
        <div className="d-flex justify-content-center fw-bold mx-3 my-3">
          <button
            type="button"
            className="btn btn-outline-light  mx-4"
            onClick={userLoginClick}
          >
            User Login
          </button>
          <button
            type="button"
            className="btn btn-outline-light  mx-4"
            onClick={companyLoginClick}
          >
            Company Login
          </button>
        </div>

        <div className="d-flex justify-content-center fw-bold mx-3">
          <h5>
            New to Product Chain?{" "}
            <a className="highlight" onClick={signUpClick}>
              Sign up
            </a>
          </h5>
        </div>
      </div>
    );
  };

  const BtnsForSignedUser = () => {
    return (
      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-outline-light mx-5 my-2"
          onClick={seeAllProductsClicked}
        >
          See my all products
        </button>
        {isCompany && (
          <button
            type="button"
            className="btn btn-outline-light mx-5 my-2"
            onClick={addNewProductClicked}
          >
            Add a new product
          </button>
        )}
        {isAdmin && (
          <button
            type="button"
            className="btn btn-outline-light mx-5 my-2"
            onClick={updateVerifiedStatusClicked}
          >
            Update verified status
          </button>
        )}
      </div>
    );
  };

  const userLoginClick = async () => {
    const allUsers = await contract.methods
      .getAllUsers()
      .call({ from: accounts[0] });

    const userKey = accounts[0];

    if (allUsers.includes(userKey)) {
      setCookie(CookConst.COOKIE_KEY_SIGNED_USER_KEY, userKey);
      setCookie(CookConst.COOKIE_KEY_IS_COMPANY, false);
      window.location.reload();
    } else {
      toast.error(
        "Your Ethereum wallet key is not registed as user in Product chain blockchain. Please sign up first.",
        ToastConfig.ERROR
      );
    }
  };

  const companyLoginClick = async () => {
    const allCompanies = await contract.methods
      .getAllCompanies()
      .call({ from: accounts[0] });

    const companyKey = accounts[0];

    if (allCompanies.includes(companyKey)) {
      setCookie(CookConst.COOKIE_KEY_SIGNED_USER_KEY, companyKey);
      setCookie(CookConst.COOKIE_KEY_IS_COMPANY, true);
      window.location.reload();
    } else {
      toast.error(
        "Your Ethereum wallet key is not registed as company in Product chain blockchain. Please sign up first.",
        ToastConfig.ERROR
      );
    }
  };

  const signUpClick = () => {
    updateLayout(Layouts.SIGN_UP_LAYOUT);
  };

  const seeAllProductsClicked = () => {
    updateLayout(Layouts.PRODUCTS_LAYOUT);
  };

  const addNewProductClicked = () => {
    updateLayout(Layouts.ADD_PRODUCT_LAYOUT);
  };

  const updateVerifiedStatusClicked = async () => {
    var key = window.prompt("Enter the key of company :");
    if (key != null && key.length) {
      var verificationStatus = window.prompt(
        `Enter the verification status (✔ : VERIFIED / ❌ : any other response) for company ${key} :`
      );
      if (verificationStatus != null) {
        verificationStatus = verificationStatus == "VERIFIED";
        await toast.promise(
          contract.methods
            .updateVerifiedStatus(key, verificationStatus)
            .send({ from: accounts[0] }),
          {
            pending: "Updating verification status...",
            success: "Verification status updated.",
            error: "Error occured while processing the transaction.",
          },
          ToastConfig.PROMISE
        );
      }
    }
  };

  return (
    <div className="description-box">
      {/* Description */}
      <Description />

      {/* Buttons */}
      {signedUserKey ? <BtnsForSignedUser /> : <BtnsForNotSignedUser />}
    </div>
  );
};

export default Home;
