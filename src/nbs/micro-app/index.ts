export const microProps: { nbsName: string } = {
  nbsName: window.__MICRO_APP_NAME__,
  ...window?.microApp?.getData(),
};
