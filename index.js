var express = require('express')
var bodyParser = require('body-parser');

var app = express();
var http = require('http').Server(app);

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

app.get('/knockout/', function (req, res) {
  res.sendFile(__dirname + '/knockout.html');
});

app.get('/angular/', function (req, res) {
  res.sendFile(__dirname + '/angular.html');
});

app.get('/getBillOfLadingByNumber/', function (req, res) {
	var bl = { blNumber : req.query.blNumber };

	if(req.query.blNumber == 1234) {
		bl = {
			blNumber : 1234,
			consignee : 'Hexacta',
			importer : 'MAERSK LINE'
		};
	}

	res.json(bl);
});

app.get('/getThirdPartyByCode/', function (req, res) {
	var thirdParty = {};
	
	if(req.query.code == 'Hexacta') {
		thirdParty.code = 'Hexacta';
		thirdParty.address = 'Clay 2954';
	}

	if(req.query.code == 'AllParty'){
		thirdParty.code = 'AllParty';
		thirdParty.address = 'Baez 2834';
	}

	res.json(thirdParty);
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});