'use strict';


function ZipPopup() {



	$(function () {

		this.zipCodeTextBox = document.getElementById('zipCodeTextBoxId')
	}.bind(this))

}



ZipPopup.prototype.go = function () {
	console.log('User entered:',this.zipCodeTextBox.value);

$('#myModal').modal('toggle')

};


window.zipPopup = new ZipPopup();