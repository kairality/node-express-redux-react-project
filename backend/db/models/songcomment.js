"use strict";
module.exports = (sequelize, DataTypes) => {
  const SongComment = sequelize.define(
    "SongComment",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      songId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      songTimestamp: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "You can't leave an empty comment!"
          }
        },
      },
    },
    {}
  );
  SongComment.associate = function (models) {
    // associations can be defined here
    SongComment.belongsTo(models.User, { foreignKey: "userId" });
    SongComment.belongsTo(models.Song, { foreignKey: "songId" });
  };
  return SongComment;
};
