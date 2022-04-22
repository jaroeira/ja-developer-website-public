<template>
  <section class="default-container pt-6">
    <div class="flex items-center">
      <SectionTitle admin title="Projects" class="mb-4" style="flex: 1" />
      <button
        class="ml-4 self-start flex gap-1 text-admin-accent hover:text-secondary-text uppercase"
        @click="$router.push('/admin/projects/add')"
      >
        <svg class="fill-current w-7 h-7">
          <use
            xlink:href="@/assets/svg/sprite.svg#icon-add_circle_outline"
          ></use>
        </svg>
        Add Project
      </button>
    </div>

    <LoadingCard v-if="$fetchState.pending" />

    <div v-else-if="$fetchState.error" class="text-center text-red-500">
      An error has occurred
    </div>

    <div v-else class="flex flex-col gap-5 pb-20">
      <ProjectCard
        v-for="project in allProjects"
        :key="project.id"
        admin
        :project="project"
        @remove="openModal(project.id)"
        @edit="onEdit"
      />
    </div>
    <transition name="fade">
      <ModalAlert
        v-if="showRemoveModal"
        @cancel="cancelDelete"
        @confirm="deleteProject"
      />
    </transition>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  layout: 'admin',
  data() {
    return {
      showRemoveModal: false,
      projectIdToDelete: null,
    };
  },
  async fetch() {
    await this.$store.dispatch('projects/loadAllProjects');
  },
  computed: {
    ...mapGetters({
      allProjects: 'projects/allProjects',
    }),
  },
  methods: {
    openModal(projectId) {
      this.projectIdToDelete = projectId;
      this.showRemoveModal = true;
    },
    cancelDelete() {
      this.projectIdToDelete = null;
      this.showRemoveModal = false;
    },
    async deleteProject() {
      await this.$store.dispatch(
        'projects/deleteProject',
        this.projectIdToDelete
      );
      this.projectIdToDelete = null;
      this.showRemoveModal = false;
    },
    onEdit(id) {
      this.$router.push(`/admin/projects/${id}`);
    },
  },
};
</script>
