const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoutes");
const PORT = process.env.PORT || 5000;

const app = express();

connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/user", authRouter);
app.use("/api/products", productRouter);

app.listen(PORT, () => {
  console.log(`Server started running on port ${PORT}`);
});
