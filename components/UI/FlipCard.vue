<template>
  <div class="card-height card-perspective relative rounded md:max-w-md">
    <div
      class="rounded-t card-height side"
      :class="isFlipped ? 'front-flipped' : ''"
    >
      <slot name="front"></slot>
      <div
        class="py-3 px-5 flex justify-center absolute bottom-0 right-1/2 translate-x-1/2 w-full"
      >
        <Button button-type="LINK" @clicked="flipCard">{{
          flipButtonText
        }}</Button>
      </div>
    </div>
    <div
      class="rounded-b card-height side back"
      :class="isFlipped ? 'back-flipped' : ''"
      @click="flipCard"
    >
      <slot name="back"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    flipButtonText: {
      type: String,
      default: 'Flip Card',
    },
  },
  data() {
    return {
      isFlipped: false,
    };
  },
  methods: {
    flipCard() {
      this.isFlipped = !this.isFlipped;
    },
  },
};
</script>

<style scoped>
.side {
  backface-visibility: hidden;
  @apply w-full md:rounded md:absolute top-0 left-0 bg-white md:shadow-md transition-all duration-700;
}

.card-height {
  min-height: 20rem;
}

@media screen and (min-width: 768px) {
  .card-height {
    min-height: 25rem;
  }
}

.card-perspective {
  perspective: 93.75rem;
}

@media screen and (min-width: 768px) {
  .back {
    transform: rotateY(180deg);
  }

  .front-flipped {
    transform: rotateY(180deg);
  }

  .back-flipped {
    transform: rotateY(0);
  }
}
</style>
