<template>
  <div class="next">
    <div class="next__text">Следующая молитва {{ labels[nextLabel] }}</div>
    <div class="next__time">{{ today[nextLabel] }}</div>
    <div class="next__left">Осталось {{ displayLeft }}</div>
  </div>
</template>

<script setup>
import { stringToDate, useDate } from '../composables/useDate.js'
import { computed } from 'vue'

const props = defineProps({
  today: Object,
})

const { now, leftTime } = useDate()

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
      .find(label => now.value <= stringToDate(props.today[label]))
})

const displayLeft = computed(() => leftTime(stringToDate(props.today[nextLabel.value])))
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
  }
}
</style>