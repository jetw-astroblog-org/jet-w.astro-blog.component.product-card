import type { FooterConfig } from '@jet-w/astro-blog';
import { socialLinks } from './social';

export const footerConfig: FooterConfig = {
  quickLinksTitle: 'Quick Links',
  quickLinks: [],
  contactTitle: 'Contact',
  socialLinks: socialLinks,
  showRss: false,
  rssUrl: '/rss.xml',
  copyright: '© {year} {author}. All rights reserved.',
  poweredBy: {
    text: 'Astro',
    url: 'https://astro.build',
  },
};
