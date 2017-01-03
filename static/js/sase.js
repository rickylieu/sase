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
		//Overwrite contents to append events
		$("#week_ctns").empty();
		$("#week_title").empty();
		//Append event
		$("#week_title").append(week);
		$("#week_ctns").append('<tr><td>Week is:' + week + '</tr></td>');

		$.post("weeks", { 
          "week": week,
        }, function(data) {console.log("success!")} );  

	}

	else {
		return;
	}


}