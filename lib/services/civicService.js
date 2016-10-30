"use-strict";
var request = require('request'),
    zlib = require('zlib');

var GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || '';
var googleURI = 'https://www.googleapis.com/civicinfo/v2/';
var internals = {};

// Make a call to Google API
internals.makeRequest = function(path, address, req, res) {
	var headers = {
		"Accept-Encoding": "gzip",
		"User-Agent": "fifty-states (gzip)"
	};
	var fieldStr = (path === 'representatives') ? "&field=offices,officials": "&electionId=4100";
	var options = {
		url: googleURI + path + '?key=' + GOOGLE_API_KEY + '&address=' + address + fieldsStr,
        headers: headers,
        encoding: null
	};

	request.get(options, function(error, response, body) {
		if (error) res.status(400).end();
		else {

			var encoding = response.headers['content-encoding'];
			if(encoding === 'gszip') {
				zlib.gunzip(body, function(err, dezipped) {
					var json_string = dezipped.toString('utf-8');
					var info = JSON.parse(json_string);
                    console.log(info);

                    if (info.error) {
                        // Debug data if Google isn't accessible from localhost
                        if (info.error && info.error.code === 403 && req.headers.origin === 'http://localhost:9901') {
                            return res.json(require('./faker'));
                        }
                        res.status(info.error.code).json(info);
                    }
                    else {
                        if (path === 'representatives') info = internals.combineRepInfo(info);
                        res.status(200).json(info);
                    }

				});

			} else {
				var info = JSON.parse(body);
                if (info.error) res.status(info.error.code).json(info);
                else {
                    if (path === 'representatives') info = internals.combineRepInfo(info);
                    res.status(200).json(info);
                }
            }

        }
    });
};

//This function combines the offices and officials arrays that are returned from google.
internals.combineRepInfo = function(jsonObj) {
    officials = jsonObj.officials;
    offices = jsonObj.offices;

    for (var i = 0, len = officials.length; i < len; i++) {
        for (var j = 0, len2 = offices.length; j < len2; j++) {
            if (offices[j].officialIndices.indexOf(i) !== -1) {
                var officeObj = {};
                for (var key in offices[j]) {
                    if (key !== 'officialIndices')
                        officeObj[key] = offices[j][key];
                }
                officials[i].office = officeObj;
                break;
            }
        }
    }
    return officials;
};

//This is the API for the civicService
module.exports = {
    getReps: function(req, res) {
        var path = 'representatives';
        var address = req.body.address;
        internals.makeRequest(path, address, req, res);
    },
    getVoterInfo: function(req, res) {
        var path = 'voterinfo';
        var address = req.body.address;
        internals.makeRequest(path, address, req, res);
    }
};
