const { sign, verify, TokenExpiredError } = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token)
      return res.status(401).json({
        message: "Unauthorized",
      });
    decodedData = verify(token, process.env.ACCESS_TOKEN);
    console.log("token", token);
    console.log("decodedData", decodedData);
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
    });

    if (error instanceof TokenExpiredError) {
      return res.status(401).json({
        res: "Token expired",
      });
    }
  }
};

module.exports = authMiddleware;
