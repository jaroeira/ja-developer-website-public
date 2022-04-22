<template>
  <div class="wrapper">
    <TheHeader :navigation-links="headerLinks" />
    <main class="main-container" style="padding-bottom: 16.5rem">
      <nuxt />
    </main>
    <TheFooter class="absolute bottom-0 w-full" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      headerLinks: [
        {
          label: 'menu.home',
          to: '/',
        },
        {
          label: 'menu.projects',
          to: '/projects',
        },
        {
          label: 'menu.about',
          to: '/about',
        },
        {
          label: 'menu.contact',
          to: '/contact',
        },
      ],
    };
  },
};
</script>

<style scoped>
.wrapper {
  position: relative;
  min-height: 100vh;
}
</style>
