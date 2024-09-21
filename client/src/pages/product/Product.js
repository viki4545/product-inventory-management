import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { deleteProduct, fetchProducts } from "../../features/productSlice";
import "./Product.css";
import { toast } from "react-toastify";

const Products = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { products, isLoading } = useSelector((state) => state.product);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchProducts(id));
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id))
        .then(() => {
          toast.success("Product deleted successfully!");
        })
        .catch((err) => {
          toast.error("Product deletion failed");
          console.log(err);
        });
    }
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map((number) => (
      <button
        key={number}
        className={`btn pagination-btn ${
          currentPage === number ? "active" : ""
        }`}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </button>
    ));
  };

  return (
    <div className="container">
      <h1>Product Inventory</h1>
      <Link to={`/products/new`} className="btn add-btn">
        Add New Product
      </Link>
      <div className="product-list">
        {isLoading ? (
          <p>Loading products...</p>
        ) : currentProducts.length > 0 ? (
          <ul>
            {currentProducts?.map((product) => (
              <li key={product?._id} className="product-item">
                <div className="product-details">
                  <h3>{product?.name}</h3>
                  <p>{product?.description}</p>
                  <p className="price">${product?.price}</p>
                </div>
                <div className="product-actions">
                  <button
                    className="btn delete-btn"
                    onClick={() => handleDelete(product?._id)}
                  >
                    Delete
                  </button>
                  <Link
                    to={`/products/edit-product/${product?._id}`}
                    className="btn edit-btn"
                  >
                    Edit
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No products available.</p>
        )}
      </div>

      <div className="pagination">
        <button
          className="btn pagination-btn"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {renderPageNumbers()}

        <button
          className="btn pagination-btn"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
