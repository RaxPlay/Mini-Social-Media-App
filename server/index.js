import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth/auth.js"
import postRoutes from "./routes/posts/post.js"

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
	origin: process.env.CLIENT_URL || "http://localhost:5173", //default
	credentials: true, // enabling cookies to be sent to requests
}));

app.use("/api/auth", authRoutes);
app.use("/post", postRoutes)

app.listen(5000, () => {
  console.log("Hello World")
})