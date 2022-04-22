export default function ({ store, redirect, route, app }) {
  if (!store.getters['auth/isAuthenticated']) {
    const authPath = route.path ? `/auth?redirect=${route.path}` : '/auth';
    return redirect(authPath);
  }
}
