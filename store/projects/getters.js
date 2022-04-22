export default {
  allProjects(state) {
    return state.allProjects;
  },
  loadedProjects(state) {
    return state.loadedProjects;
  },
  hasProjectsToLoad(state) {
    return state.hasProjectsToLoad;
  },
  lastLoadedProjectId(state) {
    return state.lastLoadedProjectId;
  },
  topProjects(state) {
    return state.topProjects;
  },
  loadedProjectById(state) {
    return state.loadedProjectById;
  },
};
