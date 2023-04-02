<template>
  <div class="next">
    <div class="next__text">Следующая молитва {{ nextPrayerName }}</div>
    <div class="next__time">{{ time }}</div>
    <div class="next__left">Осталось {{ displayLeft }}</div>
  </div>
</template>

<script setup>
import { stringToDate, useDate } from '../composables/useDate.js'
import { computed } from 'vue'
import { useSchedule } from '../composables/useSchedule.js'

const { now, leftTime } = useDate()
const { today, tomorrow } = useSchedule()

const labels = {
  fajr: 'Фаджр',
  sunset: 'Рассвет',
  zuhr: 'Зухр',
  asr: 'Аср',
  maghrib: 'Магриб',
  isha: 'Иша',
}

let nextLabel = computed(() => {
  return Object.keys(labels)
      .find(label => now.value <= stringToDate(today.value[label]))
})

const nextPrayerName = computed(() => labels[nextLabel.value ? nextLabel.value : 'fajr'])
const time = computed(() => {
  return nextLabel.value
      ? today.value[nextLabel.value]
      : tomorrow.value['fajr']
})

const displayLeft = computed(() => {
  return leftTime(
      stringToDate(time.value, nextLabel.value ? 0 : 1)
  )
})
</script>

<style lang="scss">
.next {
  font-size: 14px;
  text-align: center;

  &__text {
    margin-bottom: 10px;
  }

  &__time {
    font-weight: 300;
    font-size: 80px;
    line-height: 1;
    margin-bottom: 10px;

    @media (max-height: 600px) {
      font-size: 70px;
    }
  }
}
</style>