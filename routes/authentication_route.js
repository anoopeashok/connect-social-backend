const {
  register,
  triggerOTP,
  verifyPhone,
  login,
  updateAccessToken,
} = require("../controllers/authentication_controller");

const router = require("express").Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/sendotp").post(triggerOTP);
router.route("/verifyphone").post(verifyPhone);
router.route("/updateaccesstoken").post(updateAccessToken);


module.exports = router;

