import React from "react";
import "../css/Home.css";
import Layouts from "../components/Constants";

const Home = ({ signedUserKey, isCompany, updateLayout }) => {
  const SearchBar = () => {
    return <div>{signedUserKey != null && <h3>Search bar TBD</h3>}</div>;
  };

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
            lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
            ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
            ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
            ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
            ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
            ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
            ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
            ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
            ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
            ipsum
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
        <button type="button" className="btn btn-dark mx-4 my-4">
          Name 1
        </button>
        <button type="button" className="btn btn-dark mx-4 my-4">
          Name 2
        </button>
        <button type="button" className="btn btn-dark mx-4 my-4">
          Name 3
        </button>
      </div>
    );
  };

  const userLoginClick = () => {};

  const companyLoginClick = () => {};

  const signUpClick = () => {
    updateLayout(Layouts.SIGN_UP_LAYOUT);
  };

  return (
    <div>
      {/* Search bar */}
      <SearchBar />

      <div className="description">
        {/* Description */}
        <Description />

        {/* Buttons */}
        {signedUserKey ? <BtnsForSignedUser /> : <BtnsForNotSignedUser />}
      </div>
    </div>
  );
};

export default Home;
