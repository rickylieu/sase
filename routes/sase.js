var models = require('../models');

/*
 * GET home page.
 */

exports.view = function(req, res){
	res.render('index');
};

exports.add_event = function(req, res) {
	var form_data = req.body;
	console.log(form_data.date);

	var newEvent =  new models.Event({
     "name": form_data.name,
     "type": form_data.type,
     "week": form_data.week,
     "date": form_data.date
    })
    newEvent.save(afterSaving);
    
    function afterSaving(err) {
    if(err) {console.log(err); res.send(500);}
    res.redirect('/');
  }
}

exports.get_event = function(req, res) {
    var week = req.body.week;
    week = week.substring(6,8);
    console.log(week);

    models.Event
    .find({"week": week})
    .exec(afterQuery);

  function afterQuery(err, events) {
    if(err) console.log(err);
    console.log(events);
    res.json(events);
  }

}