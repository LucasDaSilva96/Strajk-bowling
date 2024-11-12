/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  readonly VITE_LOCAL_STORAGE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
