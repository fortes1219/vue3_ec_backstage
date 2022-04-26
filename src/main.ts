import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'styles/style.scss'
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus)
app.use(createPinia()) 
app.mount('#app')
