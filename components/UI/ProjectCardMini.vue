<template>
  <!-- Projects Cards -->
  <div
    class="bg-white shadow-md rounded w-52"
    style="flex: 0 0 auto"
    :style="isTopProject ? 'width: 17.5rem' : ''"
  >
    <img
      :src="imageUrl(project.images[0].publicId)"
      alt="project cover"
      class="rounded-t w-full h-32 object-cover"
    />
    <h3 class="text-center truncate">
      {{ project.title.en }}
    </h3>
    <div
      class="h-7 p-2 flex items-center cursor-pointer"
      :class="isTopProject ? 'justify-between' : 'justify-end'"
    >
      <span v-if="isTopProject">&#x2630;</span>
      <button
        v-if="showAddButton && !isTopProject"
        type="button"
        class="text-green-400 hover:text-green-500"
        @click="$emit('add')"
      >
        <svg class="w-5 h-5 fill-current">
          <use xlink:href="@/assets/svg/sprite.svg#icon-add_circle"></use>
        </svg>
      </button>

      <button
        v-if="isTopProject"
        type="button"
        class="text-red-400 hover:text-red-500"
        @click="$emit('remove')"
      >
        <svg class="w-5 h-5 fill-current">
          <use xlink:href="@/assets/svg/sprite.svg#icon-remove_circle"></use>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      required: true,
    },
    showAddButton: {
      type: Boolean,
      default: true,
    },
    isTopProject: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    imageUrl(publicId) {
      return this.$cloudinary.image.url(publicId, {
        crop: 'scale',
        width: 250,
      });
    },
  },
};
</script>
