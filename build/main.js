import express from "express";
import cors from "cors";
import usersRouter from "./router/userRouter.js";
import productsRouter from "./router/productRouter.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "";
app.use(express.json());
app.use(fileUpload());
app.use(cors());
app.use(express.static("static"));
app.use(usersRouter);
app.use(productsRouter);
const startServer = async () => {
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
};
startServer();
