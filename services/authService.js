export default ($fire) => {
  return {
    login: (email, password) => {
      return $fire.auth.signInWithEmailAndPassword(email, password);
    },
    logout: () => {
      return $fire.auth.signOut();
    },
  };
};
