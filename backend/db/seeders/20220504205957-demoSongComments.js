"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    return queryInterface.bulkInsert(
      "SongComments",
      [
        {
          userId: 4,
          songId: 1,
          body: "Hello, I'm Soken. Thanks for listening!",
          songTimestamp: 0,
        },
        {
          userId: 2,
          songId: 1,
          body: "Wow listen to those sitars!",
          songTimestamp: 5,
        },
        {
          userId: 1,
          songId: 1,
          body: "I like this vocalist!",
          songTimestamp: 13,
        },
        {
          userId: 2,
          songId: 1,
          body: "Da dun DUN DUN!!!!",
          songTimestamp: 37,
        },
        {
          userId: 3,
          songId: 1,
          body: "Omg the modulation!! ❤️",
          songTimestamp: 41,
        },
        {
          userId: 1,
          songId: 1,
          body: "Wow major key now!",
          songTimestamp: 54,
        },
        {
          userId: 2,
          songId: 1,
          body: "Omg!!!! 😱 😱 😱 😱❤️❤️❤️",
          songTimestamp: 55,
        },
        {
          userId: 3,
          songId: 1,
          body: "whaaaaaaat 😱 ",
          songTimestamp: 55,
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "SongsComments",
      {
        songId: {
          [Op.in]: [1],
        },
      },
      {}
    );
  },
};
