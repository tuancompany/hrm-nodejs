"use strict";
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Degree",
      [
        {
          id: "66dc473f-330c-47fd-8d01-1da37e8fc7bc",
          name: "Associates's Degree",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "ec728069-7e01-4e10-86bd-36ba0ac87dc6",
          name: "Bachelor's Degree",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "96b2f503-8f95-40c8-81c9-dfd1cf3db767",
          name: "Master's Degree",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.bulkDelete("Degree", [
      {
        firstName: "Erlich",
      },
    ]);
  },
};
