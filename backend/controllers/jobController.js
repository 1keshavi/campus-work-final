const Job = require("../models/Job");

async function createJob(req, res, next) {
  try {
    const { title, salary, location, category, jobType, description } = req.body;

    if (!title || !salary || !location || !category || !jobType || !description) {
      return res.status(400).json({ message: "All job fields are required." });
    }

    const job = await Job.create({
      title,
      salary,
      location,
      category,
      jobType,
      description,
    });

    return res.status(201).json(job);
  } catch (error) {
    return next(error);
  }
}

async function getJobs(req, res, next) {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    return res.status(200).json(jobs);
  } catch (error) {
    return next(error);
  }
}

async function updateJob(req, res, next) {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    return res.status(200).json(job);
  } catch (error) {
    return next(error);
  }
}

async function deleteJob(req, res, next) {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    return res.status(200).json({ message: "Job deleted successfully." });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
};
