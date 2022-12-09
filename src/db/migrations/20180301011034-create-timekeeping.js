"use strict";
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable("TimeKeeping", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      month: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      day: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      entry_hour: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      entry_min: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      exit_hour: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      exit_min: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      employee_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Employee",
          key: "id",
        },
      },
      time_keeping_type_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "TimeKeepingType",
          key: "id",
        },
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
    return queryInterface.dropTable("TimeKeeping");
  },
};
