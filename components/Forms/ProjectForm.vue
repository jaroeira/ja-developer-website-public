<template>
  <FormulateForm
    v-model="formData"
    name="project"
    :form-errors="formErrors"
    class="px-3 md:px-0 md:pr-5"
    novalidate
    invalid-message="Erro no formulario"
    @submit="submitHandler"
  >
    <SectionTitle class="my-3" title="Basic Information" :admin="true" />

    <FormulateInput
      v-model="selectedLanguage"
      type="select"
      :options="{ en: 'English', de: 'Deutsch', pt: 'Português' }"
      class="input-margin max-w-xs"
      label="Language for title and description"
    />

    <div
      v-for="lang in ['en', 'de', 'pt']"
      v-show="selectedLanguage === lang"
      :key="lang"
    >
      <FormulateInput
        :name="`title_${lang}`"
        type="text"
        :label="`Project Title - ${languageName(lang)}`"
        :placeholder="`Project Title - ${languageName(lang)}`"
        class="input-margin"
        :validation="lang === 'en' ? 'required' : ''"
        :disabled="isLoading"
      />

      <FormulateInput
        :name="`description_${lang}`"
        type="textarea"
        rows="4"
        :placeholder="`Project Description - ${languageName(lang)}`"
        :label="`Project Description - ${languageName(lang)}`"
        class="desc-text-area input-margin"
        :validation="lang === 'en' ? 'required' : ''"
        :disabled="isLoading"
      />
    </div>

    <FormulateInput
      v-model.trim="inputTag"
      name="tags"
      type="text"
      label="Tags"
      :placeholder="tags.length < 5 ? 'type tag and press enter' : 'Max 5 tags'"
      class="input-margin"
      maxlength="10"
      novalidate
      :disabled="tags.length >= 5"
      validation="mintag"
      :validation-rules="{ mintag: () => tags.length > 0 }"
      :validation-messages="{
        mintag: 'At least one tag',
      }"
      error-behavior="blur"
      @keydown.enter.prevent="addTag"
      @keydown.space.prevent
    >
      <template #suffix>
        <div class="flex gap-2 p-2">
          <Tag
            v-for="(tag, index) in tags"
            :key="index"
            :label="tag"
            @clicked="removeTag(index)"
          />
        </div>
      </template>
    </FormulateInput>

    <SectionTitle class="my-3" title="External Links" :admin="true" />

    <FormulateInput
      v-model.trim="repositoryUrl"
      name="repositoryUrl"
      type="url"
      label="Github"
      placeholder="Github"
      class="input-margin"
      validation="optional|url"
    />

    <FormulateInput
      v-model.trim="projectUrl"
      name="projectUrl"
      type="url"
      label="Project Url"
      placeholder="Project Url"
      class="input-margin"
      validation="optional|url"
    />

    <SectionTitle class="my-3" title="Main Framework" :admin="true" />
    <FormulateInput
      v-model="mainFrameworkValue"
      type="radio"
      class="custom-radio"
      :options="mainFrameworksOptions"
      validation="required"
      :validation-messages="{
        required: 'Choose the main framework',
      }"
    />

    <SectionTitle class="my-3" title="Framework and Tools" :admin="true" />
    <FormulateInput
      v-model="tools"
      name="tools"
      class="custom-checkbox"
      type="checkbox"
      :options="sortedToolsOptions"
      validation="required"
      :validation-messages="{
        required: 'Choose at least 1 option',
      }"
    />

    <div v-if="edit" class="mb-7">
      <SectionTitle class="my-3" title="Images" :admin="true" />
      <div class="flex items-center justify-between mb-2">
        <h2>{{ imagesCount }} Images</h2>
        <h2>Reorder / Remove</h2>
      </div>
      <ImageEditor
        v-if="edit"
        :input-images="editImages"
        @reordered="onReorderedImages"
      />
    </div>

    <FormulateInput
      :multiple="edit ? false : true"
      type="image"
      name="images"
      :upload-behavior="edit ? 'live' : 'delayed'"
      label="Select an image to upload"
      help="Select a png, jpg or gif to upload."
      :validation="
        edit
          ? 'mime:image/jpeg,image/png,image/gif'
          : 'required|mime:image/jpeg,image/png,image/gif'
      "
      :disabled="isUploading || isLoading"
      :uploader="imageUploader"
      @file-upload-error="uploadErrorHandler"
      @file-upload-progress="uploadProgressHandler"
      @file-upload-complete="uploadCompleteHandler"
    />

    <FormulateInput
      type="submit"
      :label="edit ? 'Update' : 'Submit'"
      :disabled="isLoading"
      class="mb-10"
    />
  </FormulateForm>
</template>

<script>
import uploader from '~/utils/imageUploader.js';
import brandInfos from '~/utils/brandInfos.js';

export default {
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
    project: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      isLoading: false,
      isUploading: false,
      selectedLanguage: 'en',
      title: '',
      description: '',
      projectUrl: '',
      repositoryUrl: '',
      tags: [],
      inputTag: '',
      formData: {},
      formErrors: [],
      tools: [],
      mainFrameworksOptions: [
        { value: 'angular', label: 'Angular' },
        { value: 'javascript', label: 'Javascript' },
        { value: 'flutter', label: 'Flutter' },
        { value: 'next', label: 'Next.js' },
        { value: 'nodejs', label: 'Node.js' },
        { value: 'nuxt', label: 'Nuxt.js' },
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue.js' },
      ],
      mainFrameworkValue: null,
      toolsOptions: brandInfos.brandList(),
      editImages: [],
      latestPublicId: null,
    };
  },
  computed: {
    sortedToolsOptions() {
      const list = brandInfos.brandList().map((brand) => {
        return { value: brand.name, label: brand.label };
      });
      const sorted = list;
      sorted.sort((a, b) => a.label.localeCompare(b.label));
      return sorted;
    },
    imagesCount() {
      if (!this.editImages) return 0;
      return this.editImages.length;
    },
  },
  watch: {
    isLoading(value) {
      this.$emit('is-loading', value);
    },
    isUploading(value) {
      this.$emit('is-uploading', value);
    },
  },
  created() {
    if (this.edit && this.project) {
      this.formData.title_en = this.project.title.en;
      this.formData.description_en = this.project.description.en;

      this.formData.title_de = this.project.title.de ?? '';
      this.formData.description_de = this.project.description.de ?? '';

      this.formData.title_pt = this.project.title.pt ?? '';
      this.formData.description_pt = this.project.description.pt ?? '';

      this.projectUrl = this.project.projectUrl || '';
      this.repositoryUrl = this.project.repositoryUrl || '';
      this.tags = [...this.project.tags];
      this.tools = [...this.project.tools];
      this.mainFrameworkValue =
        this.project.mainFramework && this.project.mainFramework !== ''
          ? this.project.mainFramework
          : null;
      this.editImages = [...this.project.images];
    }
  },
  methods: {
    async submitHandler() {
      this.isUploading = false;

      const title = {
        en: this.formData.title_en.trim(),
        de: this.formData.title_de ? this.formData.title_de.trim() : null,
        pt: this.formData.title_pt ? this.formData.title_pt.trim() : null,
      };

      const description = {
        en: this.formData.description_en.trim(),
        de: this.formData.description_de
          ? this.formData.description_de.trim()
          : null,
        pt: this.formData.description_pt
          ? this.formData.description_pt.trim()
          : null,
      };

      const projectData = {
        title,
        description,
        tags: Object.assign([], this.tags),
        tools: Object.assign([], this.tools),
        projectUrl: this.projectUrl || '',
        repositoryUrl: this.repositoryUrl || '',
        mainFramework: this.mainFrameworkValue,
      };

      // On Add Form only
      if (!this.edit) {
        const images = [];
        if (this.formData.images && this.formData.images.results) {
          this.formData.images.results.forEach((result, index) => {
            const publicId = result.publicId;
            images.push({
              order: index,
              publicId,
            });
          });
        }
        projectData.images = Object.assign([], images);
        projectData.topProject = -1;
      }

      try {
        this.isLoading = true;

        if (this.edit) {
          await this.$store.dispatch('projects/updateProject', {
            projectId: this.project.id,
            updateFields: { ...projectData, images: this.editImages },
          });
        } else {
          await this.$store.dispatch('projects/addProject', projectData);
        }

        // trigger a new deploy on vercel
        // await this.$services.host.deploy();

        this.$emit('success');
      } catch (error) {
        this.isLoading = false;

        if (error.code === 'permission-denied') return this.$nuxt.error(error);

        const message = error.message
          ? error.message
          : 'There was an unknown error ocurred.';
        this.formErrors = [message];
      }
    },
    uploadErrorHandler(error) {
      this.isUploading = false;
      const message = error.message
        ? error.message
        : 'There was an unknown error ocurred.';
      this.formErrors = [message];
    },
    uploadProgressHandler() {
      this.isUploading = true;
    },
    uploadCompleteHandler() {
      if (this.edit) {
        this.isUploading = false;
      }
    },
    addTag(e) {
      if (e.target.value.length > 0) {
        const tag = e.target.value.toLowerCase();
        if (this.tags.find((t) => t === tag)) return;
        this.tags.push(tag);
      }
      this.inputTag = '';
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
    imageUrl(publicId) {
      return this.$cloudinary.image.url(publicId, {
        crop: 'scale',
        width: 200,
        height: 133,
      });
    },
    async onImageEditorSave(newImages) {
      await this.updateImages(newImages);
    },
    async updateImages(images) {
      try {
        this.isLoading = true;
        await this.$store.dispatch('projects/updateProjectImages', {
          projectId: this.project.id,
          images,
        });
        this.editImages = images;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        const message = error.message
          ? error.message
          : 'There was an unknown error ocurred.';
        this.formErrors = [message];
      }
    },
    async imageUploader(file, progress, error, options) {
      const result = await uploader(
        file,
        progress,
        error,
        options,
        this.$config,
        this.$axios,
        this.$fire
      );

      if (this.edit) {
        const imagesLength = this.editImages.length;
        const newImage = {
          order: imagesLength,
          publicId: result.publicId,
        };

        const newImageList = [];
        this.editImages.forEach((image) => {
          newImageList.push(Object.assign({}, image));
        });

        newImageList.push(newImage);

        await this.updateImages(newImageList);

        this.editImages = newImageList;
      }

      return result;
    },
    onReorderedImages(reorderedImages) {
      this.editImages = [...reorderedImages];
    },
    languageName(languageCode) {
      switch (languageCode) {
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
.input-margin {
  @apply mb-8;
}
</style>
