<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const projects = computed(() => [
  {
    key: 'valkoui',
    title: t('pages.projects.item-1.title'),
    img: '/valkoui.jpg',
    tags: ['Vue3', 'TailwindCSS', 'TypeScript', 'Nuxt'],
    description: t('pages.projects.item-1.description'),
    links: {
      github: 'https://github.com/ValkoDevs/valko-ui',
      website: 'https://melodic-entremet-2749be.netlify.app/'
    }
  }
])

const lang = useCookie('lang', {
  default: () => 'en'
})
</script>

<template>
  <div class="text-center my-12 animate-slideIn">
    <h1 class="text-4xl font-bold font-serif">{{  $t('pages.projects.title') }}</h1>
    <p class="text-lg mt-2">
      {{ $t('pages.projects.subtitle') }}
    </p>
  </div>

  <div class="relative z-10 grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 justify-items-center animate-slideIn">
    <vk-card
      v-for="{ key, title, img, tags, description, links } in projects"
      :key="key"
      size="lg"
      layout="vertical"
    >
      <vk-card-image :src="img" />
      <vk-card-header>
          {{ title }}
        </vk-card-header>
      <vk-card-body>
        <p class="text-sm mt-2 text-gray-500 dark:text-neutral-400">
          {{ description }}
        </p>
        <div class="mt-4 flex space-x-4">
          <a
            :href="links.github"
            target="_blank"
            class="flex items-center"
          >
            <vk-button
              variant="ghost"
              shape="rounded"
              color="neutral"
              flat
              condensed
              class="flex gap-2 px-2"
            >
              <vk-icon name="brand-github" class="text-lg" />
              GitHub
              <vk-icon name="external-link" class="text-lg" />
            </vk-button>
          </a>
          <a
            :href="links.website"
            target="_blank"
            class="flex items-center"
          >
            <vk-button
              variant="ghost"
              shape="rounded"
              color="neutral"
              flat
              condensed
              size="md"
              class="flex gap-2 px-2"
            >
              <vk-icon name="app-window" class="text-lg" />
              Demo
              <vk-icon name="external-link" class="text-lg" />
            </vk-button>
          </a>
        </div>
      </vk-card-body>
      <vk-card-footer class="flex flex-wrap gap-2 mt-4">
        <vk-tag v-for="tag in tags" :text="tag" variant="ghost" color="neutral" />
      </vk-card-footer>
    </vk-card>
    </div>
</template>
