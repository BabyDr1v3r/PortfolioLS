<script setup lang="ts">
defineOptions({ name: 'SiteLinks' })

const sectionIds = ['hero', 'projects', 'about', 'contact']
const activeSection = ref('hero')

const updateActiveSection = (entries: IntersectionObserverEntry[]) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      activeSection.value = entry.target.id
      break
    }
  }
}

let observer: IntersectionObserver | null = null
let handleScroll: (() => void) | null = null

onMounted(() => {
  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean) as HTMLElement[]
  observer = new window.IntersectionObserver(updateActiveSection, { threshold: 0.5 })
  sections.forEach(section => observer!.observe(section))

  handleScroll = () => {
    if (window.scrollY === 0) {
      activeSection.value = 'hero'
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
  if (handleScroll) window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav class="flex w-full">
    <div class="flex items-center gap-4">
      <a href="#hero" class="flex items-center mr-auto">
        <vk-avatar src="/profile.png" shape="rounded" size="xs" flat />
      </a>

      <ul class="flex gap-2">
        <li>
          <a href="#hero">
            <vk-button
              variant="link"
              shape="rounded"
              :color="activeSection === 'hero' ? 'primary' : 'surface'"
              size="sm"
            >
              {{ $t('components.site-links.home') }}
            </vk-button>
          </a>
        </li>
        <li>
          <a href="#projects">
            <vk-button
              variant="link"
              shape="rounded"
              :color="activeSection === 'projects' ? 'primary' : 'surface'"
              size="sm"
            >
              {{ $t('components.site-links.projects') }}
            </vk-button>
          </a>
        </li>
        <li>
          <a href="#about">
            <vk-button
              variant="link"
              shape="rounded"
              :color="activeSection === 'about' ? 'primary' : 'surface'"
              size="sm"
            >
              {{ $t('components.site-links.about') }}
            </vk-button>
          </a>
        </li>
        <li>
          <a href="#contact">
            <vk-button
              variant="link"
              shape="rounded"
              :color="activeSection === 'contact' ? 'primary' : 'surface'"
              size="sm"
            >
              {{ $t('components.site-links.contact') }}
            </vk-button>
          </a>
        </li>
      </ul>
    </div>

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
          color="surface"
          condensed
          size="lg"
          class="size-10"
        >
          <vk-icon
            name="brand-github"
            class="text-2xl px-2"
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
          color="surface"
          condensed
          size="lg"
          class="size-10"
        >
          <vk-icon
            name="brand-linkedin"
            class="text-2xl px-2"
          />
        </vk-button>
      </a>
    </div>
  </nav>
</template>
