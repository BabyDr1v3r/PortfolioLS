<script setup lang="ts">
import '~/assets/css/main.css'
import { state, typeWriter, items, resumeItems, useContactForm } from '~/utils/helpers'
import skills from '~/utils/skills'
import useHobbies from '~/composables/useHobbies'
import useProjects from '~/composables/useProjects'

const theme = useCookie('theme', { default: () => 'dark' })
const { locale } = useI18n()
const hobbies = useHobbies(useI18n().t)
const projects = useProjects(useI18n().t)

const { form, sending, sendEmail } = useContactForm()

const aboutDescriptionLines = computed(() =>
  $t('sections.about.introduction.description').split('. ').filter(Boolean)
)

onMounted(() => {
  setInterval(typeWriter, 125)
  if (window.location.pathname === '/') window.location.hash = '#hero'
})
</script>

<template>
  <Html :class="theme" :lang="locale">
    <Head>
      <Title>E.S. Portfolio</Title>
    </Head>

      <vk-navbar
        color="surface"
        class="backdrop-blur-sm !bg-surface/[.5] shadow-sm"
        fixed
        shape="rounded"
      >
        <site-links />
      </vk-navbar>

    <!-- Main Body (Scroll Container) -->
    <Body id="hero" class="scroll-smooth flex flex-col overflow-y-scroll snap-y snap-mandatory min-h-screen max-w-screen-xl mx-auto bg-gradient-to-t from-surface to-primary-container relative">
      <!-- Global Background Video -->
      <video autoplay loop muted class="fixed inset-0 w-full h-full object-cover opacity-[2%] pointer-events-none z-0">
        <source src="/topomap.mp4" type="video/mp4">
      </video>
      <!-- Hero Section -->
      <section class="section flex items-center justify-between min-h-screen snap-start relative z-10">
        <div class="w-full flex items-center justify-between">
          <div>
            <h1 class="text-6xl md:text-8xl font-extrabold flex flex-col font-display">
              <span class="bg-gradient-to-r from-primary to-negative bg-clip-text text-transparent leading-[8rem]">Exequiel</span>
              <span class="bg-gradient-to-r from-negative to-primary bg-clip-text text-transparent leading-[8rem] -mt-7">Segura</span>
            </h1>
            <p id="typing-text" class="text-2xl md:text-4xl mt-4 font-light relative">
              {{ state.currentText }}
              <span class="after:content-['|'] after:animate-blink after:ml-1" />
            </p>

            <div class="flex gap-4 mt-8">
              <vk-dropdown size="lg" :items="resumeItems" :label="$t('sections.home.resume')" />

              <a href="#contact">
                <vk-button
                variant="outlined"
                color="secondary"
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
            >
          </div>
        </div>
      </section>

      <!-- Project Section -->
      <section id="projects" data-aos="fade-left" class="section min-h-screen snap-start py-20">
        <div class="relative w-full h-[80vh] group rounded-2xl">
          <!-- Imagen del proyecto -->
          <img
            :src="theme === 'dark' ? projects[0].img.dark: projects[0].img.light"
            alt="ValkoUI"
            class="w-full h-full object-cover rounded-2xl"
          >
          <!-- Componentes flotantes alrededor de la imagen -->
          <vk-card class="animate-float absolute -top-8 -left-8 w-40 h-40 transform rotate-12">
            <vk-card-header>That's cool brah!</vk-card-header>
            <vk-card-body>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo earum ipsa dicta mollitia dignissimos aspernatur recusandae voluptatem, architecto quasi maxime asperiores ex temporibus aliquam tenetur accusamus ipsum, magni maiores. Ducimus.
            </vk-card-body>
          </vk-card>

          <vk-avatar class="animate-float absolute -top-12 right-12 w-20 h-20 transform -rotate-6" src="/profile.png" alt="Avatar" />

          <vk-button class="animate-float absolute -top-3/4 -left-12 transform rotate-6" size="lg" color="accent" variant="gradient">
            Button
          </vk-button>

          <vk-alert class="animate-float absolute !w-[40%] top-3/4 right-0 transform -rotate-12" color="positive" variant="ghost">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat officiis labore asperiores dolorem animi quo delectus voluptates reiciendis temporibus exercitationem esse veritatis, debitis consectetur harum et rem dolores facere iure.
          </vk-alert>

          <vk-switch v-model="state.switchRef" class="animate-float absolute top-1/4 -right-8 transform rotate-3" variant="outlined" color="positive" />

          <vk-dropdown class="animate-float absolute bottom-2/4 -left-12 transform -rotate-12" label="Dropdown" :items color="negative" />

          <vk-pagination v-model="state.page" class="animate-float absolute -top-6 right-1/4 rotate-6" :pages="20" />

          <div class="absolute right-3 bottom-3 flex gap-2">
            <vk-tag v-for="tag in projects[0].tags" :key="tag" :text="tag" size="sm" variant="ghost" color="accent">
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
                  class="flex justify-center items-center gap-2"
                  color="surface"
                  variant="ghost"
                >
                  <span>GitHub</span>
                  <vk-icon
                    name="brand-github"
                    class="text-lg"
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
                  class="flex justify-center items-center gap-2"
                  color="surface"
                  variant="ghost"
                >
                  <span>Website</span>
                  <vk-icon
                    name="external-link"
                    class="text-lg"
                  />
                </vk-button>
              </a>
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section
        id="about"
        data-aos="fade-right"
        class="animatable section flex items-center justify-between min-h-screen snap-start"
      >
        <div class="text-left flex w-full mx-auto gap-8 justify-between">
          <div class="flex flex-col items-start gap-4 bg-surface-container shadow-sm px-6 py-8 w-1/2 rounded-lg">
            <div>
              <h3 class="font-semibold text-xl font-serif text-neutral-800 dark:text-neutral-100">{{ $t('sections.about.introduction.title') }}</h3>
              <p class="text-left text-neutral-600 dark:text-neutral-100">
                <template v-for="(line, idx) in aboutDescriptionLines" :key="idx">
                  {{ line }}<span v-if="idx !== aboutDescriptionLines.length - 1"><br><br></span>
                </template>
              </p>
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
                    color="positive"
                    size="sm"
                  />
                </li>
                <li class="flex gap-2 justify-start items-center">
                  🇺🇸
                  {{ $t('sections.about.languages.lang-2.name') }}
                  <vk-tag
                    :text="$t('sections.about.languages.lang-2.level')"
                    variant="filled"
                    color="accent"
                    size="sm"
                  />
                </li>
              </ul>
            </div>
          </div>

          <div class="bg-surface-container shadow-sm rounded-lg px-6 py-8 w-1/2">
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

          <div class="bg-surface-container shadow-sm rounded-lg px-6 py-8 w-1/2">
            <form class="space-y-6" @submit.prevent="sendEmail" @keydown.enter.prevent="sendEmail">
              <vk-input
                v-model="form.email.value"
                variant="ghost"
                :helpertext="form.email.helper"
                :color="form.email.color"
                type="email" label="Email"
              />
              <vk-input
                v-model="form.subject.value"
                variant="ghost"
                :helpertext="form.subject.helper"
                :color="form.subject.color"
                :label="$t('sections.contact.subject')"
              />
              <vk-textarea
                v-model="form.message.value"
                variant="ghost"
                :helpertext="form.message.helper"
                :color="form.message.color"
                :label="$t('sections.contact.message')"
              />
              <div>
                <vk-button
                  flat
                  size="lg"
                  class="w-full"
                  :loading="sending"
                >
                  {{ $t('sections.contact.submit') }}
                </vk-button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Body>
  </Html>
</template>
