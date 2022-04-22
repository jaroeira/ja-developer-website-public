<template>
  <!-- info card -->
  <div
    class="bg-accent text-primary-text my-5 flex shadow-md rounded overflow-hidden"
  >
    <!-- Fex 1 -->
    <img
      src="@/assets/images/fotoJoao.jpeg"
      alt="Photo"
      class="object-cover hidden md:block"
      style="width: 18.75rem"
    />
    <!-- Fex 2 -->
    <div class="p-10 flex-grow-2">
      <h2 class="text-4xl mt-2">João Luiz Aroeira</h2>
      <h3 class="text-xl font-normal mb-10 mt-3">
        {{ $t('components.the-about-info-card.web-mobile-developer-label') }}
      </h3>
      <div class="about__info-data-item mb-1">
        <svg class="about__info-data-item-icon">
          <use xlink:href="@/assets/svg/sprite.svg#icon-alternate_email"></use>
        </svg>
        <p class="about__info-data-item-text">
          E-Mail:&nbsp; j.aroeira@gmail.com
        </p>
      </div>

      <div class="about__info-data-item mb-1">
        <svg class="about__info-data-item-icon">
          <use xlink:href="@/assets/svg/sprite.svg#icon-calendar_today"></use>
        </svg>
        <p class="about__info-data-item-text">
          {{ $t('components.the-about-info-card.date-of-birth-label') }}:&nbsp;
          {{ $t('components.the-about-info-card.date-of-birth-value') }}
        </p>
      </div>

      <div class="about__info-data-item mb-1">
        <svg class="about__info-data-item-icon">
          <use xlink:href="@/assets/svg/sprite.svg#icon-public"></use>
        </svg>
        <p class="about__info-data-item-text">
          {{ $t('components.the-about-info-card.nationality-label') }}:&nbsp;
          {{ $t('components.the-about-info-card.nationality-value') }}
        </p>
      </div>

      <div class="about__info-data-item">
        <svg class="about__info-data-item-icon">
          <use xlink:href="@/assets/svg/sprite.svg#icon-location_on"></use>
        </svg>
        <p class="about__info-data-item-text">
          {{ $t('components.the-about-info-card.current-location-label') }}:
          &nbsp; Belo Horizonte - MG - Brazil
        </p>
      </div>
    </div>
    <!-- Fex 1 -->
    <div class="justify-center items-center hidden md:flex flex-grow px-7">
      <svg class="about__info-icon">
        <use xlink:href="@/assets/svg/sprite.svg#icon-badge"></use>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.about__info-icon {
  width: 9.375rem;
  height: 9.375rem;
  @apply text-primary-text fill-current;
}

.about__info-data-item-text {
  @apply font-light;
}

.about__info-data-item {
  @apply flex gap-y-1.5;
}

.about__info-data-item-icon {
  @apply w-5 h-5 text-primary-text fill-current mr-3;
}
</style>
