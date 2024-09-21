import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addProduct,
  fetchProductById,
  updateProduct,
} from "../../features/productSlice";
import "./ProductForm.css";
import { toast } from "react-toastify";

const ProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { products } = useSelector((state) => state.product);
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  useEffect(() => {
    if (id) {
      const productToEdit = products.find((product) => product._id === id);
      if (productToEdit) {
        setFormData({
          name: productToEdit.name,
          description: productToEdit.description,
          price: productToEdit.price,
          category: productToEdit.category,
          stock: productToEdit.stock,
        });
      } else {
        dispatch(fetchProductById(id)).then((response) => {
          if (response.payload) {
            const fetchedProduct = response.payload.data;
            setFormData({
              name: fetchedProduct.name,
              description: fetchedProduct.description,
              price: fetchedProduct.price,
              category: fetchedProduct.category,
              stock: fetchedProduct.stock,
            });
          }
        });
      }
    }
  }, [id, products, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, description, price, category, stock } = formData;

    if (id) {
      dispatch(updateProduct({ id, updatedProduct: formData }))
        .then(() => {
          toast.success("Product updated successfully!");
          navigate(`/products/${userId}`);
        })
        .catch((error) => {
          toast.error("Failed to update product! Please try again.");
          console.error(error);
        });
    } else {
      dispatch(
        addProduct({ name, description, price, category, stock, user: userId }),
      )
        .then(() => {
          toast.success("Product created successfully!");
          navigate(`/products/${userId}`);
        })
        .catch((error) => {
          toast.error("Failed to create product! Please try again.");
          console.error(error);
        });
    }
  };

  return (
    <div className="product-form-container">
      <h2>{id ? "Edit Product" : "Add Product"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">{id ? "Update Product" : "Add Product"}</button>
      </form>
    </div>
  );
};

export default ProductForm;
