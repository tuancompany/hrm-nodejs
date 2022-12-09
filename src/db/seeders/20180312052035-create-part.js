"use strict";
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Part",
      [
        {
          id: "d4d218dd-d582-4568-bbf1-775d4e4ee50a",
          name: "Sales",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "c0349497-cdb0-4a40-9658-6cb816851f10",
          name: "Human Resoures",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "79e4b899-93d1-4766-af7d-38651778613b",
          name: "Marketing",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "267f6f50-c3aa-49a4-89c4-b912c30554a1",
          name: "Front Desk",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "64caf16f-b28b-4e23-96dd-73d5c5314171",
          name: "IT",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.bulkDelete("Part", [
      {
        firstName: "Erlich",
      },
    ]);
  },
};
