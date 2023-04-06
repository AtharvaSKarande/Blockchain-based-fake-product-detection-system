import React, { useState, useEffect } from "react";
import LogCard from "../Components/LogCard";

import Remarks from "../Constants/Remarks";
import OwnerRemarks from "../Constants/OwnerRemarks";

const ProductDetails = ({ productKey, updateLayout }) => {
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
      <div className="subtitle">Product Key : {productKey}</div>

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
    </div>
  );
};

export default ProductDetails;
