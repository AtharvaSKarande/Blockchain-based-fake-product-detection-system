import React, { useState } from "react";
import useEth from "../contexts/EthContext/useEth";

import Layout from "../Constants/Layout";

const Signup = ({ updateLayout }) => {
  const {
    state: { contract, accounts },
  } = useEth();

  const [isCompany, setIsCompany] = useState(false);

  const [userName, setUserName] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyContact, setCompanyContact] = useState("");
  const [companyDesc, setCompanyDesc] = useState("");

  const SignUpTitle = () => {
    return (
      <h2 className="d-flex justify-content-center fw-bold mt-3 ">
        {isCompany ? "Company Sign Up" : "New user Sign Up"}
      </h2>
    );
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleCompanyEmailChange = (event) => {
    setCompanyEmail(event.target.value);
  };

  const handleCompanyWebsiteChange = (event) => {
    setCompanyWebsite(event.target.value);
  };

  const handleCompanyContactChange = (event) => {
    setCompanyContact(event.target.value);
  };

  const handleCompanyDescChange = (event) => {
    setCompanyDesc(event.target.value);
  };

  const isCompanyCheckBoxClicked = (event) => {
    setIsCompany(event.target.checked);
  };

  const allFieldsValidated = () => {
    if (companyName.length == 0) {
      console.log("Company name can't be empty!");
      return 0;
    }
    if (companyWebsite.length == 0) {
      console.log("Company website can't be empty!");
      return 0;
    }
    if (companyEmail.length == 0) {
      console.log("Company email can't be empty!");
      return 0;
    }
    if (companyContact.length == 0) {
      console.log("Company contact no. can't be empty!");
      return 0;
    }
    if (companyDesc.length == 0) {
      console.log("Company description can't be empty!");
      return 0;
    }
    return 1;
  };

  const signUpClick = async () => {
    if (isCompany) {
      if (allFieldsValidated()) {
        const allCompanies = await contract.methods
          .getAllCompanies()
          .call({ from: accounts[0] });

        const companyKey = accounts[0];

        if (allCompanies.includes(companyKey)) {
          console.log("Company already exist.");
        } else {
          try {
            await contract.methods
              .companySignUp(
                companyKey,
                companyName,
                companyDesc,
                false,
                companyEmail,
                companyContact,
                companyWebsite
              )
              .send({ from: accounts[0] });

            console.log("Company sign up successful.");
            updateLayout(Layout.HOME_LAYOUT);
          } catch (error) {
            console.log("Error occured while processing the transaction.");
          }
        }
      }
    } else {
      if (userName.length) {
        const allUsers = await contract.methods
          .getAllUsers()
          .call({ from: accounts[0] });

        const userKey = accounts[0];

        if (allUsers.includes(userKey)) {
          console.log("User already exist.");
        } else {
          try {
            await contract.methods
              .userSignUp(userKey, userName)
              .send({ from: accounts[0] });

            console.log("User sign up successful.");
            updateLayout(Layout.HOME_LAYOUT);
          } catch (error) {
            console.log("Error occured while processing the transaction.");
          }
        }
      } else {
        console.log("Username can't be empty.");
      }
    }
  };

  return (
    <div className="signup-input-box">
      <SignUpTitle />

      {!isCompany && (
        <div className="input-form-user">
          <label className="label" htmlFor="userName">
            User name
          </label>
          <input
            className="form-control"
            type="text"
            id="userName"
            placeholder="Enter your name here"
            onChange={handleUserNameChange}
          ></input>
        </div>
      )}

      {isCompany && (
        <div>
          <div className="row">
            <div className="col input-form-company">
              <label className="label" htmlFor="companyName">
                Company name
              </label>
              <input
                className="form-control"
                type="text"
                id="companyName"
                placeholder="Enter company name here"
                onChange={handleCompanyNameChange}
              ></input>
            </div>

            <div className="col input-form-company">
              <label className="label" htmlFor="website">
                Company website
              </label>
              <input
                className="form-control"
                type="website"
                id="website"
                placeholder="www.example.com"
                onChange={handleCompanyWebsiteChange}
              ></input>
            </div>
          </div>

          <div className="row">
            <div className="col input-form-company">
              <label className="label" htmlFor="email">
                Email id
              </label>
              <input
                className="form-control"
                type="email"
                id="email"
                placeholder="example@email.com"
                onChange={handleCompanyEmailChange}
              ></input>
            </div>

            <div className="col input-form-company">
              <label className="label" htmlFor="contactNo">
                Contact number
              </label>
              <input
                className="form-control"
                type="text"
                id="contactNo"
                placeholder="0000-000-000"
                onChange={handleCompanyContactChange}
              ></input>
            </div>
          </div>

          <div className="input-form-company">
            <label className="label" htmlFor="description">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              placeholder="Tell us something about your company ..."
              onChange={handleCompanyDescChange}
            ></textarea>
          </div>
        </div>
      )}

      <div className="checkbox">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="isCompanySignup"
          checked={isCompany}
          onChange={isCompanyCheckBoxClicked}
        />
        <label className="label" htmlFor="isCompanySignup">
          Sign up as a product Manufacturing company
        </label>
      </div>

      <div>
        <div className="d-flex justify-content-center fw-bold mx-1 my-1">
          <button
            type="button"
            className="btn btn-dark mx-4"
            onClick={signUpClick}
          >
            {isCompany ? "Company Sign up" : "Sign up to Product Chain"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
