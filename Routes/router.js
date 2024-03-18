const express = require("express");

const router = new express.Router();
const userController = require("../Controllers/userController");
const multerConfig = require("../Middlewares/multerMiddleware");

router.post("/users.login",userController.login);

router.post("/add", multerConfig.single("profile"), userController.addUser);

router.get("/get-users", userController.getAllUsers);

router.delete("/remove-user/:id", userController.removeUser);

router.put(
   "/edit-user/:id",
   multerConfig.single("profile"),
   userController.editUser
);


module.exports = router;
