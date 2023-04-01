<template>
  <section class="home" >
    <Location/>
    <Next/>
    <Timetable @info="showInfo($event)"/>
    <Info
      :active="isInfoVisible"
      :content="infoContent"
      @close="isInfoVisible = false"
    />
  </section>
</template>

<script setup>
import Location from '../Location.vue'
import Next from '../Next.vue'
import Timetable from '../Timetable.vue'
import Info from '../Info.vue'
import { ref } from 'vue'

const isInfoVisible = ref(false)
const infoContent = ref(null)

const showInfo = (content) => {
  infoContent.value = content
  isInfoVisible.value = true
}
</script>

<style>
.home {
  padding: 16px 40px 0;
  position: relative;
}
</style>