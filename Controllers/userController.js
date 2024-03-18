const employees = require("../Models/employeeSchema");
const users = require("../Models/userSchema");

exports.login = async (req, res) => {
   const { email, password } = req.body;
   try {
      const user = await users.findOne({ email });
      if (user) {
         if (user.password === password) {
            res.status(200).json(user);
         } else {
            res.status(406).json("Invalid credentials");
         }
      } else {
         res.status(404).json("User does not exist");
      }
   } catch (error) {
      res.status(401).json(error);
   }
};

exports.addUser = async (req, res) => {
   console.log(req.file);
   console.log("Inside adduser");

   const {
      fname,
      lname,
      email,
      mobile,
      gender,
      designation,
      course,
      createDate,
   } = req.body;
   try {
      const isUser = await employees.findOne({ email });
      if (isUser) {
         res.status(406).json("User already exist!");
      } else {
         const newUser = new employees({
            fname,
            lname,
            email,
            mobile,
            designation,
            gender,
            course,
            createDate,
            profile: req.file.filename,
         });

         await newUser.save();
         res.status(200).json(newUser);
      }
   } catch (error) {
      res.status(401).json(error);
   }
};

exports.getAllUsers = async (req, res) => {
   const search = req.query.search;
   const query = {
      fname: { $regex: search, $options: "i" },
   };
   try {
      const allemployees = await employees.find(query);
      res.status(200).json(allemployees);
   } catch (error) {
      res.status(401).json(err);
   }
};

exports.removeUser = async (req, res) => {
   const { id } = req.params;
   try {
      const response = await employees.findByIdAndDelete({ _id: id });
      res.status(200).json(response);
   } catch (error) {
      res.status(401).json("Error: ", err);
   }
};

exports.editUser = async (req, res) => {
   const { id } = req.params;
   const { fname, lname, email, mobile, gender, designation, course, profile } =
      req.body;
   const file = req.file ? req.file.filename : profile;
   try {
      const updatedUser = await employees.findByIdAndUpdate(
         id,
         {
            fname,
            lname,
            email,
            mobile,
            gender,
            designation,
            profile: file,
            course,
         },
         { new: true }
      );
      await updatedUser.save();
      res.status(200).json(updatedUser);
   } catch (error) {
      res.status(401).json("Error: ", err);
   }
};
