// backend/routes/api/session.js
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');

const router = express.Router();

router.post('/', async (req, res, next) => {
    const { credential, password } = req.body;

    const curr = await User.unscoped().findOne({
        where: {
            [Op.or]: {
                username: credential,
                email: credential
            }
        }
    });

    //if no user or incorrect credentials
    if (!curr || !bcrypt.compareSync(password, curr.hashedPassword.toString())) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed'
        err.errors = { credential: "The provided credentials were invalid" };
        return next(err);
    }

    const safeUser = {
        id: curr.id,
        email: curr.email,
        username: curr.username

    };

    await setTokenCookie(res, safeUser);
    return res.json({
        user: safeUser
    });
});

module.exports = router;
