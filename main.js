'use strict';

const { app, BrowserWindow, ipcMain, Menu} = require('electron');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Create the Kanban window
ipcMain.on('navigate-to-kanban', (event) => {
  let kanbanWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  kanbanWindow.loadFile('kanban.html');
});

// Create the Pomodoro Window
ipcMain.on('navigate-to-pomodoro', (event) => {
  let pomodoroWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  pomodoroWindow.loadFile('PomodoroTimer/npomodoro.html');
});
console.log("Electron app is running");