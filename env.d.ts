/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_UNO_BETHEMA_API_URL: string;
  readonly VITE_UNO_BETHEMA_API_KEY: string;
  readonly VITE_BETHEMA_PAYSTACK_PUBLIC_KEY: string;
  readonly VITE_BETHEMA_MONIFY_PUBLIC_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
