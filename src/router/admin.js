import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/views/admin/AdminLayout.vue'
import AdminLogin from '@/views/admin/AdminLogin.vue'
import AdminMemberManage from '@/views/admin/AdminMemberManage.vue'

const routes = [
    { path: '/admin/login', component: AdminLogin },
    {
        path: '/admin',
        component: AdminLayout,
        children: [
            { path: 'member', component: AdminMemberManage },
        ],
    },
]

export default createRouter({
    history: createWebHistory(),
    routes,
})
