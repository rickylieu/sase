'use strict';
// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

function initializePage() {
	$(".btn").click(weekClick);
	
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
        	$("#week_ctns").empty();
		    $("#week_title").empty();
		    $("#Mon").empty();
		    $("#Tue").empty();
		    $("#Wed").empty();
		    $("#Thu").empty();
		    $("#Fri").empty();
		    $("#Sat").empty();
		    $("#Sun").empty();


		    //Append event
	     	$("#week_title").append(week);


	     	//Append everything besides week to modal body
	        for(i=0; i < data.length; i++) {
              
              //Finds the day of the week  
              var d = new Date(data[i].date);
		      d.setHours(24);
		      var day = d.toDateString().substring(0,3);
		      console.log(day);
		      var day_id = "#" + day;
		      console.log(day_id);
		      var day_head = "#" + day + "_head";
		      $(day_head).empty();
		      $(day_head).append(day + " " + data[i].date.substring(5,10));

              
              //Append to modal html
		      $(day_id).append("</br><b>Event: </b>" + data[i].name + "</br>"
		        + "<b>Type of Event: </b>" + data[i].type + "</br>"
		        + "<b>Date: </b>" + data[i].date + "</br>" 
		        + "<b>Start time: </b>" + data[i].start + "</br>"
		        + "<b>End time: </b>" + data[i].end + "</br>"
		        + "<b>Location: </b>" + data[i].location + "</br>"
		       );
             }


		   });

	}

	else {
		return;
	}


}