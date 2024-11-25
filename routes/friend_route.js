const router = require("express").Router();
const { authenticateUser } = require("../middlewares/auth-middleware");

const {
    getMyFriends,
    getProfileSecret,
    sendFriendRequest,
    acceptFriendRequest,
    removeFriend
} = require("../controllers/friend_controller");

router
  .route("/sendrequest")
    .post(authenticateUser, sendFriendRequest)
router.route('/acceptrequest').post(authenticateUser, acceptFriendRequest)
router.route('/').post(authenticateUser, getMyFriends).delete(authenticateUser, removeFriend)
router.route('/profilesecret').get(authenticateUser,getProfileSecret)

module.exports = router;
