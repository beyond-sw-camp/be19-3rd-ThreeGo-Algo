import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// Element Plus 아이콘
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 전역 스타일 (선택사항)
import './assets/main.css'

// Vue 앱 생성
const app = createApp(App)

// 모든 Element Plus 아이콘을 전역 등록
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 플러그인 등록
app.use(ElementPlus)
app.use(router)

// 마운트
app.mount('#app')
