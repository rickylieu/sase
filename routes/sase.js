var models = require('../models');

/*
 * GET home page.
 */

exports.view = function(req, res){

	res.render('index', { "calendar_view": "/calendar_view"});
};

exports.add_event = function(req, res) {
	var form_data = req.body;

	var newEvent =  new models.Event({
     "name": form_data.name,
     "type": form_data.type,
     "week": form_data.week,
     "date": form_data.date,
     "start": form_data.start,
     "end": form_data.end,
     "location": form_data.location,
    })
    newEvent.save(afterSaving);
    
    function afterSaving(err) {
    if(err) {console.log(err); res.send(500);}

    var message = { 
     app_id: "765d6e0f-459d-4ef1-8144-b527ccf80c05",
     contents: {"en": "Added " + form_data.name + " to Week " + form_data.week},
     included_segments: ["All"]
    };
 
    sendNotification(message);
      res.redirect('/');
  }
}

var sendNotification = function(data) {
  var headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": "Basic MmY4NDY2N2MtNDI0Ny00MWE0LThiYjgtYzVhYmEwMzUwOWZk"
  };
  
  var options = {
    host: "onesignal.com",
    port: 443,
    path: "/api/v1/notifications",
    method: "POST",
    headers: headers
  };
  
  var https = require('https');
  var req = https.request(options, function(res) {  
    res.on('data', function(data) {
      console.log("Response:");
      console.log(JSON.parse(data));
    });
  });
  
  req.on('error', function(e) {
    console.log("ERROR:");
    console.log(e);
  });
  
  req.write(JSON.stringify(data));
  req.end();
};

//Function to put events into modal
exports.get_event = function(req, res) {
    var week = req.body.week;
    week = week.substring(6,8);
    console.log(week);

    models.Event
    .find({"week": week})
    .sort({"date": 1})
    .exec(afterQuery);

    /*models.Event
    .find()
    .limit(2)
    .sort({$natural:-1})
    .exec(afterQuery);*/


  function afterQuery(err, events) {
    if(err) console.log(err);
    //console.log(events);
    res.send(events);
  }


}

//Function to put events into calendar
exports.get_calendar = function(req, res) {

    models.Event
    .find()
    .sort({"date": 1})
    .exec(afterQuery);

    function afterQuery(err, events) {
        if(err) console.log(err);
        res.send(events);
    }
}

//Function to get last added events
exports.get_last_changed = function(req, res) {
     models.Event
    .find()
    .limit(3)
    .sort({$natural:-1})
    .exec(afterQuery)

    function afterQuery(err, events) {
    if(err) console.log(err);
    //console.log(events);
    res.send(events);
  }
}