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