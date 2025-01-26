<script setup lang="ts">
const downloadResume = () => {
  const link = document.createElement('a')
  link.href = '/resume.pdf'
  link.download = 'exequiel-segura-resume.pdf'
  link.click()
}

const theme = useCookie('theme', {
  default: () => 'dark'
})

const phrases = [
  'Full-Stack </>  ',
  'Web Developer  ',
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
  <div class="w-full flex items-center justify-between h-full max-w-screen-xl mx-auto animate-slideIn">
    <div>
      <h1 class="text-6xl md:text-8xl font-extrabold flex flex-col font-display">
        <span class="bg-gradient-to-r from-primary-500 to-error-500 bg-clip-text text-transparent leading-[8rem]">Exequiel</span>
        <span class="bg-gradient-to-r from-error-500 to-primary-500 bg-clip-text text-transparent leading-[8rem] -mt-7">Segura</span>
      </h1>
      <p
        id="typing-text"
        class="text-2xl md:text-4xl mt-4 font-light"
      >
        {{ currentText }}
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
        {{ $t('pages.home.resume') }}
      </vk-button>

        <vk-button
          variant="outlined"
          color="neutral"
          size="lg"
          flat
          class="flex justify-between items-center gap-2"
          @click="navigateTo('/contact')"
        >
          <vk-icon name="message" class="text-xl"/>
          {{ $t('pages.home.contact') }}
        </vk-button>
      </div>
    </div>

    <div class="size-96 rounded-full overflow-hidden shadow-lg">
      <img
        :src="theme === 'dark' ? '/profile-dark.webp' : '/profile-light.webp'"
        :alt="$t('pages.home.img-alt')"
        class="object-cover"
      />
    </div>
  </div>
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
