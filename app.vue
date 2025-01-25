<script setup lang="ts">
const theme = useCookie('theme', {
  default: () => 'dark'
})

const lang = useCookie('lang', {
  default: () => 'en'
})
</script>

<template>
  <Html :class="theme" :lang="lang">
    <Head>
      <Title>E.S. Portfolio</Title>
    </Head>

    <Body>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>
