import { app, BrowserWindow } from 'electron';
import path from 'path';

const IsDev = process.env.NODE_ENV === 'development';
const IsProd = process.env.NODE_ENV === 'production';

function createWindow() {
  const win = new BrowserWindow({
    width: 1260,
    height: 810,
    titleBarStyle: 'hiddenInset', // macOS 只保留红绿灯关闭控制
    webPreferences: {
      nodeIntegration: true,
      // devTools: false,
    },
    title: 'music',
    resizable: false, // 禁止缩放窗体
  });
  if (IsDev) {
    win.loadURL('http://localhost:8000');
    win.webContents.openDevTools();
  } else if (IsProd) {
    win.loadFile(path.resolve(__dirname, 'dist', 'index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
