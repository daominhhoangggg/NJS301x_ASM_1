const User = require("../models/token");

exports.getToken = (req, res, next) => {
  const userToken = req.query.token;
  if (userToken) {
    User.fetchAllUsers((users) => {
      const user = users.find((u) => u.token === userToken);
      if (user !== undefined) {
        next();
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    });
  }
};
