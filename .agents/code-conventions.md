# Code Conventions

## Imports

Use path alias `@/*` for absolute imports from `src/`:

```typescript
import { cn } from '@/libs/utils/classNames';
import { Header } from '@/components/Header';
```

## Styling

Use `cn()` utility (clsx + tailwind-merge) for conditional classes:

```typescript
import { cn } from '@/libs/utils/classNames';

<div className={cn('base-class', isActive && 'active-class')} />
```

## Components

- Export component types from props: `React.ComponentProps<typeof Component>`
- SVGs should use `AccessibleSvg` wrapper with optional `title` prop

## Data Fetching

- Use `'use cache'` directive for cached server components
- Use React's `cache()` for request deduplication
- Validate API responses with Zod schemas

## Validation

- All Notion API responses validated with Zod schemas in `src/libs/api/notion/schema/`
- Environment variables validated at build time via `parseProcessEnv()` in `src/libs/utils/env.ts`
