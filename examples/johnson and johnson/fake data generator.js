var _ = require('lodash')

var a = {
	"id": "string",
	"createdDate": 0,
	"lastUpdatedDate": 0,
	"publishedDate": 0,
	"readingDate": "2016-01-24T02:22:16.768Z",
	"annotation": [
		"string"
	],
	"deviceType": "string",
	"deviceSerialNumber": "string",
	"edited": true,
	"editable": true,
	"manual": true,
	"exercise": {
		"value": 0,
		"units": "string"
	},
	"exerciseIntensity": "EXERCISE_INTENSITY_MILD"
}

var clones = []

for (var i = 0; i < 20; i++) {
	var clone = _.cloneDeep(a)

	clone.createdDate = new Date().getTime() - Math.random() * 60000 - 100000
	clone.lastUpdatedDate = new Date().getTime() - Math.random() * 60000
	clone.publishedDate = new Date().getTime() - Math.random() * 60000
	clone.annotation = [];

	clone.deviceType = "METERTYPES_ONETOUCHPING";
	clone.deviceSerialNumber = "03-25872-15"


	clone.id = Math.random() + ' ' + Math.random()

	clone.exercise = {
		value: parseInt(Math.random() * 5 + 1),
		units: 'hrs'
	}
	clones.push(clone)

}


console.log(JSON.stringify(clones));