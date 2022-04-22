<template>
  <header id="the-header">
    <div class="header">
      <nav class="w-full flex justify-end md:justify-between">
        <ul
          class="flex flex-col md:flex-row items-center gap-y-5 md:gap-x-5 md:gap-y-0 p-2.5 bg-primary md:bg-transparent text-2xl overflow-hidden md:text-base invisible md:visible absolute right-0 left-0 top-12 md:static -translate-y-80 md:translate-y-0 opacity-0 md:opacity-100 transition-transform ease-out duration-500"
          :class="isMenuOpen ? 'show-mobile-menu' : ''"
        >
          <li v-for="link in navigationLinks" :key="link.label">
            <nuxt-link :to="localePath(link.to)" @click.native="closeMenu">{{
              $t(link.label)
            }}</nuxt-link>
          </li>
          <slot name="nav"></slot>
        </ul>
        <div class="flex items-center z-20">
          <button
            v-if="showLanguageSelector"
            class="language-selector"
            @click="toggleLanguageList"
            @focusout="closeLanguageList"
          >
            <svg class="icon w-6 h-6 mr-1 fill-current text-secondary-text">
              <use xlink:href="@/assets/svg/sprite.svg#icon-language"></use>
            </svg>
            <span class="prefix-text text-secondary-text">{{
              currentLocale($i18n.locale)
            }}</span>

            <transition name="fade">
              <ul
                v-if="isLanguageListOpen"
                role="listbox"
                class="language-list absolute top-120% -right-3 w-36 py-3 bg-primary-text shadow rounded"
              >
                <li v-for="locale in availableLocales" :key="locale.code">
                  <nuxt-link :to="switchLocalePath(locale.code)">{{
                    locale.name
                  }}</nuxt-link>
                </li>
              </ul>
            </transition>
          </button>

          <MenuButton
            class="md:invisible md:hidden"
            :is-open="isMenuOpen"
            @clicked="toggleMenu"
          />
        </div>
      </nav>
    </div>
    <transition name="fade">
      <Backdrop v-if="isMenuOpen" @clicked="toggleMenu" />
    </transition>
  </header>
</template>

<script>
import throttle from 'lodash/throttle';

export default {
  props: {
    navigationLinks: {
      type: Array,
      required: true,
    },
    showLanguageSelector: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isMenuOpen: false,
      isLanguageListOpen: false,
    };
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
    },
  },
  watch: {
    isMenuOpen(val) {
      if (val) document.body.classList.add('modal-open');
      else document.body.classList.remove('modal-open');
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
    toggleLanguageList() {
      this.closeMenu();
      this.isLanguageListOpen = !this.isLanguageListOpen;
    },
    closeLanguageList() {
      this.isLanguageListOpen = false;
    },
    handleScroll: throttle(() => {
      const header = document.getElementById('the-header');

      if (window.pageYOffset > header.offsetTop) {
        header.classList.add('sticky-header');
      } else {
        header.classList.remove('sticky-header');
      }
    }, 200),
    currentLocale(localeName) {
      switch (localeName) {
        case 'en':
          return 'English';
        case 'de':
          return 'Deutsch';
        case 'pt':
          return 'Português';
        default:
          return 'English';
      }
    },
  },
};
</script>

<style scoped>
.nuxt-link-exact-active {
  @apply text-white;
}

.header {
  @apply relative bg-primary text-secondary-text flex items-center h-16 px-5 py-0 z-20;
}

.header li:hover {
  @apply text-white;
}

.language-selector {
  @apply relative px-3 py-2.5 bg-transparent border-0 flex items-center;
}

.language-selector:hover .icon {
  @apply text-primary-text;
}

.language-selector:hover .prefix-text {
  @apply text-primary-text;
}

.language-list::before {
  content: '';
  border-width: 0 10px 10px 10px;
  border-color: transparent transparent #fdf9f7 transparent;
  @apply block absolute right-45% -top-2 w-0 h-0 border-solid;
}

.language-list > li > a {
  @apply p-1 text-primary text-sm;
}

.language-list > li:hover {
  @apply bg-gray-200 text-primary;
}

.show-mobile-menu {
  @apply opacity-100 transform translate-y-0 visible;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
