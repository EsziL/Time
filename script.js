function updateTime() {
	time = getTime(getMilitary());
	document.querySelector(".time").innerHTML = time;
  }
function getMilitary() {
	return document.querySelector(".military").state;
}
function getTime(military) {
	var date = new Date();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	var ampm = hours >= 12 ? 'PM' : 'AM';
	
	// convert hours to 12-hour format
	if (military) {
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
	}
	
	// add leading zero to minutes and seconds
	minutes = minutes < 10 ? '0' + minutes : minutes;
	seconds = seconds < 10 ? '0' + seconds : seconds;
	
	// display time in AM/PM format
	if (military) {
		return hours + ':' + minutes + ':' + seconds + ' ' + ampm;
	} else {
		return hours + ":" + minutes + ":" + seconds;
	}
}

setInterval(updateTime, 10);