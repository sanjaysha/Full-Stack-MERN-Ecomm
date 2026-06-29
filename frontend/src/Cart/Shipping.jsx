import React, { useState } from "react";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CheckoutPath from "./CheckoutPath";
import { Country, State, City } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../features/cart/cartSlice";
import { toast } from "react-toastify";

function Shipping() {
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address || "");
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode || "");
  const [phoneNumber, setPhoneNumber] = useState(
    shippingInfo.phoneNumber || "",
  );
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [city, setCity] = useState(shippingInfo.city || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitShippingForm = (e) => {
    e.preventDefault();
    if (!address || !pinCode || !phoneNumber || !country) {
      toast.error("Please fill in all fields", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    if (phoneNumber.length < 10 || phoneNumber.length > 15) {
      toast.error("Please enter a valid phone number", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    dispatch(
      saveShippingInfo({ address, pinCode, phoneNumber, country, state, city }),
    );
    navigate("/order/confirm");
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <PageTitle title="Shipping Info" />
        <Navbar />
        <CheckoutPath activeStep={0} />

        <div className="flex-1 p-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Shipping Details
            </h1>
            <p className="mb-4 text-gray-600">
              Enter your shipping information to continue
            </p>
          </div>

          {/* Form Container */}
          <form onSubmit={submitShippingForm} className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Left Column */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Personal Information
                </h2>

                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label
                      className="font-semibold text-gray-700"
                      htmlFor="address"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      placeholder="Enter your street address"
                      className="border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      className="font-semibold text-gray-700"
                      htmlFor="pinCode"
                    >
                      Pin Code
                    </label>
                    <input
                      className="border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={6}
                      value={pinCode}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setPinCode(value);
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      className="font-semibold text-gray-700"
                      htmlFor="phoneNumber"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      placeholder="Enter your phone number"
                      className="border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Location
                </h2>

                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label
                      className="font-semibold text-gray-700"
                      htmlFor="country"
                    >
                      Country
                    </label>
                    <select
                      name="country"
                      id="country"
                      className="border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                        setState("");
                        setCity("");
                      }}
                    >
                      <option value="">Select a country</option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  {country && (
                    <div className="flex flex-col gap-2 animate-fade-in">
                      <label
                        className="font-semibold text-gray-700"
                        htmlFor="state"
                      >
                        State
                      </label>
                      <select
                        name="state"
                        id="state"
                        className="border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                        value={state}
                        onChange={(e) => {
                          setState(e.target.value);
                          setCity("");
                        }}
                      >
                        <option value="">Select a state</option>
                        {State &&
                          State.getStatesOfCountry(country).map((item) => (
                            <option key={item.isoCode} value={item.isoCode}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}

                  {state && (
                    <div className="flex flex-col gap-2 animate-fade-in">
                      <label
                        className="font-semibold text-gray-700"
                        htmlFor="city"
                      >
                        City
                      </label>
                      <select
                        name="city"
                        id="city"
                        className="border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      >
                        <option value="">Select a city</option>
                        {City &&
                          City.getCitiesOfState(country, state).map((item) => (
                            <option key={item.name} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mb-8">
              <button
                className="btn-primary px-12 py-3 rounded-lg font-semibold text-white hover:shadow-lg transition transform hover:scale-105"
                type="submit"
              >
                Continue to Order Review
              </button>
            </div>
          </form>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Shipping;
