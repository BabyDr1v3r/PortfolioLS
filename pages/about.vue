<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const hobbies = computed(() => [
  { name: t('pages.about.hobbies.item-1'), icon: 'device-gamepad' },
  { name: t('pages.about.hobbies.item-2'), icon: 'motorbike' },
  { name: t('pages.about.hobbies.item-3'), icon: 'ball-football' },
  { name: t('pages.about.hobbies.item-4'), icon: 'book' },
  { name: t('pages.about.hobbies.item-5'), icon: 'swords' },
  { name: t('pages.about.hobbies.item-6'), icon: 'leaf' }
])

const skills = {
  languages: [
    { name: 'TypeScript', icon: 'brand-typescript', color: 'text-blue-500' },
    { name: 'JavaScript', icon: 'brand-javascript', color: 'text-yellow-500' },
    { name: 'CSS', icon: 'brand-css3', color: 'text-blue-500' },
    { name: 'SASS', icon: 'brand-sass', color: 'text-rose-400' }
  ],
  frontend: [
    { name: 'VueJS', icon: 'brand-vue', color: 'text-green-500' },
    { name: 'React', icon: 'brand-react', color: 'text-sky-500' },
    { name: 'Nuxt', icon: 'brand-nuxt', color: 'text-green-500' },
    { name: 'Next.js', icon: 'brand-nextjs', color: 'dark:text-white text-neutral-800' },
    { name: 'TailwindCSS', icon: 'brand-tailwind', color: 'text-sky-500' }
  ],
  backend: [
    { name: 'NestJS', icon: 'cat', color: 'text-red-400' },
    { name: 'Express', icon: 'letter-e', color: 'dark:text-white text-neutral-800' },
    { name: 'Fastify', icon: 'letter-f', color: 'dark:text-white text-neutral-800' },
    { name: 'Node.js', icon: 'brand-nodejs', color: 'text-green-500' }
  ],
  database: [
    { name: 'Prisma', icon: 'brand-prisma', color: 'dark:text-white text-neutral-800' },
    { name: 'MySQL', icon: 'brand-mysql', color: 'text-sky-500' },
    { name: 'PostgreSQL', icon: 'database', color: 'text-sky-500' }
  ],
  testing: [
    { name: 'Jest', icon: 'letter-j', color: 'text-rose-400' },
    { name: 'Vitest', icon: 'brand-vite', color: 'text-amber-500' }
  ],
  tools: [
    { name: 'GitHub', icon: 'brand-github', color: 'dark:text-white text-neutral-800' },
    { name: 'Postman', icon: 'rocket', color: 'text-orange-400' },
    { name: 'Insomnia', icon: 'moon', color: 'text-purple-500' },
    { name: 'Docker', icon: 'brand-docker', color: 'text-blue-500' }
  ]
}
</script>

<template>
  <div class="px-4 text-center my-12 mx-auto max-w-screen-3xl animate-slideIn">
    <h1 class="font-bold text-4xl font-serif">{{ $t('pages.about.title') }}</h1>

    <div class="grid grid-cols-1 md:grid-cols-[20%_50%_auto] gap-4 mt-12 text-neutral-500 dark:text-neutral-400">
        <div class="flex flex-col gap-4">
          <div class="p-4 bg-light-3 dark:bg-dark-3 rounded-lg shadow-lg flex flex-col gap-4 h-fit">
            <h3 class="font-semibold text-xl font-serif text-neutral-600 dark:text-neutral-100">{{ $t('pages.about.introduction.title') }}</h3>
            <p class="text-left text-neutral-500 dark:text-neutral-100" v-html="$t('pages.about.introduction.description').split('. ').join('.<br><br>')" />
          </div>

          <div class="bg-light-3 dark:bg-dark-3 rounded-lg shadow-lg p-4">
            <h2 class="font-semibold text-xl font-serif text-neutral-600 dark:text-neutral-100">{{ $t('pages.about.hobbies.title') }}</h2>
            <ul class="text-lg mt-4 grid grid-cols-2">
              <li
                v-for="hobby in hobbies"
                :key="hobby.name"
                class="flex justify-start items-center"
              >
                <vk-icon :name="hobby.icon" class="text-2xl pr-2" />
                {{ hobby.name }}
              </li>
            </ul>
          </div>

          <div class="bg-light-3 dark:bg-dark-3 rounded-lg shadow-lg p-4">
            <h2 class="font-semibold text-xl font-serif text-neutral-600 dark:text-neutral-100">{{ $t('pages.about.languages.title') }}</h2>
            <ul class="text-lg mt-4 grid grid-cols-2">
              <li class="flex gap-2 justify-start items-center text-neutral-500 dark:text-neutral-300">
                🇦🇷
                {{ $t('pages.about.languages.lang-1.name') }}
                <vk-tag
                  :text="$t('pages.about.languages.lang-1.level')"
                  variant="filled"
                  color="success"
                  size="sm"
                />
              </li>
              <li class="flex gap-2 justify-start items-center">
                🇺🇸
                {{ $t('pages.about.languages.lang-2.name') }}
                <vk-tag
                  :text="$t('pages.about.languages.lang-2.level')"
                  variant="filled"
                  color="info"
                  size="sm"
                />
              </li>
            </ul>
          </div>
        </div>

        <div class="py-4 px-6 bg-light-3 dark:bg-dark-3 rounded-lg shadow-lg h-full flex flex-col">
          <h2 class="font-semibold text-xl font-serif text-neutral-600 dark:text-neutral-100">{{ $t('pages.about.work-experience.title') }}</h2>

          <div class="relative pt-4 grow border-l-2 border-dark-3 dark:border-light-3">
            <div class="space-y-8 mt-4">
              <div class="flex items-center justify-start">
                <div class="w-4 h-4 bg-dark-3 dark:bg-light-3 rounded-full absolute left-0 transform -translate-x-1/2"></div>
                <div class="ml-8 space-y-2 text-left">
                  <h3 class="font-normal text-2xl text-neutral-500 dark:text-neutral-300">
                    {{ $t('pages.about.work-experience.item-1.title') }}
                  </h3>
                  <p class="text-base text-neutral-400 dark:text-gray-400 tracking-wider">
                    {{ $t('pages.about.work-experience.item-1.time') }}
                  </p>
                  <p class="text-neutral-500 dark:text-neutral-300">
                    {{ $t('pages.about.work-experience.item-1.description') }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="p-6 bg-light-3 dark:bg-dark-3 rounded-lg shadow-lg">
          <h2 class="font-semibold text-xl font-serif text-neutral-600 dark:text-neutral-100">{{ $t('pages.about.toolbox.title') }}</h2>
          <div class="grid grid-cols-3 gap-4 mt-4">
            <div v-for="(category, key) in skills" :key="key">
              <h3 class="font-normal text-lg text-neutral-500 dark:text-neutral-300 capitalize text-left">{{ key }}</h3>

              <div class="text-left flex flex-col gap-2">
                <div
                  v-for="(skill, index) in category"
                  :key="index"
                  class="flex items-center gap-2"
                >
                  <vk-icon :name="skill.icon" :class="`text-3xl ${skill.color}`" />
                  <span class="text-lg text-neutral-400 dark:text-neutral-300">{{ skill.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
