import express from "express";
const router = express.Router();

import { postController } from "../controllers/post_controller.js";

// GET /posts
router.get('/', (req, res) => {
  postController.getPosts(req, res);
});
router.get('/:id', (req, res) => {
  const id = req.params.id;
  postController.getPosts(req, res);
});
router.delete("/:id",(req,res)=>{
  postController.deletePost(req,res);
});
router.patch("/:id/editpost", (req, res) => {
  postController.modifyPost(req, res);
});
router.post("/createpost", (req, res) => {
  postController.createPost(req, res);
});
router.post("/writecomment", (req,res)=>{
  postController.writeComment(req,res);
})
router.patch("/modifycomment", (req,res)=>{
  postController.modifyComment(req,res);
})
router.delete("/:id/deletecomment/:commentid", (req,res)=>{

  postController.deleteComment(req,res);
})

export default router;

// // GET /example/:id
// router.get('/:id', (req, res) => {
//   const id = req.params.id;
//   const item = exampleData.find(item => item.id === parseInt(id));
//   if (item) {
//     res.json({ message: `GET request to /example/${id}`, data: item });
//   } else {
//     res.status(404).json({ message: 'Item not found' });
//   }
// });

// // POST /example
// router.post('/', (req, res) => {
//   const { name } = req.body;
//   const newItem = { id: exampleData.length + 1, name };
//   exampleData.push(newItem);
//   res.status(201).json({ message: 'POST request to /example', data: newItem });
// });

// // PUT /example/:id
// router.put('/:id', (req, res) => {
//   const id = req.params.id;
//   const { name } = req.body;
//   const index = exampleData.findIndex(item => item.id === parseInt(id));
//   if (index !== -1) {
//     exampleData[index].name = name;
//     res.json({ message: `PUT request to /example/${id}`, data: exampleData[index] });
//   } else {
//     res.status(404).json({ message: 'Item not found' });
//   }
// });

// // DELETE /example/:id
// router.delete('/:id', (req, res) => {
//   const id = req.params.id;
//   const index = exampleData.findIndex(item => item.id === parseInt(id));
//   if (index !== -1) {
//     const deletedItem = exampleData.splice(index, 1)[0];
//     res.json({ message: `DELETE request to /example/${id}`, data: deletedItem });
//   } else {
//     res.status(404).json({ message: 'Item not found' });
//   }
// });

// module.exports = router;
