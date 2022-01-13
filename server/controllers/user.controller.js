const Post= require("../models/post.model");
const User = require("../models/user.model");

module.exports.register = (req, res) => {
  User.create(req.body)
  .then(newUser => res.json({ post: newUser }))
  .catch(err => res.status(400).json(err ));
      }

module.exports.all = (req, res) => {
    User.find()
      .then(allDaUsers => res.json({ users: allDaUsers }))
      .catch(err => res.json({ message: "Something went wrong", error: err }));
  };

module.exports.findOneUser = (req, res) => {

    User.findOne({ _id: req.params.id }).populate('post')
      .then(oneUser => res.json({ user: oneUser }))
      .catch(err => res.json({ message: "Something went wrong", error: err }));
  };

module.exports.login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
      .catch(err => res.status(400).json(err));
    if (user === null) {
      return res.sendStatus(400);
    }
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
    if (!correctPassword) {
      return res.sendStatus(400);
    }
    const userToken = jwt.sign({
      id: user._id
    }, "root1");
    res
      .cookie("usertoken", userToken, {
        httpOnly: true
      })
      .json({ msg: "success!", user: user, token: userToken })
  }