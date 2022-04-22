import Vue from 'vue';
import VueFormulate from '@braid/vue-formulate';

export default function () {
  Vue.use(VueFormulate, {
    classes: {
      input(context) {
        switch (context.classification) {
          case 'button':
            return 'my-5 mx-auto px-4 py-2 bg-admin-accent hover:bg-accent-light text-white rounded shadow absolute right-1/2 translate-x-1/2 disabled:bg-gray-400';
          case 'box':
            return 'absolut -left-full opacity-0 pointer-events-none';
          case 'group':
            return 'border-none';
          default:
            return 'w-full h-9 py-3 px-5 border-solid border border-input-border rounded overflow-hidden focus-visible:outline-none focus:border-2 focus:border-accent text-primary-dark';
        }
      },
      label: 'uppercase text-accent',
      element(context) {
        switch (context.classification) {
          case 'box':
            return 'flex mr-2 border-none';
          default:
            return 'relative';
        }
      },
      error: 'text-red-500',
      formError: 'text-red-500',
    },
  });
}
