'use strict';

function Twilio () {
	return {
		sendMessage:function(to,msg){
			jsonp_request("https://pennapps13-anthonytopper.c9users.io/alert_user/"+to+"/"+msg);
		}
	}
}

window.Twilio = new Twilio();