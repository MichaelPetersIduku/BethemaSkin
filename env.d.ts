/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BREVO_API_KEY: string;
  readonly VITE_BREVO_EMAIL: string;
  readonly VITE_BREVO_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
