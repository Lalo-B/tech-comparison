// backend/routes/api/index.js
const router = require('express').Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');
//restore user needs to be before anything else
router.use(restoreUser);


module.exports = router;
