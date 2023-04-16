import React, { useState, useEffect } from "react";
import useEth from "../contexts/EthContext/useEth";
import ProductCard from "../Components/ProductCard";

const Products = ({ signedUserKey, updateLayout }) => {
  const {
    state: { contract, accounts },
  } = useEth();

  const [productIdList, setProductIdList] = useState([]);

  useEffect(() => {
    const fetchProductIds = async () => {
      const pidList = await contract.methods
        .getAllProducts(accounts[0])
        .call({ from: accounts[0] });
      setProductIdList(pidList);
    };
    fetchProductIds();
  }, [signedUserKey]);

  return (
    <div>
      {productIdList.length ? (
        <div className="products-box">
          <h3>Total products : {productIdList.length}</h3>
          <div className="products-card-deck">
            {productIdList.map((productKey) => {
              return (
                <ProductCard
                  productKey={productKey}
                  key={productKey}
                  updateLayout={updateLayout}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="no-products-box">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            fill="currentColor"
            className="bi bi-emoji-frown"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
          </svg>
          <hr style={{ color: "#fff" }} />
          <h2>You don't have any product owned!</h2>
        </div>
      )}
    </div>
  );
};

export default Products;
