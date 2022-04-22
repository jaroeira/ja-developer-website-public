export default function (errorCode) {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Invalid email';
    case 'auth/user-disabled':
      return 'Email or password incorrect';
    case 'auth/user-not-found':
      return 'Email or password incorrect';
    case 'auth/wrong-password':
      return 'Email or password incorrect';
    default:
      return 'Something went wrong. Please try again later.';
  }
}
