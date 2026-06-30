import Product from "../models/productModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import APIFunctionality from "../utils/apiFunctionality.js";
import { v2 as cloudinary } from "cloudinary";

// creating product
export const createProducts = handleAsyncError(async (req, res, next) => {
  if (!req.files || !req.files.image) {
    return next(new handleError("Please upload product image(s)", 400));
  }
  let images = [];
  if (Array.isArray(req.files.image)) {
    images = req.files.image;
  } else {
    images.push(req.files.image);
  }
  const imageLinks = [];
  for (const image of images) {
    const result = await cloudinary.uploader.upload(image.tempFilePath, {
      folder: "products",
    });
    imageLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  const product = await Product.create({
    ...req.body,
    image: imageLinks,
    user: req.user.id,
  });

  res.status(201).json({
    success: true,
    product,
  });
});

// Get All Products
export const getAllProducts = handleAsyncError(async (req, res, next) => {
  const resultsPerPage = 9;
  const apiFeatures = new APIFunctionality(Product.find(), req.query)
    .search()
    .filter();

  // getting filterd query before pagination
  const featuredQuery = apiFeatures.query.clone();
  const productCount = await featuredQuery.countDocuments();

  //Calculate total pages based on filtered count
  const totalPages = Math.ceil(productCount / resultsPerPage);
  const page = Number(req.query.page) || 1;

  if (page > totalPages && totalPages > 0) {
    return next(new HandleError("This Page dosen't exist", 404));
  }

  //Apply Pagination
  apiFeatures.pagination(resultsPerPage);

  const products = await apiFeatures.query;

  if (!products || products.length === 0) {
    return next(new HandleError("No product found", 404));
  }

  res.status(200).json({
    success: true,
    products,
    productCount,
    resultsPerPage,
    totalPages,
    currentPage: page,
  });
});

// Update Product
export const updateProduct = handleAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new HandleError("Product not found", 404));
  }

  if (req.files && req.files.image) {
    let images = [];

    if (Array.isArray(req.files.image)) {
      images = req.files.image;
    } else {
      images.push(req.files.image);
    }
    // Upload new images
    const imageLinks = [];
    for (const image of images) {
      const result = await cloudinary.uploader.upload(image.tempFilePath, {
        folder: "products",
      });

      imageLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    // Delete old images
    for (const image of product.image) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    req.body.image = imageLinks;
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product
export const deleteProduct = handleAsyncError(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new HandleError("Product not found", 404));
  }
  for (let i = 0; i < product.image.length; i++) {
    await cloudinary.uploader.destroy(product.image[i].public_id);
  }
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

// Accessing Single Product
export const getSingleProduct = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new HandleError("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// Review Product
export const reviewProduct = handleAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  if (!product) {
    return next(new HandleError("Product not found", 404));
  }

  // If review exists, update it. Otherwise, add a new review.
  const reviewExists = product.reviews.find(
    (review) => review.user.toString() === req.user.id.toString(),
  );

  if (reviewExists) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user.id.toString()) {
        review.rating = rating;
        review.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  // Calculate average rating
  let avg = 0;
  product.reviews.forEach((review) => {
    avg += review.rating;
  });
  product.ratings =
    product.reviews.length > 0 ? avg / product.reviews.length : 0;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Review added successfully",
    product,
  });
});

// Get Product reviews
export const getProductReviews = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new HandleError("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Deleting Product review
export const deleteProductReview = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new HandleError("Product not found", 404));
  }
  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.reviewId.toString(),
  );
  const numOfReviews = reviews.length;
  let avg = 0;
  reviews.forEach((review) => {
    avg += review.rating;
  });
  const ratings = numOfReviews > 0 ? avg / numOfReviews : 0;
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      numOfReviews,
      ratings,
    },
    { new: true, runValidators: true },
  );

  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
});

// Admin - Get All Products (without pagination and filtering)
export const getAdminProducts = handleAsyncError(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});
