import React, { useState, useEffect } from "react";
import LogCard from "../Components/LogCard";

import Remarks from "../Constants/Remarks";
import OwnerRemarks from "../Constants/OwnerRemarks";

const ProductDetails = ({ signedUserKey, productKey, updateLayout }) => {
  const DEFAULT_STR = "Fetching...";

  const [remark, setRemark] = useState(Remarks.UNKNOWN);
  const [ownerRemark, setOwnerRemark] = useState(OwnerRemarks.UNKNOWN);

  const [productName, setProductName] = useState(DEFAULT_STR);
  const [productUID, setProductUID] = useState(DEFAULT_STR);
  const [productCompanyName, setProductCompanyName] = useState(DEFAULT_STR);
  const [productDesc, setProductDesc] = useState(DEFAULT_STR);
  const [productType, setProductType] = useState(DEFAULT_STR);
  const [productOwnerKey, setProductOwnerKey] = useState(DEFAULT_STR);
  const [productLogs, setProductLogs] = useState([]);

  useEffect(() => {
    // Fetch data from blockchain and set.
  }, [productKey]);

  const TransferOwnershipButton = () => {
    return (
      <div>
        <button
          className="fab-transfer"
          onClick={transferOwnrshipButtonClicked}
        >
          <i className="bi bi-pencil-square"></i>
        </button>
      </div>
    );
  };

  const transferOwnrshipButtonClicked = () => {
    var newUserKey = window.prompt(
      "Enter the wallet key of the user to which you want to transfer the ownership of this product."
    );
    if (newUserKey) {
      var confirmation = window.confirm(
        `Do you really want to transfer ownership to user ${newUserKey} ?`
      );
      if (confirmation) {
        //@@ Transfer ownership.
      }
    }
  };

  return (
    <div
      className={
        remark == Remarks.GENUINE
          ? ownerRemark == OwnerRemarks.CORRECT_OWNER
            ? "details-box GR"
            : "details-box GW"
          : remark == Remarks.FAKE
          ? "details-box F"
          : "details-box"
      }
    >
      <div className="subtitle">Product Key : {productKey} </div>

      {remark != Remarks.FAKE ? (
        <div>
          <hr className="line" />
          <div className="d-flex">
            <div className="col detail">
              <label className="label">Remark</label>
              <div className="inner-detail">{remark}</div>
            </div>

            <div className="col detail">
              <label className="label">Ownership</label>
              <div className="inner-detail">{ownerRemark}</div>
            </div>

            <div className="col detail">
              <label className="label">Manufactured by</label>
              <div className="inner-detail">{productCompanyName}</div>
            </div>
          </div>
          <hr className="line" />
          <div className="d-flex">
            <div className="col detail">
              <label className="label">Product Name</label>
              <div className="inner-detail">{productName}</div>
            </div>

            <div className="col detail">
              <label className="label">Product UID (given by company)</label>
              <div className="inner-detail">{productUID}</div>
            </div>

            <div className="col detail">
              <label className="label">Product type</label>
              <div className="inner-detail">
                {productType == "" ? "Not specified" : productType}
              </div>
            </div>
          </div>
          <hr className="line" />
          <div className="detail" style={{ fontSize: "medium" }}>
            <label className="label">Product description</label>
            <div className="inner-detail" style={{ textAlign: "justify" }}>
              {productDesc}
            </div>
          </div>
          <hr className="line" />
          <div className="detail" style={{ fontSize: "medium" }}>
            <label className="label">Logs</label>
            <div className="inner-detail log-box">
              {productLogs.length
                ? productLogs.map((logStr) => {
                    return <LogCard logStr={logStr} />;
                  })
                : "No logs to display!"}
            </div>
          </div>
          {ownerRemark == OwnerRemarks.CORRECT_OWNER && (
            <TransferOwnershipButton />
          )}
        </div>
      ) : (
        <div className="inner-detail">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            fill="#a00"
            className="bi bi-exclamation-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
          </svg>
          <hr />
          <h4>
            This product key does not exist in Product Chain blockchain
            database. This product is either not registered or fake.
          </h4>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
