<template>
  <transition name="fade">
    <Backdrop full>
      <div class="bg-white rounded shadow-md p-5 md:w-5/6">
        <div class="flex justify-end">
          <button
            class="text-accent hover:text-accent-light"
            @click="$emit('close')"
          >
            <svg class="fill-current w-8 h-8">
              <use xlink:href="@/assets/svg/sprite.svg#icon-clear"></use>
            </svg>
          </button>
        </div>
        <slot></slot>
      </div>
    </Backdrop>
  </transition>
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
