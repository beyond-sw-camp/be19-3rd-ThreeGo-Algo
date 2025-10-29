import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'

// ✅ Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// ✅ Element Plus 아이콘
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// ✅ 전역 스타일
import './assets/main.css'

// ✅ 공통 컴포넌트 플러그인
import CommonComponents from './components/common'

// ✅ jQuery & Summernote (게시글 작성용)
import $ from 'jquery'
window.$ = $
window.jQuery = $
import 'summernote/dist/summernote-lite.js'
import 'summernote/dist/summernote-lite.css'

// ------------------------------
// 🚀 Vue 앱 생성
// ------------------------------
const app = createApp(App)

// 상태 관리
app.use(createPinia())

// 라우터
app.use(router)

// Element Plus 등록
app.use(ElementPlus)

// 공통 컴포넌트 등록
app.use(CommonComponents)

// ✅ Element Plus 아이콘 전역 등록
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// ------------------------------
// 앱 마운트
// ------------------------------
app.mount('#app')
