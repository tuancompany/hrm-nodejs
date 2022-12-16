"use strict";
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Permission",
      [
        {
          id: "42d66e85-104e-4fae-8a83-2e3754c6dc1e",
          name: "Full",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "de40304f-5632-4e95-a5cf-1d872fdce497",
          name: "Admin",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "57ce3b1b-a684-4621-b987-04470724bbad",
          name: "Read only",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "c31079e8-f15a-46df-be8a-871456f637a3",
          name: "Edit",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "988248af-7217-4429-9d8d-bffce939920c",
          name: "Create",
          created_at: new Date(),
          updated_at: new Date(),
        }
      ],
      {}
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.bulkDelete("Permission", []);
  },
};
