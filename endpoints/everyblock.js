'use strict';

var baseUrl = ''

function EveryBlock () {

	var currentZIP;
	var currentCity;
	function scanTimeline (callback) {
		getCityForZip(currentZIP,function (cityname) {

			callForLocation(cityname,currentZIP,function (data) {
				

				callback(data);


			});
		});
	}

	function scanEvents(callback) {
		getCityForZip(currentZIP,function (cityname) {
			jsonp_request(getAPIURL('content/'+cityname+'/locations/'+currentZIP+'/timeline'),callback);
		});
	}

	function scanNews (callback) {
		getCityForZip(currentZIP,function (cityname) {
			jsonp_request(getAPIURL('content/'+cityname+'/topnews/events'),callback);
		});
	}

	function scanBySchemas (schema,callback) {
		getCityForZip(currentZIP,function (cityname) {
			jsonp_request(getAPIURL('content/'+cityname+'/locations/'+currentZIP+'/timeline/events'),function (data) {
				var results = data.results;
				var filtered = [];

				for (var i = 0; i < results.length; i++) {
					if (schema.indexOf(results[i].schema) > -1) {
						filtered.push(results[i]);
					}
				};

				callback(filtered);
			});
		});
	}

	function Location (argument) {
		// body...
	}

	// path =  content/philly/zipcodes
	function getAPIURL (path) {
		return 'https://api.everyblock.com/'+path+'/.json?token=818111003c3b49716d369cf290958441685e34c9';
	}

	function callForLocation (cityName,zip,callback) {
		var url = getAPIURL('content/'+cityName.toLowerCase()+'/locations/'+zip+'/timeline');
		console.log(url)
		jsonp_request(url,function (data) {
			console.log(data,'for',url)
			callback(data);
		});

	}

	function getCityForZip (zip, callback) {
		if (currentCity) callback(currentCity);
		var isDone = false;
		jsonp_request(getAPIURL('content'),function (data) {
			data.forEach(function (item,index) {
				var cityname = item.short_name;
			
				var url = getAPIURL('content/'+cityname+'/zipcodes');
				

				jsonp_request(url,function(zipdata){

					if (!zipdata) return;
					var city = parseURL(zipdata[0].url).hostname.split(".")[0];

					
					for (var j = 0; j < zipdata.length; j++) {
						if (zipdata[j].name == zip) {
							
							callback(city);
							currentCity = cityname;
							isDone = true;
							return;
						}
					};
				})

			});
		});
	}

	function parseURL(urlString) {
		var parser = document.createElement('a');
		parser.href = urlString;
		var obj = {
			protocol:parser.protocol, 		// => "http:"
			hostname:parser.hostname, 		// => "example.com"
			port:parser.port, 			    // => "3000"
			pathname:parser.pathname, 		// => "/pathname/"
			search:parser.search, 			// => "?search=test"
			hash:parser.hash, 			    // => "#hash"
			host:parser.host 			    // => "example.com:3000"
		};
		return obj;
	}

	return {
		scanEvents:function (zip,callback) {
			currentZIP = zip;
			scanEvents(callback);
		},
		scanTimeline:function (zip,callback) {
			currentZIP = zip;
			scanTimeline(callback);
		},
		scanNews:function (zip,callback) {
			currentZIP = zip;
			scanNews(callback);
		},
		scanBySchemas:function (zip,schema,callback) {
			currentZIP = zip;
			scanBySchemas(schema,callback)
		}
	};


}


EveryBlock().scanEvents("02117",function (d) {
	console.log("events",d);
});

EveryBlock().scanTimeline("02117",function (d) {
	console.log("timeline",d);
});

EveryBlock().scanNews("02117",function (d) {
	console.log("news",d);
});

EveryBlock().scanBySchemas("02117",["meetups"],function (d) {
	console.log("schema",d);
});



window.EveryBlock = new EveryBlock();