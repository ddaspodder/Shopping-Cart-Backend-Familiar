const fs = require("fs/promises");

const getData = (pathName) => {
  return fs
    .readFile(pathName, "utf-8")
    .then((data) => {
      return JSON.parse(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const save = (pathName, data) => {
  return fs
    .writeFile(pathName, JSON.stringify(data))
    .then(() => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { getData, save };
