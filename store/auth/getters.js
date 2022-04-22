export default {
  isAuthenticated(state) {
    return state.user != null;
  },
  user(state) {
    return state.user;
  },
};
