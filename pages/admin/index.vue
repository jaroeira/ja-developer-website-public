<template>
  <section class="md:mx-auto lg:max-w-screen-lg px-4 xl:px-0">
    <TheAdminTopProjects :top-projects="topProjects" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  layout: 'admin',
  async fetch() {
    await this.$store.dispatch('projects/loadTopProjects');
  },
  computed: {
    ...mapGetters({
      topProjects: 'projects/topProjects',
    }),
  },
};
</script>
