'use strict';
var express = require('express');
var request = require('request');


var app = express();


var cookie = '__cfduid=d3fb9b141296d5a45bb7d73a63093ae421453516215; _ga=GA1.2.64498310.1453516244; yid=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOiI0MDQyN0REMUYyRERDOUY5RkFFOEEzQkE2QkUxNzEzNCIsImlhdCI6MTQ1MzUyOTE3NSwiZXhwIjoxNDUzNTMwOTc1LCJpc3MiOiJ5aWt5YWsuY29tIiwic3ViIjoic3BpZGVyeWFrIn0.maIZeXQvK_jfwGFhomBf6rDknm4zQEIIQrgxzPO3WR8; rm=true; amplitude_idyikyak.com=eyJkZXZpY2VJZCI6IjZkMTBkOGVhLWM4YjEtNDMxZS1iMDFiLWI3MTgyODY1MDliNCIsInVzZXJJZCI6IjIxRTcyMDE0OThFMDMxMUIzMUJEMEE0QTUwODNBRTMxIiwib3B0T3V0IjpmYWxzZX0='
var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOiI0MDQyN0REMUYyRERDOUY5RkFFOEEzQkE2QkUxNzEzNCIsImlhdCI6MTQ1MzUyOTE3NSwiZXhwIjoxNDUzNTMwOTc1LCJpc3MiOiJ5aWt5YWsuY29tIiwic3ViIjoic3BpZGVyeWFrIn0.maIZeXQvK_jfwGFhomBf6rDknm4zQEIIQrgxzPO3WR8'

function go(callback) {

	request({
		url: 'https://www.yikyak.com/api/proxy/v1/messages/all/hot?userLat=39.9523077&userLong=-75.1908598&lat=39.9523077&long=-75.1908598&myHerd=0',
		headers: {
			'x-access-token': token,
			'Referer': 'https://www.yikyak.com/nearby/hot',
			'Cookie': cookie
		}
	}, callback)
}


app.get("/get", function (req, res, next) {

	go(function (err, results) {
		if (err) {
			console.log("ERROR",err);
		};

		res.setHeader("Access-Control-Allow-Origin", "*");

		res.send(JSON.parse(results.body))
	}.bind(this))
});


app.listen(80);