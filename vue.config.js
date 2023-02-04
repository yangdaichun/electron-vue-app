module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'com.electron.young',
        buildVersion: '20230204',
        productName: 'Electron-Vue-App',
        copyright: 'Copyright © 2023- year',
        icon: 'static/favicon.ico',
        extraFiles: [
          {
            from: 'src/assets/favicon.ico',
            to: 'static/favicon.ico',
          },
        ],
        win: {
          icon: 'src/assets/favicon.ico',
          executableName: 'Electron-Vue-App',
          requestedExecutionLevel: 'requireAdministrator',
        },
        nsis: {
          oneClick: false,
          perMachine: true,
          artifactName:
            'Electron-Vue-AppV${version}_Build${buildVersion}.${ext}',
          uninstallDisplayName: 'Electron-Vue-App ${version}',
          allowToChangeInstallationDirectory: true,
          menuCategory: 'XX科技股份有限公司',
          shortcutName: 'Electron-Vue-App',
        },
      },
      nodeIntegration: true,
    },
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
}
