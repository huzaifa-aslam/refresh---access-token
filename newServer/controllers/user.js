const { sign, verify } = require("jsonwebtoken");
const db = require("./../connection/connection");
const { token, auth } = require("./auth");
const tUser = db.user;
const createUser = async (request, response) => {
  try {
    console.log("request.body", request.body);
    const { name, email, password } = request.body;
    await tUser.create({
      name,
      email,
      password,
    });
    let jwtToken = await token(email, response);

    return response.status(201).json(jwtToken);
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return response.status(400).json({ message: "User already exists" });
    } else {
      throw error;
    }
  }
};
const fetchUser = async (request, response) => {
  try {
    // let token = request.headers.authorization.split(" ")[1];
    // const decoded = verify(token, process.env.ACCESS_TOKEN);

    // console.log("token", token);
    let Users = await tUser.findAll();

    return response.status(201).json(Users);
  } catch (error) {
    return response.status(401).send("unauthorized");
    throw error;
  }
};
module.exports = {
  createUser,
  fetchUser,
};
