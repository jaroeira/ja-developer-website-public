<template>
  <div :class="horizontal ? 'brand-icon-horizontal' : 'brand-icon-vertical'">
    <!-- eslint-disable -->
    <div v-html="src" :class="horizontal ? 'brand-icon-small' : ''" />
    <!-- eslint-enable -->
    <h3
      v-if="label !== ''"
      :class="horizontal ? 'brand-icon-small-label' : 'brand-icon-big-label'"
    >
      {{ label }}
    </h3>
  </div>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    src() {
      return require(`/assets/svg/brands/${this.iconName}.svg?raw`);
    },
  },
};
</script>

<style>
.brand-icon-vertical {
  @apply flex flex-col justify-center items-center gap-y-1;
}

.brand-icon-horizontal {
  @apply flex justify-start items-center gap-1 py-1;
}

.brand-icon-small {
  @apply w-5 h-5;
}

.brand-icon-small svg {
  @apply w-5 h-5;
}

.brand-icon-big-label {
  @apply text-accent font-semibold;
}

.brand-icon-small-label {
  @apply text-sm;
}
</style>
