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

  		event_array[i] = {title: event_title, start: date}
  	}

  	$('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month'
      },
      editable: true,
      events: event_array,
      eventColor: "#4CAF50",
      backgroundColor: "blue",
      aspectRatio: 1
    });

  });

  }

) 
}