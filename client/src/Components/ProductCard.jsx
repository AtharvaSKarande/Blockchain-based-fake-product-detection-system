import React, { useState, useEffect } from "react";
import useEth from "../contexts/EthContext/useEth";
import Layout from "../Constants/Layout";

const ProductCard = ({ productKey, updateLayout }) => {
  const {
    state: { contract, accounts },
  } = useEth();
  const DEFAULT_STR = "Fetching...";

  const [productDetail, setProductDetail] = useState(null);
  const [productCompany, setProductCompany] = useState(DEFAULT_STR);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const detail = await contract.methods
        .getProduct(productKey)
        .call({ from: accounts[0] });
      setProductDetail(detail);
    };
    fetchProductDetails();
  }, [productKey]);

  useEffect(() => {
    const setCompany = async () => {
      if (productDetail) {
        const company = await contract.methods
          .getCompany(productDetail.companyKey)
          .call({ from: accounts[0] });
        setProductCompany(company.name);
      }
    };
    setCompany();
  }, [productDetail]);

  const producCardClicked = () => {
    updateLayout(Layout.PRODUCT_DETAILS_LAYOUT, productKey);
  };

  return (
    <button className="product-card" onClick={producCardClicked}>
      <div className="product-card-header">
        {productDetail ? productDetail.name : DEFAULT_STR}
      </div>

      <hr className="line" />

      <div className="product-card-type">
        Product type -{" "}
        {productDetail
          ? productDetail.productType.length
            ? productDetail.productType
            : "NA"
          : DEFAULT_STR}
      </div>

      <div className="product-card-desc">
        {productDetail ? productDetail.description : DEFAULT_STR}
      </div>

      <hr className="line" />

      <div className="product-card-footer">MFD. by - {productCompany}</div>
    </button>
  );
};

export default ProductCard;
