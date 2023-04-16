import React, { useState } from "react";
import useEth from "../contexts/EthContext/useEth";
import HTTPRespCodes from "../Constants/HTTPRespCodes";
import { toast } from "react-toastify";
import ToastConfig from "../Constants/ToastConfig";

const AddNewProductForm = () => {
  const {
    state: { contract, accounts },
  } = useEth();

  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [productDesc, setProductDesc] = useState("");

  const handleProductIdInput = (event) => {
    setProductId(event.target.value);
  };

  const handleProductNameInput = (event) => {
    setProductName(event.target.value);
  };

  const handleProductTypeInput = (event) => {
    setProductType(event.target.value);
  };

  const handleProductDescriptionInput = (event) => {
    setProductDesc(event.target.value);
  };

  const allFieldsValidated = () => {
    if (productId.length == 0) {
      toast.warning("Product ID can not be empty.", ToastConfig.WARNING);
      return 0;
    }
    if (productName.length == 0) {
      toast.warning("Product name can not be empty.", ToastConfig.WARNING);
      return 0;
    }
    if (productDesc.length == 0) {
      toast.warning(
        "Product description can not be empty.",
        ToastConfig.WARNING
      );
      return 0;
    }
    return 1;
  };

  const resetFields = () => {
    setProductId("");
    setProductName("");
    setProductType("");
    setProductDesc("");
  };

  const addProductClick = async (event) => {
    event.preventDefault();
    if (allFieldsValidated()) {
      const companyKey = accounts[0];

      try {
        const response = await contract.methods
          .registerProduct(
            productId,
            productName,
            accounts[0],
            productDesc,
            productType
          )
          .send({ from: accounts[0] });

        const apiResponse = response.events.e_registerProduct.returnValues;

        if (apiResponse[0] == HTTPRespCodes.HTTP_RESPONSE_CREATED) {
          toast.success(
            "New product registered succesfully.",
            ToastConfig.SUCCESS
          );

          var productKey = apiResponse[2];
          navigator.clipboard.writeText(productKey);
          toast.success(
            "Product key copied to clipboard!",
            ToastConfig.SUCCESS
          );
          resetFields();
          console.log(`Product Key : ${productKey}.`);
        } else {
          toast.error("ERROR: " + apiResponse[1], ToastConfig.ERROR);
        }
      } catch (error) {
        toast.error(
          "Error occured while processing the transaction.",
          ToastConfig.ERROR
        );
      }
    }
  };

  return (
    <form onSubmit={addProductClick}>
      <div className="row">
        <div className="col add-product-input">
          <label className="label" htmlFor="productId">
            Product id
          </label>
          <input
            className="inp"
            type="text"
            id="productId"
            placeholder="Enter your product's unique id"
            value={productId}
            onInput={handleProductIdInput}
          ></input>
        </div>

        <div className="col add-product-input">
          <label className="label" htmlFor="productName">
            Product's Name
          </label>
          <input
            className="inp"
            type="text"
            id="productName"
            placeholder="Enter product name"
            value={productName}
            onInput={handleProductNameInput}
          ></input>
        </div>

        <div className="col add-product-input">
          <label className="label" htmlFor="productType">
            Product type (Optional)
          </label>
          <input
            className="inp"
            type="text"
            id="productType"
            placeholder="Enter product type"
            value={productType}
            onInput={handleProductTypeInput}
          ></input>
        </div>
      </div>

      <div className="add-product-input">
        <label className="label" htmlFor="productDescription">
          Description
        </label>
        <textarea
          className="inp"
          id="productDescription"
          rows="3"
          placeholder="Describe the product for user ..."
          value={productDesc}
          onInput={handleProductDescriptionInput}
        ></textarea>
      </div>

      <div className="d-flex justify-content-center fw-bold mx-1 my-1">
        <button
          type="submit"
          className="btn btn-outline-light  mx-4"
          onClick={addProductClick}
        >
          Add product
        </button>
      </div>
    </form>
  );
};

export default AddNewProductForm;
