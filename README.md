# @jet-w/astro-blog.component.img-viewer

A reusable, feature-rich image viewer Vue 3 component for [@jet-w/astro-blog](https://github.com/jet-w/astro-blog).

## Features

- **Category Filtering** — Filter images by categories with multi-select checkbox filters and counts
- **Keyboard Navigation** — Arrow keys to navigate, Space/Up/Down to toggle descriptions, F for full page, Escape to exit
- **Multiple Layouts** — Stack (vertical) and side-by-side layout modes
- **Random Mode** — Shuffle through images randomly
- **Zoom Toggle** — Expand images to fill the available width
- **Full Page Mode** — Take over the viewport while staying in-page
- **Native Fullscreen** — Browser fullscreen API support
- **Rich Descriptions** — Show/hide HTML descriptions with `.hi` highlight class
- **Dark Mode** — Full dark mode support including fullscreen variants
- **Click Navigation** — Click left/right half of the image area to navigate

## Installation

```bash
npm install @jet-w/astro-blog.component.img-viewer
```

### Peer Dependencies

- `vue` >= 3.5.0

## Usage

### In Astro MDX

```mdx
import ImageViewer from '@jet-w/astro-blog.component.img-viewer/components/ImageViewer.vue';

export const images = [
  {
    src: '/images/chart.png',
    title: 'Revenue Chart',
    categories: ['graph'],
    description: 'Quarterly revenue with <span class="hi">Q3 peak</span>.',
  },
  {
    src: '/images/flowchart.png',
    title: 'CI/CD Pipeline',
    categories: ['flowchart'],
  },
];

<ImageViewer client:load images={images} />
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `images` | `ImageItem[]` | Yes | Array of image objects to display |

### Types

```typescript
interface ImageItem {
  src: string;
  title: string;
  categories?: string[];
  description?: string;
}

interface CategoryOption {
  value: string;
  label: string;
}
```

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `←` / `→` | Previous / Next image |
| `Space` / `↑` / `↓` | Toggle description |
| `F` | Toggle full page mode |
| `Escape` | Exit full page mode |

### Built-in Categories

The component includes built-in category filters:

- **Important** — Highlighted items
- **Graph** — Charts and graphs
- **Flowchart** — Flow diagrams
- **Map** — Maps and geographic visuals
- **Image** — General images

### Description Highlights

Use the `.hi` CSS class inside description HTML to highlight key terms:

```html
<span class="hi">highlighted text</span>
```

## Development

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Watch mode
npm run dev
```

### Template (Demo Site)

The `template/` directory contains an Astro site for development and documentation:

```bash
# Build and preview the demo site
make build
```

## Publishing

```bash
# Dry run
make publish-dry

# Publish to npm (requires NODE_AUTH_TOKEN)
make publish

# Bump version and publish
make release VERSION=patch
```

## License

[Apache-2.0](LICENSE)
