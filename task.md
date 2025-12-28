# Project Tasks

## Phase 1: Setup & Configuration
- [x] Initial Project Setup (Next.js 14, TypeScript, Tailwind) <!-- id: 0 -->
- [x] Configure Tailwind with Custom Colors (Zinc/Slate) <!-- id: 1 -->
- [x] Setup Project Structure (data/, components/, app/) <!-- id: 2 -->
- [x] **Data Migration (SQL to JSON)** <!-- id: 3 -->
    - [x] Analyze `natroSon.sql` structure <!-- id: 4 -->
    - [x] Extract References from SQL and populate `data/references.json` <!-- id: 5 -->
    - [x] Extract Contact Info from SQL and update `data/settings.json` <!-- id: 6 -->
    - [x] Integrate Map Component (Leaflet or Google Maps Embed) <!-- id: 7 -->

## Phase 2: Core Admin Panel (JSON-Based CMS)
- [x] **Admin Layout & Auth** <!-- id: 8 -->
    - [x] Create Admin Layout (`/admin/layout.tsx`) <!-- id: 9 -->
    - [x] Implement Admin Sidebar Navigation <!-- id: 10 -->
    - [x] Admin Panel Responsive Layout <!-- id: 11 -->
    - [x] Modernize Design (Minimal Aesthetic, Zinc Colors) <!-- id: 12 -->
    - [x] Implement authentication (NextAuth.js)
- [x] Create content editors (references, projects)
- [x] File upload functionality (Manual URL entry for Phase 1)
- [x] **Sector Management** <!-- id: 36 -->
    - [x] Create API Route: `/api/admin/sectors` <!-- id: 37 -->
    - [x] Create API Route: `/api/admin/sectors/[id]` <!-- id: 38 -->
    - [x] Create UI: List Sectors (`/admin/sectors`) <!-- id: 39 -->
    - [x] Create UI: New Sector Page (`/admin/sectors/new`) <!-- id: 40 -->
    - [x] Create UI: Edit Sector Page (`/admin/sectors/[id]`) <!-- id: 41 -->
    - [x] Create Component: `DeleteSectorButton` <!-- id: 42 -->
    - [x] Add 'Sektörler' link to Admin Sidebar <!-- id: 43 -->
    - [x] **Sector Visibility Toggle** <!-- id: 44 -->
        - [x] Add `isActive` field to `sectors.json` <!-- id: 45 -->
        - [x] Update Sector Form UI <!-- id: 46 -->
        - [x] Filter public display active sectors <!-- id: 47 -->
- [ ] **System Tools** <!-- id: 48 -->
    - [x] **Backup & Restore** <!-- id: 49 -->
        - [x] API Route: Securely zip and download `data/` folder <!-- id: 50 -->
        - [x] API Route: Upload and restore valid ZIP backups <!-- id: 51 -->
        - [x] UI: Backup Manager Page <!-- id: 52 -->

## Phase 3: Public Pages Implementation
- [X] Homepage (`/`) - Dynamic Sectors & Projects
- [X] Solutions Page (`/cozumler`)
- [X] Contact Page (`/iletisim`)
- [ ] Corporate Page (`/kurumsal`)
- [ ] Project Detail Pages (`/projeler/[slug]`)
- [ ] Services Pages (`/hizmetler/*`)
- [ ] Footer & Header Implementation

## Phase 4: Optimization & Deployment
- [ ] SEO Metadata Optimization
- [ ] Image Optimization
- [ ] Final Testing & Build Verification
