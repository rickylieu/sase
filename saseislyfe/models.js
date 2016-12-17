
var Mongoose = require('mongoose');


var EventSchema = new Mongoose.Schema({
	"name": String,
	"week": Number,
	"type": String,
	"date": String
  // fields are defined here
});

exports.Event = Mongoose.model('Event', EventSchema);