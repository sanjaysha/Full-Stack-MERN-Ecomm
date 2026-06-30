import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ImageSlider from "../components/ImageSlider";
import Product from "../components/Product";
import PageTitle from "../components/PageTitle";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, removeErrors } from "../features/products/productSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

function home() {
  const { products, resultsPerPage, loading, error } = useSelector(
    (state) => state.product,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts({ keyword: "" }));
  }, [dispatch]);
  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen flex flex-col">
          <PageTitle title="Home-Aravali" />
          <Navbar />
          <div className="flex-1">
            <ImageSlider />
            <div className="flex items-center justify-between px-6 mt-10 mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Trending Products
                </h2>

                <p className="text-gray-500 mt-1">
                  Discover our best-selling products
                </p>
              </div>

              <span className="text-sm text-gray-500">
                {resultsPerPage} Products
              </span>
            </div>
            <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ">
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default home;
