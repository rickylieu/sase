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
        	$("#week_ctns").empty();
		    $("#week_title").empty();
		    //Append event
	     	$("#week_title").append(week);
	     	for(i=0; i < data.length; i++) {
		      $("#week_ctns").append('<div>' + '<tr><td>' + "<b>Event: </b>" + data[i].name + "</br>"
		        + "<b>Type of Event: </b>" + data[i].type + "</br>"
		        + "<b>Week: </b>" + data[i].week + "</br>"
		        + "<b>Date: </b>" + data[i].date + "</br>" + "</br>" + '</tr></td>');
             }  
		   });

	}

	else {
		return;
	}


}