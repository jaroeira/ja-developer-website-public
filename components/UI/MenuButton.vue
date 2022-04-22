<template>
  <button
    class="w-7 h-7 flex justify-center items-center flex-col group"
    @click="$emit('clicked')"
  >
    <div
      class="line group-hover:bg-primary-text"
      :class="isOpen ? 'rotate-45 translate-y-2.5' : ''"
    ></div>
    <div
      class="line group-hover:bg-primary-text"
      :class="isOpen ? 'opacity-0' : 'opacity-100'"
    ></div>
    <div
      class="line group-hover:bg-primary-text"
      :class="isOpen ? '-rotate-45 -translate-y-2.5' : ''"
    ></div>
  </button>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.line {
  @apply h-1 w-6 my-1 bg-secondary-text rounded-full transition transform duration-300;
}
</style>
