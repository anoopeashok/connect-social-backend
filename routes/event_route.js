const router = require("express").Router();
const fileFilter = require("../middlewares/file-format-filter");
const upload = require("../middlewares/file-upload")
const { authenticateUser } = require("../middlewares/auth-middleware");

const {
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getSuggestedEvents,
} = require("../controllers/event_controller");

router
  .route("/create")
  .post(authenticateUser,fileFilter, upload.array("files", 10), createEvent);
router
  .route("/:id")
  .get(getEvent)
  .patch(authenticateUser,fileFilter, upload.array("files", 10), updateEvent)
  .delete(authenticateUser, deleteEvent);
router.route("/eventsforme").get(authenticateUser, getSuggestedEvents);

module.exports = router;
