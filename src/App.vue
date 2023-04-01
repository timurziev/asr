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
  <div class="wrapper" v-if="loaded">
    <HomeSection
        v-if="activeSection === 'home'"
    />
    <ScheduleSection
        v-if="activeSection === 'schedule'"
    />
    <SettingsSection
        v-if="activeSection === 'settings'"
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
  min-height: 642px;
  padding-bottom: 64px; // for navigation
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
  }
}

.section {
  overflow: hidden;
  &__title {
    margin-bottom: 16px;
    padding: 12px;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.14);
  }
}
</style>
