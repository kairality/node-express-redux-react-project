"use strict";
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define(
    "Song",
    {
      userId: DataTypes.INTEGER,
      title: {
        type: DataTypes.STRING,
        allowNull: false,
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
    Song.belongsTo(models.User, { foreignKey: "userId" });
  };
  Song.createWrapper = async function (data) {};
  return Song;
};
