const express = require("express");
const sequelize = require("./connection");
const db = require("./connection/connection");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const { notFound } = require("./controllers/notFound");
const { authMiddleware } = require("./middlewares/auth");
app.use(express.json()); // parse body into json
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:4000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
const PORT = 5000;
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection Status: Connected");
  } catch (error) {
    console.log("Connection Status: Disconnected");
  }
})();
// db.user.sync({ force: true }).then(() => console.log("synced"));
app.get("/", (req, res) => {
  res.send("hello");
});
// app.get("/api/v1", authMiddleware, (request, response) => {});

app.use("/api/v1", userRoutes);
app.use("/api/v1", authRoutes);
app.all("*", notFound);
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
