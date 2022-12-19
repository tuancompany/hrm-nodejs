"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("User", "is_deleted", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("User", "is_deleted");
  },
};
