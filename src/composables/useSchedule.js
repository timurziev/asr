import { computed, ref } from 'vue'
import {stringToDate} from './useDate.js'
import useSettings from './useSettings.js'

const {settings} = useSettings()

const schedule = ref(null)
const tomorrow = ref(null)

loadSchedule().then(value => schedule.value = value)

const today = computed(() => schedule.value.find(item => item.day === new Date().getDate()))
getTomorrowTimes().then(value => tomorrow.value = value)

const startOfNight = computed(() => stringToDate(today.value.maghrib))
const endOfNight = computed(() => stringToDate(tomorrow.value.fajr, 1))

const scheduleForMonth = schedule

export function useSchedule () {
  return {
    today,
    tomorrow,
    startOfNight,
    endOfNight,
    scheduleForMonth,
  }
}

async function loadSchedule(month = null) {
  let currentMonth = month ? month : (new Date()).getMonth() + 1

  const { schedule } = await import(`../data/${settings.value.location}/${currentMonth}.ts`)

  return schedule
}

async function getTomorrowTimes() {
  const dateToday = new Date()
  const dateTomorrow = new Date(dateToday)
  dateTomorrow.setDate(dateTomorrow.getDate() + 1)

  const isLastDayOfMonth = dateToday.getMonth() !== dateTomorrow.getMonth()

  if (isLastDayOfMonth) {
    const nextSchedule = await loadSchedule(dateTomorrow.getMonth() + 1)

    return nextSchedule.find(item => item.day === 1)
  }

  return schedule.value.find(item => item.day === new Date().getDate() + 1)
}