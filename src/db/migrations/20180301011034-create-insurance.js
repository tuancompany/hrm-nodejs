"use strict";
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable("Insurance", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      insurance_number: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      issued_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      issued_address: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      medical_examination_address: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      employee_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Employee",
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
    return queryInterface.dropTable("Insurance");
  },
};
