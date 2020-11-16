const { BrowserWindow } = require("electron");

const createWindow = (options) => {
  const opts = Object.assign(
    {},
    { width: 800, height: 600, show: false },
    options.opts
  );
  const url = options.url || {};
  // Create the browser window.
  let window = new BrowserWindow(opts);

  window.loadURL(url);

  // Emitted when the window is closed.
  window.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    window = null;
  });

  return window;
};

module.exports = createWindow;
