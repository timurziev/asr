<template>
  <section class="section">
    <div class="section__title">Настройки</div>
    <div class="settings-content">
      <div class="form-group">
        <div class="form-group__title">Город:</div>
        <select
            class="select"
            v-model="settings.location"
            @change="onSelectChange"
        >
          <option value="nazran">Назрань</option>
          <option value="dubai">Дубай</option>
        </select>
      </div>
      <div class="form-group">
        <div class="form-group__title">Тема:</div>
        <select
            class="select"
            v-model="settings.theme"
            @change=""
        >
          <option value="light">Светлая</option>
          <option value="dark">Тёмная</option>
          <option value="adaptive">Светлая днём, тёмная ночью</option>
        </select>
      </div>
      <div class="form-group form-group--checkbox">
        <input
            type="checkbox"
            class="checkbox"
            id="showDuhaa"
            v-model="settings.showDuhaa"
        >
        <label
            class="form-group__label"
            for="showDuhaa"
            v-text="'Показывать время Ад-Духа'"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import useSettings from '../../composables/useSettings.js'
import { useSchedule } from '../../composables/useSchedule.js'

const { settings } = useSettings()

const onSelectChange = async () => {
  const { setVariables } = useSchedule()
  await setVariables()
}
</script>

<style lang="scss">
.form-group {
  display: block;

  &--checkbox {
    display: flex;
    align-items: center;
  }

  &__title,
  &__label {
    font-weight: 500;
    font-size: 14px;
    color: var(--secondary-color);
  }

  &__title {
    margin-bottom: 12px;
  }

  &__label {
    margin-left: 12px;
    user-select: none;
    cursor: pointer;
  }

  &:not(:last-child) {
    margin-bottom: 32px;
  }
}

.settings-content {
  padding: 16px 16px 32px;
}

.select {
  width: 100%;
  padding: 12px 8px;
  border: 1px solid #727088;
  font-weight: 500;
}

.checkbox {
  width: 32px;
  height: 32px;
  margin: 0;
}
</style>