const Issue = require("../models/issue");

const normalizeIssue = (issue) => ({
  ...issue.toObject(),
  id: issue.issueId
});

async function listIssues(req, res, next) {
  try {
    const filter = {};

    if (req.query.status) filter.status = req.query.status;
    if (req.query.category) filter.category = req.query.category;

    const issues = await Issue.find(filter)
      .sort({ createdAt: -1 })
      .limit(500);

    res.json(issues.map(normalizeIssue));
  } catch (error) {
    next(error);
  }
}

async function getIssue(req, res, next) {
  try {
    const issue = await Issue.findOne({
      $or: [
        { issueId: req.params.id },
        ...(require("mongoose").isValidObjectId(req.params.id)
          ? [{ _id: req.params.id }]
          : [])
      ]
    });

    if (!issue) {
      return res.status(404).json({ message: "Issue not found." });
    }

    res.json(normalizeIssue(issue));
  } catch (error) {
    next(error);
  }
}

async function createIssue(req, res, next) {
  try {
    const {
      id,
      title,
      description,
      category,
      priority,
      status,
      location,
      lat,
      lng,
      coordinates,
      reportedBy,
      assignedTo,
      evidence
    } = req.body;

    const issue = await Issue.create({
      issueId: id,
      title,
      description,
      category,
      priority,
      status: status || "Reported",
      location,
      coordinates:
        coordinates ||
        (lat != null && lng != null
          ? { lat: Number(lat), lng: Number(lng) }
          : undefined),
      reportedBy,
      assignedTo,
      evidence
    });

    res.status(201).json(normalizeIssue(issue));
  } catch (error) {
    next(error);
  }
}

async function updateIssue(req, res, next) {
  try {
    const allowed = [
      "title",
      "description",
      "category",
      "priority",
      "status",
      "location",
      "coordinates",
      "assignedTo"
    ];

    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    const issue = await Issue.findOneAndUpdate(
      { issueId: req.params.id },
      updates,
      { new: true, runValidators: true }
    );

    if (!issue) {
      return res.status(404).json({ message: "Issue not found." });
    }

    res.json(normalizeIssue(issue));
  } catch (error) {
    next(error);
  }
}

async function deleteIssue(req, res, next) {
  try {
    const result = await Issue.deleteOne({
      issueId: req.params.id
    });

    if (!result.deletedCount) {
      return res.status(404).json({ message: "Issue not found." });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listIssues,
  getIssue,
  createIssue,
  updateIssue,
  deleteIssue
};
