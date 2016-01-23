'use strict';




function YikYak () {
	this.url = "https://www.yikyak.com/api/proxy/v1/messages/all/hot?userLat=39.9523077&userLong=-75.1908598&lat=39.9523077&long=-75.1908598&myHerd=0"
}


YikYak.prototype.go = function(callback) {
	

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		

		if (xmlhttp.readyState != XMLHttpRequest.DONE) {
			return;
		}
		if (xmlhttp.status != 200) {

			var err;
			if (xmlhttp.statusText) {
				err = xmlhttp.statusText;
			}
			else if (xmlhttp.response) {
				err = xmlhttp.response;
			}
			else {
				err = 'unknown ajax error'
			}

			console.log('error, bad code recievied', xmlhttp.status, err)

			return callback(err)
		}
		return callback(null,JSON.parse(xmlhttp.response))


	}.bind(this)


	xmlhttp.open('GET', this.url, true);
	xmlhttp.setRequestHeader("Content-type", "application/json");
	xmlhttp.setRequestHeader("Cookie", "__cfduid=d3fb9b141296d5a45bb7d73a63093ae421453516215; _ga=GA1.2.64498310.1453516244; yid=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOiI0MDQyN0REMUYyRERDOUY5RkFFOEEzQkE2QkUxNzEzNCIsImlhdCI6MTQ1MzUyMzc2NCwiZXhwIjoxNDUzNTI1NTY0LCJpc3MiOiJ5aWt5YWsuY29tIiwic3ViIjoic3BpZGVyeWFrIn0.paXes4SRRydt1po1JJN_V8nYxSVcZv0tTgoABdlbDek; rm=true; amplitude_idyikyak.com=eyJkZXZpY2VJZCI6IjZkMTBkOGVhLWM4YjEtNDMxZS1iMDFiLWI3MTgyODY1MDliNCIsInVzZXJJZCI6IjIxRTcyMDE0OThFMDMxMUIzMUJEMEE0QTUwODNBRTMxIiwib3B0T3V0IjpmYWxzZX0=; __cfduid=d3fb9b141296d5a45bb7d73a63093ae421453516215; _ga=GA1.2.64498310.1453516244; yid=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOiI0MDQyN0REMUYyRERDOUY5RkFFOEEzQkE2QkUxNzEzNCIsImlhdCI6MTQ1MzUyNTU2OCwiZXhwIjoxNDUzNTI3MzY4LCJpc3MiOiJ5aWt5YWsuY29tIiwic3ViIjoic3BpZGVyeWFrIn0.2goVfGoVDbv49yP9LFJK-yfrj94bn9sUgTKZJUOSRtY; rm=true; amplitude_idyikyak.com=eyJkZXZpY2VJZCI6IjZkMTBkOGVhLWM4YjEtNDMxZS1iMDFiLWI3MTgyODY1MDliNCIsInVzZXJJZCI6IjIxRTcyMDE0OThFMDMxMUIzMUJEMEE0QTUwODNBRTMxIiwib3B0T3V0IjpmYWxzZX0=");
	xmlhttp.setRequestHeader("x-access-token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOiI0MDQyN0REMUYyRERDOUY5RkFFOEEzQkE2QkUxNzEzNCIsImlhdCI6MTQ1MzUyNTU2OCwiZXhwIjoxNDUzNTI3MzY4LCJpc3MiOiJ5aWt5YWsuY29tIiwic3ViIjoic3BpZGVyeWFrIn0.2goVfGoVDbv49yP9LFJK-yfrj94bn9sUgTKZJUOSRtY");
	xmlhttp.send(JSON.stringify(body));
};

var instance = new YikYak();

window.yikYak = instance



instance.go(function (err,response) {
	console.log(err,response);
}.bind(this))