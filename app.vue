<script setup lang="ts">
import './assets/styles.css'
import emailjs from '@emailjs/browser'
import type { Color, NotificationProps } from '@valko-ui/components'
import { z } from 'zod'
import AOS from 'aos'

interface FormField {
  value: string
  color: Color
  helpertext: string
}

const config = useRuntimeConfig()
const { t } = useI18n()
const theme = useCookie('theme', { default: () => 'dark' })
const { locale } = useI18n()

// Inicialización de emailjs
emailjs.init(config.public.emailJsKey)
//AOS.init()

// Datos reactivos
const form = reactive<Record<string,FormField>>({
  email: { value: '', color: 'primary', helpertext: '' },
  subject: { value: '', color: 'primary', helpertext: '' },
  message: { value: '', color: 'primary', helpertext: '' },
})

const state = reactive({
  currentText: '',
  phraseIndex: 0,
  typingIndex: 0,
  isDeleting: false,
  page: 5,
  switchRef: true
})

const items = ref([
  { key: 0, title: 'I like', icon: 'heart'},
  { key: 0, title: 'Making', icon: 'rating-16-plus'},
  { key: 0, title: 'YT Vids', icon: 'brand-youtube'}
])

// Habilidades
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

// Hobbies
const hobbies = computed(() => [
  { name: t('sections.about.hobbies.item-1'), icon: 'device-gamepad' },
  { name: t('sections.about.hobbies.item-2'), icon: 'motorbike' },
  { name: t('sections.about.hobbies.item-3'), icon: 'ball-football' },
  { name: t('sections.about.hobbies.item-4'), icon: 'book' },
  { name: t('sections.about.hobbies.item-5'), icon: 'swords' },
  { name: t('sections.about.hobbies.item-6'), icon: 'leaf' }
])

// Proyectos
const projects = computed(() => [
  {
    key: 'valkoui',
    title: t('sections.projects.item-1.title'),
    img: { light: '/valkoui.png', dark: '/valkoui-dark.png' },
    tags: ['Vue3', 'TailwindCSS', 'TypeScript', 'Nuxt'],
    description: t('sections.projects.item-1.description'),
    links: {
      github: 'https://github.com/ValkoDevs/valko-ui',
      website: 'https://melodic-entremet-2749be.netlify.app/'
    }
  }
])

// Frases para el typewriter
const phrases = [
  'Full-Stack </>',
  'Web Developer',
  'VueJS & React',
  'CS:GO <3'
]

const emailSchema = z.object({
  email: z.string().email(t('sections.contact.validation.form.email.invalid')).nonempty(t('sections.contact.validation.form.email.required')),
  subject: z.string().nonempty(t('sections.contact.validation.form.subject.required')),
  message: z.string().nonempty(t('sections.contact.validation.form.message.required')),
})

// Funciones
const clearForm = () => {
  const initialFormState: Record<string, FormField> = {
    email: { value: '', color: 'primary', helpertext: '' },
    subject: { value: '', color: 'primary', helpertext: '' },
    message: { value: '', color: 'primary', helpertext: '' }
  }

  Object.assign(form, initialFormState)
}

const sendEmail = async (formData: { email: string, subject: string, message: string }) => {
  try {
    const result = emailSchema.safeParse(formData)

    if (!result.success) {
      result.error.errors.forEach(error => {
        switch (error.path[0]) {
          case 'email':
            form.email.color = 'error'
            form.email.helpertext = error.message
            break
          case 'subject':
            form.subject.color = 'error'
            form.subject.helpertext = error.message
            break
          case 'message':
            form.message.color = 'error'
            form.message.helpertext = error.message
            break
        }
      })

      return
    }

    await emailjs.send('service-portolio-ls', 'email-template-portfolio', formData, config.public.emailJsKey)
    form.email.color = 'success'
    form.subject.color = 'success'
    form.message.color = 'success'
    // useNotification({ text: t('sections.contact.validation.success'), color: 'success' } as NotificationProps)
    setTimeout(() => clearForm(), 1500)
  } catch (err) {
    console.error(err)
    // useNotification({ text: t('sections.contact.validation.error'), color: 'error' } as NotificationProps)
    clearForm()
  }
}

const downloadResume = () => {
  const link = document.createElement('a')
  link.href = '/resume.pdf'
  link.download = 'exequiel-segura-resume.pdf'
  link.click()
}

const typeWriter = () => {
  const phrase = phrases[state.phraseIndex]
  const maxLength = phrase.length
  const isAtStartOfPhrase = state.typingIndex === 0
  const isAtEndOfPhrase = state.typingIndex === maxLength

  if (isAtStartOfPhrase && state.isDeleting) {
    state.isDeleting = false
    state.phraseIndex = (state.phraseIndex + 1) % phrases.length
  } else if (isAtEndOfPhrase && !state.isDeleting) {
    state.isDeleting = true
  }

  state.currentText = phrase.slice(0, state.typingIndex + (state.isDeleting ? -1 : 1))
  state.typingIndex += state.isDeleting ? -1 : 1
}

onMounted(() => {
  setInterval(typeWriter, 125)
  if (window.location.pathname === '/') window.location.hash = '#hero'
})
</script>

<template>
  <Html :class="[theme, 'scroll-smooth']" :lang="locale">
    <Head>
      <Title>E.S. Portfolio</Title>
    </Head>

    <!-- Header / Navbar -->
    <header class="w-full sticky top-0 z-10">
      <vk-navbar
        color="neutral"
        shape="rounded"
        class="backdrop-blur-sm !bg-light-3/[.5] dark:!bg-dark-3/[.5] shadow-sm"
      >
        <site-links />
      </vk-navbar>
    </header>

    <!-- Main Body (Scroll Container) -->
    <Body id="hero" class="scroll-smooth flex flex-col overflow-y-scroll snap-y snap-mandatory min-h-screen max-w-screen-xl mx-auto bg-gradient-to-t from-[#cfd1d0] to-[#b69edd] dark:from-dark-5/[.5] dark:to-primary-950/[.5]">
      <!-- Hero Section -->
      <section class="section flex items-center justify-between min-h-screen snap-start">
        <video autoplay loop muted class="absolute inset-0 opacity-[2%] w-full h-full object-cover">
          <source src="/topomap.mp4" type="video/mp4">
        </video>
        <div class="w-full flex items-center justify-between">
          <div>
            <h1 class="text-6xl md:text-8xl font-extrabold flex flex-col font-display">
              <span class="bg-gradient-to-r from-primary-500 to-error-500 bg-clip-text text-transparent leading-[8rem]">Exequiel</span>
              <span class="bg-gradient-to-r from-error-500 to-primary-500 bg-clip-text text-transparent leading-[8rem] -mt-7">Segura</span>
            </h1>
            <p id="typing-text" class="text-2xl md:text-4xl mt-4 font-light relative">
              {{ state.currentText }}
              <span class="after:content-['|'] after:animate-blink after:ml-1"></span>
            </p>

            <div class="flex gap-4 mt-8">
              <vk-button
                href="/resume.pdf"
                size="lg"
                flat
                class="flex justify-between items-center gap-2"
                @click="downloadResume"
              >
                <vk-icon name="download" class="text-xl"/>
                {{ $t('sections.home.resume') }}
              </vk-button>

              <a href="#contact">
                <vk-button
                variant="outlined"
                color="neutral"
                size="lg"
                flat
                class="flex justify-between items-center gap-2"
              >
                <vk-icon name="message" class="text-xl"/>
                {{ $t('sections.home.contact') }}
              </vk-button>
              </a>
            </div>
          </div>

          <!-- Image Section -->
          <div class="relative size-96 rounded-full overflow-hidden shadow-lg">
            <img
              :src="theme === 'dark' ? '/profile-dark.webp' : '/profile-light.webp'"
              :alt="$t('sections.home.img-alt')"
              class="object-cover inset-0"
            />
          </div>
        </div>
      </section>

      <!-- Project Section -->
      <section data-aos="fade-left" id="projects" class="section min-h-screen snap-start py-20">
        <div class="relative w-full h-[80vh] group rounded-2xl">
          <!-- Imagen del proyecto -->
          <img
            :src="theme === 'dark' ? projects[0].img.dark: projects[0].img.light"
            alt="ValkoUI"
            class="w-full h-full object-cover rounded-2xl"
          />
          <!-- Componentes flotantes alrededor de la imagen -->
          <vk-card class="animate-float absolute -top-8 -left-8 w-40 h-40 transform rotate-12">
            <vk-card-header>That's cool brah!</vk-card-header>
            <vk-card-body>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo earum ipsa dicta mollitia dignissimos aspernatur recusandae voluptatem, architecto quasi maxime asperiores ex temporibus aliquam tenetur accusamus ipsum, magni maiores. Ducimus.
            </vk-card-body>
          </vk-card>

          <vk-avatar class="animate-float absolute -top-12 right-12 w-20 h-20 transform -rotate-6" src="/profile.png" alt="Avatar" />

          <vk-button class="animate-float absolute top-3/4 -left-12 transform rotate-6" size="lg" color="info" variant="gradient">
            Button
          </vk-button>

          <vk-alert class="animate-float absolute !w-[40%] top-3/4 right-0 transform -rotate-12" color="success" variant="ghost">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat officiis labore asperiores dolorem animi quo delectus voluptates reiciendis temporibus exercitationem esse veritatis, debitis consectetur harum et rem dolores facere iure.
          </vk-alert>

          <vk-switch class="animate-float absolute top-1/4 -right-8 transform rotate-3" variant="outlined" v-model="state.switchRef" color="success"/>

          <vk-dropdown class="animate-float absolute bottom-2/4 -left-12 transform -rotate-12" label="Dropdown" :items color="error"/>

          <vk-pagination class="animate-float absolute -top-6 right-1/4 rotate-6" v-model="state.page" :pages="20" />

          <div class="absolute right-3 bottom-3 flex gap-2">
            <vk-tag v-for="tag in projects[0].tags" :key="tag" :text="tag" size="sm" variant="ghost" color="info">
              {{ tag }}
            </vk-tag>
          </div>
        </div>

        <!-- Contenido debajo de la imagen -->
        <div class="w-full flex justify-between py-8">
          <div>
            <h2 class="text-2xl font-bold text-left">{{ projects[0].title }}</h2>
            <p class="text-lg text-left">{{ projects[0].description }}</p>
          </div>

          <!-- Tags de tecnologías -->
          <div class="flex gap-2 py-4">
            <a
                :href="projects[0].links.github"
                target="_blank"
                class="flex items-center"
              >
                <vk-button
                  flat
                  size="sm"
                  class="flex justify-center items-start gap-2"
                  color="neutral"
                  variant="ghost"
                >
                  <span>GitHub</span>
                  <vk-icon
                    name="brand-github"
                    class="text-sm"
                  />
                </vk-button>
              </a>
              <a
                :href="projects[0].links.website"
                target="_blank"
                class="flex items-center"
              >
                <vk-button
                  flat
                  size="sm"
                  class="flex justify-center items-start gap-2"
                  color="neutral"
                  variant="ghost"
                >
                  <span>Demo</span>
                  <vk-icon
                    name="external-link"
                    class="text-sm"
                  />
                </vk-button>
              </a>
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section
        data-aos="fade-right"
        id="about"
        class="animatable section flex items-center justify-between min-h-screen snap-start"
      >
        <div class="text-left flex w-full mx-auto gap-8 justify-between">
          <div class="flex flex-col items-start gap-4 !bg-light-3/[.5] dark:!bg-dark-3/[.5] shadow-sm px-6 py-8 w-1/2 rounded-lg">
            <div>
              <h3 class="font-semibold text-xl font-serif text-neutral-800 dark:text-neutral-100">{{ $t('sections.about.introduction.title') }}</h3>
              <p class="text-left text-neutral-600 dark:text-neutral-100" v-html="$t('sections.about.introduction.description').split('. ').join('.<br><br>')" />
            </div>

            <div>
              <h2 class="font-semibold text-xl font-serif text-neutral-800 dark:text-neutral-100">{{ $t('sections.about.hobbies.title') }}</h2>
              <ul class="text-lg mt-4 grid grid-cols-2">
                <li
                  v-for="hobby in hobbies"
                  :key="hobby.name"
                  class="flex justify-start items-center text-neutral-600 dark:text-neutral-100"
                >
                  <vk-icon :name="hobby.icon" class="text-2xl pr-2" />
                  {{ hobby.name }}
                </li>
              </ul>
            </div>

            <div>
              <h2 class="font-semibold text-xl font-serif text-neutral-800 dark:text-neutral-100">{{ $t('sections.about.languages.title') }}</h2>
              <ul class="text-lg mt-4 grid grid-cols-2 gap-4">
                <li class="flex gap-2 justify-start items-center text-neutral-600 dark:text-neutral-300">
                  🇦🇷
                  {{ $t('sections.about.languages.lang-1.name') }}
                  <vk-tag
                    :text="$t('sections.about.languages.lang-1.level')"
                    variant="filled"
                    color="success"
                    size="sm"
                  />
                </li>
                <li class="flex gap-2 justify-start items-center">
                  🇺🇸
                  {{ $t('sections.about.languages.lang-2.name') }}
                  <vk-tag
                    :text="$t('sections.about.languages.lang-2.level')"
                    variant="filled"
                    color="info"
                    size="sm"
                  />
                </li>
              </ul>
            </div>
          </div>

          <div class="!bg-light-3/[.5] dark:!bg-dark-3/[.5] shadow-sm rounded-lg px-6 py-8 w-1/2">
            <h2 class="font-semibold text-xl font-serif text-neutral-800 dark:text-neutral-100">{{ $t('sections.about.toolbox.title') }}</h2>
            <div class="grid grid-cols-3 gap-4 mt-4">
              <div v-for="(category, key) in skills" :key="key">
                <h3 class="font-normal text-lg text-neutral-700 dark:text-neutral-300 capitalize text-left">{{ key }}</h3>

                <div class="text-left flex flex-col gap-2">
                  <div
                    v-for="(skill, index) in category"
                    :key="index"
                    class="flex items-center gap-2"
                  >
                    <vk-icon :name="skill.icon" :class="`text-3xl ${skill.color}`" />
                    <span class="text-lg text-neutral-600 dark:text-neutral-300">{{ skill.name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
       </div>
      </section>

      <!-- Contact Section -->
      <section
        id="contact"
        class="animatable section flex items-center justify-between min-h-screen snap-start"
      >
        <div class="text-left flex w-full mx-auto justify-between">
          <div class="w-1/3">
            <h1 class="text-4xl font-bold font-serif">
              {{ $t('sections.contact.title') }}
            </h1>
            <p class="mt-4 text-lg text-gray-700 dark:text-gray-300">
              {{ $t('sections.contact.subtitle') }}
            </p>
          </div>

          <div class="!bg-light-3/[.5] dark:!bg-dark-3/[.5] shadow-sm rounded-lg px-6 py-8 w-1/2">
            <div class="space-y-6">
              <vk-input
                v-model="form.email.value"
                variant="ghost"
                :helpertext="form.email.helpertext"
                :color="form.email.color"
                type="email" label="Email"
              />
              <vk-input
                v-model="form.subject.value"
                variant="ghost"
                :helpertext="form.subject.helpertext"
                :color="form.subject.color"
                :label="$t('sections.contact.subject')"
              />
              <vk-textarea
                v-model="form.message.value"
                variant="ghost"
                :helpertext="form.message.helpertext"
                :color="form.message.color"
                :label="$t('sections.contact.message')"
              />
              <div>
                <vk-button
                  flat
                  size="lg"
                  class="w-full"
                  @click="sendEmail({ email: form.email.value, subject: form.subject.value, message: form.message.value })"
                >
                  {{ $t('sections.contact.submit') }}
                </vk-button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Body>
  </Html>
</template>
