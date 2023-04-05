import React from "react";

const AddProduct = () => {
  const AddProductTitle = () => {
    return (
      <h2 className="d-flex justify-content-center fw-bold mt-3 ">
        Add a new product to Product Chain
      </h2>
    );
  };

  const AddProductForm = () => {
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
          ></textarea>
        </div>

        <AddProductBtn />
      </form>
    );
  };

  const AddProductBtn = () => {
    return (
      <div>
        <div className="d-flex justify-content-center fw-bold mx-1 my-1">
          <button
            type="submit"
            className="btn btn-dark mx-4"
            onClick={addProductClick}
          >
            Add product
          </button>
        </div>
      </div>
    );
  };

  const addProductClick = (event) => {
    event.preventDefault();
  };

  return (
    <div className="input-add-product">
      <AddProductTitle />
      <AddProductForm />
    </div>
  );
};

export default AddProduct;
