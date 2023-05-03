const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const { createUser, fetchUser } = require("./../controllers/user");

router.post("/users", createUser);
router.get("/users", authMiddleware, fetchUser);

module.exports = router;
