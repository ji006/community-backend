import jsonfile from  "jsonfile";
import fs from "fs"
import path from 'path';
const __dirname = path.resolve();

  export  const  userModel={
    getUsers: () => {
        // JSON 파일 읽기
        return jsonfile.readFile(__dirname+"/models/userlist.json");
      },
      createUser: async (user) => {
        let response = await userModel.getUsers();
    
        let datas = response;
        let members = datas.users;
        let id =  Math.max( ...members.map(member=>member.id))
        if(id!=null){
          user.id = id+1;
        }else{
          user.id = 1;
        }
        datas.users.push(user);
        fs.writeFileSync(__dirname+"/models/userlist.json", JSON.stringify(datas));
        return true;
      },
      deleteUser: async(res,id)=>{
        let response = await userModel.getUsers();
        let users = response.users;
        for(let i=0; i<users.length; i++){
          if(users[i].id == id){
            users.splice(i, 1);
            fs.writeFileSync(__dirname+"/models/userlist.json", JSON.stringify(response));
            return true;
          }
        }
        return false;
      },
      modifyProfile: async (res, req_user) =>{
        // post를 찾는다
        let response = await userModel.getUsers();
        let users = response.users;
        let find_user = null;
        for(let i=0; i<users.length; i++){
          if(users[i].id == req_user.id){
              find_user = users[i];
              break;
          }
        }
        find_user.nickname = req_user.nickname;
        let userprofile = req_user.profile.split(';')[0];
        let check_profile = userprofile.split('/')[1];
        if(check_profile != 'undefined'){
        find_user.profile = req_user.profile;
        }
        fs.writeFileSync(__dirname+"/models/userlist.json", JSON.stringify(response));
        return true;
      },
      modifyPwd: async (res, req_user) =>{
        // post를 찾는다
        let response = await userModel.getUsers();
        let users = response.users;
        let find_user = null;
        for(let i=0; i<users.length; i++){
          if(users[i].id == req_user.id){
              find_user = users[i];
              break;
          }
        }
        find_user.password = req_user.password;
    
        fs.writeFileSync(__dirname+"/models/userlist.json", JSON.stringify(response));
        return true;
      }
  }
  