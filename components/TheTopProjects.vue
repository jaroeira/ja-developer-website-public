<template>
  <section class="my-5">
    <SectionTitle :title="$t('components.the-top-projects.my-projects')" />
    <div
      v-if="!isSmallSize"
      class="hidden md:grid md:grid-cols-3 gap-5"
      style="height: 27.75rem"
    >
      <ProjectFlipCard
        v-for="project in topProjects"
        :key="project.id"
        :project="project"
      />
    </div>
    <div v-else class="block md:hidden">
      <client-only>
        <Splide :options="sliderSettings">
          <SplideSlide v-for="project in topProjects" :key="project.id">
            <ProjectFlipCard :project="project" class="pb-10" />
          </SplideSlide>
        </Splide>
        <template #placeholder>
          <div
            class="w-full flex justify-center items-center"
            style="height: 45.75rem"
          >
            <img
              class="h-20 w-20"
              src="@/assets/svg/spinner.svg"
              alt="loading"
            />
          </div>
        </template>
      </client-only>
    </div>
    <div class="mt-10 flex justify-center">
      <Button type="nuxt" :to="localePath('/projects')">{{
        $t('components.the-top-projects.see-all-projects')
      }}</Button>
    </div>
  </section>
</template>

<script>
import throttle from 'lodash/throttle';

export default {
  props: {
    topProjects: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      sliderSettings: {
        arrows: false,
        gap: '2rem',
      },
      windowSize: 0,
    };
  },
  computed: {
    isSmallSize() {
      return this.windowSize < 768;
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize, { passive: true });
    this.windowSize = window.innerWidth;
    this.$emit('ready');
  },
  beforeDestroy() {
    if (typeof window === 'undefined') return;
    window.removeEventListener('resize', this.handleResize, { passive: true });
  },
  methods: {
    handleResize: throttle(function () {
      this.windowSize = window.innerWidth;
    }, 300),
  },
};
</script>

<style>
.splide__pagination__page.is-active {
  @apply bg-accent;
}
</style>
