<template>
  <nuxt-link v-if="type === 'nuxt'" :to="to" :class="buttonStyle">
    <slot></slot>
  </nuxt-link>

  <button v-else :class="buttonStyle" @click="$emit('clicked')">
    <slot></slot>
  </button>
</template>

<script>
const button = 'BUTTON';
const link = 'LINK';

export default {
  props: {
    buttonType: {
      type: String,
      default: button,
    },
    type: {
      type: String,
      default: 'button',
    },
    to: {
      type: String,
      default: '/',
    },
  },
  computed: {
    buttonStyle() {
      switch (this.buttonType) {
        case button:
          return 'buttonStyle';
        case link:
          return 'linkStyle ';
        default:
          return 'buttonStyle';
      }
    },
  },
};
</script>

<style scoped>
.buttonStyle {
  @apply bg-accent rounded px-5 py-3 shadow text-secondary-text hover:text-white hover:bg-accent-light text-center;
}

.linkStyle {
  @apply bg-transparent border-0 text-primary text-lg hidden md:inline-block hover:border-b-2 hover:border-solid hover:border-primary;
}
</style>
