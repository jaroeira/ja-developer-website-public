<template>
  <div>
    <TheHero />
    <div class="default-container">
      <TheTopProjects
        v-show="isTopProjectsReady"
        :top-projects="topProjects"
        @ready="setTopProjectsReady"
      />
      <transition name="fade">
        <div
          v-if="!isTopProjectsReady"
          class="h-96 flex justify-center items-center"
        >
          {{ $t('pages.main.loading') }}
          <img class="w-12" src="~/assets/svg/spinner.svg" alt="loading" />
        </div>
      </transition>
      <TheAboutSection class="mt-10" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  async validate({ store }) {
    if (store.getters['projects/topProjects'].length === 0) {
      await store.dispatch('projects/loadTopProjects');
    }
    return true;
  },
  data() {
    return {
      isTopProjectsReady: false,
    };
  },
  head() {
    return {
      meta: [
        {
          hid: this.$t('seo.pages.home.description'),
          name: this.$t('seo.pages.home.description'),
          content: this.$t('seo.pages.home.description'),
        },

        ...this.$services.seo.generateTags({
          title: this.$t('seo.global.title'),
          description: this.$t('seo.pages.home.description'),
          imageUrl: this.$config.twitterCardImageUrl,
          url: this.$config.baseUrl,
          locale: this.$i18n.localeProperties.iso,
        }),
      ],
    };
  },

  computed: {
    ...mapGetters({ topProjects: 'projects/topProjects' }),
  },
  methods: {
    setTopProjectsReady() {
      this.isTopProjectsReady = true;
    },
  },
};
</script>
