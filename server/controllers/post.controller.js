const Post = require("../models/post.model");
module.exports.createNewPost = (req, res) => {
  Post.create(req.body)
    .then((newlyCreatedPost) => res.json({ post: newlyCreatedPost }))
    .catch((err) => res.status(400).json(err));
};

module.exports.findAllPosts = (req, res) => {
  Post.find()
    .populate("user")
    .then((posts) => res.json(posts))
    .catch((err) => res.json({ message: "Something went wrong", error: err }));
};

module.exports.deletepost = (request, response) => {
  Post.deleteOne({ _id: request.params.id })
    .then((deleteConfirmation) => response.json(deleteConfirmation))
    .catch((err) => response.json(err));
};
