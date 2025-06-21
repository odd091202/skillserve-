const Job = require('../models/job');

exports.createJob = async (req, res) => {
  const { title, description, location, skill } = req.body;
  try {
    const job = new Job({ title, description, location, skill, postedBy: req.user._id });
    const saved = await job.save();
    res.status(201).json({ message: 'Job created', job: saved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getJobs = async (req, res) => {
  const { skill, location } = req.query;
  const filter = {};
  if (skill) filter.skill = skill;
  if (location) filter.location = location;
  try {
    const jobs = await Job.find(filter).populate('postedBy', 'name email');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.applyToJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.applicants.some(a => a.toString() === req.user._id.toString())) {
      return res.status(400).json({ message: 'Already applied' });
    }
    job.applicants.push(req.user._id);
    await job.save();
    res.json({ message: 'Application successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};