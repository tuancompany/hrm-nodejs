"use strict";
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable("PermissionDetail", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      permission_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Permission",
          key: "id",
        },
      },
      action_name: {
        type: Sequelize.CHAR,
        allowNull: false
      },
      action_code: {
        type: Sequelize.CHAR,
        allowNull: false
      },
      check_action: {
        type: Sequelize.INTEGER,
        allowNull: true
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
    return queryInterface.dropTable("PermissionDetail");
  },
};
