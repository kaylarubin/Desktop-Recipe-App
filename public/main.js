const { app, BrowerWindow, BrowserWindow } = require("electron");

require("@electron/remote/main").initialize();

function createWindow() {
  //Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      enableRemoteModule: true,
    },
  });

  win.loadURL("http://localhost:3000");
}

app.on("ready", createWindow);

//Quit when all windows are closed
app.on("window-all-closed", function () {
  //On OS X it is common for applications and their menu bar
  //to stay active until the user quits explicityly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("active", function () {
  //On OS X it's common to re-create a window in the app when the
  //dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
