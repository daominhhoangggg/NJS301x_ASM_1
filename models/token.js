const fs = require("fs");
const path = require("path");

const getFromFile = (file, cb) => {
  const p = path.join(path.dirname(process.mainModule.filename), "data", file);
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      const users = JSON.parse(fileContent, "utf8");
      cb(users);
    }
  });
};

module.exports = class User {
  static fetchAllUsers(cb) {
    getFromFile("userToken.json", cb);
  }
};
