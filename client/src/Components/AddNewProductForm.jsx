import React, { useState } from "react";

const AddNewProductForm = () => {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [productDesc, setProductDesc] = useState("");

  const handleProductIdChange = (event) => {
    setProductId(event.target.value);
  };

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleProductTypeChange = (event) => {
    setProductType(event.target.value);
  };

  const handleProductDescriptionChange = (event) => {
    setProductDesc(event.target.value);
  };

  const addProductClick = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={addProductClick}>
      <div className="row">
        <div className="col add-product-input">
          <label className="label" htmlFor="productId">
            Product id
          </label>
          <input
            className="form-control"
            type="text"
            id="productId"
            placeholder="Enter your product's unique id"
            onChange={handleProductIdChange}
          ></input>
        </div>

        <div className="col add-product-input">
          <label className="label" htmlFor="productName">
            Product's Name
          </label>
          <input
            className="form-control"
            type="text"
            id="productName"
            placeholder="Enter product name"
            onChange={handleProductNameChange}
          ></input>
        </div>

        <div className="col add-product-input">
          <label className="label" htmlFor="productType">
            Product type (Optional)
          </label>
          <input
            className="form-control"
            type="text"
            id="productType"
            placeholder="Enter product type"
            onChange={handleProductTypeChange}
          ></input>
        </div>
      </div>

      <div className="add-product-input">
        <label className="label" htmlFor="productDescription">
          Description
        </label>
        <textarea
          className="form-control"
          id="productDescription"
          rows="3"
          placeholder="Describe the product for user ..."
          onChange={handleProductDescriptionChange}
        ></textarea>
      </div>

      <div className="d-flex justify-content-center fw-bold mx-1 my-1">
        <button
          type="submit"
          className="btn btn-dark mx-4"
          onClick={addProductClick}
        >
          Add product
        </button>
      </div>
    </form>
  );
};

export default AddNewProductForm;
