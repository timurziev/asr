<script setup>
import Next from './components/Next.vue'
import Timetable from './components/Timetable.vue'
import IconLocation from './icons/IconLocation.vue'

import schedule from './data/1.js'
import { ref } from 'vue'

const today = ref(schedule.find(item => item.day === new Date().getDate()))
const tomorrow = ref(schedule.find(item => item.day === new Date().getDate() + 1))
</script>

<template>
  <div class="wrapper">
    <div class="location">
      <icon-location/> Назрань
    </div>
    <next
        :today="today"
    />
    <timetable
        :today="today"
        :tomorrow="tomorrow"
    />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  box-sizing: border-box;
  width: 360px;
  margin: 50px auto;
  background-color: #ffffff;
  color: #000000;
  padding: 50px 40px;

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

.location {
  color: #727088;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-right: 8px;
  }
}
</style>
