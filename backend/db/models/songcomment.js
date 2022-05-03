"use strict";
module.exports = (sequelize, DataTypes) => {
  const SongComment = sequelize.define(
    "SongComment",
    {
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
          notEmpty: true,
        },
      },
    },
    {}
  );
  SongComment.associate = function (models) {
    // associations can be defined here
    SongComment.belongsTo(models.User, { foreignKey: "userId" });
    SongComment.belongsTo(models.SongComment, { foreignKey: "songId" });
  };
  return SongComment;
};
