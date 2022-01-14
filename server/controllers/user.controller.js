const Post = require("../models/post.model");
const User = require("../models/user.model");

module.exports.register = (req, res) => {
  User.create(req.body)
    .then((user) => {
      const userToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.SECRET_KEY
      );

      res
        .cookie("usertoken", userToken, secret, {
          httpOnly: true,
        })
        .json({ msg: "success!", user: user });
    })
    .catch((err) => res.json(err));
};

module.exports.all = (req, res) => {
  User.find()
    .then((allDaUsers) => res.json({ users: allDaUsers }))
    .catch((err) => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findOneUser = (req, res) => {
  User.findOne({ _id: req.params.id })
    .populate("post")
    .then((oneUser) => res.json({ user: oneUser }))
    .catch((err) => res.json({ message: "Something went wrong", error: err }));
};

module.exports.login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (user === null) {
    return res.sendStatus(400);
  }

  const correctPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!correctPassword) {
    return res.sendStatus(400);
  }

  const userToken = jwt.sign(
    {
      id: user._id,
    },
    process.env.SECRET_KEY
  );

  res
    .cookie("usertoken", userToken, secret, {
      httpOnly: true,
    })
    .json({ msg: "success!" });
};



module.exports.deleteuser = (request, response) => {
  User.deleteOne({ _id: request.params.id })
      .then(deleteConfirmation => response.json(deleteConfirmation))
      .catch(err => response.json(err))
}
