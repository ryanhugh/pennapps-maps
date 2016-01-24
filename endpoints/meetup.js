'use strict';

function Meetup () {
	
}



Meetup.prototype.go = function(callback) {
	request({
		url:'https://api.meetup.com/find/groups?photo-host=public&page=20&sig_id=198542328&sig=80314f4d211ca1c12a36302aa6f3749d399e8460'
	},function (err, results) {
		callback(err, results)
	}.bind(this))




};

var instance = new Meetup()


window.meetup = instance;