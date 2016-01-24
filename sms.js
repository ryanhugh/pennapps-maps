'use strict';

function Twilio () {
	return {
		sendMessage:function(to,msg){
			req("https://pennapps13-anthonytopper.c9users.io/alert_user/"+to+"/"+msg);
			function req (url) {
				var script = document.createElement("script");
				script.src = url;
				document.getElementsByTagName('head')[0].appendChild(script);
			}
		}
	}
}

window.Twilio = new Twilio();