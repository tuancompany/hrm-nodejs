"use strict";
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable("Employee", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dob: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      citizen_identification: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      basic_salary: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      department_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Department",
          key: "id",
        },
      },
      part_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Part",
          key: "id",
        },
      },
      position_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Position",
          key: "id",
        },
      },
      degree_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Degree",
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
    return queryInterface.dropTable("Employee");
  },
};
