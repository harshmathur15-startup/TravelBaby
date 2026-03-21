import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getAllPosts } from '@lib/blog-data';

export async function GET(context: APIContext) {
  const posts = (await getAllPosts()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return rss({
    title: 'Website Blog',
    description: 'Articles, tutorials, and insights on web development, design, and building great products.',
    site: context.site?.toString() ?? 'https://example.com',
    items: posts.map((post) => ({
      title: post.title,
      description: post.description,
      pubDate: new Date(post.date),
      link: `/blog/${post.slug}/`,
      categories: [post.category],
    })),
    customData: '<language>en-us</language>',
  });
}
