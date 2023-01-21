<template>
  <div class="location">
    <IconLocation/>
    Назрань
  </div>
</template>

<script setup>
import IconLocation from '../icons/IconLocation.vue'
</script>

<style lang="scss">
.location {
  color: #727088;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-right: 8px;
  }
}
</style>