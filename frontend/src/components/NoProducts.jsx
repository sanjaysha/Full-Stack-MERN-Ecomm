import React from "react";
import { TriangleAlert } from "lucide-react";

function NoProducts({ keyword }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <TriangleAlert size={64} color="#fff824" strokeWidth={2} />
      <h3 className="font-semibold">No Products Found</h3>
      <p>
        {keyword
          ? `No products match your search criteria - "${keyword}". Please try again with different keywords.`
          : "No products Available."}
      </p>
    </div>
  );
}

export default NoProducts;
