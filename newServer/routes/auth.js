const router = require("express").Router();
const { refreshToken } = require("../controllers/auth");

router.post("/refreshToken", refreshToken);

module.exports = router;
