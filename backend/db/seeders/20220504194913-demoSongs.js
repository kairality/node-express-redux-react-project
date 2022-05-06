"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    return queryInterface.bulkInsert(
      "Songs",
      [
        {
          userId: 4,
          title: "In the Balance",
          src: "https://s3.us-west-1.amazonaws.com/songswarm.songs/1651527612489.mp3",
          imgSrc:
            "https://s3.us-west-1.amazonaws.com/songswarm.songs/1651696673681.jpg",
          public: true,
        },
        {
          userId: 4,
          title: "Flow Together",
          src: "https://s3.us-west-1.amazonaws.com/songswarm.songs/1651528607211.mp3",
          imgSrc:
            "https://s3.us-west-1.amazonaws.com/songswarm.songs/1651696910608.jpg",
          public: true,
        },
        {
          userId: 4,
          title: "Metal",
          src: "https://s3.us-west-1.amazonaws.com/songswarm.songs/1651649098984.mp3",
          imgSrc:
            "https://s3.us-west-1.amazonaws.com/songswarm.songs/1651697068388.jpg",
          public: true,
        },
        {
          userId: 4,
          title: "Return to Oblivion",
          src: "https://s3.us-west-1.amazonaws.com/songswarm.songs/1651697303948.mp3",
          imgSrc:
            "https://s3.us-west-1.amazonaws.com/songswarm.songs/1651697325629.jpg",
          public: true,
        },
        {
          userId: 5,
          title: "10 Mins of Cicadas",
          src: "https://s3.us-west-1.amazonaws.com/songswarm.songs/1651812016709.mp3",
          imgSrc:
            "https://s3.us-west-1.amazonaws.com/songswarm.songs/1651812034887.png",
          public: true,
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Songs",
      {
        title: {
          [Op.in]: [
            "In the Balance",
            "Metal",
            "Return to Oblivion",
            "Flow Together",
            "10 Mins of Cicadas"
          ],
        },
      },
      {}
    );
  },
};
