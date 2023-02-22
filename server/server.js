import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

//Routes
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = 8080;
dotenv.config();
connectDB();
app.use(express.json());

app.use("/api/users", userRoutes);

app.use("view engine", "ejs");
app.set("views", "./views");

app.listen(PORT, (req, res) => {
    console.log("server listening on port", PORT);
});
