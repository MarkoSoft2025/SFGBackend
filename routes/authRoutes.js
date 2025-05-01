const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.get("/verify-email", authController.verifyEmail); // changed from POST to GET
router.get("/check-verification", authController.checkVerification); // optional: changed to GET

module.exports = router;
