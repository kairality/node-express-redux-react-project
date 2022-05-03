const express = require("express");
const router = express.Router({ mergeParams: true });
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

//db imports
const { Song, User, SongComment } = require("../../db/models");

//auth imports
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const { songId } = req.params;
    const song = await Song.findByPk(songId, {
      include: [{ model: User, as: "usersCommented" }, { model: SongComment }],
    });
    const { SongComment: songComments, usersCommented } = song;
    return res.json({
      songComments: song.SongComments,
      usersCommented: song.usersCommented,
    });
  })
);

router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    const { userId, songId, songTimestamp, body } = req.body;
    try {
      const comment = await SongComment.create({
        userId,
        songId,
        body,
        songTimestamp,
      });
      const { id } = comment;
      console.log(id);
      const fetchedComment = await Song.findByPk(id, {
        include: [{ model: User, attributes: ["username"] }],
      });
      return res.json({
        fetchedComment,
      });
    } catch (e) {
      next(e);
    }
  })
);

router.delete(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const comment = await SongComment.findByPk(id);
    if (!comment) {
      const err = new Error("Comment not found error");
      next(err);
    } else {
      await comment.destroy();
      res.status(204).end();
    }
  })
);

module.exports = router;
