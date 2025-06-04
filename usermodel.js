const mongoose = require("mongoose");
const { type } = require("os");
let user = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    // validate: {
    //   validator: function (value) {
    //     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    //   },
    //   message: (props) => `${props.value} is not a valid email address!`,
    // },
  },
  password: {
    type: String,
    required: true,
    password: {
      type: String,
      required: true,
      // validate: {
      //   validator: function (value) {
      //     // This RegExp ensures:
      //     // - At least one uppercase letter (?=.*[A-Z])
      //     // - At least one digit (?=.*\d)
      //     // - Minimum 8 characters total [A-Za-z\d]{8,}
      //     return /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);
      //   },
      //   message: (props) =>
      //     `${props.value} is not a valid password! Must be at least 8 characters, include one uppercase letter and one number.`,
      // },
    },
  },
});

const Usermodel = mongoose.model("Users", user);
module.exports = Usermodel;
