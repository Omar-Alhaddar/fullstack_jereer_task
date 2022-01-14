const PostController = require("../controllers/post.controller");

module.exports = (app) => {
  app.post("/api/newpost", PostController.createNewPost);
  app.get("/api/posts", PostController.findAllPosts);
};
