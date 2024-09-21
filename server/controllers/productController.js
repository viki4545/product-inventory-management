const productModel = require("../model/productModel");

const createProductController = async (req, res) => {
  const { name, description, price, category, stock, user } = req.body;
  try {
    const product = await productModel.create({
      name: name,
      description: description,
      price: price,
      category: category,
      stock: stock,
      user: user,
    });
    if (product) {
      return res.status(201).json({
        message: "Product created sucessfully!",
        data: product,
      });
    } else {
      return res.status(400).json({
        message: "Product creation failed",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const updateProductController = async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  try {
    const product = await productModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name: name,
        description: description,
        price: price,
        category: category,
        stock: stock,
      },
    );
    if (product) {
      return res.status(201).json({
        message: "Product updated sucessfully!",
        data: product,
      });
    } else {
      return res.status(400).json({
        message: "Product updation failed",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getAllProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.find({ user: id });
    if (product) {
      return res.status(201).json({
        message: "Product fetched sucessfully !",
        data: product,
      });
    } else {
      return res.status(400).json({
        message: "Product fetching failed",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const fetchProductByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);

    if (product) {
      return res.status(201).json({
        message: "Product fetched sucessfully !",
        data: product,
      });
    } else {
      return res.status(400).json({
        message: "Product fetching failed",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete({
      _id: req.params.id,
    });
    if (product) {
      return res.status(201).json({
        message: "Product deleted sucessfully !",
        data: product,
      });
    } else {
      return res.status(400).json({
        message: "Product deletion failed",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  createProductController,
  updateProductController,
  getAllProductController,
  deleteProductController,
  fetchProductByIdController,
};
