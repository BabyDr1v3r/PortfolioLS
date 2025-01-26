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
    onClick: () => language.value = localeData.code
  }
})
</script>

<template>
  <vk-dropdown :items="langs">
    <template #dropdown-trigger>
      <vk-button
        variant="link"
        shape="rounded"
        color="neutral"
        condensed
        size="lg"
        class="size-10"
      >
        <vk-icon
          name="language"
          class="text-2xl"
        />
      </vk-button>
    </template>
  </vk-dropdown>
</template>
