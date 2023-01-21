import { ref } from 'vue'

const now = ref(new Date())

setInterval(() => {now.value = new Date()}, 10000)

export function useDate() {
  const leftTime = (to) => {
    let milliseconds = to - now.value
    let minutes = milliseconds / 1000 / 60

    return padAndConcatTime(
      Math.floor(minutes / 60), // hours
      Math.floor(minutes % 60) // minutes
    )
  }

  return {
    now,
    leftTime
  }
}

/**
 * Converts Date instance to time string in format "hh:mm"
 */
export function dateToString (date) {
  return padAndConcatTime(
    date.getHours(),
    date.getMinutes()
  )
}

/**
 * Converts time string in format "hh:mm" to Date instance
 */
export function stringToDate(string, dayShift = 0) {
  const currentDate = new Date()
  const split = String(string).split(':')

  return new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() + dayShift,
    Number(split[0]), // hours
    Number(split[1]) // minutes
  )
}

export function padAndConcatTime(hours, minutes) {
  let hh = String(hours).padStart(2, '0')
  let mm = String(minutes).padStart(2, '0')

  return `${hh}:${mm}`
}