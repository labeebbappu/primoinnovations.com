import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://primoinnovations.com'

  // Weekly changing routes
  const weeklyRoutes = [
    '',
    '/intro/home',
    '/intro/about',
    '/intro/contact',
    '/blog',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }))

  // Static blog routes (never change)
  const blogRoutes = [
    '/blog/*'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'never' as const,
    priority: 0.5
  }))

  return [...weeklyRoutes, ...blogRoutes]
}