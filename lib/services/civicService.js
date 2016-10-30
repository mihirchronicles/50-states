"use-strict";
var request = require('request'),
    zlib = require('zlib');

var GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || 'key';
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



