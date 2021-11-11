const router=require("express").Router();
const service=require("../services/user.service")

// Get All Users
router.get("/",service.getAllUsers)

//get Single user
router.get("/:id",service.getUser)

//Add User
router.post("/",service.addUser)

//update User
router.put("/:id",service.editUser)

//Delete User
router.delete("/:id",service.deleteUser)

module.exports=router