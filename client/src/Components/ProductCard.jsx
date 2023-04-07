import React, { useState, useEffect } from "react";
import Layout from "../Constants/Layout";

const ProductCard = ({ productKey, updateLayout }) => {
  const [productDetail, setProductDetails] = useState([]);

  useEffect(() => {
    //@@
  }, [productDetail]);

  const producCardClicked = () => {
    updateLayout(Layout.PRODUCT_DETAILS_LAYOUT, productKey);
  };

  return (
    <button className="product-card" onClick={producCardClicked}>
      <div className="product-card-header">{productKey}</div>
      <hr className="line" />
      <div className="product-card-title">Product Name </div>
      <div className="product-card-desc">Desc</div>
      <hr className="line" />
      <div className="product-card-footer">Manufact comp</div>
    </button>
  );
};

export default ProductCard;
