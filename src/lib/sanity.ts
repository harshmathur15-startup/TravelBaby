import { createClient, type SanityClient as SanityClientType } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = import.meta.env.SANITY_PROJECT_ID;

export const sanityClient: SanityClientType | null = projectId
  ? createClient({
      projectId,
      dataset: import.meta.env.SANITY_DATASET ?? 'production',
      apiVersion: '2026-03-21',
      useCdn: true,
    })
  : null;

export function urlFor(source: Parameters<ReturnType<typeof imageUrlBuilder>['image']>[0]) {
  if (!sanityClient) {
    throw new Error('Sanity client not configured — set SANITY_PROJECT_ID in .env');
  }
  return imageUrlBuilder(sanityClient).image(source);
}
