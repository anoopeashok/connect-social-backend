const router = require("express").Router();
const upload = require("../middlewares/file-upload");
const { authenticateUser } = require("../middlewares/auth-middleware");

const {
    getPlace,
    updatePlace,
    createPlace,
    deletePlace,
    suggestedPlaces
} = require("../controllers/place_controller");

router
  .route("/create")
  .post(authenticateUser, upload.array("files", 10), createPlace);
router
  .route("/:id")
  .get(getPlace)
  .patch(authenticateUser, upload.array("files", 10), updatePlace)
  .delete(authenticateUser, deletePlace);
router.route("/placesforme").get(authenticateUser, suggestedPlaces);

module.exports = router;
