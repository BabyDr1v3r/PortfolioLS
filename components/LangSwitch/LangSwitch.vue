<script setup lang="ts">
import type { Item } from '#valkoui'

defineOptions({ name: 'LangSwitch' })

const { locale, locales, setLocale } = useI18n()

const language = computed({
  get: () => locale.value,
  set: (value: typeof locales.value[number]['code']) => setLocale(value)
})

const langs: Item[] = locales.value.map((localeData) => {
  return {
    key: localeData.code,
    title: localeData.name || localeData.code,
    icon: 'home',
    onClick: () => language.value = localeData.code
  }
})
</script>

<template>
  <vk-dropdown :items="langs" label="lang" size="sm" variant="link" shape="rounded">
    <!-- <template #dropdown-trigger>
      <vk-button
        variant="link"
        shape="rounded"
        color="surface"
        condensed
        size="lg"
        class="size-10 z-50"
      >
        <vk-icon
          name="language"
          class="text-2xl px-2"
        />
      </vk-button>
    </template> -->
  </vk-dropdown>
</template>
