<template>
  <div>
    <TheHeader :navigation-links="headerLinks" :show-language-selector="false">
      <template #nav>
        <li>
          <button @click="logoutHandler">{{ $t('admin.menu.logout') }}</button>
        </li>
      </template>
    </TheHeader>
    <main class="main-container">
      <nuxt />
    </main>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      headerLinks: [
        {
          label: 'admin.menu.admin',
          to: '/admin/',
        },
        {
          label: 'admin.menu.projects',
          to: '/admin/projects',
        },
      ],
    };
  },
  methods: {
    async logoutHandler() {
      await this.$store.dispatch('auth/logout');
      this.$router.replace('/auth');
    },
  },
};
</script>
