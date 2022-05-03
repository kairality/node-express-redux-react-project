const express = require("express");
const router = express.Router({ mergeParams: true });
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

//db imports
const { Song, User } = require("../../db/models");
const commentsRouter = require("./comments");

//auth imports
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const {
  singleMulterUpload,
  singlePublicFileUpload,
  deleteSingleFile,
} = require("../../awsS3");

router.use("/:songId(\\d+)/comments", commentsRouter);


router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const song = await Song.findByPk(id, {
      include: [{ model: User, attributes: ["username"] }],
    });
    if (!song) {
      const err = new Error("Song not found error");
      next(err);
    } else {
      res.json(song);
    }
  })
);

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const songs = await Song.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });
    return res.json(songs);
  })
);

router.patch(
  "/:id(\\d+)",
  singleMulterUpload("imgFile"),
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { title, public, imgSrc } = req.body;
    const song = await Song.findByPk(id);
    if (!song) {
      const err = new Error("Song not found error");
      next(err);
    } else {
      const update = { ...song, title, public };
      try {
        if (req.file) {
          const imgSrc = await singlePublicFileUpload(req.file);
          update.imgSrc = imgSrc;
        }
        const updatedSong = await song.update(update);
        const fetchedSong = await Song.findByPk(id, {
          include: [{ model: User, attributes: ["username"] }],
        });
        return res.json(fetchedSong);
      } catch (e) {
        next(e);
      }
    }
  })
);

router.delete(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const song = await Song.findByPk(id);
    if (!song) {
      const err = new Error("Song not found error");
      next(err);
    } else {
      const key = song.src;
      await Promise.all([deleteSingleFile(key), song.destroy()]);
      res.status(204).end();
    }
  })
);

router.post(
  "/",
  singleMulterUpload("file"),
  asyncHandler(async (req, res, next) => {
    const { userId, title, public } = req.body;
    const src = await singlePublicFileUpload(req.file);
    try {
      const song = await Song.create({ userId, title, src, public });
      const songId = song.id;
      const fetchedSong = await Song.findByPk(songId, {
        include: [{ model: User, attributes: ["username"] }],
      });
      return res.json(fetchedSong);
    } catch (e) {
      next(e);
    }
  })
);

module.exports = router;
