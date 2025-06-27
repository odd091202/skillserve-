
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {type:String,required:true},
  description: {type:String,required:true},
  location: {type:String,required:true},
  skillRequired: {type:String,required:true},
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Job', jobSchema);

