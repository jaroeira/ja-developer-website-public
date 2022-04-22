<template>
  <footer class="mt-20 py-10 px-20 bg-accent">
    <div class="social-networks flex justify-center gap-x-5">
      <a
        href="https://github.com/jaroeira?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg>
          <use xlink:href="@/assets/svg/social-sprite.svg#icon-github1"></use>
        </svg>
      </a>
      <a
        href="https://www.linkedin.com/in/joão-menicucci-78403b92/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg>
          <use xlink:href="@/assets/svg/social-sprite.svg#icon-linkedin"></use>
        </svg>
      </a>
      <a
        href="https://www.instagram.com/j.aroeira/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg>
          <use xlink:href="@/assets/svg/social-sprite.svg#icon-instagram"></use>
        </svg>
      </a>
      <a
        href="https://www.facebook.com/j.aroeira"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg>
          <use xlink:href="@/assets/svg/social-sprite.svg#icon-facebook2"></use>
        </svg>
      </a>
    </div>
    <div class="mt-10">
      <p class="text-secondary-text text-center">
        &copy; Copyright {{ new Date().getFullYear() }} João Aroeira
      </p>
    </div>
  </footer>
</template>

<style scoped>
.social-networks svg {
  @apply w-10 h-10 text-secondary-text fill-current;
}
</style>
