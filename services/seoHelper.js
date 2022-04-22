export default () => {
  const currentLocale = (language) => {
    const code = language.substring(0, 2);
    if ((code !== 'pt' && code !== 'en', code !== 'de')) {
      return 'en-US';
    } else {
      return language;
    }
  };

  return {
    generateTags: ({
      title = '',
      description = '',
      imageUrl = '',
      url = '',
      locale = 'en-US',
    }) => {
      return [
        // Google / Search Engine Tags
        { hid: 'google-name', itemprop: 'name', content: title },
        {
          hid: 'google-description',
          itemprop: 'description',
          content: description,
        },
        { hid: 'google-image', itemprop: 'image', content: imageUrl },

        // facebook Open Graph
        { hid: 'og-image', property: 'og:image', content: imageUrl },
        { hid: 'og-url', property: 'og:url', content: url },
        { hid: 'og-title', property: 'og:title', content: title },
        {
          hid: 'og-description',
          property: 'og:description',
          content: description,
        },
        { hid: 'og-type', property: 'og:type', content: 'website' },
        {
          hid: 'og-locale',
          property: 'og:locale',
          content: currentLocale(locale),
        },

        // Twitter Card
        {
          hid: 'twitter-card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        { hid: 'twitter-title', name: 'twitter:title', content: title },
        {
          hid: 'twitter-description',
          name: 'twitter:description',
          content: description,
        },
        { hid: 'twitter-image', name: 'twitter:image', content: imageUrl },
      ];
    },
  };
};
