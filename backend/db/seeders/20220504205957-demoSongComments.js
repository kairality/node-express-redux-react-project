"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    const cicada13fizz = {
          userId: 5,
          songId: 5,
          body: "Fizz",
        };
      const cicada17buzz = {
        userId: 6,
        songId: 5,
        body: "Buzz",
      };
    const cicadaComments = [];
    for(let i=1; i <= 707;  i++) {
      if (i % 13 === 0) {
        const comment = (i % 17)
          ?  {...cicada13fizz, songTimestamp: i}
          :  {...cicada13fizz, body: "FizzBuzz!", songTimestamp: i};
        cicadaComments.push(comment);
        if (i % 17 === 0) {
          cicadaComments.push({...cicada17buzz, body: "FizzBuzz!", songTimestamp: i})
        }
      } else if (i % 17 === 0) {
          cicadaComments.push({ ...cicada17buzz, songTimestamp: i });
      }
    }
    cicadaComments.forEach(comment => console.log(comment));
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
        ...cicadaComments,
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "SongComments",
      {
        songId: {
          [Op.in]: [1,5],
        },
      },
      {}
    );
  },
};
