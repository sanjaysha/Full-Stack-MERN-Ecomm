import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetails,
  removeErrors,
} from "../features/products/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  removeError,
  removeSuccess,
  updateProduct,
} from "../features/admin/adminSlice";

function UpdateProduct() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [oldImagePreview, setOldImagePreview] = useState([]);

  const categories = ["Tshirts", "Shirts", "Jeans", "Pants", "Hats", "Caps"];

  const { loading, error, product } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const { updateId } = useParams();
  const navigate = useNavigate();

  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = useSelector((state) => state.admin);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProductImages([]);
    setImagePreview([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setProductImages((old) => [...old, reader.result]);
          setImagePreview((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const updateProductSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", desc);
    myForm.set("stock", stock);
    myForm.set("category", category);
    productImages.forEach((img) => {
      myForm.append("image", img);
    });
    dispatch(updateProduct({ id: updateId, productData: myForm }));
    updateLoading ? "" : navigate("/admin/products");
  };

  useEffect(() => {
    dispatch(getProductDetails(updateId));
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [updateId, error, dispatch]);

  useEffect(() => {
    if (!loading && product) {
      setName(product.name);
      setDesc(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setOldImagePreview(product.image);
    }
  }, [product]);

  useEffect(() => {
    if (updateError) {
      toast.error(updateError, { position: "top-center", autoClose: 3000 });
      dispatch(removeError());
    }
    if (updateSuccess) {
      toast.success("Product Updated Successfully", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      setName("");
      setDesc("");
      setPrice("");
      setCategory("");
      setStock("");
      setProductImages([]);
      setImagePreview([]);
    }
  }, [updateError, dispatch, updateSuccess]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <PageTitle title="Update Product" />
      <div className="flex-1 flex p-4">
        <div className="flex flex-col w-full max-w-6xl mx-auto rounded-lg shadow-md gap-6 p-6">
          <form
            className="flex flex-col gap-2 py-3"
            encType="multipart/form-data"
            onSubmit={updateProductSubmit}
          >
            <h3 className="text-xl font-bold">Update Product</h3>
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter Product Name"
                name="productName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></input>
            </div>
            <div className="input-group">
              <textarea
                placeholder="Product Description"
                className="border p-2 rounded-md w-full h-24 resize-none"
                value={desc}
                name="description"
                required
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>
            <div className="input-group">
              <input
                type="number"
                placeholder="Enter Product Price"
                name="price"
                value={price}
                // onChange={(e) => setPrice(e.target.value)}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || Number(value) >= 0) {
                    setPrice(value);
                  }
                }}
                min={0}
                required
              ></input>
            </div>
            <div className="input-group">
              <select
                id="category"
                className="border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                name="category"
                required
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option value="">Select Product Category</option>
                {categories.map((category) => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <input
                type="number"
                placeholder="Enter Product Stock"
                value={stock}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || Number(value) >= 0) {
                    setStock(value);
                  }
                }}
                min={0}
                name="stock"
                required
              ></input>
            </div>
            <div className="input-group">
              <input
                type="file"
                name="productimage"
                accept="images/"
                className="bg-white"
                multiple
                onChange={handleImageChange}
              />
            </div>
            <div className="flex flex-nowrap gap-2 overflow-x-auto">
              {imagePreview.map((image, index) => (
                <div key={index} className="w-32 h-32 flex-shrink-0">
                  <img
                    src={image}
                    alt="Product Preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-nowrap gap-2 overflow-x-auto">
              {oldImagePreview.map((image, index) => (
                <div key={index} className="w-32 h-32 flex-shrink-0">
                  <img
                    src={image.url}
                    alt="Old Preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              ))}
            </div>

            <button className="btn-primary">
              {updateLoading ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UpdateProduct;
