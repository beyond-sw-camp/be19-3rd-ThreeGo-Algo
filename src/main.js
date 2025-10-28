import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// Element Plus 아이콘
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 전역 스타일 (통합)
import './assets/main.css'

// 공통 컴포넌트 자동 등록
import CommonComponents from './components/common'

// jQuery (main 브랜치 유지)
window.$ = $
window.jQuery = $

// Vue 앱 생성
const app = createApp(App)
app.use(createPinia())
app.use(router)

// 모든 Element Plus 아이콘 전역 등록
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 플러그인 등록
app.use(router)
app.use(ElementPlus)
app.use(CommonComponents)

// 앱 마운트
app.mount('#app')
