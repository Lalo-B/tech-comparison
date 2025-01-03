// backend/routes/index.js
const express = require('express');
const router = express.Router();

router.get('/hello/world', function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');  // res.send can be used for what?
});

module.exports = router;
