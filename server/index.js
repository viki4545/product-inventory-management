const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: process.env.CORS_DOMAIN,
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api/user", authRouter);
app.use("/api/products", productRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An error occurred!", error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server started running on port ${PORT}`);
});
