<template>
  <div>
    <client-only>
      <div v-if="images.length > 1">
        <div>
          <Splide ref="mainSlider" :options="sliderSettings">
            <SplideSlide v-for="image in images" :key="image.publicId">
              <img
                :src="imageUrl(image.publicId)"
                alt="project screenshot"
                class="cursor-pointer"
                @click="openImageModal(bigImageUrl(image.publicId))"
              />
            </SplideSlide>
          </Splide>
        </div>
        <div class="mt-4">
          <Splide ref="thumbSlider" :options="thumbSliderSettings">
            <SplideSlide
              v-for="image in images"
              :key="image.publicId"
              class="thumbnail"
            >
              <img
                :src="thumbImageUrl(image.publicId)"
                alt="projecrt screenshot small"
              />
            </SplideSlide>
          </Splide>
        </div>
      </div>
      <div v-else class="flex justify-center">
        <img :src="bigImageUrl(images[0].publicId)" alt="" />
      </div>
      <ModalCard v-if="showImageModal" @close="closeImageModal">
        <img
          :src="currentImageModalUrl"
          alt="project screenshot"
          class="object-cover mx-auto"
        />
      </ModalCard>
    </client-only>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      sliderSettings: {
        type: 'loop',
        perPage: 2,
        perMove: 1,
        arrows: true,
        gap: '1rem',
        pagination: false,
        breakpoints: {
          640: {
            perPage: 1,
          },
        },
      },
      thumbSliderSettings: {
        type: 'slide',
        rewind: true,
        gap: 10,
        pagination: false,
        fixedWidth: 100,
        fixedHeight: 60,
        isNavigation: true,
        updateOnMove: true,
        arrows: false,
      },
      showImageModal: false,
      currentImageModalUrl: '',
    };
  },
  mounted() {
    if (this.images.length === 1) {
      this.sliderSettings = {
        ...this.sliderSettings,
        perPage: 1,
        arrows: false,
      };
    } else {
      setTimeout(() => {
        const main = this.$refs.mainSlider;
        const thumb = this.$refs.thumbSlider;
        if (thumb) {
          main.sync(thumb.splide);
        }
      }, 0);
    }
  },
  methods: {
    thumbImageUrl(publicId) {
      return this.$cloudinary.image.url(publicId, {
        crop: 'scale',
        width: 110,
        height: 70,
      });
    },
    imageUrl(publicId) {
      return this.$cloudinary.image.url(publicId, {
        crop: 'scale',
        width: 600,
      });
    },
    bigImageUrl(publicId) {
      return this.$cloudinary.image.url(publicId, {
        crop: 'scale',
        width: 1000,
      });
    },
    closeImageModal() {
      this.currentImageModalUrl = '';
      this.showImageModal = false;
    },
    openImageModal(imageUrl) {
      this.currentImageModalUrl = imageUrl;
      this.showImageModal = true;
    },
  },
};
</script>

<style>
.splide__slide img {
  width: 100%;
  height: auto;
}

.thumbnail {
  opacity: 0.3;
  @apply border-0 border-none border-white;
}

.thumbnail.is-active {
  opacity: 1;
  @apply border-0 border-none border-white;
}
</style>
