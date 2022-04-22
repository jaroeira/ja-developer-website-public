const brands = {
  angular: {
    label: 'Angular',
    svgName: 'angular',
  },
  react: {
    label: 'React',
    svgName: 'react',
  },
  vue: {
    label: 'Vue',
    svgName: 'vue-dot-js',
  },
  nuxt: {
    label: 'Nuxt.js',
    svgName: 'nuxt-dot-js',
  },
  next: {
    label: 'Next.js',
    svgName: 'next-dot-js',
  },
  docker: {
    label: 'Docker',
    svgName: 'docker',
  },
  flutter: {
    label: 'Flutter',
    svgName: 'flutter',
  },
  javascript: {
    label: 'Javascript',
    svgName: 'javascript',
  },
  mongodb: {
    label: 'MongoDB',
    svgName: 'mongodb',
  },
  nodejs: {
    label: 'Node.js',
    svgName: 'node-dot-js',
  },
  firebase: {
    label: 'Firebase',
    svgName: 'firebase',
  },
  googlecloud: {
    label: 'Google Cloud',
    svgName: 'googlecloud',
  },
  aws: {
    label: 'AWS',
    svgName: 'amazonaws',
  },
  mysql: {
    label: 'My SQL',
    svgName: 'mysql',
  },
  postgresql: {
    label: 'Postgre SQL',
    svgName: 'postgresql',
  },
  tailwindcss: {
    label: 'Tailwind CSS',
    svgName: 'tailwindcss',
  },
  bootstrap: {
    label: 'Bootstrap',
    svgName: 'bootstrap',
  },
  microsoftazure: {
    label: 'Microsoft Azure',
    svgName: 'microsoftazure',
  },
};

export default {
  brands,
  getInfo: (name) => {
    const info = brands[name];
    if (!info)
      return {
        label: name,
        svgName: 'javascript',
      };

    return info;
  },
  brandList: () => {
    const list = Object.keys(brands).map((key) => {
      return {
        name: key,
        label: brands[key].label,
        svgName: brands[key].svgName,
      };
    });

    const sorted = list;
    sorted.sort((a, b) => a.label.localeCompare(b.label));

    return sorted;
  },
};
