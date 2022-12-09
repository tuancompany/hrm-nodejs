"use strict";
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Department",
      [
        {
          id: "2b25bbed-a000-4197-8a3d-22d5d30d02dc",
          name: "Sales",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "ec728069-7e01-4e10-86bd-36ba0ac87dc6",
          name: "Human Resoures",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "96b2f503-8f95-40c8-81c9-dfd1cf3db767",
          name: "Marketing",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "784b8815-ca76-4887-8b7b-a73ffe3b4c43",
          name: "Front Desk",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "491b78f2-d202-4fa7-806f-a87c0843a344",
          name: "IT",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.bulkDelete("Department", [
      {
        firstName: "Erlich",
      },
    ]);
  },
};
