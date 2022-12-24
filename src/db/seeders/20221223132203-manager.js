"use strict";
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Manager",
      [
        {
          id: "7b8d7b33-8e40-4a53-a58e-7bf67d99efa7",
          name: "Nam Nguyen",
          gender: "Male",
          // dob: "Sat Apr 13 1985 00:00:00 GMT+0700",
          dob: "1985/4/13",
          phone_number: "0868219628",
          email: "namnguyen134@gmail.com",
          department_id: "2b25bbed-a000-4197-8a3d-22d5d30d02dc",
          part_id: "d4d218dd-d582-4568-bbf1-775d4e4ee50a",
          position_id: "7b04526a-326b-40d2-b76a-604ff30207b6",
          degree_id: "96b2f503-8f95-40c8-81c9-dfd1cf3db767",
          // date_joined: "Wed Jan 22 2020 00:00:00 GMT+0700",
          date_joined: "2020/1/22",
          date_left: null,
          active: true,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.bulkDelete("Manager", []);
  },
};
