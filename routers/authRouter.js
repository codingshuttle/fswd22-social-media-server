const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/all", authController.signupController);
router.post("/login", authController.loginController);
router.post("/refresh", authController.refreshAccessTokenController);

module.exports = router;
