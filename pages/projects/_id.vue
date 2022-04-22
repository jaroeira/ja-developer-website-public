<template>
  <section class="default-container pt-6">
    <SectionTitle :title="projectTitle" />
    <ThumbnailGallery :images="project.images" class="my-4" />
    <div class="vertical-space">
      <SectionTitle :title="$t('pages.project-detail.description')" />
      <p class="text-primary-dark text-justify p-8">
        {{ projectDescription }}
      </p>
    </div>
    <div class="vertical-space">
      <SectionTitle :title="$t('pages.project-detail.frameworks-and-tools')" />
      <div class="mt-4 flex gap-3 flex-wrap">
        <BrandIcon
          v-for="(tool, index) in toolsInfos"
          :key="index"
          :icon-name="tool.svgName"
          :label="tool.label"
        />
      </div>
    </div>
    <div
      v-if="project.projectUrl !== '' || project.repositoryUrl !== ''"
      class="vertical-space"
    >
      <SectionTitle :title="$t('pages.project-detail.project-links')" />
      <div
        v-if="project.repositoryUrl !== ''"
        class="mt-4 text-accent hover:text-accent-light flex items-center gap-4"
      >
        <svg class="h-10 w-10 fill-current">
          <use xlink:href="@/assets/svg/social-sprite.svg#icon-github1"></use>
        </svg>
        <a
          :href="project.repositoryUrl"
          target="_blank"
          rel="noopener noreferrer"
          >{{ $t('pages.project-detail.view-on-github') }}</a
        >
      </div>
      <div
        v-if="project.projectUrl !== ''"
        class="mt-4 text-accent hover:text-accent-light flex items-center gap-4"
      >
        <svg class="h-10 w-10 fill-current">
          <use xlink:href="@/assets/svg/sprite.svg#icon-desktop_mac"></use>
        </svg>
        <a
          :href="project.projectUrl"
          target="_blank"
          rel="noopener noreferrer"
          >{{ $t('pages.project-detail.open-project') }}</a
        >
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import brandInfos from '~/utils/brandInfos.js';

export default {
  async validate({ params, store }) {
    const id = params.id;

    try {
      await store.dispatch('projects/loadProjectById', id);
      const project = store.getters['projects/loadedProjectById'];
      if (!project || project.id !== id) {
        return this.$nuxt.error({
          statusCode: 404,
          message: 'Project not found',
        });
      }
      return true;
    } catch (error) {
      return this.$nuxt.error({
        statusCode: 500,
        message: 'Internal error',
      });
    }
  },
  head() {
    return {
      title: `João Aroeira - ${this.projectTitle}`,
      meta: [
        {
          hid: this.projectDescription,
          name: this.projectDescription,
          content: this.projectDescription,
        },

        ...this.$services.seo.generateTags({
          title: `João Aroeira - ${this.projectTitle}`,
          description: this.projectDescription,
          imageUrl: this.imageUrl(this.project.images[0].publicId),
          url: `${this.$config.baseUrl}/projects/${this.project.id}`,
          locale: this.$i18n.localeProperties.iso,
        }),
      ],
    };
  },
  computed: {
    ...mapGetters({ project: 'projects/loadedProjectById' }),
    toolsInfos() {
      const sorted = this.project.tools.map((toolName) =>
        this.toolData(toolName)
      );
      sorted.sort((a, b) => a.label.localeCompare(b.label));
      return sorted;
    },
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
  },

  methods: {
    toolData(name) {
      const data = brandInfos.getInfo(name);
      return data;
    },
    imageUrl(publicId) {
      return this.$cloudinary.image.url(publicId, {
        crop: 'scale',
        width: 400,
      });
    },
  },
};
</script>

<style scoped>
.vertical-space {
  @apply mt-10;
}
</style>
