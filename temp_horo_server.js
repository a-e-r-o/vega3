// needs to install express

let express = require('express');
//let express = require('https');
let app = express();
let http = require('http');
let https = require('https');
let port = 8000

http.Server(app).listen(port, function () {
  console.log(`node server running on ${port}`);
});

app.get('*', (req, res) => {
	let path = req.path

	const options =  {
		host: 'www.evozen.fr',
		port: 443,
		path: req.path,
		rejectUnauthorized: false,
		requestCert: true,
		agent: false
	}
	
	var dataReq = https.get(options, dataRes => {
		var data = ''
    dataRes.on('data', function (chunk) {
      data += chunk
    })
    dataRes.on('end', function () {
			res.send(data)
    })
	}).on('error', error => {
		console.error(error)
	})
})
