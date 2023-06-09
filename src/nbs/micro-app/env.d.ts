/// <reference types="vite/client" />

declare global {
  interface Window {
    __MICRO_APP_NAME__: string;
    microApp: any;
  }
}
