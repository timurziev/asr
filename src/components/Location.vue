<template>
  <div class="location">
    <IconLocation/>
    {{ displayLocation }}
  </div>
</template>

<script setup>
import IconLocation from './icons/IconLocation.vue'
import useSettings from '../composables/useSettings.js'
import { ref } from 'vue'

const { settings } = useSettings()

const cities = {
  nazran: 'Назрань',
  dubai: 'Дубай',
}

const displayLocation = ref(cities[settings.value.location])
</script>

<style lang="scss">
.location {
  color: var(--secondary-color);
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-right: 8px;
  }
}
</style>