<template>
  <section class="home" >
    <Location/>
    <Next/>
    <Timetable/>
  </section>
</template>

<script setup>
import Location from '../Location.vue'
import Next from '../Next.vue'
import Timetable from '../Timetable.vue'
</script>

<style>
.home {
  padding: 16px 40px 0;
}
</style>