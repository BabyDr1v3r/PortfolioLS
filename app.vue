<script setup lang="ts">
import './assets/styles.css'

const theme = useCookie('theme', {
  default: () => 'dark'
})

const { locale } = useI18n()
</script>

<template>
  <Html :class="theme" :lang="locale">
    <Head>
      <Title>E.S. Portfolio</Title>
    </Head>

    <Body class="flex flex-col w-screen h-screen bg-gradient-to-br from-[#cfd1d0] to-[#b69edd] dark:from-dark-5/[.5] dark:to-primary-950/[.5] ">
      <NuxtLayout layout="default">
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>
