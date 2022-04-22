<template>
  <div class="time-line">
    <div v-for="entry in entries" :key="entry.id" class="time-line-entry">
      <div class="time-line-entry__title">{{ localized(entry.title) }}</div>
      <div>
        <p class="line-height text-right md:text-justify">
          {{ localized(entry.text) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    entries: {
      type: Array,
      required: true,
    },
  },
  methods: {
    localized(value) {
      const locale = this.$i18n.locale;
      if (value[locale]) {
        return value[locale];
      } else if (value.en) {
        return value.en;
      } else {
        return value;
      }
    },
  },
};
</script>

<style scoped>
.time-line {
  @apply relative flex flex-col max-w-screen-xl mx-auto;
}

.time-line::before {
  content: '';
  top: 0;
  left: 90%;
  bottom: 0;
  @apply absolute -translate-x-1/2 block bg-accent w-0.5;
}

@media screen and (min-width: 768px) {
  .time-line::before {
    @apply left-1/2 translate-x-1/2;
  }
}

.time-line-entry {
  width: 90%;
  @apply self-start p-5 text-accent;
}

@media screen and (min-width: 768px) {
  .time-line-entry {
    width: 50%;
  }

  .time-line-entry:nth-child(2n) {
    @apply self-end text-left;
  }

  .time-line-entry:nth-child(2n) .time-line-entry__title::before {
    right: 100.4%;
  }
}

.time-line-entry__title {
  @apply relative font-semibold text-2xl mb-3;
}

.time-line-entry__title::before {
  content: '';
  right: -2.28rem;
  top: 30%;
  @apply absolute w-4 h-4 border-4 border-solid
    border-accent bg-background  -translate-x-1/2 rounded-full;
}

@media screen and (min-width: 768px) {
  .time-line-entry__title::before {
    right: -8.3%;
  }
}
</style>
