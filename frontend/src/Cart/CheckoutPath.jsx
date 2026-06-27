import { IndianRupee, PackageCheck, Truck } from "lucide-react";
import React from "react";

function CheckoutPath({ activeStep }) {
  const path = [
    { icon: <Truck />, label: "Shipping Details" },
    { icon: <PackageCheck />, label: "Confirm Order" },
    { icon: <IndianRupee />, label: "Payment" },
  ];
  return (
    <>
      <div className="flex justify-around items-center p-4 border-b border-gray-200 relative">
        {path.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2 flex-1 relative"
            active={index === activeStep ? "true" : "false"}
            completed={index <= activeStep ? "true" : "false"}
          >
            {index < path.length - 1 && (
              <div
                className={`absolute top-6 left-2/3 w-2/3 h-0.5 bg-gray-300 ${index + 1 <= activeStep ? "bg-green-500" : ""}`}
              ></div>
            )}
            <p
              className={`border rounded-full border-gray-300 w-12 h-12 flex items-center justify-center relative z-10 ${index <= activeStep ? "bg-green-500 text-white" : ""}`}
            >
              {step.icon}
            </p>
            <p
              className={`text-sm font-medium text-center ${index <= activeStep ? "text-green-500" : ""}`}
            >
              {step.label}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default CheckoutPath;
