export default {
  install: (app) => {
    const files = require.context('./modules', false, /\.js$/)

    files.keys().forEach((key) => {
      app.use(files(key).default)
    })
  },
}
