import { z } from 'zod';

const env = z.object({
  NOTION_KEY: z.string(),
  NOTION_DATA_SOURCE_ID_MEMO: z.string(),
  NOTION_PAGE_ID_JOB: z.string(),
  CLOUDINARY_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  DRAFT_API_SECRET: z.string(),
  REVALIDATE_API_SECRET: z.string(),
});

export function parseProcessEnv() {
  const result = env.safeParse(process.env);
  if (!result.success) {
    console.error(
      `Error happened when parsing process.env: ${result.error.message}`,
    );
    throw new Error('process.env parsing error');
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof env> {}
  }
}
