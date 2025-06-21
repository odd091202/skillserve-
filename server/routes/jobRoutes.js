const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const protect = require('../middleware/auth');

router.post('/', protect, jobController.createJob);
router.get('/', jobController.getJobs);
router.post('/:id/apply', protect, jobController.applyToJob);

module.exports = router;
