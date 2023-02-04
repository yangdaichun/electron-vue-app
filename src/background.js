'use strict'

import { app, protocol, BrowserWindow, Menu, Tray, dialog } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import path from 'path'

const isDevelopment = process.env.NODE_ENV !== 'production'

const appTitle = 'Electron-Vue-App'

let tray = null
let win = null
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
])

app.commandLine.appendSwitch('ignore-certificate-errors')
app.commandLine.appendSwitch('no-sandbox')

const getTheLock = app.requestSingleInstanceLock()
if (!getTheLock) {
  app.quit()
}
app.on('second-instance', () => {
  if (process.platform === 'win32') {
    if (win && win.isMinimized()) {
      win.restore()
      win.focus()
    }
  }
})

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 900,
    minHeight: 650,
    frame: false,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
    },
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
  win.on('close', async (e) => {
    e.preventDefault()
    await appQuit()
  })
  require('@electron/remote/main').initialize()
  require('@electron/remote/main').enable(win.webContents)
}

async function appQuit() {
  var result = await dialog.showMessageBoxSync(win, {
    message: '确定要退出程序吗',
    type: 'question',
    title: '退出',
    buttons: ['确定', '取消'],
    defaultId: 1,
  })
  if (result == 0) {
    if (!tray.isDestroyed()) {
      tray.destroy()
    }
    app.exit()
  }
}

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  createWindow()
  //正式环境屏蔽刷新和调试工具快捷键
  if (app.isPackaged) {
    win.webContents.on('before-input-event', (event, input) => {
      if (
        (input.control && input.key.toUpperCase() == 'R') ||
        (input.control && input.shift && input.key.toUpperCase() == 'I')
      ) {
        event.preventDefault()
      }
    })
  }
  const icoPath = isDevelopment
    ? path.join(__dirname, '../src/assets/favicon.ico')
    : 'static/favicon.ico'
  tray = new Tray(icoPath)
  const menu = []
  if (isDevelopment) {
    menu.push({
      label: '调试工具',
      click: () => {
        win.webContents.openDevTools()
      },
    })
    menu.push({
      label: '重新加载',
      click: () => {
        win.reload()
      },
    })
  }
  menu.push({
    label: '完全退出',
    click: () => {
      win.focus()
      win.restore()
      win.close()
    },
  })
  const contextMenu = Menu.buildFromTemplate(menu)
  tray.setToolTip(appTitle)
  tray.setContextMenu(contextMenu)
  tray.on('click', () => {
    win.focus()
    win.restore()
  })
  // 定时将窗口最小化到任务栏，减少日志打印时性能消耗
  setInterval(() => {
    win.minimize()
  }, 1000 * 60 * 5)
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
