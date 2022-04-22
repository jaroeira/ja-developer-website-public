import auth from '~/services/authService';
import projects from '~/services/projectsService';
import seoHelper from '~/services/seoHelper';
import hostService from '~/services/hostService.js';

export default ({ $fire }, inject) => {
  inject('services', {
    auth: auth($fire),
    projects: projects($fire),
    seo: seoHelper(),
    host: hostService($fire),
  });
};
