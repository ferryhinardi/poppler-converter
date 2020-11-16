const { app } = require("electron");
const log = require("electron-log");
const path = require("path");
const url = require("url");

const createWindow = require("./utils/createWindow");

log.transports.file.level = "info";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

app.on("ready", () => {
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "/../build/index.html"),
      protocol: "file:",
      slashes: true,
    });
  log.info("RUNNING...", startUrl);
  const webPreferences = {
    // Don't throttle animations/timers when backgrounded.
    backgroundThrottling: false,
    // Use native window.open so external windows can access their parent.
    nativeWindowOpen: true,
  };

  // CREATE WINDOW
  mainWindow = createWindow({
    url: startUrl,
    opts: {
      width,
      height,
      webPreferences,
    },
  });
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    mainWindow = createWindow();
  }
});
