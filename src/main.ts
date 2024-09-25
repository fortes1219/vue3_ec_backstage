import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/theme-chalk/index.css'
import '/styles/style.scss'
import { createPinia } from 'pinia'
import { elComponents } from '@/plugins/element-plus'
import { ElMessage } from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.config.globalProperties.$message = ElMessage

app.use(router)
app.use(createPinia())
elComponents.forEach((component: any) => {
  app.component(component.name, component)
})

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component as any)
}

app.mount('#app')
