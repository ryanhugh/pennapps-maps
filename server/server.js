'use strict';
var express = require('express');
var request = require('request');


var app = express();


var cookie = '__cfduid=d3fb9b141296d5a45bb7d73a63093ae421453516215; _ga=GA1.2.64498310.1453516244; yid=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOiI0MDQyN0REMUYyRERDOUY5RkFFOEEzQkE2QkUxNzEzNCIsImlhdCI6MTQ1MzUyOTE3NSwiZXhwIjoxNDUzNTMwOTc1LCJpc3MiOiJ5aWt5YWsuY29tIiwic3ViIjoic3BpZGVyeWFrIn0.maIZeXQvK_jfwGFhomBf6rDknm4zQEIIQrgxzPO3WR8; rm=true; amplitude_idyikyak.com=eyJkZXZpY2VJZCI6IjZkMTBkOGVhLWM4YjEtNDMxZS1iMDFiLWI3MTgyODY1MDliNCIsInVzZXJJZCI6IjIxRTcyMDE0OThFMDMxMUIzMUJEMEE0QTUwODNBRTMxIiwib3B0T3V0IjpmYWxzZX0='
var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOiI0MDQyN0REMUYyRERDOUY5RkFFOEEzQkE2QkUxNzEzNCIsImlhdCI6MTQ1MzUyOTE3NSwiZXhwIjoxNDUzNTMwOTc1LCJpc3MiOiJ5aWt5YWsuY29tIiwic3ViIjoic3BpZGVyeWFrIn0.maIZeXQvK_jfwGFhomBf6rDknm4zQEIIQrgxzPO3WR8'

function getNewToken () {

	request.post({
		url: 'https://www.yikyak.com/api/auth/token/refresh',
		headers: {
			'x-access-token': token,
			'Referer': 'https://www.yikyak.com/nearby/hot',
			'Cookie': cookie
		}
	}, function (err, results) {
		if (err) {
			console.log("error",err);
			return;
		};
		
		console.log("new token!",err,results.body);
		token = JSON.parse(results.body)

	}.bind(this))

}

setInterval(getNewToken, 60000)
getNewToken();



function go(params, callback) {

	var url = 'https://www.yikyak.com/api/proxy/v1/messages/all/hot?userLat=' + params.lat + '&userLong=' + params.long + '&lat=' + params.lat + '&long=' + params.long + '&myHerd=0' 
	console.log("url",url);

	request({
		url: url,
		headers: {
			'x-access-token': token,
			'Referer': 'https://www.yikyak.com/nearby/hot',
			'Cookie': cookie
		}
	}, callback)
}


app.get("/get/:lat/:long", function (req, res, next) {

	console.log("here:",req.params);
	go(req.params, function (err, results) {
		if (err) {
			console.log("ERROR", err);
		};

		res.setHeader("Access-Control-Allow-Origin", "*");

		res.send(JSON.parse(results.body))
	}.bind(this))
});



app.use(express.static('.'));

app.listen(80);