<template>
  <!-- Card -->
  <div class="overflow-hiden flex flex-col">
    <!-- Content -->
    <div class="overflow-x-scroll">
      <Container
        orientation="horizontal"
        behaviour="contain"
        class="pb-4"
        drag-class="opacity-ghost"
        drop-class="opacity-ghost-drop"
        drag-handle-selector=".column-drag-handle"
        @drop="onDrop"
      >
        <!-- Image Card -->
        <Draggable v-for="(image, index) in images" :key="index">
          <div
            class="w-64 h-40 flex flex-col px-1 cursor-pointer shadow-md"
            style="min-height: 9.375rem"
          >
            <!-- Image -->
            <div class="flex-1">
              <img
                :src="imageUrl(image.publicId)"
                class="w-64 object-cover"
                style="height: 7.86rem"
              />
            </div>

            <!-- Image Card Footer -->
            <div class="flex-none flex items-center justify-between px-1">
              <div class="flex items-center gap-2">
                <span v-if="images.length > 1" class="column-drag-handle"
                  >&#x2630;</span
                >
                <h3>{{ index + 1 }}</h3>
              </div>
              <button
                v-if="images.length > 1"
                type="button"
                class="text-red-400 hover:text-red-500"
                @click="removeImage(index)"
              >
                <svg class="w-7 h-7 fill-current">
                  <use
                    xlink:href="@/assets/svg/sprite.svg#icon-remove_circle"
                  ></use>
                </svg>
              </button>
            </div>
          </div>
        </Draggable>
      </Container>
    </div>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue-dndrop';

export default {
  components: { Container, Draggable },
  props: {
    inputImages: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      images: [],
    };
  },
  watch: {
    inputImages() {
      this.images = [...this.inputImages];
    },
  },
  mounted() {
    this.images = [...this.inputImages];
  },
  methods: {
    onDrop(dropResult) {
      this.applyDrag(dropResult);
    },
    applyDrag(dropResult) {
      const fromIndex = dropResult.removedIndex;
      const toIndex = dropResult.addedIndex;
      const list = [...this.images];
      const toItem = list[toIndex];
      list[toIndex] = list[fromIndex];
      list[fromIndex] = toItem;

      this.images = list;

      this.reorderImages();
    },
    removeImage(index) {
      if (this.images.length > 1) {
        this.images.splice(index, 1);
        this.reorderImages();
      }
    },
    reorderImages() {
      const reorderedImages = [];
      this.images.forEach((image) =>
        reorderedImages.push(Object.assign({}, image))
      );

      reorderedImages.forEach((image, index) => {
        image.order = index;
      });

      this.$emit('reordered', reorderedImages);
    },
    imageUrl(publicId) {
      return this.$cloudinary.image.url(publicId, {
        crop: 'scale',
        width: 250,
      });
    },
  },
};
</script>

<style scoped>
.opacity-ghost {
  @apply opacity-75;
}

.opacity-ghost-drop {
  @apply opacity-75;
}
</style>
