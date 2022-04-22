<template>
  <FlipCard
    class="mt-11"
    :flip-button-text="$t('components.project-flip-card.show-all-features')"
  >
    <template #front>
      <BrandCircle class="brand-position" :brand-name="project.mainFramework" />
      <h4 class="brand-title">{{ brandLabel }}</h4>

      <nuxt-link :to="localePath(`/projects/${project.id}`)">
        <h4 class="py-8 text-center text-3xl text-accent font-bold">
          {{ projectTitle }}
        </h4>
      </nuxt-link>

      <nuxt-link :to="localePath(`/projects/${project.id}`)">
        <p class="px-5 text-justify line-clamp">
          {{ projectDescription }}
        </p>
      </nuxt-link>
    </template>
    <template #back>
      <BrandCircle class="brand-position" :brand-name="project.mainFramework" />
      <h4 class="brand-title hidden md:block">{{ brandLabel }}</h4>
      <div class="p-5">
        <h4 class="subtitle">
          {{ $t('components.project-flip-card.frameworks-and-tools') }}
        </h4>
        <div class="grid grid-cols-2 grid-rows-3 gap-1 px-10">
          <BrandIcon
            v-for="(tool, index) in toolsInfos"
            :key="index"
            :icon-name="tool.svgName"
            :label="tool.label"
            :horizontal="true"
          />
        </div>
        <div v-if="project.projectUrl !== '' || project.repositoryUrl !== ''">
          <h4 v-if="project.repositoryUrl !== ''" class="subtitle">
            {{ $t('components.project-flip-card.source-code') }}
          </h4>
          <div
            v-if="project.repositoryUrl !== ''"
            class="flex justify-center items-center"
          >
            <svg class="w-7 h-7 mr-3">
              <use
                xlink:href="@/assets/svg/brands-sprite.svg#icon-github"
              ></use>
            </svg>
            <a
              :href="project.repositoryUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-secondary-text"
              >{{ $t('components.project-flip-card.view-on-github') }}</a
            >
          </div>
          <h4 v-if="project.projectUrl !== ''" class="subtitle">
            {{ $t('components.project-flip-card.demo') }}
          </h4>
          <div
            v-if="project.projectUrl !== ''"
            class="flex justify-center items-center"
          >
            <a
              :href="project.projectUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-secondary-text"
              >{{ $t('components.project-flip-card.open-project') }}</a
            >
          </div>
        </div>
      </div>
    </template>
  </FlipCard>
</template>

<script>
import brandInfos from '~/utils/brandInfos.js';

export default {
  props: {
    project: {
      type: Object,
      required: true,
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
    brandLabel() {
      const brandInfo = brandInfos.getInfo(this.project.mainFramework);
      return brandInfo.label;
    },
    toolsInfos() {
      const sorted = this.project.tools.map((toolName) =>
        this.toolData(toolName)
      );
      sorted.sort((a, b) => a.label.localeCompare(b.label));

      if (sorted.length > 6) {
        return sorted.slice(0, 6);
      }

      return sorted;
    },
  },
  methods: {
    toolData(name) {
      const data = brandInfos.getInfo(name);
      return data;
    },
  },
};
</script>

<style scoped>
.brand-position {
  @apply absolute right-1/2 translate-x-1/2 -top-10;
}

.brand-title {
  @apply pt-12  text-center font-bold;
}

.subtitle {
  @apply text-center my-3 font-bold;
}

.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  text-overflow: hidden;
  overflow: hidden;
}
</style>
