# DS Frontend Template

An SCSS design system template with an OKLCH color palette, semantic UI colors, light and dark themes, typography, spacing, border radii, shadows, and transition durations.

Vite and Sass Embedded compile the source files into a single `dist/design-system.css` file. You can include it in an HTML page or use it in an application built with any frontend framework.

## Installation and Build

Requires Node.js `20.19+` on the 20.x release line or `22.12+`, and pnpm.

```sh
pnpm install
pnpm build
```

To rebuild automatically when source files change:

```sh
pnpm dev
```

| Command | Description |
| --- | --- |
| `pnpm build` | Build `dist/design-system.css` once |
| `pnpm dev` | Build in watch mode (`vite build --watch`) |

Watch mode updates the CSS file on disk. The project does not include an HTTP server or a preview page. CSS minification is disabled in `vite.config.js`.

## Usage

Copy the compiled CSS file into your application and link to it:

```html
<!doctype html>
<html lang="en" data-theme="light">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="./design-system.css">
    <title>Design System Example</title>
  </head>
  <body>
    <h1>Design System</h1>
  </body>
</html>
```

Load the Manrope font separately. The source defines the font family as `'Manrope', sans-serif`, but does not include font files or an `@font-face` declaration.

## Themes

Set `data-theme="light"` or `data-theme="dark"` on the root element. This attribute defines semantic variables for backgrounds, text, borders, and status colors, which are inherited by descendant elements.

```js
document.documentElement.dataset.theme = 'dark'
```

There is no default theme or automatic selection based on system preferences, so set `data-theme` explicitly.

## CSS Variables

| Group | Examples |
| --- | --- |
| Palette | `--palette-color-blue-500`, `--palette-color-white` |
| UI color scales | `--ui-color-primary-500`, `--ui-color-neutral-200` |
| Current theme colors | `--ui-primary`, `--ui-success`, `--ui-error` |
| Backgrounds | `--ui-bg`, `--ui-bg-muted`, `--ui-bg-elevated` |
| Text | `--ui-text`, `--ui-text-muted`, `--ui-text-inverted` |
| Borders | `--ui-border`, `--ui-border-accented` |
| Spacing | `--space-0` … `--space-20`, `--space-30` |
| Border radii | `--radius-xs`, `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-full` |
| Shadows | `--shadow-sm`, `--shadow-md`, `--shadow-lg` |
| Durations | `--duration-fast` (120 ms), `--duration-normal` (200 ms) |

Color scales include shades `50`, `100`–`900` in increments of 100, and `950`. Spacing tokens `0`–`20` use 4 px increments; `30` equals 120 px. Semantic theme variables change with `data-theme`, while palette values and UI color scales remain constant.

```css
.card {
  padding: var(--space-6);
  color: var(--ui-text);
  background: var(--ui-bg-elevated);
  border: 1px solid var(--ui-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  transition: background-color var(--duration-normal);
}
```

## SCSS and Typography

Import `src/assets/scss/design-system/index.scss` to access token maps and mixins. For example, from a file in `src/assets/scss/`:

```scss
@use 'design-system' as ds;

.card-title {
  @include ds.text(semibold, xl);
}
```

The `text($weight-name, $size-name)` mixin sets the font family, size, weight, line height, and letter spacing. Available weights are `light`, `regular`, `medium`, `semibold`, `bold`, and `extrabold`, with sizes ranging from `2xs` (10 px) to `8xl` (64 px).

Importing `index.scss` provides the SCSS utilities. CSS variable generation is included separately through `design-system/variables`, as shown in `main.scss`.

## Project Structure

```text
src/assets/scss/
├── main.scss                 # Entry point and base styles
└── design-system/
    ├── index.scss            # SCSS map and mixin exports
    ├── variables.scss        # CSS variable and theme selector generation
    ├── colors/
    │   ├── index.scss        # Combined color maps
    │   ├── palette.scss      # Base palette
    │   └── ui.scss           # UI color roles
    ├── themes/
    │   ├── index.scss        # Theme registry
    │   ├── light.scss        # Light theme
    │   └── dark.scss         # Dark theme
    ├── typography.scss       # Font, sizes, and text mixin
    ├── spaces.scss           # Spacing
    ├── radius.scss           # Border radii
    ├── shadows.scss          # Shadows
    ├── transitions.scss      # Transition durations
    └── breakpoints.scss      # Breakpoint map and media query mixins
```

`main.scss` also sets `box-sizing`, removes the default `body` margin, applies base typography and `h1`–`h6` sizes, and reduces animations and transitions when `prefers-reduced-motion: reduce` is enabled.

## Customization

- Edit base colors in `colors/palette.scss` and the mappings for `primary`, `secondary`, `success`, `info`, `warning`, `error`, and `neutral` in `colors/ui.scss`.
- Configure semantic colors for each theme in `themes/light.scss` and `themes/dark.scss`.
- Adjust spacing, border radii, shadows, and durations in their respective SCSS maps. `variables.scss` generates the CSS variables automatically on the next build.
- To add a theme, create a separate file and register it in the `$themes` map in `themes/index.scss`.

## VS Code Snippets

The `.vscode/scss.code-snippets` file provides CSS and SCSS snippets: `palette-color`, `palette-base-color`, `ui-color`, `ui-bg-color`, `ui-text-color`, `ui-border-color`, `ui-status-color`, and `space`. SCSS files also support the `text` snippet with font weight and size selection.
