const Application = require("../models/Application");
const Job = require("../models/Job");
const User = require("../models/User");

async function applyToJob(req, res, next) {
  try {
    const { userId, jobId } = req.body;

    if (!userId || !jobId) {
      return res.status(400).json({ message: "userId and jobId are required." });
    }

    const [user, job] = await Promise.all([User.findById(userId), Job.findById(jobId)]);
    if (!user || !job) {
      return res.status(404).json({ message: "User or job not found." });
    }

    const existingApplication = await Application.findOne({ userId, jobId });
    if (existingApplication) {
      return res.status(409).json({ message: "You have already applied to this job." });
    }

    const application = await Application.create({ userId, jobId, status: "applied" });
    const populatedApplication = await application.populate([
      { path: "userId", select: "email role" },
      { path: "jobId" },
    ]);

    return res.status(201).json(populatedApplication);
  } catch (error) {
    return next(error);
  }
}

async function getApplications(req, res, next) {
  try {
    const { userId, jobId } = req.query;
    const filter = {};

    if (userId) {
      filter.userId = userId;
    }

    if (jobId) {
      filter.jobId = jobId;
    }

    const applications = await Application.find(filter)
      .populate("userId", "email role")
      .populate("jobId")
      .sort({ createdAt: -1 });

    return res.status(200).json(applications);
  } catch (error) {
    return next(error);
  }
}

async function getUserApplications(req, res, next) {
  req.query.userId = req.params.userId;
  return getApplications(req, res, next);
}

async function updateApplicationStatus(req, res, next) {
  try {
    const { status } = req.body;
    const allowedStatuses = ["applied", "selected", "rejected"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid application status." });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )
      .populate("userId", "email role")
      .populate("jobId");

    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }

    return res.status(200).json(application);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  applyToJob,
  getApplications,
  getUserApplications,
  updateApplicationStatus,
};
