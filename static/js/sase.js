'use strict';
// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

function initializePage() {
	$(".btn").click(weekClick);
	lastChanged();

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
		      
		       	var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

today = mm+'/'+dd+'/'+yyyy;
console.log(today);

              
              //Append to modal html
		      $(day_id).append(color_div + "</br><b>Event: </b>" + data[i].name + "</br>"
		      //  + "<b>Type of Event: </b>" + data[i].type + "</br>"
		        + "<b>Start time: </b>" + data[i].start + "</br>"
		        + "<b>End time: </b>" + data[i].end + "</br>"
		        + "<b>Location: </b>" + data[i].location + "</br>"
		        + "<b>Comments: </b>" + data[i].comments + "</div></br>"
		       );


             //$(day_id).css('background', 'rgb(255,220,200)');

             }


		   });

	}

	else {
		return;
	}
}

//Create time stamp for events
function lastChanged() {
	var i = 0;
	$.get("changed", function(events) {
	  $("#updated").empty();
	  $("#updated").append("</br>");


	  for(i = 0; i < events.length; i++) {	
	    var timestamp = events[i]._id.toString().substring(0,8);
	    var date = new Date( parseInt( timestamp, 16 ) * 1000 )
	    date = date.toString().substring(0,10); 
	    var week = events[i].week;
	    var event = events[i].name;
	    console.log(date);
	    $("#updated").append("<b>" + date + ": " + "Added " + event + " in Week " + week + "</b></br>");
	  }
    });
}

