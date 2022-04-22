<template>
  <section class="mx-auto" style="max-width: 62.5rem">
    <TheAboutInfoCard />
    <SectionTitle
      :title="$t('pages.about.linguistic-proficiency')"
      class="mb-5"
    />
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
      <div class="about__linguistic-item">
        <img
          class="fag-icon"
          src="@/assets/images/flags/br.png"
          alt="Portuguese"
        />
        <h4>{{ $t('pages.about.portuguese-label') }}:</h4>
        <p>{{ $t('pages.about.portuguese-value') }}</p>
      </div>
      <div class="about__linguistic-item">
        <img class="fag-icon" src="@/assets/images/flags/de.png" alt="German" />
        <h4>{{ $t('pages.about.german-label') }}:</h4>
        <p>{{ $t('pages.about.german-value') }}</p>
      </div>
      <div class="about__linguistic-item">
        <img
          class="fag-icon"
          src="@/assets/images/flags/us.png"
          alt="English"
        />
        <h4>{{ $t('pages.about.english-label') }}:</h4>
        <p>{{ $t('pages.about.english-value') }}</p>
      </div>
      <div class="about__linguistic-item">
        <img
          class="fag-icon"
          src="@/assets/images/flags/it.png"
          alt="Portuguese"
        />
        <h4>{{ $t('pages.about.italian-label') }}:</h4>
        <p>{{ $t('pages.about.italian-value') }}</p>
      </div>
    </div>
    <!-- EDUCATIONAL PATH -->
    <SectionTitle :title="$t('pages.about.educational-path')" class="my-5" />
    <VerticalTimeLine :entries="educationData" />

    <!-- Professional experience / internships -->
    <SectionTitle
      :title="$t('pages.about.professional-experience')"
      class="my-5"
    />
    <VerticalTimeLine :entries="experienceData" />

    <!-- Certificates of computer courses -->
    <SectionTitle
      :title="$t('pages.about.certificates-of-computer-courses')"
      class="my-5"
    />
    <VerticalTimeLine :entries="certificatesData" />
  </section>
</template>

<script>
import timelineData from '@/assets/data/timeline-data.json';

export default {
  data() {
    return {
      educationData: timelineData.educationData,
      experienceData: timelineData.experienceData,
      certificatesData: timelineData.certificatesData,
    };
  },
};
</script>

<style scoped>
.about__linguistic-item {
  @apply flex items-center gap-x-3;
}

.about__linguistic-item h4 {
  @apply font-bold;
}

.fag-icon {
  @apply w-5;
}

@media screen and (min-width: 13.046875rem) {
  .fag-icon {
    @apply w-10;
  }
}
</style>
