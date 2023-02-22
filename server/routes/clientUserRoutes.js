import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
    signUpUser,
    loginUser,
    openDashboard,
    getUsers,
    getUserById,
    updateUserById,
    deleteUser,
} from "../controllers/clientUserController.js";

const router = express.Router();

router.route("/").get(protect, getUsers);

router.route("/signup").get(signUpUser);

router.route("/login").get(loginUser);

router.route("/dashboard/:id").get(openDashboard);

router
    .route("/:id")
    .get(protect, getUserById)
    .put(protect, updateUserById)
    .delete(protect, deleteUser);

export default router;
