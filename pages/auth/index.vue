<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <div
      class="card-large-width w-full py-10 px-4 md:p-10 shadow md:shadow-md rounded bg-white"
    >
      <div class="flex justify-center items-center gap-x-3 mb-5">
        <svg class="w-12 h-12 text-accent fill-current">
          <use xlink:href="@/assets/svg/sprite.svg#icon-lock_outline"></use>
        </svg>
        <h2 class="text-accent font-bold text-2xl">Authenticate</h2>
      </div>

      <FormulateForm
        v-slot="{ isValid }"
        v-model="formData"
        novalidate
        name="auth"
        :form-errors="formErros"
        @submit="submitted"
      >
        <!-- email input -->
        <FormulateInput
          class="input-icon mb-5"
          type="email"
          name="email"
          label="Email Address"
          placeholder="email address"
          validation="required|email"
          :readonly="isLoading"
          :class="isLoading ? 'pointer-events-none' : ''"
        >
          <template #prefix>
            <svg class="icon">
              <use xlink:href="@/assets/svg/sprite.svg#icon-mail_outline"></use>
            </svg>
          </template>
        </FormulateInput>

        <!-- password input -->
        <FormulateInput
          class="input-icon mb-5"
          type="password"
          name="password"
          label="password"
          placeholder="password"
          validation="required"
          :readonly="isLoading"
          :class="isLoading ? 'pointer-events-none' : ''"
        >
          <template #prefix>
            <svg class="icon">
              <use xlink:href="@/assets/svg/sprite.svg#icon-vpn_key"></use>
            </svg>
          </template>
        </FormulateInput>

        <div class="flex justify-center">
          <button
            class="w-1/3 py-2 px-5 bg-accent shadow-md text-white text-sm rounded hover:bg-accent-light active:translate-y-0.5 disabled:bg-gray-400 disabled:pointer-events-none"
            :disabled="!isValid || isLoading"
            :class="
              isLoading
                ? 'bg-accent-light cursor-not-allowed pointer-events-none'
                : ''
            "
          >
            <span v-if="!isLoading">Login</span>
            <span v-else class="flex justify-center items-center">
              Loading
              <img
                class="h-7 w-7"
                src="@/assets/svg/spinner.svg"
                alt="loading"
              />
            </span>
          </button>
        </div>
      </FormulateForm>
    </div>
  </div>
</template>

<script>
import authErrorMessage from '@/utils/authErrorMessage';

export default {
  layout: 'empty',

  data() {
    return {
      redirectPath: null,
      formData: {},
      formErros: [],
      isLoading: false,
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated'];
    },
  },
  watch: {
    isAuthenticated(isAuth) {
      if (isAuth) {
        this.redirect();
      }
    },
  },
  mounted() {
    if (this.$route.query.redirect) {
      this.redirectPath = this.$route.query.redirect;
    }

    if (this.isAuthenticated) {
      this.redirect();
    }
  },
  methods: {
    async submitted() {
      this.formErros = [];

      const payload = {
        email: this.formData.email,
        password: this.formData.password,
      };

      try {
        this.isLoading = true;
        await this.$store.dispatch('auth/login', payload);
      } catch (error) {
        this.isLoading = false;
        this.formErros = [authErrorMessage(error.code)];
      }
    },
    redirect() {
      if (this.redirectPath) {
        this.$router.push(this.redirectPath);
      } else {
        this.$router.push('/admin');
      }
    },
  },
};
</script>

<style scoped>
.icon {
  @apply w-7 h-7 text-accent fill-current absolute top-1/2 left-0 -translate-y-1/2 ml-3;
}

@media screen and (min-width: 768px) {
  .card-large-width {
    width: 31.25rem;
  }
}
</style>
