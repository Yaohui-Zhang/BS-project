import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 全局样式引入
import './assets/style/index.scss'

// 导入需要注册的el-icon
import iconObj from './plugins/elementplus'

import { createPinia } from 'pinia'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)

for (const key in iconObj) {
  app.component(key, iconObj[key])
}

app.use(router).mount('#app')
