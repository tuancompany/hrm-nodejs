"use strict";
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Position",
      [
        {
          id: "7b04526a-326b-40d2-b76a-604ff30207b6",
          name: "Sales Manager",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "efce9a71-177b-4fb1-81fd-a376e1e95145",
          name: "HR",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "1c876ac6-ac67-41de-a0f5-1e6483105bdb",
          name: "Business Analyst",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "21901254-43c2-4a38-af40-83d1a135632a",
          name: "Receiptionist",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "67d87ddf-ac1f-423a-abd4-ebb497efe2fe",
          name: "Technical Support",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.bulkDelete("Position", [
      {
        firstName: "Erlich",
      },
    ]);
  },
};
