import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'

createApp(App).mount('#app')


// Vanilla

function debounce (f, ms) {
  let isCoolDown = false

  return function () {
    if (isCoolDown) return

    f.apply(this, arguments)

    isCoolDown = true

    setTimeout(() => isCoolDown = false, ms)
  }
}

function setVh () {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVh()

window.addEventListener('resize', debounce(setVh, 500));
