/**
 * Site Configuration
 *
 * Basic site settings including title, description, author info, etc.
 */

import type { SiteConfig } from '@jet-w/astro-blog';

/**
 * Site configuration
 */
export const siteConfig: SiteConfig = {
  title: 'Product Card Demo',
  description: 'Demo for @jet-w/astro-blog.component.product-card',
  author: '',
  email: '',
  avatar: '/images/avatar.webp',
  social: {
    github: '',
    twitter: '',
    linkedin: '',
    email: '',
  },
  layout: {
    contentWidth: 'wide',
  },
  menu: [
    { name: 'Home', href: '/', icon: 'home' },
    { name: 'About', href: '/about', icon: 'about' },
  ],
};

export const defaultSEO = {
  title: siteConfig.title,
  description: siteConfig.description,
  image: '/images/og-image.jpg',
  type: 'website' as const,
};
