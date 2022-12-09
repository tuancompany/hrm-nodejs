"use strict";
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Allowance",
      [
        {
          id: "4d12fa12-c457-47b8-9e89-bda1b6462a4c",
          name: "Transportation",
          amount: 500,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "4eb523c2-7acf-479a-acbb-6ff363bdedcc",
          name: "Lunch",
          amount: 730,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "fdbb977b-4441-4f12-b3d3-bd9b4be5c375",
          name: "Traveling",
          amount: 3000,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "0dd31975-ff85-4cf7-b697-1f22600cee05",
          name: "Maternity",
          amount: 1500,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "e3406291-62bf-4699-b5de-cbfcd3f9b663",
          name: "Rent",
          amount: 50,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.bulkDelete("Allowance", [
      {
        firstName: "Erlich",
      },
    ]);
  },
};
