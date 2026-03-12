---
title: Product Card
description: Product Card User Guide
pubDate: 2026-03-12
author: jet-w
categories:
  - Documentation
tags:
  - ProductCard
  - Component
  - Vue
star: true
---

# ProductCard User Guide

ProductCard is a set of Vue components for displaying products, projects, or any card-based content with built-in search, price filtering, status badges, and responsive grid layout.

The package includes two components:

- **ProductCard** — A single card displaying title, description, image, price, tags, and status.
- **ProductCardGrid** — A grid container with text search and price range filtering.

## Installation

```bash
npm install @jet-w/astro-blog.component.product-card
```

## Basic Usage

### In an Astro page (`.astro`)

```astro
---
import ProductCardGrid from '@jet-w/astro-blog.component.product-card/components/ProductCardGrid.vue';

const cards = [
  {
    title: 'Mechanical Keyboard',
    description: 'A premium 75% mechanical keyboard with hot-swappable switches.',
    image: '/images/keyboard.jpg',
    price: '$129.99',
    tags: ['Electronics', 'Peripherals'],
    link: 'https://example.com/keyboard',
    status: 'active',
  },
  {
    title: 'Open Source Toolkit',
    description: 'A curated collection of open-source developer tools.',
    tags: ['Software', 'Open Source'],
    price: 'Free',
    status: 'active',
  },
];
---

<ProductCardGrid client:load cards={cards} columns={3} />
```

### In an MDX page (`.mdx`)

```mdx
import ProductCardGrid from '@jet-w/astro-blog.component.product-card/components/ProductCardGrid.vue';

export const cards = [
  {
    title: 'Mechanical Keyboard',
    description: 'A premium 75% mechanical keyboard with hot-swappable switches.',
    image: '/images/keyboard.jpg',
    price: '$129.99',
    tags: ['Electronics', 'Peripherals'],
    link: 'https://example.com/keyboard',
    status: 'active',
  },
];

<ProductCardGrid client:load cards={cards} columns={3} />
```

::: tip MDX Note
In MDX files, use `export const` instead of `const`. TypeScript type annotations are not supported in MDX.
:::

## Card Data Structure

Each card object supports the following fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | `string` | Yes | Card title |
| `description` | `string` | No | Description text, truncated to 2 lines with full text on hover |
| `image` | `string` | No | Image URL, displayed as a 16:9 cover image |
| `price` | `string` | No | Price label (e.g. `$29.99`, `Free`) |
| `tags` | `string[]` | No | Tag labels displayed as colored badges |
| `link` | `string` | No | URL to open in a new tab when the card is clicked |
| `status` | `string` | No | Status badge displayed on the card |

### Example

```js
{
  title: 'Standing Desk',
  description: 'Electric sit-stand desk with dual motors and memory presets.',
  image: '/images/desk.jpg',
  price: '$349.00',
  tags: ['Furniture', 'Ergonomics'],
  link: 'https://example.com/desk',
  status: 'active',
}
```

## Components

### ProductCardGrid

The grid component wraps multiple `ProductCard` items with search and filtering controls.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cards` | `CardItem[]` | — | Array of card data objects (required) |
| `columns` | `number` | `3` | Number of columns at large breakpoints (`2`, `3`, or `4`) |

#### Search

The text search box filters cards by matching across all fields: title, description, tags, link, status, and price.

#### Price Filter

Enter a minimum and/or maximum price to filter cards by price range. The filter extracts numeric values from the price string (e.g. `$129.99` → `129.99`). Cards with `Free` are treated as `0`. Cards without a price are always shown.

### ProductCard

A single card component. It can also be used standalone without the grid.

```astro
---
import ProductCard from '@jet-w/astro-blog.component.product-card/components/ProductCard.vue';
---

<ProductCard
  title="Webcam Pro"
  description="Full HD 1080p webcam with auto-focus."
  image="/images/webcam.jpg"
  price="$79.99"
  tags={['Electronics', 'Video']}
  link="https://example.com/webcam"
  status="active"
/>
```

## Features

### Status Badges

The `status` field renders a colored badge on the card. Built-in status colors:

| Status | Color |
|--------|-------|
| `active` | Green |
| `completed` | Primary (blue) |
| `archived` | Gray |
| `wip` | Yellow |

Any other status value displays with a default accent color.

### Tags

Tags are displayed as rounded colored badges. Colors cycle automatically through six theme colors (primary, secondary, accent, green, yellow, cyan).

### Image

When an `image` URL is provided, the card displays a 16:9 cover image at the top with a subtle zoom effect on hover. If no image is provided, the card renders without the image section.

### Link

When a `link` is provided, the entire card becomes clickable and opens the URL in a new tab. Without a link, the card renders as a static `<div>`.

### Description Tooltip

Long descriptions are truncated to 2 lines. Hovering over the description reveals the full text in a floating tooltip.

### Dark Mode

The component automatically adapts when the parent page uses the `.dark` class on an ancestor element.

### Responsive Layout

The grid is fully responsive:

- **Mobile** — 1 column
- **Tablet** (`sm`) — 2 columns
- **Desktop** (`lg`) — 2, 3, or 4 columns based on the `columns` prop
