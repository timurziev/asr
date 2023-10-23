<template>
  <div class="timetable">
    <div class="timetable__row">
      <span>Фаджр</span>
      <span class="timetable__time">{{ today.fajr }}</span>
    </div>
    <div class="timetable__row timetable__row--secondary">
      <div class="timetable__label">
        <span>Рассвет</span>
        <icon-question @click="showInfo('sunrise')"/>
      </div>
      <span class="timetable__time">{{ today.sunrise }}</span>
    </div>
    <div
        v-if="settings.showDuhaa"
        class="timetable__row timetable__row--secondary"
    >
      <span>Духа</span>
      <span
          class="timetable__time"
          v-text="`${duhaa.start} — ${duhaa.end}`"
      />
    </div>
    <div class="timetable__row">
      <span>Зухр</span>
      <span class="timetable__time">{{ today.zuhr }}</span>
    </div>
    <div class="timetable__row">
      <span>Аср</span>
      <span class="timetable__time">{{ today.asr }}</span>
    </div>
    <div class="timetable__row">
      <span>Магриб</span>
      <span class="timetable__time">{{ today.maghrib }}</span>
    </div>
    <div class="timetable__row">
      <span>Иша</span>
      <span class="timetable__time">{{ today.isha }}</span>
    </div>
    <div class="timetable__row timetable__row--secondary">
      <div class="timetable__label">
        <span>Середина ночи</span>
        <icon-question @click="showInfo('half')"/>
      </div>
      <span class="timetable__time">{{ half }}</span>
    </div>
    <div class="timetable__row timetable__row--secondary">
      <div class="timetable__label">
        <span>Треть ночи</span>
        <icon-question @click="showInfo('third')"/>
      </div>
      <span class="timetable__time">{{ third }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { dateToString, stringToDate } from '../composables/useDate.js'
import { useSchedule } from '../composables/useSchedule.js'
import IconQuestion from './icons/IconQuestion.vue'
import useSettings from '../composables/useSettings.js'

const emit = defineEmits([
  'info',
])

const { today, startOfNight, endOfNight } = useSchedule()
const { settings } = useSettings()

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

const duhaa = computed(() => {
  const afterSunrise = 20
  const beforeZuhr = 5

  return {
    start: dateToString(new Date(stringToDate(today.value.sunrise).getTime() + afterSunrise * 60000)),
    end: dateToString(new Date(stringToDate(today.value.zuhr).getTime() - beforeZuhr * 60000)),
  }
})

const showInfo = (type) => {
  const contents = {
    sunrise: {
      title: 'Рассвет',
      text: '<p>Утренняя молитва (Фаджр) должна быть совершена до наступления времени рассвета.</p>',
    },
    half: {
      title: 'Середина ночи',
      text: '<p>Ночную молитву (Иша) следует совершить до наступления середины ночи.</p>' +
          '<p>По мнению некоторых ученых, выполнение этой молитвы после середины ночи является <strong>нежелательным</strong>. ' +
          'По другому мнению она <strong>обязательно</strong> должна быть выполнена до наступления середины ночи.</p>',
    },
    third: {
      title: 'Последняя треть ночи',
      text: '<p>Передают со слов Абу Хурайры, да будет доволен им Аллах, что Посланник Аллаха, да благословит его Аллах и приветствует, сказал:</p>' +
          '<p>«С наступлением последней трети каждой ночи Всеблагой и Всевышний Господь наш нисходит к нижнему небу, говоря: </p>' +
          '<p><strong>«Кто станет обращаться ко Мне с мольбами, чтобы Я ответил ему? Кто станет просить Меня (о чём-нибудь), ' +
          'чтобы Я даровал ему (это)? Кто станет молить Меня о прощении, чтобы Я простил его?»</strong>»</p>',
    }
  }

  emit('info', contents[type])
}
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
      border-bottom: 1px solid var(--border-color);
    }

    &--secondary {
      font-weight: 400;
      color: var(--secondary-color);
    }
  }
  &__label {
    display: inline-flex;
    align-items: center;

    svg {
      display: block;
      margin-left: 10px;
      position: relative;
      top: -0.5px;
    }
  }
  &__time {
    font-feature-settings: 'tnum' on, 'lnum' on;
    font-size: 14px;
  }
}
</style>