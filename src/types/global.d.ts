declare namespace NodeJS {
  interface Process {
    env: ProcessEnv & {
      NOTION_KEY: string | undefined;
      NOTION_DATABASE_ID_BLOG: string | undefined;
      CLOUDINARY_NAME: string | undefined;
      CLOUDINARY_API_KEY: string | undefined;
      CLOUDINARY_API_SECRET: string | undefined;
      DRAFT_API_SECRET: string | undefined;
    };
  }
}
