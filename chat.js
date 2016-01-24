'use strict';

function Chat() {

	$(function () {
		this.container = document.getElementById('chatBoxId')

		this.container.setAttribute('style', "width: 300;position: fixed;left: 0;bottom: 0;height: 40px;z-index: 99999999;cursor:pointer;");

	}.bind(this))


	//ghetto angularjs
	request({
		url: 'chat.html'
	}, function (err, results) {
		this.container.innerHTML = results


		this.titleBar = document.getElementById('chatBoxTitleId')
		this.body = document.getElementById('chatBoxBodyId')
		this.chatBox = document.getElementById('chatTextBoxId')
		this.chatMessages = document.getElementById('chatJawnId')
		this.chatBox.onkeydown = this.onKeyPress.bind(this)


		this.titleBar.onclick = function () {
			this.toggleBox()
		}.bind(this)


	}.bind(this))


	this.userId = parseInt(Math.random() * 100)

	this.getChatUpdates();

	// this.updateInterval
}


Chat.prototype.addMsg = function (userId, value) {
	if (this.userId == userId) {
		this.chatMessages.innerHTML += '<span style="font-weight:bold;font-size: 14px;">You</span>:' + value + '<br>'
	}
	else {
		this.chatMessages.innerHTML += '<span style="font-weight:bold;font-size: 14px;">User ' + this.userId + '</span>:' + value + '<br>'
	}

	this.chatBox.scrollTop = this.chatBox.scrollHeight;

	var a = document.getElementById('chatJawnId')
	a.scrollTop = a.scrollHeight;
};



Chat.prototype.getChatUpdates = function () {
	request({
		url: 'https://pennapps13-anthonytopper.c9users.io/chat_get/' + this.userId
	}, function (err, msg) {
		if (err) {
			console.log("err", err);
		}
		else {
			this.addMsg(msg.userId, msg.msg)
		}


		this.getChatUpdates();
	}.bind(this))
};

Chat.prototype.sendMsg = function (msg) {
	request({
		url: 'https://pennapps13-anthonytopper.c9users.io/chat/' + this.userId + '/' + msg
	}, function (err, msg) {
		if (err) {
			console.log("err", err);
			return;
		}
	}.bind(this))
};

//toggle between 400px and 40px
Chat.prototype.toggleBox = function () {
	if (parseInt(this.container.style.height) < 50) {
		this.container.style.height = '400px'
		this.body.style.display = ''
		this.titleBar.innerHTML = 'Click to close'
	}
	else {
		this.titleBar.innerHTML = 'Click to chat!'
		this.body.style.display = 'none'
		this.container.style.height = '40px'
	}
};


Chat.prototype.onKeyPress = function (event) {
	if (event.which !== 13) {
		return;
	}

	var value = this.chatBox.value
	this.chatBox.value = ''
	this.sendMsg(JSON.stringify({
		msg: value,
		userId: this.userId
	}))

	this.addMsg(this.userId, value)


};


window.chat = new Chat()