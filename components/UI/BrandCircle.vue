<template>
  <div
    class="bg-white w-20 h-20 rounded-full shadow-md flex justify-center items-center"
  >
    <img :src="imageUrl" alt="react" class="w-14 h-14 rounded-full" />
  </div>
</template>

<script>
export default {
  props: {
    brandName: {
      type: String,
      default: 'reactjs',
    },
    fileType: {
      type: String,
      default: 'png',
    },
  },
  computed: {
    imageUrl() {
      return require(`~/assets/images/brands/big/${this.fileName(
        this.brandName
      )}.${this.fileType}`);
    },
  },
  methods: {
    fileName(brandName) {
      switch (brandName) {
        case 'angular':
          return 'angular';
        case 'javascript':
          return 'javascript';
        case 'next':
          return 'nextjs';
        case 'flutter':
          return 'flutter';
        case 'nodejs':
          return 'nodejs';
        case 'nuxt':
          return 'nuxtjs';
        case 'react':
          return 'reactjs';
        case 'vue':
          return 'vuejs';
        default:
          return 'javascript';
      }
    },
  },
};
</script>
