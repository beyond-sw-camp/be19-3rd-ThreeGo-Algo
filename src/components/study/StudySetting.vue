<template>
  <div class="study-setting">
    <div class="header">
      <div class="top-line"></div>
      <h1 class="title">설정</h1>
    </div>

    <!-- 관리자 메뉴 -->
    <div v-if="userRole === 'admin'" class="menu-list">
      <div 
        v-for="(item, index) in adminMenuItems" 
        :key="item.id"
        class="menu-item"
        @click="handleNavigation(item.route)"
      >
        <span 
          class="menu-title"
          :class="{ active: selectedRoute === item.route }"
        >
          {{ item.title }}
        </span>
      </div>
    </div>

    <!-- 멤버 메뉴 -->
    <div v-if="userRole === 'member'" class="menu-list">
      <div 
        class="menu-item" 
        @click="handleNavigation(memberMenuItem.route)"
      >
        <span 
          class="menu-title"
          :class="{ active: selectedRoute === memberMenuItem.route }"
        >
          {{ memberMenuItem.title }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudySetting',
  props: {
    userRole: {
      type: String,
      required: true,
      validator: (value) => ['admin', 'member'].includes(value)
    },
    currentRoute: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selectedRoute: '', 
      adminMenuItems: [
        { id: 1, title: '스터디원 관리', route: '/study/settings/member' },
        { id: 2, title: '로드맵 및 마일스톤 관리', route: '/study/settings/roadmap' },
        { id: 3, title: '스터디 해체', route: '/study/settings/disband' }
      ],
      memberMenuItem: { 
        id: 4, 
        title: '스터디 탈퇴', 
        route: '/study/settings/leave' 
      }
    };
  },
  mounted() {
    this.selectedRoute = this.currentRoute || this.$route.path;
  },
  watch: {
    '$route.path'(newPath) {
      this.selectedRoute = newPath;
    },
    currentRoute(newRoute) {
      if (newRoute) {
        this.selectedRoute = newRoute;
      }
    }
  },
  methods: {
    handleNavigation(route) {
      this.selectedRoute = route;
      this.$router.push(route);
    }
  }
};
</script>

<style scoped>
.study-setting {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  width: 200px; 
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
}

.top-line {
  width: 100%;
  height: 2px;
  background-color: #0AA2EB;
  margin-bottom: 12px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #383838;
  margin-left: 10px;
}

.menu-list {
  width: 200px;
  margin-left: 20px; 
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.menu-item:hover {
  opacity: 0.8;
}

.menu-title {
  font-size: 16px;
  color: #CFCFCF;
  transition: color 0.2s;
}

.menu-title.active {
  color: #0AA2EB;
}
</style>
