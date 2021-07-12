import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/postsRoutes.js";
import authRouter from "./routes/authRoutes.js"

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true,limit: '50mb' }));
app.use(express.json({ extended: true, limit: "50mb" }));
app.use(cors({origin:"http://localhost:3000"}));

const url = process.env.URL

const port = process.env.PORT || 5000;

mongoose
  .connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(port, () => console.log("server is up running"));
  })
  .catch((err) => console.log(err));

mongoose.set("useFindAndModify", false);

app.use("/posts", router);
app.use("/auth", authRouter);
