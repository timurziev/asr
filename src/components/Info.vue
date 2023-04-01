<template>
  <div class="info" :class="{'info--active': active}" ref="wrapperElement">
    <div class="info__content" ref="contentElement">
      <div
          class="info__title"
          v-text="content ? content.title : ''"
      />
      <div
          class="info__text"
          v-html="content ? content.text : ''"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  active: Boolean,
  content: Object,
})

const emit = defineEmits(['close'])

const contentElement = ref(null)
const wrapperElement = ref(null)

document.addEventListener('click', event => {
  if (!wrapperElement.value || !contentElement.value) return

  if (
      !contentElement.value.contains(event.target)
      && wrapperElement.value.contains(event.target)
  ) {
    emit('close')
  }
})
</script>

<style lang="scss">
.info {
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  visibility: hidden;
  transition: opacity .3s;

  &--active {
    opacity: 1;
    visibility: visible;

    .info__content {
      transform: translateY(0);
    }
  }

  &__content {
    background: #ffffff;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 40px 40px 0;
    box-sizing: border-box;
    transform: translateY(30px);
    transition: transform .2s ease-out;

    p {
      margin: 0;
      text-indent: 20px;
    }
  }

  &__title {
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 20px;
  }

  &__text {
    font-weight: 400;
    font-size: 14px;
    line-height: 1.42;
    color: #727088;
  }
}
</style>