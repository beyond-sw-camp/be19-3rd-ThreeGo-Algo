// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import CommonTestView from '@/views/demo/CommonTestView.vue'

const routes = [
  { path: '/', redirect: '/common-test' },
  { path: '/common-test', name: 'CommonTest', component: CommonTestView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
