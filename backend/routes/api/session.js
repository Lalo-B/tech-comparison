// backend/routes/api/session.js
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];


router.get('/', (req, res) => {
    const { user } = req;
    if (user) {
        const safeUser = {
            id: user.id,
            firstName: curr.firstName,
            lastName: curr.lastName,
            email: user.email,
            username: user.username,
        };
        return res.json({
            user: safeUser
        });
    } else return res.json({ user: null });
}
);

router.post('/', validateLogin, async (req, res, next) => {
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
        firstName: curr.firstName,
        lastName: curr.lastName,
        email: curr.email,
        username: curr.username

    };

    await setTokenCookie(res, safeUser);
    return res.json({
        user: safeUser
    });
});

router.delete(
    '/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);



module.exports = router;
