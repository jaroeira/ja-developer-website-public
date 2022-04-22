<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center"
    :class="full ? 'z-40' : 'z-10'"
    @click="$emit('clicked')"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    full: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
