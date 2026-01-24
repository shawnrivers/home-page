# Accessibility Guidelines

## Images

- Decorative images: `alt="" role="presentation"`
- Meaningful images: descriptive `alt` text

## Icons

- Use `AccessibleSvg` wrapper for all icons
- Provide `title` prop when icon conveys meaning
- Omit `title` for purely decorative icons (automatically sets `aria-hidden`)

### Example

```tsx
// Meaningful icon - announced by screen readers
<GitHubIcon title="GitHub" className="w-4 h-4" />

// Decorative icon - hidden from screen readers
<ChevronIcon className="w-4 h-4" />
```

## Interactive Elements

- Icon-only buttons must have accessible label via `aria-label` or visually hidden text
- Links must have descriptive text (avoid "click here")

## Development

A11y reporter (`@axe-core/react`) runs automatically in development mode to catch issues.
