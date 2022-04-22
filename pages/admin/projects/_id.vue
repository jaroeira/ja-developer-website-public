<template>
  <section class="max-w-screen-lg mx-auto my-5">
    <h1 class="text-admin-accent text-4xl font-normal px-3 md:px-0">
      Edit Project
    </h1>
    <div class="form-grid">
      <ProjectForm
        v-if="!notFound"
        :edit="true"
        :project="project"
        @is-loading="setIsLoading"
        @is-uploading="setIsUploading"
        @success="onFormSuccess"
      />
      <div v-else class="flex justify-center items-center">
        Project Not Found
      </div>
    </div>
    <LoadingOverlay
      v-if="isLoading || isUploading"
      :text="isUploading ? 'uploading' : 'saving'"
    />
    <div class="h-20"></div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  layout: 'admin',
  data() {
    return {
      notFound: false,
      isLoading: false,
      isUploading: false,
    };
  },
  async fetch() {
    const id = this.$route.params.id;
    await this.$store.dispatch('projects/loadProjectById', id);
    if (!this.project) this.notFound = true;
  },
  computed: {
    ...mapGetters({ project: 'projects/loadedProjectById' }),
  },
  methods: {
    setIsLoading(val) {
      this.isLoading = val;
    },
    setIsUploading(val) {
      this.isUploading = val;
    },
    onFormSuccess() {
      this.$router.push('/admin/projects');
    },
  },
};
</script>

<style scoped>
.form-grid {
  @apply grid grid-cols-1 auto-rows-max gap-4;
}
</style>
