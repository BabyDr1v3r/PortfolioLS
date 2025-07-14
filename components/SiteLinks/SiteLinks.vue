<script setup lang="ts">
defineOptions({ name: 'SiteLinks' })

const route = useRoute()
</script>

<template>
  <nav class="flex w-full">
    <div class="flex items-center gap-4">
      <a href="#hero" class="flex items-center mr-auto">
        <vk-avatar src="/profile.png" shape="rounded" size="xs" flat />
      </a>

      <ul class="flex gap-2">
        <li>
          <a href="#hero">
            <vk-button
              variant="link"
              shape="rounded"
              :color="route.hash === '#hero' ? 'primary' : 'neutral'"
              size="sm"
            >
              {{ $t('components.site-links.home') }}
            </vk-button>
          </a>
        </li>
        <li>
          <a href="#projects">
            <vk-button
              variant="link"
              shape="rounded"
              :color="route.hash === '#projects' ? 'primary' : 'neutral'"
              size="sm"
            >
              {{ $t('components.site-links.projects') }}
            </vk-button>
          </a>
        </li>
        <li>
          <a href="#about">
            <vk-button
              variant="link"
              shape="rounded"
              :color="route.hash === '#about' ? 'primary' : 'neutral'"
              size="sm"
            >
              {{ $t('components.site-links.about') }}
            </vk-button>
          </a>
        </li>
        <li>
          <a href="#contact">
            <vk-button
              variant="link"
              shape="rounded"
              :color="route.hash === '#contact' ? 'primary' : 'neutral'"
              size="sm"
            >
              {{ $t('components.site-links.contact') }}
            </vk-button>
          </a>
        </li>
      </ul>
    </div>

    <div class="flex items-center gap-2 ml-auto">
      <theme-switch />
      <lang-switch />
      <a
        href="https://github.com/BabyDr1v3r"
        target="_blank"
        class="flex items-center"
      >
        <vk-button
          variant="link"
          shape="rounded"
          color="neutral"
          condensed
          size="lg"
          class="size-10"
        >
          <vk-icon
            name="brand-github"
            class="text-2xl"
          />
        </vk-button>
      </a>
      <a
        href="https://www.linkedin.com/in/exequiel-segura/"
        target="_blank"
        class="flex items-center"
      >
        <vk-button
          variant="link"
          shape="rounded"
          color="neutral"
          condensed
          size="lg"
          class="size-10"
        >
          <vk-icon
            name="brand-linkedin"
            class="text-2xl"
          />
        </vk-button>
      </a>
    </div>
  </nav>
</template>
