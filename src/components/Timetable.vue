<template>
  <div class="timetable">
    <div class="timetable__row">
      <span>Фаджр</span>
      <span>{{ today.fajr }}</span>
    </div>
    <div class="timetable__row timetable__row--secondary">
      <span>Восход</span>
      <span>{{ today.sunset }}</span>
    </div>
    <div class="timetable__row">
      <span>Зухр</span>
      <span>{{ today.zuhr }}</span>
    </div>
    <div class="timetable__row">
      <span>Аср</span>
      <span>{{ today.asr }}</span>
    </div>
    <div class="timetable__row">
      <span>Магриб</span>
      <span>{{ today.maghrib }}</span>
    </div>
    <div class="timetable__row">
      <span>Иша</span>
      <span>{{ today.isha }}</span>
    </div>
    <div class="timetable__row timetable__row--secondary">
      <span>Середина ночи</span>
      <span>{{ half }}</span>
    </div>
    <div class="timetable__row timetable__row--secondary">
      <span>Треть ночи</span>
      <span>{{ third }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { dateToString } from '../composables/useDate.js'
import { useSchedule } from '../composables/useSchedule.js'

const { today, startOfNight, endOfNight } = useSchedule()

let startTimestamp = startOfNight.value.getTime()
let endTimestamp = endOfNight.value.getTime()

const half = computed(() => {
  return dateToString(
      new Date((startTimestamp + endTimestamp) / 2)
  )
})

const third = computed(() => {
  return dateToString(
      new Date(endTimestamp - ((endTimestamp - startTimestamp) / 3))
  )
})
</script>

<style lang="scss">
.timetable {
  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    font-weight: 500;

    &:not(:last-child) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    }

    &--secondary {
      font-weight: 400;
      color: #727088;
    }
  }
}
</style>