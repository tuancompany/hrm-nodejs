"use strict";
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable("OvertimeType", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      coefficients: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable("OvertimeType");
  },
};
