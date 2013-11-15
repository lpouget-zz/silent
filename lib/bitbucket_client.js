var http = require("http");
var https = require("https");
var OAuth = require('oauth').OAuth;

function authorize () {
	consumer = new OAuth('https://bitbucket.org/!api/1.0/oauth/request_token',
                    'https://bitbucket.org/!api/1.0/oauth/access_token',
                    'PMqCFGVXvM2Q6yLerV',
                    'NdUdTE8WhREN4AJmf55jJ8JjHt9XQp9m',
                    '1.0',
                    function () {
						console.log('==>Callback');
					},
                    'HMAC-SHA1');

	http.createServer(function (req, res) {
		console.log('==>Callback');
		res.writeHead(200, {'Content-Type': 'text/plain'});
	}).listen(9090, '0.0.0.0');

	// Get the request token                    
	consumer.getOAuthRequestToken(function(err, oauth_token, oauth_token_secret, results ){
	    console.log('==>Get the request token');
	    console.log(arguments);

	    // Get the authorized access_token with the un-authorized one.
		consumer.getOAuthAccessToken(arguments[1], arguments[2], function (err, oauth_token, oauth_token_secret, results){
			console.log('==>Get the access token');
			console.log(arguments);
		});

		http.close();
	});


	

	return true;
}



function repositories (accountname, callback) {
	https.get('https://bitbucket.org/api/2.0/' + accountname, function(res) {
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');

		res.on('data', function (chunk) {
			console.log('BODY: ' + chunk);
		});

		res.on('end', callback);
	}).on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});

	return true;
}

function changesets (repository,callback) {
	https.get('https://bitbucket.org/api/1.0/repositories/carboatmedia/' + repository + '/changesets?limit=1', function(res) {
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');

		res.on('data', function (chunk) {
			console.log('BODY: ' + chunk);
		});
		res.on("end",callback);
	}).on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});

	return true;
}

var client = {
	authorize: authorize,
	changesets: changesets
};

module.exports = client;