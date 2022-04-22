<template>
  <Backdrop full>
    <div
      class="bg-white p-5 rounded w-40 flex flex-col items-center justify-center"
    >
      <img src="@/assets/svg/spinner.svg" alt="loading" class="w-20 h-20" />
      <h2 class="text-admin-accent">{{ text }}</h2>
    </div>
  </Backdrop>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Loading',
    },
  },
};
</script>
