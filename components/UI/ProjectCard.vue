<template>
  <div
    class="bg-white shadow-md rounded overflow-hidden"
    :class="horizontal ? 'horizontal' : ''"
  >
    <div class="image-container">
      <img class="w-full h-80 object-cover" :src="imageUrl" alt="project" />
    </div>
    <div
      class="content flex flex-col gap-3"
      :class="compact ? 'py-2 px-5' : 'py-5 px-10'"
    >
      <h2
        class="text-accent font-bold"
        style="flex: 1"
        :class="compact ? 'text-xl' : 'text-3xl'"
      >
        {{ projectTitle }}
      </h2>
      <div v-if="!compact" style="flex: 1">
        <ul class="flex gap-3 uppercase text-secondary-text font-semibold">
          <li v-for="(tag, index) in tags" :key="index">
            <nuxt-link :to="localePath(`/projects?tag=${tag}`)">{{
              tag
            }}</nuxt-link>
          </li>
        </ul>
      </div>
      <p class="description" style="flex: 4">
        {{ projectDescription }}
      </p>
      <div v-if="showActions" class="flex justify-end gap-4" style="flex: 1">
        <Button type="nuxt" :to="localePath(`/projects/${project.id}`)">{{
          $t('components.project-card.view-project')
        }}</Button>
        <button
          v-if="admin"
          class="action-button"
          @click="$emit('edit', project.id)"
        >
          <svg class="text-accent fill-current">
            <use xlink:href="@/assets/svg/sprite.svg#icon-create"></use>
          </svg>
        </button>
        <button v-if="admin" class="action-button" @click="$emit('remove')">
          <svg class="text-red-500 fill-current">
            <use xlink:href="@/assets/svg/sprite.svg#icon-remove_circle"></use>
          </svg>
        </button>
      </div>
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
    admin: {
      type: Boolean,
      default: false,
    },
    showActions: {
      type: Boolean,
      default: true,
    },
    horizontal: {
      type: Boolean,
      default: true,
    },
    compact: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    projectTitle() {
      const locale = this.$i18n.locale;
      return this.project.title[locale]
        ? this.project.title[locale]
        : this.project.title.en;
    },
    projectDescription() {
      const locale = this.$i18n.locale;
      return this.project.description[locale]
        ? this.project.description[locale]
        : this.project.description.en;
    },
    imageUrl() {
      if (this.project.images && this.project.images[0].publicId) {
        const publicId = this.project.images[0].publicId;
        return this.$cloudinary.image.url(publicId, {
          crop: 'scale',
          width: 400,
        });
      } else {
        return '/_nuxt/assets/images/project1.png';
      }
    },
    tags() {
      if (this.project) {
        return this.project.tags;
      } else {
        return ['No-Tags'];
      }
    },
  },
};
</script>

<style scoped>
.horizontal {
  @apply md:flex;
}

.image-container {
  flex: 1;
}

.description {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  @apply text-justify overflow-ellipsis;
}

@media screen and (min-width: 768px) {
  .content {
    flex: 2;
  }
}

.action-button svg {
  @apply w-8 h-8;
}
</style>
