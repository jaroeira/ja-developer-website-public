<template>
  <section>
    <SectionTitle :title="$t('components.about-section.areas-of-expertise')" />
    <div class="about-section mt-8">
      <div class="relative flex-1 bg-primary-light p-5 md:p-0">
        <div
          class="bg-white m-3 rounded-sm p-10 flex flex-col justify-between gap-5 md:w-8/12 md:h-5/6 md:absolute md:-top-6 md:left-1/2 md:-translate-x-1/2 md:shadow"
        >
          <h4 class="text-accent text text-4xl font-bold">
            {{ $t('components.about-section.title') }}
          </h4>
          <h2 class="text-secondary-text text-xl font-bold">
            {{ $t('components.about-section.subtitle') }}
          </h2>
          <p class="text-justify leading-relaxed">
            {{ $t('components.about-section.text') }}
          </p>
          <Button type="nuxt" :to="localePath('/about')" class="mx-auto w-8/12"
            >{{ $t('components.about-section.button') }}
          </Button>
        </div>
      </div>
      <div
        class="right-panel flex-1 grid grid-cols-4 justify-items-center items-center p-5 md:p-0 gap-3 md:gap-0"
      >
        <svg>
          <use xlink:href="@/assets/svg/brands-sprite.svg#icon-angular"></use>
        </svg>
        <svg>
          <use xlink:href="@/assets/svg/brands-sprite.svg#icon-react"></use>
        </svg>
        <svg>
          <use
            xlink:href="@/assets/svg/brands-sprite.svg#icon-vue-dot-js"
          ></use>
        </svg>
        <svg>
          <use
            xlink:href="@/assets/svg/brands-sprite.svg#icon-javascript"
          ></use>
        </svg>
        <svg>
          <use xlink:href="@/assets/svg/brands-sprite.svg#icon-swift"></use>
        </svg>
        <svg>
          <use
            xlink:href="@/assets/svg/brands-sprite.svg#icon-typescript"
          ></use>
        </svg>
        <svg>
          <use
            xlink:href="@/assets/svg/brands-sprite.svg#icon-node-dot-js"
          ></use>
        </svg>
        <svg>
          <use xlink:href="@/assets/svg/brands-sprite.svg#icon-redux"></use>
        </svg>
        <svg>
          <use xlink:href="@/assets/svg/brands-sprite.svg#icon-docker"></use>
        </svg>
        <svg>
          <use xlink:href="@/assets/svg/brands-sprite.svg#icon-github"></use>
        </svg>
        <svg>
          <use
            xlink:href="@/assets/svg/brands-sprite.svg#icon-visualstudiocode"
          ></use>
        </svg>
        <svg>
          <use
            xlink:href="@/assets/svg/brands-sprite.svg#icon-googlecloud"
          ></use>
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  @apply md:flex shadow-lg;
}

@media screen and (min-width: 768px) {
  .about-section {
    height: 31.25rem;
  }
}

.right-panel > svg {
  @apply w-10 md:w-20 h-10 md:h-20;
}
</style>
