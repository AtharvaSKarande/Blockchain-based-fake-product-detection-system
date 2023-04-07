import React from "react";
import AddNewProductForm from "../Components/AddNewProductForm";

const AddProduct = ({ signedUserKey, updateLayout }) => {
  return (
    <div className="input-add-product">
      <h2 className="d-flex justify-content-center fw-bold mt-3 ">
        Add a new product to Product Chain
      </h2>
      <AddNewProductForm />
    </div>
  );
};

export default AddProduct;
