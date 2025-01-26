<template>
  <div class="h-screen w-screen flex flex-col">
    <header class="w-full sticky z-10">
      <vk-navbar
        floating
        color="neutral"
        shape="rounded"
        flat
        class="!bg-light-1 dark:!bg-dark-3"
      >
        <site-links />
      </vk-navbar>
    </header>

    <main class="w-full grow">
      <slot/>
    </main>
  </div>
</template>
