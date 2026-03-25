import type { APIRoute, GetStaticPaths } from 'astro';
import { generateOgImage } from '@lib/og-image';
import { getAllPosts } from '@lib/blog-data';

interface PageMeta {
  title: string;
  description?: string;
}

const STATIC_PAGES: Record<string, PageMeta> = {
  index: { title: 'Brand', description: 'Build better, ship faster.' },
  features: { title: 'Features', description: 'Everything you need to build great products.' },
  pricing: { title: 'Pricing', description: 'Simple, transparent pricing for every team.' },
  about: { title: 'About', description: 'The team behind the product.' },
  blog: { title: 'Blog', description: 'Articles, tutorials, and insights.' },
  contact: { title: 'Contact', description: 'Get in touch with our team.' },
};

export const getStaticPaths = (async () => {
  const paths = Object.keys(STATIC_PAGES).map((slug) => ({
    params: { slug: slug === 'index' ? undefined : slug },
    props: STATIC_PAGES[slug],
  }));

  const posts = await getAllPosts();
  for (const post of posts) {
    paths.push({
      params: { slug: `blog/${post.slug}` },
      props: { title: post.title, description: post.description },
    });
  }

  return paths;
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { title, description } = props as PageMeta;
  const png = await generateOgImage(title, description);
  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
};
