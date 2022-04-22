<template>
  <transition name="fade">
    <Backdrop full>
      <div
        class="bg-white w-96 rounded shadow-md p-5 flex flex-col justify-center items-center gap-5"
      >
        <div class="flex justify-end w-full">
          <button
            class="text-accent hover:text-accent-light"
            @click="$emit('close')"
          >
            <svg class="fill-current w-8 h-8">
              <use xlink:href="@/assets/svg/sprite.svg#icon-clear"></use>
            </svg>
          </button>
        </div>
        <svg class="text-accent fill-current w-20 h-20">
          <use xlink:href="@/assets/svg/sprite.svg#icon-mail_outline"></use>
        </svg>
        <p>{{ text }}</p>
        <div class="flex justify-center gap-5">
          <button
            class="bg-accent hover:bg-accent-light text-white rounded px-4 py-2 shadow"
            @click="$emit('close')"
          >
            {{ buttonLabel }}
          </button>
        </div>
      </div>
    </Backdrop>
  </transition>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    buttonLabel: {
      type: String,
      required: true,
    },
  },
  mounted() {
    document.body.classList.add('modal-open');
  },
  beforeDestroy() {
    document.body.classList.remove('modal-open');
  },
};
</script>
