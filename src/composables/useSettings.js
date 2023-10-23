import { ref, watch } from 'vue'

const defaults = {
  version: 4,
  location: 'nazran',
  showDuhaa: true,
  theme: 'light',
}

const storageSettingsString = localStorage.getItem('settings')
const storageSettings = storageSettingsString ? JSON.parse(storageSettingsString) : null

function getSettings () {
  // If no settings stored use defaults
  if (!storageSettings) {
    return defaults
  }

  // If settings with the same version stored use them
  if (storageSettings.version === defaults.version) {
    return storageSettings
  }

  // Otherwise merge the settings
  let mergedSettings = {}

  for (const [key, value] of Object.entries(defaults)) {
    if (key === 'version') {
      mergedSettings[key] = value
    } else {
      mergedSettings[key] = key in storageSettings ? storageSettings[key] : value
    }
  }

  return mergedSettings
}

const settings = ref(getSettings())

watch(settings.value, newValue => localStorage.setItem('settings', JSON.stringify(newValue)))

export default function useSettings () {
  return {
    settings
  }
}