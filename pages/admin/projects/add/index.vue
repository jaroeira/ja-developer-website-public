<template>
  <section class="max-w-screen-lg mx-auto my-5">
    <h1 class="text-admin-accent text-4xl font-normal px-3 md:px-0">
      Add Project
    </h1>
    <div class="form-grid">
      <ProjectForm
        @is-loading="setIsLoading"
        @is-uploading="setIsUploading"
        @success="onFormSuccess"
      />
    </div>
    <LoadingOverlay
      v-if="isLoading || isUploading"
      :text="isUploading ? 'uploading' : 'saving'"
    />
    <div class="h-20"></div>
  </section>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      isLoading: false,
      isUploading: false,
    };
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
