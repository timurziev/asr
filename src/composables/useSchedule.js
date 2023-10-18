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

setVariables().then(() => {})

export function useSchedule () {
  return {
    loaded,
    today,
    tomorrow,
    startOfNight,
    endOfNight,
    scheduleForMonth: schedule,
    loadSchedule,
    setVariables,
  }
}

async function loadSchedule(month = null) {
  if (!month) {
    month = (new Date()).getMonth() + 1 // if month is not passed use current month
  }

  let location = settings.value.location

  const modules = await import(`../data/${location}/${month}.ts`)

  console.info(`Loaded schedule for: ${location}. Month: ${month}`)

  return modules.schedule
}

async function setVariables () {
  try {
    schedule.value = await loadSchedule()
  } catch (exception) {
    // If failed to load schedule reset the variables to their initial values and leave the function
    loaded.value = false
    schedule.value = today.value = tomorrow.value = startOfNight.value = endOfNight.value = null

    console.error(`Failed to load schedule for: ${settings.value.location}`)

    return
  }

  today.value = schedule.value.find(item => item.day === new Date().getDate())

  tomorrow.value = await getTomorrowTimes()

  startOfNight.value = stringToDate(today.value.maghrib)
  endOfNight.value = stringToDate(tomorrow.value.fajr, 1)

  loaded.value = true
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