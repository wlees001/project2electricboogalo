'use strict';
module.exports = (sequelize, DataTypes) => {
  var Playlist = sequelize.define('Playlist', {
    name: DataTypes.STRING
  }, {});
  Playlist.associate = function(models) {
      Playlist.belongsTo(models.Search, {
          //sets up a searchId column that is used to associate the tables
          foreignKey: {
              //does not allow it to be null
              allowNull : false
          }
      })
  };
  return Playlist;
};
