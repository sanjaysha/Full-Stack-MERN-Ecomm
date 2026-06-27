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
  const { products, productCount, loading, error } = useSelector(
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
          <ImageSlider />
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 px-6">
              Trending Now
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
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
