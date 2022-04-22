<template>
  <section class="default-container pt-6">
    <SectionTitle
      :title="
        tag
          ? `${$t('pages.projects.projects-with-tag')} ${tag}`
          : $t('pages.projects.all-projects')
      "
      class="mb-4"
    />
    <div v-if="!loading">
      <div v-if="loadedProjects.length > 0" class="flex flex-col gap-5">
        <ProjectCard
          v-for="project in loadedProjects"
          :key="project.id"
          :project="project"
        />
      </div>
      <div
        v-if="hasProjectsToLoad && loadedProjects.length > 4"
        class="mt-10 flex justify-center"
      >
        <Button @clicked="loadMore">{{
          $t('pages.projects.load-more')
        }}</Button>
      </div>
      <div
        v-if="loadedProjects.length === 0"
        class="flex justify-center items-center h-screen"
      >
        <h2>{{ $t('pages.projects.no-projects-found') }}</h2>
      </div>
    </div>
    <LoadingCard v-if="loading" class="h-screen" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      loading: false,
      tag: null,
    };
  },
  async fetch() {
    this.$store.dispatch('projects/clearLoadedProjectsWithLimits');
    if (this.$route.query.tag) {
      this.tag = this.$route.query.tag;
    } else {
      this.tag = null;
    }

    await this.loadMore();
  },
  computed: {
    ...mapGetters({
      loadedProjects: 'projects/loadedProjects',
      hasProjectsToLoad: 'projects/hasProjectsToLoad',
    }),
  },
  watch: {
    '$route.query.tag': async function tag() {
      this.$store.dispatch('projects/clearLoadedProjectsWithLimits');

      if (this.$route.query.tag) {
        this.tag = this.$route.query.tag;
      } else {
        this.tag = null;
      }

      await this.loadMore();
    },
  },
  methods: {
    async loadMore() {
      try {
        this.loading = true;
        await this.$store.dispatch('projects/loadProjectsWithLimit', {
          limit: 5,
          tag: this.tag,
        });
        this.loading = false;
      } catch (error) {
        return this.$nuxt.error(error);
      }
    },
  },
};
</script>
