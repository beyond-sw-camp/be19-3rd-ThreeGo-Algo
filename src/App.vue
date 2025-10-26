<template>
  <div id="app" :class="{ 'full-page': hideHeaderFooter }">
    <!-- 회원가입, 로그인 페이지는 제외-->
    <Header v-if="!hideHeaderFooter" />

    <main class="main-content">
      <router-view />
    </main>

    <Footer v-if="!hideHeaderFooter" /> 
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/common/Header.vue'
import Footer from './components/common/Footer.vue'

const route = useRoute()

const hideHeaderFooter = computed(() => {
  return route.path === '/signup' || route.path === '/login'
})

watch(hideHeaderFooter, (val) => {
  document.body.style.paddingTop = val ? '0px' : '70px'
}, { immediate: true })

</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff;
}


#app.full-page {
  display: block;  
  min-height: 100vh;
  padding: 0;
  margin: 0;
}

#app.full-page .main-content {
  flex: none; 
  min-height: 100vh;
}

.main-content {
  flex: 1;
  background-color: #ffffff;
}
</style>