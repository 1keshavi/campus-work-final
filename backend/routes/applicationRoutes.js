const express = require("express");
const {
  applyToJob,
  getApplications,
  getUserApplications,
  updateApplicationStatus,
} = require("../controllers/applicationController");

const router = express.Router();

router.route("/").get(getApplications).post(applyToJob);
router.post("/apply", applyToJob);
router.get("/user/:userId", getUserApplications);
router.put("/:id", updateApplicationStatus);

module.exports = router;
