<template>
  <div
    class="wrapper flex bg-accent-light text-white p-1 rounded cursor-default"
  >
    <div>
      {{ label }}
    </div>
    <div
      v-if="showCloseBox"
      class="w-0 opacity-0 shadow-md flex justify-end items-start close-box"
    >
      <button
        class="text-xs hover:font-bold"
        type="button"
        @click.prevent="$emit('clicked')"
      >
        x
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    showCloseBox: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
.wrapper:hover .close-box {
  @apply w-4 opacity-100 transition-all;
}
</style>
