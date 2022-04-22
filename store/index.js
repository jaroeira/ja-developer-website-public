export const state = () => ({});

export const actions = {
  async nuxtServerInit({ dispatch, commit }, { res }) {
    // initialize the store with user if already authenticated
    if (res && res.locals && res.locals.user) {
      const {
        allClaims: claims,
        idToken: token,
        ...authUser
      } = res.locals.user;
      await dispatch('auth/onAuthStateChangedAction', {
        authUser,
        claims,
        token,
      });
    }

    await dispatch('projects/loadTopProjects');
  },
};
