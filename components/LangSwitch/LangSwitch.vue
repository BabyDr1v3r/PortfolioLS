<script setup lang="ts">
import type { Item } from '#valkoui'

defineOptions({ name: 'ThemeSwitch' })

const lang = useCookie('lang', {
  default: () => 'en'
})

const langs: ComputedRef<Item[]> = computed(() => {
  return lang.value === 'en'
  ? [
      { key: 'es', title: 'Spanish', onClick: () => lang.value = 'es' },
      { key: 'en', title: 'English', onClick: () => lang.value = 'en' }
    ]
  : [
    { key: 'es', title: 'Español', onClick: () => lang.value = 'es' },
    { key: 'en', title: 'Inglés', onClick: () => lang.value = 'en' }
  ]
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
