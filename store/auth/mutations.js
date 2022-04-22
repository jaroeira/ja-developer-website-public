export default {
  SET_USER(state, payload) {
    if (payload) {
      const { uid, email } = payload;
      state.user = { uid, email };
    }
  },
  CLEAR_USER(state) {
    state.user = null;
  },
};
