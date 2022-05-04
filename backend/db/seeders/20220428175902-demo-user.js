"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "mintbananas@applesparsley.com",
          username: "MintBananas",
          hashedPassword: bcrypt.hashSync("dill"),
        },
        {
          email: "applesparsley@limeoregano.com",
          username: "ApplesParsley",
          hashedPassword: bcrypt.hashSync("rosemary"),
        },
        {
          email: "tangerinerosemary@mangothyme.com",
          username: "TangerineRosemary",
          hashedPassword: bcrypt.hashSync("basil"),
        },
        {
          email: "masayoshisoken@jp.square-enix.com",
          username: "SOKENsquareenix",
          hashedPassword: bcrypt.hashSync("totheedge"),
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Users",
      {
        username: { [Op.in]: ["MintBananas", "ApplesParsley", "TangerineRosemary", "SOKENsquareenix"] },
      },
      {}
    );
  },
};
