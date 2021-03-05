const mongoose = require('mongoose');

const candidateData = new mongoose.Schema({
	nameOfTheCandidate: String,
	email: String,
	mobileNo:Number,
	dateOfBirth: String,
	workExperience: String,
	resumeTitle: String,
	currentLocation:String,
	postalAddress:String,
	currentEmployer: String,
	currentDesignation:String
});

module.exports = mongoose.model("candidatedata", candidateData);