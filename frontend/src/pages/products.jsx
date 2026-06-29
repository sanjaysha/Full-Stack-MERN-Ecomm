import React, { useEffect, useState } from "react";
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
  const categories = [
    "All",
    "Tshirts",
    "Shirts",
    "Jeans",
    "Pants",
    "Hats",
    "Caps",
  ];

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(pageFromUrl);
  }, [pageFromUrl]);

  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

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
    const selected = category === "All" ? "" : category;

    setSelectedCategory(selected);
    setCurrentPage(1);

    const params = new URLSearchParams(location.search);

    if (selected) {
      params.set("category", selected);
    } else {
      params.delete("category");
    }

    params.delete("page");

    navigate(`?${params.toString()}`);
  };

  return (
    <>
      <PageTitle title="All Products" />
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row lg:px-8">
          <div className="w-full lg:w-1/4 lg:sticky lg:top-24 self-start rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="m-1 p-2 font-semibold">Categories</h2>
            <ul className="flex gap-3 overflow-x-auto pb-2 lg:block">
              {categories.map((category) => (
                <li
                  key={category}
                  className={`cursor-pointer flex-shrink-0 rounded-full px-4 py-2 text-sm transition rounded ${
                    selectedCategory === category
                      ? "bg-olive-600 text-white text-white"
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
            <div className="flex flex-col gap-6 w-full lg:w-3/4">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
              <div className="flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full min-h-[400px]">
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
