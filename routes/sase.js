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
    res.redirect('/');
  }
}

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