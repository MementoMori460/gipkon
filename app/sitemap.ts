import { MetadataRoute } from 'next';
import projects from '@/data/projects.json';
import services from '@/data/services.json';
import sectors from '@/data/sectors.json';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://gipkon.com.tr';

    // Static pages
    const routes = [
        '',
        '/kurumsal/hakkimizda',
        '/kurumsal/referanslar',
        '/kurumsal/insan-kaynaklari',
        '/cozumler',
        '/projeler',
        '/hizmetler',
        '/iletisim',
        '/servis',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic Projects
    const projectRoutes = projects.map((project) => ({
        url: `${baseUrl}/projeler/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // Dynamic Services
    const serviceRoutes = services.map((service) => ({
        url: `${baseUrl}/hizmetler/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    // Dynamic Sectors
    const sectorRoutes = sectors.map((sector) => ({
        url: `${baseUrl}/cozumler/${sector.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    return [...routes, ...projectRoutes, ...serviceRoutes, ...sectorRoutes];
}
