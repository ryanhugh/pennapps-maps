'use strict';

var baseUrl = ''

function EveryBlock () {
	var theData;
	var theData2;
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
		// getCityForZip(currentZIP,function (cityname) {
			var cityname = 'chicago';
			jsonp_request(getAPIURL('content/'+cityname+'/topnews'),callback);
		// });
	}

	function scanBySchemas (schema,callback) {
		getCityForZip(currentZIP,function (cityname) {
			jsonp_request(getAPIURL('content/'+cityname+'/topnews')+'&schema='+schema.join('&schema='),function (data) {
				var results = data.results;
				var filtered = [];

				console.log(results)

				for (var i = 0; i < results.length; i++) {
					if (schema.indexOf(results[i].schema) > -1) {
						filtered.push(results[i]);
					}
				};

				callback(filtered);
			});
		});
	}

	function scanEventsBySchemas (schema,callback) {
		getCityForZip(currentZIP,function (cityname) {
			var url;
			if (schema[0] == 'events'){
				url = getAPIURL('content/'+cityname+'/locations/'+currentZIP+'/timeline/events');
			} else {
				url = getAPIURL('content/'+cityname+'/locations/'+currentZIP+'/timeline');
			}
			// url = getAPIURL('content/'+cityname+'/topnews')+((schema == null)? '' : '&schema='+schema.join('&schema='));
			// url = getAPIURL('content/'+cityname+'/locations/'+currentZIP+'/timeline/events')+((schema == null)? '' : '&schema='+schema.join('&schema='));
			jsonp_request(url,function (data) {
				var results = data.results;
				var filtered = [];

				console.log(results)

				for (var i = 0; i < results.length; i++) {
						console.log(results[i],theData[i],theData2[i])
					// if (schema == null || schema.indexOf(results[i].schema) > -1) {
						if (!theData[i]) continue;
						if (schema.indexOf('meetups') > -1) {
							results[i].title = theData2[i].title;
							results[i].url = theData2[i].url;
							results[i].time = theData2[i].time;
							filtered.push(results[i]);
						} else {
							results[i].title = theData[i].title;
							results[i].url = theData[i].url;
							filtered.push(results[i]);
						}
					// }
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

	function getZIPForCoordinates (lat,lon,callback) {
		jsonp_request("http://api.geonames.org/findNearbyPostalCodesJSON?lat="+lat+"&lng="+lon+"&username=apunjabi",function (data) {
			var results = data.postalCodes;
			var minDist = 10000000000, index = 0;
			for (var i = 0; i < results.length; i++) {
				var dist = parseFloat(results[i].distance);
				if (dist < minDist) {
					minDist = dist;
					index = i;
				}
			};

			callback(results[index].postalCode);

		});
	}

	function searchByName (name,callback) {
		scanNews(function (data) {
			console.log("searchByName")
			var results = data.results;
			var searched = [];
			for (var i = 0; i < results.length; i++) {
				if ((results[i].title.indexOf(name) > -1) || (results[i].schema.indexOf(name) > -1)) {
					searched.push(results[i]);
				}
			};
			callback(searched);
		});
	}

	function getLatLonFromZIP (zip,callback) {
		jsonp_request("http://maps.googleapis.com/maps/api/geocode/json?address="+zip,function (data) {
			var results = data.results;
			callback(results[0].geometry.location);
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
		},
		scanEventsBySchemas:function (zip,schema,callback) {
			currentZIP = zip;
			scanEventsBySchemas(schema,callback)
		},
		zipFromLatLon:function (lat,lon,callback) {
			getZIPForCoordinates(lat,lon,callback);
		},
		latLonFromZIP:function (zip,callback) {
			getLatLonFromZIP(zip,callback);
		},
		searchByName:function (name,callback) {
			searchByName(name,callback);
		},
		loadStories:function (data) {
			theData = data;
		},
		loadStories2:function (data) {
			theData2 = data;
		}
	};


}


// EveryBlock().scanEvents("02117",function (d) {
// 	console.log("events",d);
// });

// EveryBlock().scanTimeline("02117",function (d) {
// 	console.log("timeline",d);
// });

// EveryBlock().scanNews("02117",function (d) {
// 	console.log("news",d);
// });

// EveryBlock().scanBySchemas("02117",["meetups"],function (d) {
// 	console.log("schema",d);
// });

// EveryBlock().zipFromLatLon


window.EveryBlock = new EveryBlock();