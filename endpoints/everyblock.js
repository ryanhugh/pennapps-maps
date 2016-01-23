'use strict';

var baseUrl = ''

function EveryBlock () {

	var currentZIP;
	function scanLocation (callback) {
		getCityForZip(currentZIP,function (cityname) {
			callForLocation(cityname,currentZIP,function (data) {
				

				callback(data);


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
		scanLocation:function (zip,callback) {
			currentZIP = zip;
			scanLocation(callback);
		}
	};


}


EveryBlock().scanLocation("02117",function (d) {
	console.log("result",d);
});




window.EveryBlock = new EveryBlock();