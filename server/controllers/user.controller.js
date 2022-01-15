const User = require("../models/user.model");


exports.register = async (req, res, next) => {
  const { username, email, password, countrycode, phonenumber  } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
      countrycode,
      phonenumber,

    });

    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};


exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password is provided
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    // Check that user exists by email
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Check that password match
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendToken(user, 201, res);
  } catch (err) {
    next(err);
  }
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


module.exports.deleteuser = (request, response) => {
  User.deleteOne({ _id: request.params.id })
    .then((deleteConfirmation) => response.json(deleteConfirmation))
    .catch((err) => response.json(err));
};

module.exports.logout = (req, res) => {
  res.clearCookie("usertoken");
  res.json({ msg: "User Logged Out" });
  res.sendStatus(200);
};


const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ sucess: true, token });
};