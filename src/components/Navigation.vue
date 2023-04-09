<template>
  <div class="navigation">
    <div @click="$emit('navigate', 'home')" class="navigation__item" :class="{'navigation__item--active': activeSection === 'home'}">
      <IconHome/>
      Главная
    </div>
    <div @click="$emit('navigate', 'schedule')" class="navigation__item" :class="{'navigation__item--active': activeSection === 'schedule'}">
      <IconSchedule/>
      Расписание
    </div>
    <div @click="$emit('navigate', 'settings')" class="navigation__item" :class="{'navigation__item--active': activeSection === 'settings'}">
      <IconSettings/>
      Настройки
    </div>
  </div>
</template>

<script setup>
import IconHome from './icons/IconHome.vue'
import IconSchedule from './icons/IconSchedule.vue'
import IconSettings from './icons/IconSettings.vue'

defineProps({
  activeSection: String,
})
</script>

<style lang="scss">
.navigation {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px 0 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  color: #727088;
  cursor: pointer;
  user-select: none;
  transition: color .2s;

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    letter-spacing: 0.1px;

    svg {
      margin-bottom: 8px;
    }

    &:hover,
    &--active {
      color: #6200EE;
    }
  }
}
</style>