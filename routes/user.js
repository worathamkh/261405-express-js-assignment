var express = require('express');
var router = express.Router();
var User   = require('../models/user');

// Show users
router.get('/', function(req, res, next) {
	User.find({}, function(err, users) {
    if (err) throw err;
    res.json(users);
  });
});

// Show specific user
router.get('/:id', function(req, res, next) {
	User.findOne({ id: req.params.id }, function(err, user) {
    if (err) throw err;
    res.json(user);
  });
});

// Add user
router.post('/', function(req, res, next) {
	// create new user
  var newbie = new User(req.body);

  // save new user
  newbie.save(function(err) {
    if (err) throw err;

    res.json({ success: true });
  });
});

// Edit specific user
router.put('/:id', function(req, res, next) {
  User.update({ id: req.params.id }, { $set: req.body }, function(err) {
    if (err) throw err;
    res.json({ success: true });
  });
});

// Remove specific user
router.delete('/:id', function(req, res, next) {
  User.remove({ id: req.params.id }, function(err) {
    if (err) throw err;
    res.json({ success: true });
  });
});

module.exports = router;
