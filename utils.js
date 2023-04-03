const pressAnyKey = require("press-any-key");

const pressKey = () => {
  pressAnyKey("Press any key to resolve, or CTRL+C to reject", {
    ctrlC: "reject",
  })
    .then(() => {
      return;
    })
    .catch(() => {
      return;
    });
};

const getFileName = (data, version) => {
  return data.latestFiles
    .filter((val) => val.gameVersions.includes(version))
    .filter((val) => val.gameVersions.includes("Fabric"));
};

module.exports = { pressKey, getFileName };
