# Architecture

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router, React Server Components) |
| React | v19 with React Compiler enabled |
| TypeScript | v5.9 (strict mode, `noUncheckedIndexedAccess`) |
| Styling | Tailwind CSS 4 with `@tailwindcss/typography` |
| Formatting | Biome |
| Linting | ESLint with `eslint-config-next` |
| Validation | Zod |
| CMS | Notion API |
| Images | Cloudinary |
| Hosting | Vercel |

## Project Structure

```
src/
├── app/
│   ├── (pages)/           # Route groups for pages
│   │   ├── (home)/        # Home page
│   │   ├── memo/          # Blog posts
│   │   └── job/           # Job page
│   └── api/               # API routes
├── components/            # Shared components
├── hooks/                 # Custom React hooks
└── libs/
    ├── api/               # External API clients (Notion, Cloudinary)
    ├── constants/         # App constants
    ├── styles/            # Global CSS
    └── utils/             # Utility functions
```

### Colocation Pattern

Page-specific code uses `_components/` and `_utils/` folders collocated with the page:

```
memo/
├── _components/
│   └── PostCard.tsx
├── _utils/
│   └── getPosts.ts
└── page.tsx
```

## Next.js Configuration

| Feature | Config | Purpose |
|---------|--------|---------|
| React Compiler | `reactCompiler: true` | Automatic memoization |
| View Transitions | `experimental.viewTransition` | Page transition animations |
| Component Caching | `cacheComponents: true` | Server component caching |
| Draft Mode | Built-in | Content preview from Notion |
| On-demand Revalidation | API routes in `src/app/api/revalidate/` | Cache invalidation |
