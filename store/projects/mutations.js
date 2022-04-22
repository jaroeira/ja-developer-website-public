export default {
  SET_LOADED_PROJECTS(state, payload) {
    if (payload) {
      state.loadedProjects = payload;
    }
  },
  SET_LAST_LOADED_PROJECT_ID(state, payload) {
    state.lastLoadedProjectId = payload;
  },
  SET_HAST_PROJECTS_TO_LOAD(state, payload) {
    state.hasProjectsToLoad = payload;
  },
  SET_ALL_PROJECTS(state, payload) {
    state.allProjects = payload;
  },
  SET_TOP_PROJECTS(state, payload) {
    state.topProjects = payload;
  },
  SET_LOADED_PROJECT_BY_ID(state, payload) {
    state.loadedProjectById = payload;
  },
  CLEAR_LOADED_PROJECTS(state) {
    state.lastLoadedProjectId = null;
    state.hasProjectsToLoad = true;
    state.loadedProjects = [];
  },
  CLEAR_STATE(state) {
    state.allProjects = [];
    state.loadedProjects = [];
    state.topProjects = [];
    state.lastLoadedProjectId = null;
    state.hasProjectsToLoad = true;
    state.loadedProjectById = null;
  },
};
