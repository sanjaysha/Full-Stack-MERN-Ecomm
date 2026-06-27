import React, { use, useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, removeErrors } from "../features/products/productSlice";
import Product from "../components/Product";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import NoProducts from "../components/NoProducts";
import Pagination from "../components/Pagination";

function products() {
  const { products, loading, error, productCount, resultsPerPage, totalPages } =
    useSelector((state) => state.product);
  const dispatch = useDispatch();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword");
  const pageFromUrl = parseInt(searchParams.get("page"), 10) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const categoryFromUrl = searchParams.get("category") || "";
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const categories = ["Tshirts", "Shirts", "Jeans", "Pants", "Hats", "Caps"];

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      getProducts({ keyword, page: currentPage, category: selectedCategory }),
    );
  }, [dispatch, keyword, currentPage, selectedCategory]);
  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      const newSearchParams = new URLSearchParams(location.search);
      if (page === 1) {
        newSearchParams.delete("page");
      } else {
        newSearchParams.set("page", page);
      }
      navigate(`?${newSearchParams.toString()}`);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set("category", category);
    newSearchParams.delete("page");
    navigate(`?${newSearchParams.toString()}`);
  };

  return (
    <>
      <PageTitle title="All Products" />
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-row p-8 gap-8">
          <div className="basis-1/4 shadow-lg p-4 rounded-lg">
            <h2 className="m-1 p-2 font-semibold">Categories</h2>
            <ul>
              {categories.map((category) => (
                <li
                  key={category}
                  className={`cursor-pointer m-1 p-2 rounded ${
                    selectedCategory === category
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200"
                  }`}
                  onClick={() => {
                    handleCategoryClick(category);
                  }}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
          {products.length > 0 ? (
            <div className="flex flex-col gap-6 basis-3/4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 ">
                {products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
              <div>
                <Pagination
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-100">
              <NoProducts keyword={keyword} />
            </div>
          )}
        </div>
      )}
      <Footer />
    </>
  );
}

export default products;
