const User = require("../models/user_model");

exports.logInUser = async (req, res) => {
  const { username, password } = req.body;
  console.log("auth controller hit", req.body);
  const user = await User.findUser(username);
  if (!user) {
    return res.send("User not found");
  }
  const checkPassword = user.isAValidPassword(password);
  if (!checkPassword) {
    return res.send("Wrong password, try again");
  }
  res.send(user);
};
