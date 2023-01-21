import schedule from '../data/nazran/1.js'
import { ref } from 'vue'
import {stringToDate} from './useDate.js'

const today = ref(schedule.find(item => item.day === new Date().getDate()))
const tomorrow = ref(schedule.find(item => item.day === new Date().getDate() + 1)) // todo: handle last day of month

const startOfNight = ref(stringToDate(today.value.maghrib))
const endOfNight = ref(stringToDate(tomorrow.value.fajr, 1))

const scheduleForMonth = schedule

export function useSchedule() {
  return {
    today,
    tomorrow,
    startOfNight,
    endOfNight,
    scheduleForMonth,
  }
}