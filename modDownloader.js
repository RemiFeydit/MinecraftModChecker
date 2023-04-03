const utils = require("./utils");
require("dotenv").config();
const fs = require("fs");
const download = require("download");

const modDownloader = async (arr, version) => {
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
        let fileNameArr = utils.getFileName(data, version);
        if (fileNameArr.length > 0) {
          if (!fs.existsSync("mods")) {
            fs.mkdirSync("mods");
          }
          fileName = fileNameArr[fileNameArr.length - 1].fileName;
          let downloadUrl = fileNameArr[fileNameArr.length - 1].downloadUrl;
          download(downloadUrl, `./mods`);
        }
      });
  }
  console.log("Download Complete!");
  utils.pressKey();
};

module.exports = modDownloader;
