const express = require("express");
const connectDb = require("./config/db");
const cors = require("cors");
const userRoute = require("./Routes/userRoute");
const reportRoute = require("./Routes/reportRoute");
const newsRoute = require("./Routes/newsRoute");
const dotenv = require("dotenv");
dotenv.config();
connectDb();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/report", reportRoute);
app.use("/api/news", newsRoute);
app.listen(4000, () => {
  console.log("this application is running at 4000");
});
