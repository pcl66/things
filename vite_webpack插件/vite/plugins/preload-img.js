import fg from 'fast-glob';

export function preloadImg(options = {}) {
  const {
    dir,
    mode = 'preload',
  } = options;

  let imgInfos = {}
  return {
    name: 'vite-plugin-preload-img',
    generateBundle(_, bundle) {
      Object.values(bundle).forEach(v => {
        imgInfos[v.originalFileName] = v.fileName
      })
    },
    transformIndexHtml(html, ctx) {
      const files = fg.sync(
        dir,
      );
      let images = []
      if(ctx.server) {
        // dev 环境下，直接使用绝对路径
        images = files.map(file => ctx.server?.config?.base + file);
      } else {
        // build 环境下，使用打包后的路径
        images = files.filter(file => Object.keys(imgInfos).includes(file));
      }
      return images.map(href => {
        return  {
          tag: 'link',
          attrs: {
            rel: mode,
            href: ctx.server ? href : imgInfos[href],
            as: 'image'
          }
        }
      })
      
    }
  }
}
