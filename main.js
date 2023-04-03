var menu = require("console-menu");
const modChecker = require("./modChecker");
const mods = require("./data");
const modDownloader = require("./modDownloader");

menu(
  [
    { hotkey: "1", title: "Check if mods is up to date" },
    { hotkey: "2", title: "Download mods" },
  ],
  {
    header: "ModChecker",
    border: true,
  }
).then(async (item) => {
  switch (item.hotkey) {
    case "1":
      await modChecker(mods, "1.19.4");
      break;

    case "2":
      await modDownloader(mods, "1.19.4");
      break;
  }
});
