import microApp from "@micro-zoe/micro-app";

microApp.start({
  "disable-memory-router": true,
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
