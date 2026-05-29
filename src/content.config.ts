import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Destinations collection schema
const destinationsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: "src/content/destinations" }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    image: z.string(),
    rating: z.number(),
    reviewsCount: z.number(),
    description: z.string(),
    price: z.number(),
    priceUnit: z.string().default('pax'),
    exploreLink: z.string().default('#rencana'),
    sortOrder: z.number().default(0),
  }),
});

// Interests collection schema
const interestsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: "src/content/interests" }),
  schema: z.object({
    title: z.string(),
    image: z.string(),
    link: z.string().default('#destinasi'),
    sortOrder: z.number().default(0),
  }),
});

// Blog collection schema
const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: "src/content/blog" }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('Admin Travel Osing'),
    image: z.string(),
    tags: z.array(z.string()).default([]),
    readTime: z.string().default('5 menit'),
  }),
});

// Events collection schema
const eventsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: "src/content/events" }),
  schema: z.object({
    year: z.number(),
    events: z.array(z.object({
      title: z.string(),
      dateString: z.string(),
      startDate: z.coerce.date(),
      location: z.string(),
      image: z.string(),
      description: z.string(),
      category: z.string(),
      highlight: z.boolean().default(false),
    })),
  }),
});

export const collections = {
  destinations: destinationsCollection,
  interests: interestsCollection,
  blog: blogCollection,
  events: eventsCollection,
};
