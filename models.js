
var Mongoose = require('mongoose');


var EventSchema = new Mongoose.Schema({
	"name": String,
	"week": Number,
	"type": String,
	"date": String,
	"start": String,
	"end": String,
	"location": String,
  // fields are defined here
});

exports.Event = Mongoose.model('Event', EventSchema);