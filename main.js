import { app, BrowserWindow, session, ipcMain } from "electron";
import path from "path";
import os from "os";

const IsDev = process.env.NODE_ENV === "development";
const IsProd = process.env.NODE_ENV === "production";
let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1260,
    height: 810,
    titleBarStyle: "hiddenInset", // macOS 只保留红绿灯关闭控制
    webPreferences: {
      nodeIntegration: true
      // devTools: false,
    },
    title: "music",
    resizable: false // 禁止缩放窗体
  });
  if (IsDev) {
    win.loadURL("http://localhost:8000");
    win.webContents.openDevTools();
  } else if (IsProd) {
    win.loadFile(path.resolve(__dirname, "dist", "index.html"));
  }
  // 监听全屏状态
  ipcMain.on("changeFullScreen", event => {
    win.setFullScreen(!win.fullScreen);
  });
}

app.whenReady().then(createWindow);

app.on("ready", async () => {
  await session.defaultSession.loadExtension(path.join(os.homedir(), "/Library/Application Support/Google/Chrome/Profile 1/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.9.0_0"));
  await session.defaultSession.loadExtension(path.join(os.homedir(), "/Library/Application Support/Google/Chrome/Profile 1/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.0_0"));
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
