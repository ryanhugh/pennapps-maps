'use strict';

function Johnson() {

}


Johnson.prototype.request = function (config, callback) {


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

	if (config.headers) {
		for (var attrName in config.headers) {
			xmlhttp.setRequestHeader(attrName, config.headers[attrName])

		}
	};

	xmlhttp.open('GET', config.url, true);
	xmlhttp.send();

};


Johnson.prototype.fire = function (callback) {

	this.request({
		url: 'https://jnj-dev.apigee.net/otr/v1/patient/-/healthdata/search?type=bloodGlucose,food&startDate=2010-10-26T00%3A00%3A00&endDate=2017-01-24T00%3A00%3A00&limit=2000',
		headers: {
			'Authorization': 'Bearer TxTLwxaAmKAGyAGEqjbUOBUPiWlm'
		}
	}, callback)


};


Johnson.prototype.go = function (callback) {
	this.fire(function (err, response) {
		if (err) {
			return callback(err)
		}

		response = response.bloodGlucose;

		//loop through responce and create location data

		response.forEach(function (item) {
			if (!item.location_coordinates) {
				item.location_coordinates = [{
					"latitude": 39.955 + (Math.random() * .008 - .004),
					"longitude": -75.19 + (Math.random() * .008 - .004)
				}]
			};

			if (!item.attributes) {
				item.attributes = {}
			};


			if (item.bgValue.value > 70 && item.bgValue.value < 140) {
				item.title = 'Good level'
			}
			else {
				item.title = 'Bad level'
			}

			if (item.mealTag) {
				item.location_name = 'Before food'
			}
			else {
				item.location_name = 'After food'
			}


			//coffee 
			var foods = ['coffee', 'crackers', 'candy', 'turkey', 'cheesecake', 'ice cream'];

			item.food = foods[parseInt(Math.random() * foods.length)]

			item.stepCount = Math.random() * 4000 + 1000



		}.bind(this))
		return callback(null, response)


	}.bind(this))
};



Johnson.prototype.average = function (callback) {
	this.fire(function (err, results) {
		if (err) {
			return callback(err)
		};
		var food = results.food;

		var days = {};

		food.forEach(function (aFood) {

			var day = new Date(aFood.createdDate).getDay();

			if (!days[day]) {
				days[day] = {
					count: 0,
					sum: 0
				}
			}

			days[day].count += 1;
			days[day].sum += aFood.carbohydrates.value;
		}.bind(this))

		for (var day in days) {
			days[day] = days[day].sum / days[day].count;
		}


		return callback(null, days)


	}.bind(this))
};


Johnson.prototype.mergedObjects = function (callback) {

	this.request({
		url: 'examples/johnson%20and%20johnson/data.js',
	}, function (err, results) {
		if (err) {
			return callback(err)
		};


		//now group the data by the jawns


		var output = [];
		for (var i = 0; i < 20; i++) {
			var newObj = {
				id: Math.random() + ' ' + Math.random()
			}

			//pull a random data
			var index = parseInt(results.bloodGlucose.length * Math.random())
			newObj.bloodGlucose = results.bloodGlucose[index].bgValue



			index = parseInt(results.food.length * Math.random())
			newObj.food = results.food[index].carbohydrates



			index = parseInt(results.exercise.length * Math.random())
			newObj.exercise = results.exercise[index].exercise



			index = parseInt(results.bolusInsulin.length * Math.random())
			newObj.bolusInsulin = results.bolusInsulin[index].bolusDelivered

			output.push(newObj)
		};
		return callback(null,output)


	}.bind(this))


};



var instance = new Johnson()

instance.mergedObjects(function (err, response) {
	console.log("err", err, response);
}.bind(this))



window.johnson = instance