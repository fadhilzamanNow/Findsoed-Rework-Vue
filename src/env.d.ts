/// <reference types="@rsbuild/core/types" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";

  // biome-ignore lint/complexity/noBannedTypes: reason
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// Global variables injected by Rsbuild
declare const BACKEND_URL: string;
declare const PRODUCTION_BACKEND_URL: string;
