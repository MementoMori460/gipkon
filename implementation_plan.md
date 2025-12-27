# Gipkon Website - Implementation Plan

Modern, minimal kurumsal website için Next.js migration planı.

## User Review Required

> [!IMPORTANT]
> **Tasarım Yaklaşımı:** Modern, minimal ve kurumsal bir tasarım hedefliyoruz. Renk paleti ve genel stil için onayınıza ihtiyacım var:
> - **Renk Şeması:** Koyu lacivert/mavi tonları + beyaz/gri (kurumsal) veya farklı bir palet?
> - **Tipografi:** Modern sans-serif (Inter, Outfit) kullanılacak
> - **Animasyonlar:** Smooth, subtle animasyonlar eklenecek
> - **Dark Mode:** Eklensin mi?

> [!NOTE]
> **Admin Panel:** İlk versiyonda basit JSON dosya tabanlı yönetim, sonraki aşamada tam CMS entegrasyonu planlanıyor.

---

## Proposed Changes

### Phase 1: Project Setup & Foundation

#### [NEW] [package.json](file:///Users/ydmacm1/gipkon/package.json)
Next.js 14, TypeScript, Tailwind CSS ve gerekli dependencies ile proje kurulumu.

#### [NEW] [tsconfig.json](file:///Users/ydmacm1/gipkon/tsconfig.json)
TypeScript konfigürasyonu - strict mode ve path aliases.

#### [NEW] [tailwind.config.ts](file:///Users/ydmacm1/gipkon/tailwind.config.ts)
Tailwind CSS konfigürasyonu - custom colors, fonts, animations.

#### [NEW] [next.config.js](file:///Users/ydmacm1/gipkon/next.config.js)
Next.js konfigürasyonu - image optimization, i18n setup.

---

### Phase 2: Core Components & Layout

#### [NEW] [src/components/layout/Header.tsx](file:///Users/ydmacm1/gipkon/src/components/layout/Header.tsx)
Modern header component:
- Sticky navigation
- Mobile hamburger menu
- Language switcher (TR/EN/DE)
- Search functionality
- Smooth scroll animations

#### [NEW] [src/components/layout/Footer.tsx](file:///Users/ydmacm1/gipkon/src/components/layout/Footer.tsx)
Footer component:
- Quick links
- Social media icons
- Contact info
- Newsletter signup

#### [NEW] [src/components/ui/Button.tsx](file:///Users/ydmacm1/gipkon/src/components/ui/Button.tsx)
Reusable button component - multiple variants (primary, secondary, outline).

#### [NEW] [src/components/ui/Card.tsx](file:///Users/ydmacm1/gipkon/src/components/ui/Card.tsx)
Card component for services, projects, solutions.

#### [NEW] [src/components/ui/Hero.tsx](file:///Users/ydmacm1/gipkon/src/components/ui/Hero.tsx)
Hero slider component - modern, animated, responsive.

---

### Phase 3: Homepage & Core Pages

#### [NEW] [src/app/page.tsx](file:///Users/ydmacm1/gipkon/src/app/page.tsx)
Homepage:
- Hero slider (9 sectors)
- About section preview
- Solutions grid
- Projects showcase
- Services overview
- CTA sections

#### [NEW] [src/app/kurumsal/hakkimizda/page.tsx](file:///Users/ydmacm1/gipkon/src/app/kurumsal/hakkimizda/page.tsx)
About page - company info, mission, vision.

#### [NEW] [src/app/iletisim/page.tsx](file:///Users/ydmacm1/gipkon/src/app/iletisim/page.tsx)
Contact page:
- Contact form with validation
- Google Maps integration
- Contact information
- Office locations

#### [NEW] [src/app/kurumsal/referanslar/page.tsx](file:///Users/ydmacm1/gipkon/src/app/kurumsal/referanslar/page.tsx)
References page - client logos and testimonials.

---

### Phase 4: Dynamic Content Pages

#### [NEW] [src/app/cozumler/[sector]/page.tsx](file:///Users/ydmacm1/gipkon/src/app/cozumler/[sector]/page.tsx)
Dynamic sector solutions pages (9 sectors):
- Gıda, Tekstil, Sağlık, Kimya, İlaç, Kozmetik, Enerji, Maden, Savunma

#### [NEW] [src/app/projeler/[sector]/page.tsx](file:///Users/ydmacm1/gipkon/src/app/projeler/[sector]/page.tsx)
Dynamic project gallery pages (9 categories).

#### [NEW] [src/app/hizmetler/[service]/page.tsx](file:///Users/ydmacm1/gipkon/src/app/hizmetler/[service]/page.tsx)
Dynamic service pages (9 services).

---

### Phase 5: Data Structure

#### [NEW] [src/data/sectors.json](file:///Users/ydmacm1/gipkon/src/data/sectors.json)
Sector data - titles, descriptions, images, slugs.

#### [NEW] [src/data/services.json](file:///Users/ydmacm1/gipkon/src/data/services.json)
Services data - all 9 services with details.

#### [NEW] [src/data/projects.json](file:///Users/ydmacm1/gipkon/src/data/projects.json)
Projects data - categorized by sector.

#### [NEW] [src/data/references.json](file:///Users/ydmacm1/gipkon/src/data/references.json)
Client references - logos, names, testimonials (admin panel ile düzenlenebilir).

---

### Phase 6: Forms & Interactivity

#### [NEW] [src/components/forms/ContactForm.tsx](file:///Users/ydmacm1/gipkon/src/components/forms/ContactForm.tsx)
Contact form with React Hook Form and validation.

#### [NEW] [src/components/forms/ServiceRequestForm.tsx](file:///Users/ydmacm1/gipkon/src/components/forms/ServiceRequestForm.tsx)
Service request forms (4 types: Devreye Alma, Servis, Yedek Parça, Teklif).

#### [NEW] [src/app/api/contact/route.ts](file:///Users/ydmacm1/gipkon/src/app/api/contact/route.ts)
API route for form submissions - email sending.

---

### Phase 7: Simple Admin Panel (Future)

#### [NEW] [src/app/admin/page.tsx](file:///Users/ydmacm1/gipkon/src/app/admin/page.tsx)
Simple admin dashboard - authentication required.

#### [NEW] [src/app/admin/references/page.tsx](file:///Users/ydmacm1/gipkon/src/app/admin/references/page.tsx)
References management - add/edit/delete client logos.

#### [NEW] [src/app/admin/projects/page.tsx](file:///Users/ydmacm1/gipkon/src/app/admin/projects/page.tsx)
Projects management - add new projects with images.

---

## Verification Plan

### Automated Tests
```bash
# Build test
npm run build

# Type checking
npm run type-check

# Lint
npm run lint
```

### Manual Verification
1. **Responsive Design:** Test on mobile, tablet, desktop
2. **Cross-browser:** Chrome, Firefox, Safari, Edge
3. **Performance:** Lighthouse score > 90
4. **SEO:** Meta tags, sitemap, robots.txt
5. **Forms:** Test all form submissions
6. **Navigation:** Test all internal links
7. **Images:** Verify all images load correctly

### Browser Testing
- Test homepage hero slider
- Test navigation menu (desktop & mobile)
- Test contact form submission
- Test dynamic routing (sectors, services, projects)
- Verify Google Maps integration

---

## Technology Stack Summary

```
Framework:     Next.js 14 (App Router)
Language:      TypeScript
Styling:       Tailwind CSS
Forms:         React Hook Form + Zod
Icons:         Lucide React
Animations:    Framer Motion
Maps:          Google Maps API
Email:         Resend / EmailJS
Deployment:    Vercel
CMS (future):  Sanity.io / Strapi
```

---

## Timeline Estimate

- **Phase 1-2:** Project setup & components (1 session)
- **Phase 3:** Core pages (1 session)
- **Phase 4-5:** Dynamic content & data (1 session)
- **Phase 6:** Forms (1 session)
- **Phase 7:** Admin panel (future, 1-2 sessions)

**Total:** 4-5 development sessions + testing & deployment
