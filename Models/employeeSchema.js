const mongoose = require("mongoose");
const validator = require("validator");

const employeeSchema = mongoose.Schema({
   fname: {
      type: String,
      required: true,
      trim: true,
   },
   lname: {
      type: String,
      required: true,
      trim: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
      validator(value) {
         if (!validator.isEmail(value)) {
            throw Error("Invalid Email!");
         }
      },
   },
   mobile: {
      type: Number,
      required: true,
      minlength: 10,
      maxlength: 10,
   },
   designation: {
      type: String,
      required: true,
   },
   gender: {
      type: String,
      required: true,
   },
   course: {
      type: String,
      required: true,
   },
   createDate: {
      type: String,
      required: true,
   },
   profile: {
      type: String,
      required: true,
   },
});

const employees = mongoose.model("employees", employeeSchema);

module.exports = employees;
