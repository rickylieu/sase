'use strict';
// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

function initializePage() {
	createCalendar();	
}

//Function to create calendar and put events inside
function createCalendar() {
  $.getScript('http://arshaw.com/js/fullcalendar-1.6.4/fullcalendar/fullcalendar.min.js',function(){
  
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();
  var i = 0;
  var color = "";

  var event_array = [];
  var event_title = "Winter Retreat 2";
  var date = new Date(y, m, 16);
  //event_array[0] = {title: 'Winter Retreat', start: new Date("2017-01-20")}
  //event_array[1] = {title: event_title, start: date}

  $.get("calendar", function(events) {
  	console.log(events);

  	for(i = 0; i < events.length; i++) {
  		event_title = events[i].name;
  		console.log(event_title);

  		date = new Date(events[i].date);
  		date.setHours(24);
  		console.log(date);

  		//Change color depending on event type
		switch (events[i].type) {
		    case "Professional":
		      	color = "#69F0AE";
		      	break
		    case "Social":
		      	color = "#FFA726"
		      	break
		    case "Community Service":
		        color = "#EF5350"
		        break
		    case "Fundraising":
		      	color = "#4CAF50"
		      	break
		    case "GBM":
		      	color = "#E0E0E0";
		      	break
		    case "Officer/Intern":
		      	color = "#FFEB3B";
		      	break
		      }

		//Create an array to dynamically change title, date, color
  		event_array[i] = {title: event_title, start: date, color: color};
  	}

  	$('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month'
      },
      editable: true,
      events: event_array,
      eventTextColor: "black",
      backgroundColor: "blue",
      aspectRatio: 1.3,
    });

  });

  }

) 
}