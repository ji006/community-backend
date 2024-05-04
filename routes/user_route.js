import express from "express";
const router = express.Router();

import { userController } from "../controllers/user_controller.js";

// GET /posts
router.get("/", (req, res) => {
  userController.getUsers(req, res);
});
router.get("/:id", (req, res) => {
  userController.getUsers(req, res);
});
router.delete("/:id",(req,res)=>{
  userController.deleteUser(req,res);
});
router.patch("/:id/editprofile",(req,res)=>{
  userController.modifyProfile(req,res);
});
router.patch("/:id/editpwd",(req,res)=>{
  userController.modifyPwd(req,res);
});
router.post("/join", (req, res) => {
  userController.createUser(req, res);
});

router.post("/login", (req, res) => {
  userController.loginUser(req, res);
});

export default router;

