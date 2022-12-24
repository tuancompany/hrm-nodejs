'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ActionRequest', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      expiration_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      type: {
        allowNull: false,
        type: Sequelize.CHAR,
      },
      approved: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      employee_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Employee",
          key: "id",
        },
      },
      manager_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Manager",
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ActionRequest');
  }
};