import express from "express";
import { roleBasedAccess, verifyUserAuth } from "../middleware/userAuth.js";
import {
  cretaeNewOrder,
  deleteOrder,
  getAllMyOrders,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
} from "../controller/orderController.js";

const router = express.Router();

router.route("/new/order").post(verifyUserAuth, cretaeNewOrder);
router.route("/order/:id").get(verifyUserAuth, getSingleOrder);
router
  .route("/admin/order/:id")
  .put(verifyUserAuth, roleBasedAccess("admin"), updateOrderStatus)
  .delete(verifyUserAuth, roleBasedAccess("admin"), deleteOrder);
router
  .route("/admin/orders")
  .get(verifyUserAuth, roleBasedAccess("admin"), getAllOrders);
router.route("/orders/user").get(verifyUserAuth, getAllMyOrders);

export default router;
