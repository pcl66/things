import fg from 'fast-glob';

export function preloadImg(options = {}) {
  const {
    dir,
    mode = 'preload',
  } = options;
  return {
    name: 'vite-plugin-preload-img',
    generateBundle(_, bundle) {
      console.log('bundle', bundle, _);
    },
    transformIndexHtml(html, ctx) {
      const files = fg.sync(
        dir, 
        {cwd: 'public'}
      );
      // const images = files.map(file => ctx.server?.config?.base + file);
      const images = files.map(file => file);
      return images.map(href => {
        return  {
          tag: 'link',
          attrs: {
            rel: mode,
            href,
            as: 'image'
          }
        }
      })
      
    }
  }
}
