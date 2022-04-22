<i18n>
{
  "en": {
    "title": "Fullstack Developer",
    "description": "I develop apps with the major frontend and backend technologies for both web and mobile platforms"
  },
  "de": {
    "title": "Fullstack Entwickler",
    "description": "Ich entwickle Apps mit den wichtigsten Frontend und Backend Technologien für Web und mobile Plattformen"
  },
  "pt": {
    "title": "Desenvolvedor Fullstack",
    "description": "Desenvolvo aplicativos com as principais tecnologias de front-end e back-end para plataformas web e móveis"
  }
}
</i18n>

<template>
  <section
    class="bg-hero-background bg-cover h-65vh md:h-40vh lg:h-70vh flex justify-center items-center"
  >
    <div
      class="flex flex-col md:flex-row items-center md:justify-between w-full max-w-5xl"
    >
      <div class="max-w-2xl mb-5 md:mb-0 text-white">
        <h1
          class="font-semibold text-4xl md:text-5xl tracking-wide text-center md:text-left mb-5"
        >
          {{ $t('title') }}
        </h1>
        <p class="text-2xl leading-10 text-center md:text-left">
          {{ $t('description') }}
        </p>
      </div>
      <div class="flex flex-col justify-center items-center text-white">
        <img
          src="@/assets/images/joao.jpeg"
          alt="Me"
          class="w-60 h-60 rounded-full border-primary-light border-solid border-2"
        />
        <h3 class="mt-3 text-xl font-semibold">João Aroeira</h3>
      </div>
    </div>
  </section>
</template>
