<template>
  <footer class="footer-container">
    <div class="footer-grid">
      <div class="footer-column">
        <img :src="logo" class="footer-logo" />

        <div class="footer-links">
          <a href="#" @click.prevent="openTerms">이용약관 및 개인정보처리방침</a>
          <a href="#" @click.prevent="openLicense">오픈소스 라이선스</a>
        </div>

        <p class="footer-copyright">
          © 2025 ThreeGo All rights reserved.
        </p>
      </div>

      <div class="footer-column">
        <h4>Contact</h4>
        <p class="footer-contact">team.threego@gmail.com</p>
      </div>

      <div class="footer-column">
        <h4>Socials</h4>
        <ul class="footer-team-list">
          <li v-for="(member, index) in teamMembers" :key="index" class="team-member">
            <a :href="member.github" target="_blank">
              {{ member.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup>
import logo from '@/assets/images/algo_logo.png'
import { reactive } from 'vue'

const teamMembers = reactive([
  { name: 'rosieisor', github: 'https://github.com/rosieisor' },
  { name: 'ghi512', github: 'https://github.com/ghi512' },
  { name: 'HoodRyan', github: 'https://github.com/HoodRyan' },
  { name: 'YujinJeong1006', github: 'https://github.com/YujinJeong1006' },
  { name: 'huni2', github: 'https://github.com/huni2' },
])

const openTerms = () => {
  window.open('/algo-terms', '_blank', 'noopener,noreferrer')
}

const openLicense = () => {
  window.open('/open-source-license', '_blank', 'noopener,noreferrer')
}
</script>

<style scoped>
.footer-container {
  background-color: #f1efee;
  padding: 40px;
  color: #383838;
  font-family: 'Noto Sans KR', sans-serif;
}

.footer-grid {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 40px;
}

.footer-column {
  display: flex;
  flex-direction: column;
  font-size: 11px;
}

.footer-logo {
  width: 80px;
  margin-bottom: 15px;
}

.footer-links a,
.footer-contact,
.footer-team-list a {
  font-size: 11px;
  color: #383838;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-links a:hover,
.footer-team-list a:hover,
.team-member a:hover {
  color: #0aa2eb;
}

.footer-links a {
  margin-right: 15px;
}

.footer-contact {
  font-size: 11px;
  padding: 0;
  margin: 0;
}

.footer-team-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.team-member {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.team-member a {
  font-size: 11px;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
