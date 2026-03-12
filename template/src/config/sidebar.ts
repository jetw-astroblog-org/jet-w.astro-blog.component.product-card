import type { SidebarConfig } from '@jet-w/astro-blog';

export const sidebarConfig: SidebarConfig = {
  enabled: true,
  showSearch: true,
  showRecentPosts: true,
  recentPostsCount: 5,
  showPopularTags: true,
  popularTagsCount: 8,
  showArchives: true,
  archivesCount: 6,
  showFriendLinks: false,
  friendLinks: [],
  groups: [],
};
