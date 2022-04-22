<template>
  <transition name="fade">
    <Backdrop full>
      <!-- Card -->
      <div class="bg-white p-2 rounded shadow-md w-full md:w-3/4 md:max-w-4xl">
        <!-- Card Header -->
        <div class="flex justify-end">
          <button
            type="button"
            class="text-admin-accent hover:text-accent-light"
            @click="$emit('close')"
          >
            <svg class="w-10 h-10 fill-current">
              <use xlink:href="@/assets/svg/sprite.svg#icon-clear"></use>
            </svg>
          </button>
        </div>
        <!-- Card Content -->
        <div v-if="!isLoading">
          <h2 class="text-admin-accent font-bold">
            Select 3 projects to be listed as top projects
          </h2>
          <!-- Projects List -->
          <div
            v-if="allProjects.length > 0"
            class="overflow-x-auto py-4 h-56 flex flex-nowrap gap-2"
          >
            <!-- Projects Cards -->
            <ProjectCardMini
              v-for="(project, index) in projects"
              :key="index"
              :project="project"
              :show-add-button="showAddButton"
              @add="addToTopProjects(index)"
            />
          </div>
          <div v-else class="flex justify-center items-center h-56">
            <h2 class="uppercase">No projects found</h2>
          </div>
          <div class="h-72 overflow-x-scroll py-4">
            <h2 class="text-admin-accent font-bold mb-5">
              Selected top projects: {{ topProjects.length }} of 3
            </h2>
            <div
              class="bg-gray-100 h-52 pt-2 rounded flex justify-center items-center border-dotted border-gray-500 border-2 drag-container"
            >
              <Container
                v-if="topProjects.length > 0"
                group-name="2"
                orientation="horizontal"
                lock-axis="x"
                @drop="onDrop('topProjects', $event)"
              >
                <Draggable
                  v-for="(topProject, index) in topProjects"
                  :key="index"
                >
                  <ProjectCardMini
                    class="project-card-mini"
                    :project="topProject"
                    :is-top-project="true"
                    @remove="removeFromTopProjects(index)"
                  />
                </Draggable>
              </Container>
              <h2 v-else class="uppercase">No projects selected</h2>
            </div>
          </div>
        </div>
        <!-- Loading -->
        <div
          v-else
          class="flex flex-col justify-center items-center"
          style="height: 33.5rem"
        >
          <h2 class="text-2xl">Loading</h2>
          <img class="w-12" src="~/assets/svg/spinner.svg" alt="loading" />
        </div>
        <!-- Card Footer -->
        <div class="flex justify-center">
          <button
            v-if="!isLoading"
            type="button"
            class="bg-admin-accent hover:bg-accent-light text-white px-10 py-2 rounded shadow-md"
            @click="saveTopProjects"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Backdrop>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';
import { Container, Draggable } from 'vue-dndrop';
export default {
  components: { Container, Draggable },
  props: {
    inputTopProjects: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isLoading: false,
      topProjects: [],
      projects: [],
    };
  },
  computed: {
    showAddButton() {
      return this.topProjects.length < 3;
    },
    ...mapGetters({
      allProjects: 'projects/allProjects',
    }),
  },
  async mounted() {
    // If allProjects not loaded on store dispatch loadAllProjects
    if (this.allProjects.length === 0) {
      this.isLoading = true;
      await this.$store.dispatch('projects/loadAllProjects');
      this.isLoading = false;
    }

    this.topProjects = [...this.inputTopProjects];

    // Filter added top projects on all projects array
    this.projects = [...this.allProjects].filter((p) => {
      return (
        this.topProjects.filter((tp) => {
          return tp.id === p.id;
        }).length === 0
      );
    });
  },
  methods: {
    onDrop(collection, dropResult) {
      if (collection !== 'topProjects') return;
      const fromIndex = dropResult.removedIndex;
      const toIndex = dropResult.addedIndex;
      this.swapListItems('topProjects', toIndex, fromIndex);
    },
    removeFromTopProjects(index) {
      const item = this.topProjects[index];
      this.projects.push(item);
      this.topProjects.splice(index, 1);
    },
    addToTopProjects(index) {
      const item = this.projects[index];
      this.projects.splice(index, 1);
      this.topProjects.push(item);
    },
    swapListItems(collection, index1, index2) {
      const oldList = this[collection];

      const newList = oldList.map((val, idx) => {
        if (idx === index1) return oldList[index2];
        if (idx === index2) return oldList[index1];
        return val;
      });

      this.topProjects = newList;
    },
    saveTopProjects() {
      const topProjectsIds = [];
      this.topProjects.forEach((project, index) => {
        topProjectsIds.push({
          id: project.id,
          topProject: index,
        });
      });

      this.$emit('save', topProjectsIds);
    },
  },
};
</script>

<style scoped>
.drag-container :not(:last-child) .project-card-mini {
  @apply mr-2;
}
</style>
