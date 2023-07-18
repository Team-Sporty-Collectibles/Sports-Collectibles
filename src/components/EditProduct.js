import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const EditProduct = ({ token, currentProduct }) => {
  const { id, name, price, description, category, image_path } = currentProduct;

  const [updatedName, setUpdatedName] = useState(name);
  const [updatedPrice, setUpdatedPrice] = useState(price);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [updatedCategory, setUpdatedCategory] = useState(category);
  const [updatedImage_Path, setUpdatedImage_Path] = useState(image_path);

  const navigate = useNavigate();

  const updateProduct = async (productId, token, product) => {
    try {
      const response = await fetch(`api/products/${productId}`, {
        method: "PATCH",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(
          product
        )
      });
      const result = await response.json();
      console.log(result);
      return result;

    } catch (err) {
      console.error(err);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const product = {
      name: updatedName,
      price: updatedPrice,
      description: updatedDescription,
      category: updatedCategory,
      image_path: updatedImage_Path
    };

    const results = await updateProduct(id, token, product);

    if (!results.error) {
      alert("Product successfully updated!");
      navigate("/");
    };
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Edit Product</h2>
        <fieldset>
          <div>
            <label>Name:</label>
            <input
              type="text"
              placeholder="Enter Name*"
              value={updatedName}
              onChange={({target: {value}}) => {setUpdatedName(value)}}
              required
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              placeholder="Enter Price*"
              value={ updatedPrice }
              onChange={({target: {value}}) => { setUpdatedPrice(value) }}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              placeholder="Enter Description*"
              value={ updatedDescription }
              onChange={({target: {value}}) => { setUpdatedDescription(value) }}
              required
            />
          </div>
          <div>
            <label>Category:</label>
            <input
              type="text"
              placeholder="Enter Category*"
              value={ updatedCategory }
              onChange={({target: {value}}) => { setUpdatedCategory(value) }}
              required
            />
          </div>
          <div>
            <label>File Path:</label>
            <input
              type="text"
              placeholder="Enter File Path of image"
              value={ updatedImage_Path }
              onChange={({target: {value}}) => { setUpdatedImage_Path(value) }}
            />
          </div>
          <button type="submit">Submit Changes</button>
        </fieldset>
      </form>
    </div>
  )
}

export default EditProduct;