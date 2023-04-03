const utils = require("./utils");
require("dotenv").config();

const modChecker = async (arr, version) => {
  let count = 0;
  let slugName = "";
  for (let i = 0; i < arr.length; i++) {
    slugName = arr[i].slug;
    await fetch(
      `https://api.curseforge.com/v1/mods/search?gameId=432&slug=${slugName}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "x-api-key": process.env.API_KEY,
        },
      }
    )
      .then(function (res) {
        return res.json();
      })
      .then(function (body) {
        let data = body.data[0];
        let fileName = data.latestFiles
          .filter((val) => val.gameVersions.includes("1.19.4"))
          .filter((val) => val.gameVersions.includes("Fabric"));
        if (fileName.slice(-1).length > 0) {
          console.log("\x1b[32m%s\x1b[0m", `${slugName}`);
        } else {
          count++;
          console.log("\x1b[31m%s\x1b[0m", `${slugName}`);
        }
      });
  }
  console.log(
    "\x1b[36m%s\x1b[37m%s\x1b[36m%s\x1b[0m",
    `Il y a `,
    count,
    " mods pas à jour"
  );
  utils.pressKey();
};

module.exports = modChecker;
