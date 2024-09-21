const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

const registerUserController = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exist",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userModel.create({
        name: name,
        email: email,
        password: hashedPassword,
      });

      const token = await jwt.sign(
        { email: user.email, id: user._id },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        },
      );

      return res.status(201).json({
        message: "User registered sucessfully !",
        user: user,
        token: token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser.id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" },
    );
    return res.status(201).json({
      message: "User LoggedIn sucessfully !",
      user: existingUser,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { registerUserController, loginUserController };
