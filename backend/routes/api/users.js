const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

//db imports
const { User } = require("../../db/models");

//auth imports
const { setTokenCookie, requireAuth } = require("../../utils/auth");

// post /api/users/ ---> signup
router.post(
  '/',
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
