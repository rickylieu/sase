
var Mongoose = require('mongoose');


var EventSchema = new Mongoose.Schema({
	"name": String,
	"week": Number,
	"type": String,
	"date": Date
  // fields are defined here
});

exports.Project = Mongoose.model('Event', EventSchema);