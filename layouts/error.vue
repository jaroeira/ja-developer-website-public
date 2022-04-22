<template>
  <section class="flex justify-center items-center" style="height: 37.5rem">
    <div
      v-if="error.statusCode === 404"
      class="flex flex-col items-center gap-7"
    >
      <h1 class="text-center text-8xl md:text-9xl text-accent">404</h1>
      <h2 class="text-xl md:text-3xl uppercase">
        {{ $t('pages.error.cant-find-page') }}
      </h2>
      <p class="text-center">
        {{ $t('pages.error.404-message') }}
      </p>

      <Button type="nuxt" :to="localePath('/')">
        {{ $t('pages.error.go-back-button-label') }}</Button
      >
    </div>
    <div v-else class="flex flex-col items-center gap-4">
      <svg class="w-30 h-30 text-red-500 fill-current">
        <use xlink:href="@/assets/svg/sprite.svg#icon-error_outline"></use>
      </svg>
      <h1 class="text-center text-3xl md:text-4xl text-accent uppercase">
        {{ $t('pages.error.error') }}
      </h1>
      <h2 class="text-xl md:text-3xl uppercase">
        {{ $t('pages.error.general-error-message') }}
      </h2>
      <p v-if="error.message !== ''" class="text-center">
        {{ error.message }}
      </p>
      <Button type="nuxt" :to="localePath('/')">{{
        $t('pages.error.go-back-button-label')
      }}</Button>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
