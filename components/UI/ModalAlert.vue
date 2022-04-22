<template>
  <div>
    <Backdrop full>
      <div
        class="bg-white w-96 rounded shadow-md p-5 flex flex-col justify-center items-center gap-5"
      >
        <svg class="text-red-500 fill-current w-20 h-20">
          <use xlink:href="@/assets/svg/sprite.svg#icon-remove_circle"></use>
        </svg>
        <h2>Are You Sure?</h2>
        <p>You will not be able to recover this project</p>
        <div class="flex justify-center gap-5">
          <button
            class="bg-gray-500 hover:bg-gray-400 text-white rounded px-4 py-2 shadow"
            @click="$emit('cancel')"
          >
            Cancel
          </button>
          <button
            class="bg-red-600 hover:bg-red-400 text-white rounded px-4 py-2 shadow"
            @click="$emit('confirm')"
          >
            Delete
          </button>
        </div>
      </div>
    </Backdrop>
  </div>
</template>

<script>
export default {
  mounted() {
    document.body.classList.add('modal-open');
  },
  beforeDestroy() {
    document.body.classList.remove('modal-open');
  },
};
</script>
