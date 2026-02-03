/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_UNO_BETHEMA_API_URL: string;
  readonly VITE_UNO_BETHEMA_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
