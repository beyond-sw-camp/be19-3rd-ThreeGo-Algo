import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'
import adminRouter from './router/admin.js'

// Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// Element Plus 아이콘
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 전역 스타일
import './assets/main.css'

// 공통 컴포넌트
import CommonComponents from './components/common'

// jQuery
import $ from 'jquery'
window.$ = $
window.jQuery = $

// 앱 생성
const app = createApp(App)
app.use(createPinia())
app.use(router)

// 모든 Element Plus 아이콘 전역 등록
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// ✅ URL 기반 라우터 분기
const isAdminRoute = window.location.pathname.startsWith('/admin')
app.use(isAdminRoute ? adminRouter : router)

// 플러그인 등록
app.use(ElementPlus)
app.use(CommonComponents)

// 마운트
app.mount('#app')
