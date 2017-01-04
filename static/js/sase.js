'use strict';
// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

function initializePage() {
	$(".btn").click(weekClick);
	$("#calendar_button").click(createCalendar);
	
}

function weekClick(e) {
	e.preventDefault();
	var week = $(this).text();
	var i = 0;


	//Only clicks if title starts with "Week"
	if(week.substring(1,5) == "Week") {
		console.log("Week is:" + week);

        //Posts to routes to get events of that week
		$.post("weeks", { 
          "week": week,
        }, 
        //After getting events, append html to modals
         function(data) {
         	//Empty the modal so we don't have multiple appends
         	//Idk how to make this shorter :(
        	$("#week_ctns").empty();
		    $("#week_title").empty();
		    $("#Mon").empty();
		    $("#Tue").empty();
		    $("#Wed").empty();
		    $("#Thu").empty();
		    $("#Fri").empty();
		    $("#Sat").empty();
		    $("#Sun").empty();
		   $("#Mon_head").empty();
		    $("#Tue_head").empty();
		    $("#Wed_head").empty();
		    $("#Thu_head").empty();
		    $("#Fri_head").empty();
		    $("#Sat_head").empty();
		    $("#Sun_head").empty();
		    $("#Mon_head").append("<b>" + "Mon");
		    $("#Tue_head").append("<b>" + "Tue");
		    $("#Wed_head").append("<b>" + "Wed");
		    $("#Thu_head").append("<b>" + "Thu");
		    $("#Fri_head").append("<b>" + "Fri");
		    $("#Sat_head").append("<b>" + "Sat");
		    $("#Sun_head").append("<b>" + "Sun");



		    //Append event
	     	$("#week_title").append(week);


	     	//Append everything besides week to modal body
	        for(i=0; i < data.length; i++) {
              
              //Finds the day of the week  
              var d = new Date(data[i].date);
		      d.setHours(24);
		      var day = d.toDateString().substring(0,3);
		      var day_id = "#" + day;
		      var day_head = "#" + day + "_head";
		      $(day_head).empty();
		      //Append date to table
		      $(day_head).append("<b>" + day + " " + data[i].date.substring(5,10));
		      var color = "";

		      switch (data[i].type) {
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

		       var color_div = "<div style='border: solid; border-color: #263238; border-radius: 25px; background-color:" + color + "'";
		       console.log(color_div);

              
              //Append to modal html
		      $(day_id).append(color_div + "</br><b>Event: </b>" + data[i].name + "</br>"
		      //  + "<b>Type of Event: </b>" + data[i].type + "</br>"
		        + "<b>Start time: </b>" + data[i].start + "</br>"
		        + "<b>End time: </b>" + data[i].end + "</br>"
		        + "<b>Location: </b>" + data[i].location + "</div></br>"
		       );


             //$(day_id).css('background', 'rgb(255,220,200)');

             }


		   });

	}

	else {
		return;
	}
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
      events: event_array
    });
    $("#calendar_btn").toggle();

  });

 
}

) 
}