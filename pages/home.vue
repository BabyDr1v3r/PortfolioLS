<script setup lang="ts">
const downloadResume = () => {
  const link = document.createElement('a')
  link.href = '/resume.pdf'
  link.download = 'exequiel-segura-resume.pdf'
  link.click()
}

const lang = useCookie('lang', {
  default: () => 'en'
})

const phrases = [
  'FullStack </>  ',
  'Web-Developer  ',
  'VueJS & React  ',
  'CS:GO <3  '
]

const currentText = ref('')
const phraseIndex = ref(0)
const typingIndex = ref(0)
const isDeleting = ref(false)

const typeWriter = () => {
  const phrase = phrases[phraseIndex.value]

  if (isDeleting.value) {
    currentText.value = phrase.slice(0, typingIndex.value - 1)
    typingIndex.value--

    if (typingIndex.value === 0) {
      isDeleting.value = false
      phraseIndex.value = (phraseIndex.value + 1) % phrases.length
    }
  } else {
    currentText.value = phrase.slice(0, typingIndex.value + 1)
    typingIndex.value++

    if (typingIndex.value === phrase.length) {
      isDeleting.value = true
    }
  }
}

onMounted(() => {
  setInterval(typeWriter, 125)
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

  <main class="relative h-screen w-screen">
    <div class="absolute inset-0 bg-gradient-to-br from-black to-white dark:from-white dark:to-black opacity-50" />

    <div class="relative z-10 flex items-center justify-between h-full max-w-screen-xl mx-auto animate-slideIn">
      <div>
        <h1 class="text-6xl md:text-8xl font-extrabold flex flex-col gap-2">
          <span class="bg-gradient-to-r from-primary-500 to-error-500 bg-clip-text text-transparent">Exequiel</span>
          <span class="bg-gradient-to-r from-error-500 to-primary-500 bg-clip-text text-transparent">Segura</span>
        </h1>
        <p
          id="typing-text"
          class="text-2xl md:text-3xl mt-4 font-semibold"
        >
          {{ currentText }}
        </p>

        <vk-button
          href="/resume.pdf"
          variant="outlined"
          size="lg"
          color="neutral"
          condensed
          flat
          class="mt-4 flex justify-between px-4 py-2 w-48 items-center"
          @click="downloadResume"
        >
          {{ lang === 'en' ? 'Resume' : 'Curriculum' }}
          <vk-icon name="download" class="text-2xl"/>
        </vk-button>
      </div>

      <div class="flex justify-end relative size-96 rounded-full overflow-hidden">
        <div class="absolute inset-0 bg-black opacity-10"></div>
        <img
          src="/profile.png"
          alt="Exequiel Segura"
          class="size-96 object-cover rounded-full shadow-lg"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
#typing-text::after {
  content: '|';
  animation: blink 0.75s step-end infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
