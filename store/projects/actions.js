export default {
  async loadAllProjects({ commit }) {
    const projects = await this.$services.projects.get();
    commit('SET_ALL_PROJECTS', projects);
  },
  async loadProjectsWithLimit({ commit, dispatch, getters }, { limit, tag }) {
    const lastLoadedProjectId = getters.lastLoadedProjectId;

    let projects;

    if (tag) {
      projects = await this.$services.projects.getByTagWithLimit({
        limit,
        lastDocumentId: lastLoadedProjectId,
        tag,
      });
    } else {
      projects = await this.$services.projects.getWithLimit({
        limit,
        lastDocumentId: lastLoadedProjectId,
      });
    }

    if (projects.length > 0) {
      const newLastLoadedProjectId = projects[projects.length - 1].id;

      commit('SET_LAST_LOADED_PROJECT_ID', newLastLoadedProjectId);

      const newProjectsArray = getters.loadedProjects.concat(projects);

      commit('SET_LOADED_PROJECTS', newProjectsArray);
    } else {
      commit('SET_HAST_PROJECTS_TO_LOAD', false);
    }
  },
  async addProject({ dispatch }, projectData) {
    await this.$services.projects.add(projectData);
  },
  async deleteProject({ dispatch }, projectId) {
    await this.$services.projects.delete(projectId);
    dispatch('loadAllProjects');
  },
  async loadProjectById({ commit, getters }, projectId) {
    let project = getters.allProjects.find((p) => p.id === projectId);

    if (!project)
      project = getters.loadedProjects.find((p) => p.id === projectId);

    if (!project) {
      project = await this.$services.projects.getById(projectId);
      if (!project) project = null;
    }

    commit('SET_LOADED_PROJECT_BY_ID', project);
  },
  async updateProject({ dispatch }, { projectId, updateFields }) {
    await this.$services.projects.update(projectId, updateFields);
    dispatch('loadAllProjects');
  },
  async updateProjectImages({ commit }, { projectId, images }) {
    await this.$services.projects.update(projectId, {
      images,
    });
  },
  async loadTopProjects({ commit }) {
    const topProjects = await this.$services.projects.getTopProjects();
    commit('SET_TOP_PROJECTS', topProjects);
  },
  async updateTopProjects({ dispatch }, projectIds) {
    await this.$services.projects.updateTopProjects(projectIds);
  },
  clearLoadedProjectsWithLimits({ commit }) {
    commit('CLEAR_LOADED_PROJECTS');
  },
};
