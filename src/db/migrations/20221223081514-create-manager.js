'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Manager', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
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
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date_joined: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      date_left: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Manager');
  }
};