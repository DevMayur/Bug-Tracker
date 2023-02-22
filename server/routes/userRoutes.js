import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
    signUpUser,
    loginUser,
    getUsers,
    getUserById,
    updateUserById,
    deleteUser,
} from "../controllers/userControllers.js";

const router = express.Router();

router.route("/").get(protect, getUsers);

router.route("/signup").post(signUpUser);

router.route("/login").post(loginUser);

router
    .route("/:id")
    .get(protect, getUserById)
    .put(protect, updateUserById)
    .delete(protect, deleteUser);

export default router;
