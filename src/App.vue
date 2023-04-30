<script setup>
import HomeSection from './components/sections/HomeSection.vue'
import Navigation from './components/Navigation.vue'
import ScheduleSection from './components/sections/ScheduleSection.vue'
import SettingsSection from './components/sections/SettingsSection.vue'
import { ref } from 'vue'
import { useSchedule } from './composables/useSchedule.js'

const activeSection = ref('home')
const { loaded } = useSchedule()
</script>

<template>
  <div class="wrapper">
    <HomeSection
        v-if="loaded && activeSection === 'home'"
    />
    <ScheduleSection
        v-if="loaded && activeSection === 'schedule'"
    />
    <SettingsSection
        v-if="activeSection === 'settings'"
    />

    <div v-if="!loaded && activeSection !== 'settings'"
         class="not-loaded-alert"
         v-text="'Загрузка...'"
    />

    <Navigation
        :active-section="activeSection"
        @navigate="activeSection = $event"
    />
  </div>
</template>

<style lang="scss">
.wrapper {
  margin: 0 auto;
  width: 360px;
  box-sizing: border-box;
  background-color: #ffffff;
  color: #000000;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  padding-bottom: 74px; // for navigation
  position: relative;

  @media (max-width: 500px) {
    width: auto;
    margin-top: 0;
    margin-bottom: 0;
  }

  .location,
  .next,
  .timetable {
    margin-bottom: 40px;

    @media (max-height: 700px) {
      margin-bottom: 35px;
    }
  }
}

.section {
  overflow: hidden;
  &__title {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: #ffffff;
    margin-bottom: 16px;
    padding: 12px;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.14);
  }
}

.not-loaded-alert {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
