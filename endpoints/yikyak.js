'use strict';




function YikYak () {
	this.url = 'http://162.243.4.193/get'
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
	xmlhttp.send();
};

var instance = new YikYak();

window.yikYak = instance



instance.go(function (err,response) {
	console.log(err,response);
}.bind(this))