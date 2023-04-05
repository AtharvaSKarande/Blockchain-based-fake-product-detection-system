import React from "react";
import Layouts from "../Constants/Constants";

const Home = ({ signedUserKey, isCompany, updateLayout }) => {
  const Description = () => {
    return (
      <div>
        <h2 className="d-flex justify-content-center fw-bold mt-3">
          Welcome to Product Chain application!
        </h2>
        <div
          className="d-flex fw-bold my-3 mx-3"
          style={{ textAlign: "justify" }}
        >
          <h5>
            lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
            ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
            lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
            ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
            lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
            ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
            lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
            ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
            lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
            ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          </h5>
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
            className="btn btn-dark mx-4"
            onClick={userLoginClick}
          >
            User Login
          </button>
          <button
            type="button"
            className="btn btn-dark mx-4"
            onClick={companyLoginClick}
          >
            Company Login
          </button>
        </div>

        <div className="d-flex justify-content-center fw-bold mx-3">
          <h5>
            New to Product Chain?{" "}
            <a className="link-primary" onClick={signUpClick}>
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
          className="btn btn-dark mx-5 my-2"
          onClick={seeAllProductsClicked}
        >
          See all owned products
        </button>
        {isCompany && (
          <button
            type="button"
            className="btn btn-dark mx-5 my-2"
            onClick={addNewProductClicked}
          >
            Add a new product
          </button>
        )}
      </div>
    );
  };

  const userLoginClick = () => {};

  const companyLoginClick = () => {};

  const signUpClick = () => {
    updateLayout(Layouts.SIGN_UP_LAYOUT);
  };

  const seeAllProductsClicked = () => {
    updateLayout(Layouts.PRODUCTS_LAYOUT);
  };

  const addNewProductClicked = () => {
    updateLayout(Layouts.ADD_PRODUCT_LAYOUT);
  };

  return (
    <div className="description">
      {/* Description */}
      <Description />

      {/* Buttons */}
      {signedUserKey ? <BtnsForSignedUser /> : <BtnsForNotSignedUser />}
    </div>
  );
};

export default Home;
