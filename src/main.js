import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import plugins from './plugins/index'

createApp(App).use(router).use(plugins).mount('#app')
