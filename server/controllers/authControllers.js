const User = require("../models/user_model");

exports.logInUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findUser(username);

  if (!user) {
    res.send("User not found");
  }
  const checkPassword = user.isAValidPassword(password);

  if (!checkPassword) {
    res.send("Wrong password, try again");
  }

  res.send(user);
};
