import { ref } from 'vue'
import {stringToDate} from './useDate.js'
import useSettings from './useSettings.js'

const {settings} = useSettings()

const loaded = ref(false)
const schedule = ref(null)
const today = ref(null)
const tomorrow = ref(null)
const startOfNight = ref(null)
const endOfNight = ref(null)

loadSchedule().then(() => {})

export function useSchedule () {
  return {
    loaded,
    today,
    tomorrow,
    startOfNight,
    endOfNight,
    scheduleForMonth: schedule,
    loadSchedule,
  }
}

async function loadSchedule(month = null) {
  let currentMonth = month ? month : (new Date()).getMonth() + 1
  let location = settings.value.location

  const modules = await import(`../data/${location}/${currentMonth}.ts`)

  schedule.value = modules.schedule

  console.info(`Loaded schedule for: ${location}. Month: ${currentMonth}`)
  await setVariables()
  loaded.value = true
}

async function setVariables () {
  today.value = schedule.value.find(item => item.day === new Date().getDate())

  tomorrow.value = await getTomorrowTimes()

  startOfNight.value = stringToDate(today.value.maghrib)
  endOfNight.value = stringToDate(tomorrow.value.fajr, 1)
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