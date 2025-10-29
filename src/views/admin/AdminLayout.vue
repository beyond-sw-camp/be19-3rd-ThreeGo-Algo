<template>
    <div class="admin-layout">
        <aside class="sidebar">
            <div class="logo">
                <img src="@/assets/images/algo_logo.png" alt="ALGO" />
            </div>

            <el-menu :default-active="activeMenu" class="menu" background-color="#0b2447" text-color="#fff"
                active-text-color="#0AA2EB">
                <el-sub-menu index="1">
                    <template #title>
                        <span>회원 관리</span>
                    </template>
                    <el-menu-item index="/admin/member" @click="go('/admin/member')">회원 정보 관리</el-menu-item>
                </el-sub-menu>

                <el-sub-menu index="2">
                    <template #title>
                        <span>알고리즘 학습 관리</span>
                    </template>
                </el-sub-menu>

                <el-sub-menu index="3">
                    <template #title>
                        <span>코딩 관리</span>
                    </template>
                </el-sub-menu>

                <el-sub-menu index="4">
                    <template #title>
                        <span>기업별 정보 관리</span>
                    </template>
                </el-sub-menu>
            </el-menu>
        </aside>

        <main class="content">
            <router-view />
        </main>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const route = useRoute()
const activeMenu = computed(() => route.path)

const go = (path) => router.push(path)
</script>

<style scoped>
.admin-layout {
    display: flex;
    height: 100vh;
    background: #fff;
}

.sidebar {
    width: 230px;
    background: #0b2447;
    color: #fff;
    display: flex;
    flex-direction: column;
    padding-top: 20px;
}

.logo img {
    width: 80px;
    margin: 0 auto 30px;
}

.menu {
    border: none;
}

.content {
    flex: 1;
    padding: 30px;
    overflow-y: auto;
}
</style>
