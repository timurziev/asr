import {schedule as scheduleNazran} from '../data/nazran/1'
import {schedule as scheduleDubai} from '../data/dubai/1'
import { computed } from 'vue'
import {stringToDate} from './useDate.js'
import useSettings from './useSettings.js'

const schedule = computed(() => {
  const {settings} = useSettings()

  if (settings.value.location === 'dubai') {
    return scheduleDubai
  }

  return scheduleNazran
})

const today = computed(() => schedule.value.find(item => item.day === new Date().getDate()))
const tomorrow = computed(() => schedule.value.find(item => item.day === new Date().getDate() + 1)) // todo: handle last day of month

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