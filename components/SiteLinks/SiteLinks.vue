<script setup lang="ts">
defineOptions({ name: 'SiteLinks' })

const lang = useCookie('lang', {
  default: () => 'en'
})

const route = useRoute()
</script>

<template>
  <div class="flex w-full">
    <nuxt-link to="/" class="flex items-center mr-auto">
      <vk-avatar src="/profile.png" shape="rounded" size="xs" flat />
    </nuxt-link>

    <ul class="flex gap-4 mx-auto">
      <li>
        <nuxt-link to="/home">
          <vk-button
            variant="link"
            shape="rounded"
            :color="route.fullPath === '/home' ? 'primary' : 'neutral'"
            size="sm"
          >
            {{ lang === 'en' ? 'Home' : 'Inicio' }}
          </vk-button>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/projects">
          <vk-button
            variant="link"
            shape="rounded"
            :color="route.fullPath.startsWith('/projects') ? 'primary' : 'neutral'"
            size="sm"
          >
            {{ lang === 'en' ? 'Projects' : 'Proyectos' }}
          </vk-button>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/about">
          <vk-button
            variant="link"
            shape="rounded"
            :color="route.fullPath.startsWith('/about') ? 'primary' : 'neutral'"
            size="sm"
          >
            {{ lang === 'en' ? 'About' : 'Acerca de Mí' }}
          </vk-button>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/contact">
          <vk-button
            variant="link"
            shape="rounded"
            :color="route.fullPath.startsWith('/contact') ? 'primary' : 'neutral'"
            size="sm"
          >
            {{ lang === 'en' ? 'Contact' : 'Contacto' }}
          </vk-button>
        </nuxt-link>
      </li>
    </ul>

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
  </div>
</template>
