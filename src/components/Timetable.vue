<template>
  <div class="timetable">
    <div class="timetable__row">
      <span class="timetable__name">Фаджр</span>
      <span class="timetable__time">{{ today.fajr }}</span>
    </div>
    <div class="timetable__row timetable__row--secondary">
      <span class="timetable__name">Восход</span>
      <span class="timetable__time">{{ today.sunset }}</span>
    </div>
    <div class="timetable__row">
      <span class="timetable__name">Зухр</span>
      <span class="timetable__time">{{ today.zuhr }}</span>
    </div>
    <div class="timetable__row">
      <span class="timetable__name">Аср</span>
      <span class="timetable__time">{{ today.asr }}</span>
    </div>
    <div class="timetable__row">
      <span class="timetable__name">Магриб</span>
      <span class="timetable__time">{{ today.maghrib }}</span>
    </div>
    <div class="timetable__row">
      <span class="timetable__name">Иша</span>
      <span class="timetable__time">{{ today.isha }}</span>
    </div>
    <div class="timetable__row timetable__row--secondary">
      <span class="timetable__name">Середина ночи</span>
      <span class="timetable__time">{{ half }}</span>
    </div>
    <div class="timetable__row timetable__row--secondary">
      <span class="timetable__name">Треть ночи</span>
      <span class="timetable__time">{{ third }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { dateToString, stringToDate } from '../composables/useDate.js'

const props = defineProps({
  today: Object,
  tomorrow: Object,
})

const getNightEdges = () => {
  const start = stringToDate(props.today.maghrib)
  const end = stringToDate(props.tomorrow.fajr, 1)

  return { start, end }
}

const half = computed(() => {
  const {start, end} = getNightEdges()

  return dateToString(
      new Date((start.getTime() + end.getTime()) / 2)
  )
})

const third = computed(() => {
  const {start, end} = getNightEdges()

  return dateToString(
      new Date(end.getTime() - ((end.getTime() - start.getTime()) / 3))
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