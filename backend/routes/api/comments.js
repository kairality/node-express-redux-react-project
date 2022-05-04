const express = require("express");
const router = express.Router({ mergeParams: true });
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

//db imports
const { Song, User, SongComment } = require("../../db/models");

//auth imports
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");


// load a song with nested comments data -> will be used
// for super chill updating of Redux state.
const loadSongWithCommentData = async (songId) => {
  // return the new song comment state, NOT the comment itself.
  // this makes it super easy to reload the song data
  return await Song.findByPk(songId, {
    include: [
      { model: User, as: "usersCommented" },
      {
        model: SongComment,
        include: [{ model: User, attributes: ["username"] }],
      },
    ],
  });
}

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const { songId } = req.params;
    const song = await loadSongWithCommentData(songId);
    return res.json({
      songComments: song.SongComments,
      usersCommented: song.usersCommented,
    });
  })
);

router.post(
  "/",
  handleValidationErrors,
  asyncHandler(async (req, res, next) => {
    const { userId, songId, songTimestamp, body } = req.body;
    try {
      const comment = await SongComment.create({
        userId,
        songId,
        body,
        songTimestamp,
      });
      const song = await loadSongWithCommentData(songId);
      // return the new song comment state, NOT the comment itself.
      // this makes it super easy to reload the song data
      // and avoids having to make some messy calculations
      // on the frontend.
      return res.json({
        songComments: song.SongComments,
        usersCommented: song.usersCommented,
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
      // nuke the comment from orbit
      await comment.destroy();
      // reload the parent resource (song)
      const songId = comment.songId;
      const song = await loadSongWithCommentData(songId);
      // return the new song comment state, NOT the comment itself.
      // this makes it super easy to reload the song data
      // and avoids having to make some messy calculations
      // on the frontend.
      return res.json({
        songComments: song.SongComments,
        usersCommented: song.usersCommented,
      });
    }
  })
);

module.exports = router;
