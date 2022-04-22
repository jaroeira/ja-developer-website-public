<template>
  <div class="section-title flex flex-col md:flex-row items-center">
    <h2
      class="uppercase font-light flex-shrink-0 mr-5"
      :class="admin ? 'admin' : 'default'"
      :style="colorLight ? `color: #ffff` : ''"
    >
      {{ title }}
    </h2>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    colorLight: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.section-title::after {
  content: '';
  height: 1px;
  @apply block w-full bg-divider mb-5 md:mb-0;
}

.admin {
  @apply text-admin-accent text-xl;
}

.default {
  @apply text-2xl;
}
</style>
