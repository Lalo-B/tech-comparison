// backend/routes/api/index.js
const router = require('express').Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const sessionRouter = require('./session.js')
const usersRouter = require('./users.js')
//restore user needs to be before anything else
router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);


module.exports = router;
