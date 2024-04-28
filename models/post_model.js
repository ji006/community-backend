import jsonfile from "jsonfile";
import fs from "fs";
import path from "path";
const __dirname = path.resolve();
function getFormattedDateTime() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
export const postModel = {
  getPosts: () => {
    // JSON 파일 읽기
    return jsonfile.readFile(__dirname + "/models/postlist.json");
  },
  // getComments: (id) => {
  //   return jsonfile.readFile(__dirname + "/models/comments.json");
  // }
  createPost: async (page) =>{
    let response = await postModel.getPosts();

    let datas = response;
    let posts = datas.posts;
    let id =  Math.max( ...posts.map(write=>write.id))
    if(id!=null){
      page.id = id+1;
    }else{
      page.id = 1;
    }
    page.writetime=getFormattedDateTime();
    datas.posts.push(page);
    fs.writeFileSync(__dirname+"/models/postlist.json", JSON.stringify(datas));
    return true;
  },
  deletePost: async(res,id)=>{
    let response = await postModel.getPosts();
    let posts = response.posts;
    for(let i=0; i<posts.length; i++){
      if(posts[i].id == id){
        posts.splice(i, 1);
        fs.writeFileSync(__dirname+"/models/postlist.json", JSON.stringify(response));
        return true;
      }
    }
    return false;
  },
  modifyPost: async (res, req_post) =>{
    // post를 찾는다
    let response = await postModel.getPosts();
    let posts = response.posts;
    let find_post = null;
    for(let i=0; i<posts.length; i++){
      if(posts[i].id == req_post.id){
          find_post = posts[i];
          break;
      }
    }
    find_post.title = req_post.title;
    find_post.post_text = req_post.post_text;
    find_post.writetime = getFormattedDateTime();

    fs.writeFileSync(__dirname+"/models/postlist.json", JSON.stringify(response));
    return true;
  },
  writeComment: async (req_comment) =>{
    let response = await postModel.getPosts();

    let posts = response.posts;
    let find_post = null;
    for(let i=0; i<posts.length; i++){
      if(posts[i].id == req_comment.post_id){
          find_post = posts[i];
          break;
      }
    }
    let comments = find_post.comments;
    let commentid;
    if(commentid != null && commentid != NaN){
      commentid = Math.max( ...comments.map(write=>write.commentid))
      req_comment.commentid=commentid+1;
    }else{
      req_comment.commentid = 1;
    }
    req_comment.writetime=getFormattedDateTime();
    find_post.comments.push(req_comment);
    fs.writeFileSync(__dirname+"/models/postlist.json", JSON.stringify(response));
    return true;
  },
  modifyComment: async (res, req_comment) =>{
    // post를 찾는다
    let response = await postModel.getPosts();

    let posts = response.posts;
    let find_post = null;
    for(let i=0; i<posts.length; i++){
      if(posts[i].id == req_comment.post_id){
          find_post = posts[i];
          break;
      }
    }
    let comments = find_post.comments;
    //comment를 찾는다.
    let find_comments = comments.filter(d=>d.commentid==req_comment.commentid);
    if(find_comments.length==0){
      return false;
    }
    let find_comment = find_comments[0];
    find_comment.writetime=getFormattedDateTime();
    find_comment.comment_content = req_comment.comment_content;
    fs.writeFileSync(__dirname+"/models/postlist.json", JSON.stringify(response));
    return true;
  },
  deleteComment: async(res,id,commentid)=>{
    let response = await postModel.getPosts();
    let posts = response.posts;
    let find_post = null;
    for(let i=0; i<posts.length; i++){
      if(posts[i].id == id){
          find_post = posts[i];
          break;
      }
    }
    let find_comments = find_post.comments;
    let i;
    for(i=0; i<find_comments.length; i++){
      if(find_comments[i].commentid==commentid){
        find_comments.splice(i, 1);
        fs.writeFileSync(__dirname+"/models/postlist.json", JSON.stringify(response));
        // res.status(200).json({message: 'comment가 삭제되었습니다.'});
        return true;
      }
    }
    return false;
  }
};
