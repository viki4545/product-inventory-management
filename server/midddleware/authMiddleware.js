const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token) {
      token = token.split(" ")[1];
      let user = await jwt.verify(token, process.env.SECRET_KEY);
      let userId = user.id;
    } else {
      return res.status(401).json({ message: "Unauthorized user" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized user" });
  }
};

module.exports = authMiddleware;
