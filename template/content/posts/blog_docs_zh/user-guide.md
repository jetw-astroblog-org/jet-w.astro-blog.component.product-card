---
title: ProductCard 使用指南
description: ProductCard 产品卡片组件的完整使用指南，包括产品展示、搜索筛选和网格布局功能。
pubDate: 2026-03-12
author: jet-w
categories:
  - 文档
tags:
  - ProductCard
  - 组件
  - Vue
star: true
---

# ProductCard 使用指南

ProductCard 是一组 Vue 组件，用于展示产品、项目或任何卡片式内容，内置搜索、价格筛选、状态标签和响应式网格布局。

该包包含两个组件：

- **ProductCard** — 单个卡片，显示标题、描述、图片、价格、标签和状态。
- **ProductCardGrid** — 网格容器，提供文本搜索和价格区间筛选功能。

## 安装

```bash
npm install @jet-w/astro-blog.component.product-card
```

## 基本用法

### 在 Astro 页面中 (`.astro`)

```astro
---
import ProductCardGrid from '@jet-w/astro-blog.component.product-card/components/ProductCardGrid.vue';

const cards = [
  {
    title: '机械键盘',
    description: '一款高端75%布局机械键盘，支持热插拔轴体。',
    image: '/images/keyboard.jpg',
    price: '$129.99',
    tags: ['电子产品', '外设'],
    link: 'https://example.com/keyboard',
    status: 'active',
  },
  {
    title: '开源工具包',
    description: '精选的开源开发者工具合集。',
    tags: ['软件', '开源'],
    price: 'Free',
    status: 'active',
  },
];
---

<ProductCardGrid client:load cards={cards} columns={3} />
```

### 在 MDX 页面中 (`.mdx`)

```mdx
import ProductCardGrid from '@jet-w/astro-blog.component.product-card/components/ProductCardGrid.vue';

export const cards = [
  {
    title: '机械键盘',
    description: '一款高端75%布局机械键盘，支持热插拔轴体。',
    image: '/images/keyboard.jpg',
    price: '$129.99',
    tags: ['电子产品', '外设'],
    link: 'https://example.com/keyboard',
    status: 'active',
  },
];

<ProductCardGrid client:load cards={cards} columns={3} />
```

::: tip MDX 注意事项
在 MDX 文件中，需要使用 `export const` 而非 `const`。MDX 不支持 TypeScript 类型注解。
:::

## 卡片数据结构

每个卡片对象支持以下字段：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | `string` | 是 | 卡片标题 |
| `description` | `string` | 否 | 描述文字，超过 2 行时截断，悬停显示完整内容 |
| `image` | `string` | 否 | 图片 URL，以 16:9 比例的封面图展示 |
| `price` | `string` | 否 | 价格标签（如 `$29.99`、`Free`） |
| `tags` | `string[]` | 否 | 标签，以彩色圆角徽章形式显示 |
| `link` | `string` | 否 | 点击卡片后在新标签页中打开的 URL |
| `status` | `string` | 否 | 显示在卡片上的状态徽章 |

### 示例

```js
{
  title: '升降桌',
  description: '电动升降桌，配备双电机和记忆预设功能。',
  image: '/images/desk.jpg',
  price: '$349.00',
  tags: ['家具', '人体工学'],
  link: 'https://example.com/desk',
  status: 'active',
}
```

## 组件说明

### ProductCardGrid

网格组件将多个 `ProductCard` 项目包裹在一起，并提供搜索和筛选控件。

#### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `cards` | `CardItem[]` | — | 卡片数据对象数组（必填） |
| `columns` | `number` | `3` | 大屏断点下的列数（`2`、`3` 或 `4`） |

#### 搜索

文本搜索框支持跨所有字段匹配：标题、描述、标签、链接、状态和价格。

#### 价格筛选

输入最低和/或最高价格，按价格区间筛选卡片。筛选器会从价格字符串中提取数值（如 `$129.99` → `129.99`）。`Free` 被视为 `0`。没有价格的卡片始终显示。

### ProductCard

单个卡片组件，也可以脱离网格独立使用。

```astro
---
import ProductCard from '@jet-w/astro-blog.component.product-card/components/ProductCard.vue';
---

<ProductCard
  title="高清摄像头"
  description="全高清 1080p 摄像头，支持自动对焦。"
  image="/images/webcam.jpg"
  price="$79.99"
  tags={['电子产品', '视频']}
  link="https://example.com/webcam"
  status="active"
/>
```

## 功能介绍

### 状态徽章

`status` 字段会在卡片上渲染一个彩色徽章。内置状态颜色：

| 状态 | 颜色 |
|------|------|
| `active` | 绿色 |
| `completed` | 主色调（蓝色） |
| `archived` | 灰色 |
| `wip` | 黄色 |

其他状态值将使用默认的强调色显示。

### 标签

标签以彩色圆角徽章形式显示。颜色自动在六种主题色（primary、secondary、accent、绿色、黄色、青色）之间循环。

### 图片

提供 `image` URL 后，卡片顶部会显示一个 16:9 的封面图，悬停时有轻微的缩放效果。如果未提供图片，卡片将不显示图片区域。

### 链接

提供 `link` 后，整个卡片变为可点击，并在新标签页中打开目标 URL。没有链接时，卡片渲染为静态的 `<div>` 元素。

### 描述提示

较长的描述会被截断为 2 行。将鼠标悬停在描述上方时，会在浮动提示框中显示完整文本。

### 深色模式

当父页面的祖先元素使用了 `.dark` 类时，组件会自动适配深色主题。

### 响应式布局

网格完全响应式：

- **手机** — 1 列
- **平板** (`sm`) — 2 列
- **桌面** (`lg`) — 根据 `columns` 属性显示 2、3 或 4 列
