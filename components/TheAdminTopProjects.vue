<template>
  <div class="my-10 bg-primary rounded p-3 shadow">
    <SectionTitle class="mb-5" title="top Projects" admin color-light />
    <div v-if="!isLoading">
      <div class="grid grid-col gap-4 justify-center">
        <ProjectCard
          v-for="(project, index) in topProjects"
          :key="index"
          :show-actions="false"
          :horizontal="false"
          :compact="true"
          :project="project"
        />
        <div
          v-for="(p, index) in placeHolderCount"
          :key="index"
          class="bg-gray-200 h-80 rounded flex justify-center items-center border-dotted border-gray-500 border-2"
        >
          <h2 class="font-bold text-admin-accent">Top Project</h2>
        </div>
      </div>
    </div>
    <div
      v-else
      class="h-80 flex flex-col justify-center items-center text-white"
    >
      <h2 class="text-2xl">Loading</h2>
      <img class="w-12" src="~/assets/svg/spinner.svg" alt="loading" />
    </div>

    <div class="mt-5 flex justify-center">
      <Button type="button" @clicked="openEditModal">Edit Top Projects</Button>
    </div>
    <TheTopProjectsEditor
      v-if="isEditModalOpen"
      :input-top-projects="topProjects"
      @close="closeEditModal"
      @save="saveTopProjectsHandler"
    />
  </div>
</template>

<script>
export default {
  props: {
    topProjects: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isEditModalOpen: false,
      isLoading: false,
    };
  },
  computed: {
    placeHolderCount() {
      return 3 - this.topProjects.length;
    },
  },
  methods: {
    openEditModal() {
      this.isEditModalOpen = true;
    },
    closeEditModal() {
      this.isEditModalOpen = false;
    },
    async saveTopProjectsHandler(projectIds) {
      try {
        this.isEditModalOpen = false;
        this.isLoading = true;
        await this.$store.dispatch('projects/updateTopProjects', projectIds);
        await this.$store.dispatch('projects/loadTopProjects');
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.grid-col {
  grid-template-columns: repeat(auto-fit, 18.75rem);
}
</style>
