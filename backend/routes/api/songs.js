const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

//db imports
const { Song } = require("../../db/models");

//auth imports
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { singleMulterUpload, singlePublicFileUpload, deleteSingleFile } = require("../../awsS3");

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const songs = await Song.findAll();
    return res.json(songs);
  })
);

router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const song = await Song.findByPk(id);
    if (!song) {
      const err = new Error("Song not found error");
      next(err);
    } else {
      res.json(song);
    }
  })
);

// router.patch(
//     ":/id(\\d+)",
//     asyncHandler(async (req, res, next) => {
//         const { id } = req.params;
//         const { title, public, imgSrc } = req.body;
//         const song = await Song.findByPk(id);
//         if (!song) {
//             const err = new Error("Song not found error");
//             next(err);
//         } else {
//             const updateSong = {...song, title, public };
//             await song.update(updateSong);
//         }
//     })
// )

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
            await Promise.all([
              deleteSingleFile(key),
              song.destroy(),
            ]);
            res.status(204).end();
        }
    }),
);

router.post(
  "/",
  singleMulterUpload("file"),
  asyncHandler(async (req, res, next) => {
    const { userId, title, public } = req.body;
    const src = await singlePublicFileUpload(req.file);
    const song = await Song.create({ userId, title, src, public });
    return res.json(song);
  })
);

module.exports = router;
