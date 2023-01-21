<script setup>
import Location from './components/Location.vue'
import Next from './components/Next.vue'
import Timetable from './components/Timetable.vue'
import Navigation from './components/Navigation.vue'
import { ref } from 'vue'
import Schedule from './components/Schedule.vue'

const activeSection = ref('schedule') // todo: home
</script>

<template>
  <div class="wrapper">
    <section class="home" v-if="activeSection === 'home'">
      <Location/>
      <Next/>
      <Timetable/>
    </section>
    <section class="schedule" v-if="activeSection === 'schedule'">
      <Schedule/>
    </section>
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

  @media (max-width: 500px) {
    margin-top: 0;
    margin-bottom: 0;
  }

  .location,
  .next,
  .timetable {
    margin-bottom: 40px;
  }
}

.home {
  padding: 16px 40px 0;
}

.navigation {
  padding: 10px;
}
</style>
