import { response } from "express";
import {userModel} from "../models/user_model.js";

export const userController = {
  getUsers: (req, res) => {
    userModel.getUsers().then((response) => {
      res.json(response);
    });
  },
  loginUser: (req, res) => {
    let user = req.body;
    userModel.loginUser(user.email, user.password).then((response) => {
      
      if(response != null){
        req.session.user = user.email;
        res.cookie('email', user.email, {path:'/'});
      }else{
        req.session.user = null;
      }
      res.json(response);
    });
  },

  createUser: (req, res) => {
    let user = req.body;
    userModel.getUsers().then(async (response) => {
      let datas = response;
      let members = datas.users;
      for (let i = 0; i < members.length; i++) {
        let member = members[i];
        if (member.email == user.email) {
          res.status(409).json({ message: "이미 존재하는 이메일입니다." });
          return;
        }
      }
      if (await userModel.createUser(user)) {
        res.status(200).json({ message: "회원가입 완료" });
      } else {
        res.status(500).json({ message: "회원가입 실패" });
      }
    });
  },
  deleteUser: async (req, res) => {
    const id = req.params.id;
    if (await userModel.deleteUser(res, id)) {
      res.status(200).json({ message: "회원탈퇴 완료" });
    } else {
      res.status(500).json({ message: "회원탈퇴 실패" });
    }
  },
  modifyProfile: async (req, res) => {
    let req_user = req.body;
    if (await userModel.modifyProfile(res, req_user)) {
      res.status(200).json({ message: "프로필 수정 완료" });
    } else {
      res.status(500).json({ message: "프로필 수정 실패" });
    }
  },
  modifyPwd: async (req, res) => {
    let req_user = req.body;
    if (await userModel.modifyPwd(res, req_user)) {
      res.status(200).json({ message: "비밀번호 수정 완료" });
    } else {
      res.status(500).json({ message: "비밀번호 수정 실패" });
    }
  },
};
