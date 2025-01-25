<script setup lang="ts">
const projects = [
  {
    key: 'valkoui',
    title: {
      en: 'ValkoUI Component Library',
      es: 'ValkoUI: Libreria de Componentes'
    },
    img: '/valkoui.jpg',
    tags: ['Vue3', 'TailwindCSS', 'TypeScript', 'Nuxt'],
    description: {
      en: 'A customizable component library built with Vue3, TypeScript, and TailwindCSS.',
      es: 'Una libreria de componentes personalizables creada con Vue3, TypeScript y TailwindCSS.'
    },
    links: {
      github: 'https://github.com/ValkoDevs/valko-ui',
      website: 'https://melodic-entremet-2749be.netlify.app/'
    }
  }
]

const lang = useCookie('lang', {
  default: () => 'en'
})
</script>

<template>
 <header class="absolute w-full">
    <vk-navbar
      floating
      fixed
      color="neutral"
      shape="rounded"
      flat
    >
      <site-links />
    </vk-navbar>
  </header>

  <main class="relative h-screen w-screen pt-20">
    <div class="absolute inset-0 bg-gradient-to-br from-black to-white dark:from-white dark:to-black opacity-50" />

    <div class="text-center relative z-10 mb-12 animate-slideIn">
      <h1 class="text-4xl font-bold">{{  lang === 'en' ? 'My Projects' : 'Mis Proyectos' }}</h1>
      <p class="text-lg mt-2">
        {{ lang === 'en' ? `A showcase of some of the projects I've worked on recently.` : 'Una muestra de algunos de los proyectos en los que he trabajado recientemente.' }}
      </p>
    </div>

    <div class="relative z-10 grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 justify-items-center animate-slideIn">
      <vk-card
        v-for="{ key, title, img, tags, description, links } in projects"
        :key="key"
        size="lg"
        layout="vertical"
        shape="square"
        class="hover:scale-105 transition-all duration-200"
      >
        <vk-card-image :src="img" />
        <vk-card-header>
            {{ lang === 'en' ? title.en : title.es }}
          </vk-card-header>
        <vk-card-body>
          <p class="text-sm mt-2">
            {{ lang === 'en' ? description.en : description.es }}
          </p>
          <div class="mt-4 flex space-x-4">
            <a
              :href="links.github"
              target="_blank"
              class="flex items-center"
            >
              <vk-button
                variant="filled"
                shape="rounded"
                color="neutral"
                flat
                size="sm"
              >
                <vk-icon name="brand-github" class="text-lg mr-2" />
                GitHub
              </vk-button>
            </a>
            <a
              :href="links.website"
              target="_blank"
              class="flex items-center"
            >
              <vk-button
                variant="outlined"
                shape="rounded"
                color="neutral"
                flat
                size="sm"
              >
                <vk-icon name="app-window" class="text-lg mr-2" />
                Demo
              </vk-button>
            </a>
          </div>
        </vk-card-body>
        <vk-card-footer class="flex flex-wrap gap-2 mt-4">
          <vk-tag v-for="tag in tags" :text="tag" variant="ghost" color="neutral" />
        </vk-card-footer>
      </vk-card>
      </div>
  </main>
</template>
