import User from "../models/userModel.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import HandleError from "../utils/handleError.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";

// Register User
export const registerUser = handleAsyncError(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;
  const myCloud = await cloudinary.uploader.upload(avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  sendToken(user, 201, res);
});

//Login User
export const loginUser = handleAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new HandleError("Email or password cannot be empty!", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new HandleError("Invalid email or password!", 401));
  }
  const isPasswordMatched = await user.verifyPassword(password);
  if (!isPasswordMatched) {
    return next(new HandleError("Invalid email or password!", 401));
  }
  sendToken(user, 200, res);
});

// Logout User
export const logoutUser = handleAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "User logged out successfully.",
  });
});

// Forgot Password
export const requestPasswordReset = handleAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new HandleError("User not found!", 400));
  }
  let resetToken;
  try {
    resetToken = user.generateResetPasswordToken();
    await user.save({ validateBeforeSave: false });
  } catch (error) {
    return next(
      new HandleError("Error occurred while generating reset token!", 500),
    );
  }
  // const resetPasswardUrl = `${req.protocol}://${req.get("host")}/reset/${resetToken}`;
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  const resetPasswardUrl = `${frontendUrl}/reset/${resetToken}`;
  const message = `Use the following link to reset your password: \n\n ${resetPasswardUrl} \n\n The link will expire in 5 minutes. If you have not requested password reset, please ignore this message.`;
  try {
    // Send Email
    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message,
    });
    res.status(200).json({
      success: true,
      message: "Password reset email sent to " + user.email + " successfully.",
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new HandleError("Error occurred while sending reset email!", 500),
    );
  }
});

// Reset Password
export const resetPassword = handleAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new HandleError("Invalid or expired reset token!", 400));
  }
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return next(new HandleError("Passwords do not match!", 400));
  }
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
});

// get user details
export const getUserDetails = handleAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

// update password
export const updateUserPassword = handleAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.verifyPassword(oldPassword);
  if (!isPasswordMatched) {
    return next(new HandleError("Old password is incorrect!", 400));
  }
  if (newPassword !== confirmPassword) {
    return next(
      new HandleError("New password and confirm password do not match!", 400),
    );
  }
  user.password = newPassword;
  await user.save();
  sendToken(user, 200, res);
});

// Update User Profile
export const updateUserProfile = handleAsyncError(async (req, res, next) => {
  const { name, email, avatar } = req.body;
  const updateUserData = {
    name,
    email,
  };

  if (avatar !== "") {
    const user = await User.findById(req.user.id);
    if (user.avatar.public_id) {
      const imageId = user.avatar.public_id;
      await cloudinary.uploader.destroy(imageId);
      const myCloud = await cloudinary.uploader.upload(avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
      updateUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
  }

  const user = await User.findByIdAndUpdate(req.user.id, updateUserData, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    message: "User profile updated successfully.",
    user,
  });
});

// Admin -getting users information
export const getUsersList = handleAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// Admin - getting single user information
export const getSingleUser = handleAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new HandleError("User not found!", 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

// Admin - update user role
export const updateUserRole = handleAsyncError(async (req, res, next) => {
  const { role } = req.body;
  const updateUserData = {
    role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, updateUserData, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(new HandleError("User not found!", 404));
  }
  res.status(200).json({
    success: true,
    message: "User role updated successfully.",
    user,
  });
});

// Admin - delete user
export const deleteUser = handleAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new HandleError("User not found!", 404));
  }
  const imageId = user.avatar.public_id;
  await cloudinary.uploader.destroy(imageId);
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "User deleted successfully.",
  });
});
