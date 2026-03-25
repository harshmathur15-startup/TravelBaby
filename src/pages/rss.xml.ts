import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getAllPosts } from '@lib/blog-data';
import { SITE_CONFIG } from '@config';

export async function GET(context: APIContext) {
  const posts = (await getAllPosts()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return rss({
    title: `${SITE_CONFIG.name} ${SITE_CONFIG.rss.title}`,
    description: SITE_CONFIG.rss.description,
    site: context.site?.toString() ?? SITE_CONFIG.url,
    items: posts.map((post) => ({
      title: post.title,
      description: post.description,
      pubDate: new Date(post.date),
      link: `/blog/${post.slug}/`,
      categories: [post.category],
    })),
    customData: `<language>${SITE_CONFIG.language}</language>`,
  });
}
