const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

//db imports
const { User } = require("../../db/models");

//auth imports
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");

const validateEmail =  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.');

const validateUsername = check("username")
  .exists({ checkFalsy: true })
  .isLength({ min: 4 })
  .withMessage("Please provide a username with at least 4 characters.");

const validateUsernameNotEmail =   check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.');

const validatePassword = check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.');

const validateSignup = [
    validateEmail,
    validateUsername,
    validateUsernameNotEmail,
    validatePassword,
    handleValidationErrors,
];



// post /api/users/ ---> signup
router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user
    });
  })
);

module.exports = router;
