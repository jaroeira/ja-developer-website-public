export default ($fire) => {
  return {
    deploy: () => {
      const deploy = $fire.functions.httpsCallable('deployProjectOnVercel');
      return deploy({});
    },
  };
};
