'use strict';
module.exports = (sequelize, DataTypes) => {
  var Search = sequelize.define('Search', {
    links: DataTypes.STRING
  }, {});
  Search.associate = function(models) {
      //establishes association with search model
      //on delete, causes rows that are associated to delete as well.
      Search.hasOne(models.Playlist, {onDelete: "cascade"});
  };
  return Search;
};
