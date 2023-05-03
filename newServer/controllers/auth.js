const { sign, verify } = require("jsonwebtoken");

const token = async (email, response) => {
  try {
    const ACCESS_TOKEN = sign({ email: email }, process.env.ACCESS_TOKEN, {
      expiresIn: "1m",
    });
    const REFRESH_TOKEN = sign({ email: email }, process.env.REFRESH_TOKEN, {
      expiresIn: "1d",
    });
    response.cookie("token", REFRESH_TOKEN, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    // response.status(200).json({
    //   token: ACCESS_TOKEN,
    // });
    return { accessToken: ACCESS_TOKEN, refreshToken: REFRESH_TOKEN };
  } catch (error) {
    throw error;
  }
};

const refreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;

  // Verify that the refresh token is valid and retrieve the user ID from it
  try {
    const decoded = verify(refreshToken, process.env.REFRESH_TOKEN);
    const email = decoded.email;
    console.log("email==>", email);
    // Generate a new access token and send it back to the client
    const accessToken = sign({ email: email }, process.env.ACCESS_TOKEN, {
      expiresIn: "1m",
    });
    res.status(200).json(accessToken);
  } catch (error) {
    console.error(error);
    res.sendStatus(401);
  }
};

const auth = async (token) => {
  try {
    const decoded = verify(token, process.env.ACCESS_TOKEN);
    const userEmail = decoded;
    console.log("userEmail", userEmail);
  } catch (error) {
    throw error;
  }
};
module.exports = { token, auth, refreshToken };
