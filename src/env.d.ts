interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_ADMIN_LOGIN: string
  readonly VITE_ADMIN_PASSWORD: string
  // 🔹 Ajoute ici toutes tes variables d'environnement
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "*.css";
declare module "*.scss";
declare module "*.sass";