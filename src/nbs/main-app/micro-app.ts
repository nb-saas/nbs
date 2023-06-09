import microApp from '@micro-zoe/micro-app';

microApp.start({
  plugins: {
    global: [
      {
        processHtml: (code: string) => {
          return code;
        },
      },
    ],
  },
});
