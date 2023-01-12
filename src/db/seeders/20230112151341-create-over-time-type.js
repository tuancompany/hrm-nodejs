"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "OvertimeType",
      [
        {
          id: "d9e9d6b5-3bd7-4c3a-a5ac-02012ec3d9e1",
          name: "Voluntary Overtime",
          coefficients: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "661aaa02-5dc6-44d8-bbc7-a95626304121",
          name: "At night Overtime",
          coefficients: 1.3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "0c220df8-5967-4103-ab06-30d3ceb689a6",
          name: "Day off Overtime",
          coefficients: 1.5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "b9824554-bca9-44d0-9fc4-5a697a13458f",
          name: "Holiday Overtime",
          coefficients: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.bulkDelete("OvertimeType", []);
  },
};
