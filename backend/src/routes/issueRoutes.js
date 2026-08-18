const express = require("express");
const {
  listIssues,
  getIssue,
  createIssue,
  updateIssue,
  deleteIssue
} = require("../controllers/issueController");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();

router.get("/", listIssues);
router.get("/:id", getIssue);

router.post("/", createIssue);

router.patch(
  "/:id",
  requireAuth,
  requireRole("authority"),
  updateIssue
);

router.delete(
  "/:id",
  requireAuth,
  requireRole("authority"),
  deleteIssue
);

module.exports = router;
