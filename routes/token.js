var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var express = require('express');
var router = express.Router();

// route middleware to verify a token
router.use(function(req, res, next) {

	if ((req.method === 'POST' && req.path !== '/authen') ||
		req.method === 'PUT' || req.method === 'DELETE') {
		// check header or url parameters or post parameters for token
		var token = req.body.token || req.query.token || req.headers['x-access-token'];

		// decode token
		if (token) {

			// verifies secret and checks exp
			jwt.verify(token, req.app.get('superSecret'), function(err, decoded) {      
				if (err) {
					return res.json({ success: false, message: 'Failed to authenticate token.' });    
				} else {
					// if everything is good, save to request for use in other routes
					req.decoded = decoded;    
					next();
				}
			});

		} else {

			// if there is no token
			// return an error
			return res.status(403).send({ 
					success: false, 
					message: 'No token provided.' 
			});

		}
	} else {
		next();
	}
});

module.exports = router;
