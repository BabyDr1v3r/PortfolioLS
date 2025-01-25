<script setup lang="ts">
const lang = useCookie('lang', {
  default: () => 'en'
})

const hobbies = [
  { en: 'Gaming', es: 'Video Juegos', icon: 'device-gamepad' },
  { en: 'Motorcycling', es: 'Motociclismo', icon: 'motorbike' },
  { en: 'Soccer', es: 'Fútbol', icon: 'ball-football' },
  { en: 'Thriller Books', es: 'Libros de Suspenso', icon: 'book' },
  { en: 'Anime', es: 'Anime', icon: 'swords' }
]

const skills = [
  { name: 'TypeScript', icon: 'brand-typescript' },
  { name: 'VueJS', icon: 'brand-vue' },
  { name: 'GitHub', icon: 'brand-github' },
  { name: 'JavaScript', icon: 'brand-javascript' },
  { name: 'React', icon: 'brand-react' },
  { name: 'TailwindCSS', icon: 'brand-tailwind' },
  { name: 'Express', icon: '' },
  { name: 'Fastify', icon: '' },
  { name: 'NestJS', icon: '' },
  { name: 'Postman', icon: 'rocket' },
  { name: 'Insomnia', icon: 'moon' },
  { name: 'Nuxt', icon: 'brand-nuxt' },
  { name: 'Next.js', icon: 'brand-nextjs' },
  { name: 'MySQL', icon: 'database' },
  { name: 'Node.js', icon: 'brand-nodejs' },
]
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

  <main class="relative h-screen w-screen pt-20 px-4">
    <div class="absolute inset-0 bg-gradient-to-br from-black to-white dark:from-white dark:to-black opacity-50" />

    <div class="px-4 text-center relative z-10 py-4 mx-auto max-w-screen-3xl animate-slideIn">
      <span class="font-bold text-2xl text-light-3">{{ lang === 'en' ? 'About Me' : 'Acerca de Mí' }}</span>

      <!-- Grid Layout -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">

        <!-- Column 1: Software Skills and Languages -->
        <div class="space-y-8">
          <!-- Software Skills -->
          <div class="p-6 bg-light-3 dark:bg-dark-4 rounded-lg shadow-lg">
            <span class="font-semibold text-xl">{{ lang === 'en' ? 'Software Skills' : 'Habilidades de Software' }}</span>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              <div
                v-for="skill in skills"
                :key="skill.name"
                class="flex items-center space-x-2"
              >
                <span class="text-lg">{{ skill.name }}</span>
                <vk-icon :name="skill.icon" class="text-2xl" />
              </div>
            </div>
          </div>

          <!-- Languages -->
          <div class="p-6 bg-light-3 dark:bg-dark-4 rounded-lg shadow-lg">
            <span class="font-semibold text-xl">{{ lang === 'en' ? 'Languages' : 'Idiomas' }}</span>
            <ul class="space-y-2 text-lg mt-4">
              <li>{{ lang === 'en' ? 'English - Fluent' : 'Inglés - Fluido' }}</li>
              <li>{{ lang === 'en' ? 'Spanish - Native' : 'Español - Nativo'}}</li>
            </ul>
          </div>
        </div>

        <!-- Work Experience -->
        <div class="space-y-8">
          <div class="p-6 bg-light-3 dark:bg-dark-4 rounded-lg shadow-lg h-fit">
            <span class="font-semibold text-xl">{{ lang === 'en' ? 'Work Experience' : 'Experiencia Laboral' }}</span>

            <!-- Timeline -->
            <div class="relative pt-4">
              <div class="absolute left-0 top-0 h-full w-px bg-dark-3 dark:bg-light-3"></div>

              <div class="space-y-8 mt-4">
                <div class="flex items-center justify-start">
                  <div class="w-4 h-4 bg-dark-3 dark:bg-light-3 rounded-full absolute left-0 transform -translate-x-1/2"></div>
                  <div class="ml-8 space-y-2 text-left">
                    <span class="font-semibold text-lg">
                      {{ lang === 'en' ? 'Software Engineer at ValkoDevs' : 'Ingeniero de Software en ValkoDevs' }}
                    </span>
                    <p class="text-sm">
                      {{ lang === 'en' ? 'October 2023 - Present' : 'Octubre 2023 - Presente' }}
                    </p>
                    <p>
                      {{ lang === 'en'
                        ? 'Contributed to the development of a component library using Vue.js, TypeScript, and TailwindCSS. Responsible for implementing and testing UI components, ensuring a cohesive design system and efficient workflows.'
                        : 'Contribuí al desarrollo de una librería de componentes utilizando Vue.js, TypeScript y TailwindCSS. Responsable de implementar y probar componentes de UI, asegurando un sistema de diseño coherente y flujos de trabajo eficientes.' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Hobbies -->
          <div class="p-6 bg-light-3 dark:bg-dark-4 rounded-lg shadow-lg">
            <span class="font-semibold text-xl">{{ lang === 'en' ? 'Hobbies' : 'Pasatiempos' }}</span>
            <ul class="space-y-2 text-lg mt-4">
              <li
                v-for="(hobby, index) in hobbies"
                :key="index"
                class="flex px-4 justify-center items-center"
              >
                {{ lang === 'en' ? hobby.en : hobby.es }}
                <vk-icon :name="hobby.icon" class="text-2xl pl-2" :title="lang === 'en' ? hobby.en : hobby.es" />
              </li>
            </ul>
          </div>
        </div>

        <!-- Column 3: Introduction -->
        <div class="p-6 bg-light-3 dark:bg-dark-4 rounded-lg shadow-lg flex flex-col gap-4 h-fit">
          <span class="font-semibold text-xl">{{ lang === 'en' ? 'Who I Am' : 'Quién Soy' }}</span>
          <p class="text-lg text-left whitespace-pre-line">
            {{ lang === 'en'
              ? 'I’m a developer passionate about solving problems and finding solutions that truly work. I enjoy the process of starting a project, tackling challenges, and watching everything come together in the end.\n\nMy detail-oriented nature ensures that the work is not only efficient but also done with high quality from the start.\n\nCollaboration is a key part of my work. I thrive when contributing to teams and bringing projects to life. I’m always eager to learn and adapt, continuously expanding my skills.'
              : 'Soy un desarrollador apasionado por resolver problemas y encontrar soluciones que realmente funcionen. Disfruto el proceso de comenzar un proyecto, superar desafíos y ver cómo todo encaja al final.\n\nMi naturaleza detallista asegura que el trabajo no solo sea eficiente, sino también de alta calidad desde el inicio.\n\nLa colaboración es una parte clave de mi trabajo. Me gusta contribuir en equipos y dar vida a los proyectos. Siempre estoy dispuesto a aprender y adaptarme, ampliando constantemente mis habilidades.' }}
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
