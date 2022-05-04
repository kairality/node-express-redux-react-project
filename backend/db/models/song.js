"use strict";
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define(
    "Song",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Sorry, only John Cage can get away with an empty song title",
          },
        },
      },
      src: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imgSrc: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      public: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {}
  );
  Song.associate = function (models) {
    // associations can be defined here
  const commentMapping = {
      through: "SongComment",
      otherKey: "userId",
      foreignKey: "songId",
      as: "usersCommented",
    };
    Song.belongsTo(models.User, { foreignKey: "userId" });
    Song.hasMany(models.SongComment, {foreignKey: "songId"});
    Song.belongsToMany(models.User, commentMapping);
  };
  Song.createWrapper = async function (data) {};
  return Song;
};
