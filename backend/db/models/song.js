'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    src: DataTypes.STRING,
    public: DataTypes.BOOLEAN
  }, {});
  Song.associate = function(models) {
    // associations can be defined here
  };
  return Song;
};