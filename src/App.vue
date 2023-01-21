<script setup>
import Location from './components/Location.vue'
import Next from './components/Next.vue'
import Timetable from './components/Timetable.vue'
</script>

<template>
  <div class="wrapper">
    <Location/>
    <Next/>
    <Timetable/>
  </div>
</template>

<style lang="scss">
.wrapper {
  margin: 0 auto;
  width: 360px;
  padding: 16px 40px 40px;
  box-sizing: border-box;
  background-color: #ffffff;
  color: #000000;

  @media (max-width: 500px) {
    margin-top: 0;
    margin-bottom: 0;
  }

  .location {
    margin-bottom: 40px;
  }

  .next {
    margin-bottom: 40px;
  }
}
</style>
