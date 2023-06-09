import { preview as toPreview } from "vite";

const startPreview = async () => {
  const previewServer = await toPreview({
    preview: {
      open: true,
    },
  });

  previewServer.printUrls();
};

export const preview = async () => {
  await startPreview();
};
