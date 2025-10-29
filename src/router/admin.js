import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/views/admin/AdminLayout.vue'
import AdminLogin from '@/views/admin/AdminLogin.vue'
import AdminMemberManage from '@/views/admin/AdminMemberManage.vue'
import AdminCareerPostManage from '@/views/admin/AdminCareerPostManage.vue'
import AdminCareerCommentManage from '@/views/admin/AdminCareerCommentManage.vue'
import AdminCareerPostDetail from '@/views/admin/AdminCareerPostDetail.vue'

const routes = [
    { path: '/admin/login', component: AdminLogin },
    {
        path: '/admin',
        component: AdminLayout,
        children: [
            { path: 'member', component: AdminMemberManage },
            { path: 'career-info/posts', component: AdminCareerPostManage },
            { path: 'career-info/comments', component: AdminCareerCommentManage },
            { path: 'career-info/posts/:id', component: AdminCareerPostDetail },
        ],
    },
]

export default createRouter({
    history: createWebHistory(),
    routes,
})
