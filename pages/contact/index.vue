<template>
  <section
    class="default-container flex justify-center items-center"
    style="height: 37.5rem"
  >
    <FormulateForm
      v-model="formData"
      class="w-full md:max-w-lg"
      @submit="submitHandler"
    >
      <h1 class="text-4xl text-accent tracking-wide text-center mb-5">
        {{ $t('pages.contact.form-title') }}
      </h1>
      <!-- Name -->
      <FormulateInput
        type="text"
        name="name"
        class="vertical-space"
        :placeholder="$t('pages.contact.name-placeholder')"
        validation="required"
        :validation-messages="{
          required: $t('pages.contact.name-required'),
        }"
      />

      <!-- Email -->
      <FormulateInput
        type="text"
        name="email"
        class="vertical-space"
        :placeholder="$t('pages.contact.email-placeholder')"
        validation="required|email"
        :validation-messages="{
          required: $t('pages.contact.email-required'),
          email: $t('pages.contact.email-invalid'),
        }"
      />

      <!-- Message -->
      <FormulateInput
        type="textarea"
        name="message"
        class="vertical-space desc-text-area"
        rows="4"
        :placeholder="$t('pages.contact.message-placeholder')"
        validation="required"
        :validation-messages="{
          required: $t('pages.contact.message-required'),
        }"
      />

      <!-- Submit Button -->
      <div class="flex justify-center">
        <button
          type="submit"
          class="py-2 px-5 rounded bg-accent hover:bg-accent-light text-white shadow-md"
          style="min-width: 25%"
        >
          {{ $t('pages.contact.send-button-label') }}
        </button>
      </div>
    </FormulateForm>
    <LazyLoadingOverlay v-if="isLoading" :text="$t('pages.contact.sending')" />
    <LazyModalMessage
      v-if="showSuccessMessage"
      :text="$t('pages.contact.message-sent')"
      :button-label="$t('pages.contact.close')"
      @close="closeMessageHandler"
    />
  </section>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      showSuccessMessage: false,
      formData: {},
    };
  },
  methods: {
    async submitHandler() {
      try {
        const { name, email, message } = this.formData;

        const sendContactEmail =
          this.$fire.functions.httpsCallable('sendContactEmail');

        this.isLoading = true;
        await sendContactEmail({ name, email, message });
        this.isLoading = false;

        this.showSuccessMessage = true;
      } catch (error) {
        this.isLoading = false;
        return this.$nuxt.error(error);
      }
    },
    closeMessageHandler() {
      this.showSuccessMessage = false;
      this.$router.push(this.localePath('/'));
    },
  },
};
</script>

<style scoped>
.vertical-space {
  @apply mb-5;
}
</style>
