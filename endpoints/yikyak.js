'use strict';



function YikYak() {
	this.url = 'http://162.243.4.193/get'
}


YikYak.prototype.fire = function (config, callback) {


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
		return callback(null, JSON.parse(xmlhttp.response))


	}.bind(this)


	xmlhttp.open('GET', this.url + '/' + config.lat + '/' + config.long, true);
	xmlhttp.send();
};

YikYak.prototype.go = function (callback) {
	if (!navigator.geolocation) {
		return callback('need chrome')
	};

	//get locations
	navigator.geolocation.getCurrentPosition(function (position) {

		//get yik yak data
		this.fire({
			lat: position.coords.latitude,
			long: position.coords.longitude
		}, function (err, results) {


			//now convert to everbright schema
			results.forEach(function (post) {
				post.title = post.message

				// post.location_coordinates = [{
				// 	"latitude": post.latitude,
				// 	"longitude": post.longitude
				// }]

				post.comment_count = post.comments


				if (!post.location_coordinates) {
					post.location_coordinates = [{
						"latitude": 39.955 + (Math.random() * .009 - .004),
						"longitude": -75.19 + (Math.random() * .009 - .004)
					}]
				};

			}.bind(this))


			callback(null, results)


		}.bind(this))
	}.bind(this));


};


var instance = new YikYak();

window.yikYak = instance



instance.go(function (err, response) {
	console.log(err, response);
}.bind(this))

$(function () {
	setSchemas(['yikYak']);
}.bind(this))