export default {
  onAuthStateChangedAction: ({ commit, dispatch }, { authUser }) => {
    if (!authUser) {
      commit('CLEAR_USER');
    } else {
      commit('SET_USER', authUser);
    }
  },
  login({ commit, dispatch }, authData) {
    return this.$services.auth.login(authData.email, authData.password);
  },
  logout() {
    return this.$services.auth.logout();
  },
};
