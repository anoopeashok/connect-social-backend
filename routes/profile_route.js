const {
  updateProfile,
  profile,
  getProfileById,
  deleteProfile,
  getAllMutalContacts,
} = require("../controllers/profile_controller");
const router = require("express").Router();
const {
  authenticateUser,
  authorizeRole,
} = require("../middlewares/authentication_middleware");

router
  .route("/")
  .patch(authenticateUser, updateProfile)
  .get(authenticateUser, profile)
  .delete(authenticateUser, deleteProfile);
router.route("/byid/:id").get(getProfileById);
router.route("/mutualfriends").get(authenticateUser,getAllMutalContacts);

module.exports = router;
