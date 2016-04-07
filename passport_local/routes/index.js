var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var title = req.query.title;
  res.render('index', { title: title });
});

module.exports = router;
