# Implementation Plan - Public Pages Refinement

# [Goal Description]
Finalize Key Public Pages and Navigation. Most core pages (Home, Projects, Services) are already implemented. The focus is now on:
1.  **Catalogs Page:** Create a page to list/download company catalogs.
2.  **References Page:** Consolidate `/kurumsal/referanslar` to redirect to the main `/referanslar` page or vice versa.
3.  **Header:** Ensure navigation includes all new pages and is responsive.
4.  **Footer:** Verify links and contact info are dynamic.

## User Review Required
> [!NOTE]
> I am assuming `/kurumsal/referanslar` should just redirect to `/referanslar` (or be the main one) to avoid duplicate content.

## Proposed Changes

### Pages
#### [NEW] [kataloglarimiz/page.tsx](file:///Users/ydmacm1/gipkon/app/kurumsal/kataloglarimiz/page.tsx)
- Create a grid layout for catalogs.
- Use placeholder PDF links or dummy data if no actual PDFs are available.

#### [MODIFY] [referanslar/page.tsx](file:///Users/ydmacm1/gipkon/app/kurumsal/referanslar/page.tsx)
- Change to a server-side redirect to `/referanslar` OR Ensure content is consistent.

### Layout
#### [MODIFY] [Header.tsx](file:///Users/ydmacm1/gipkon/components/layout/Header.tsx)
- Update menu items to match the current page structure.
- Ensure "Kurumsal" dropdown works correctly.

#### [MODIFY] [Footer.tsx](file:///Users/ydmacm1/gipkon/components/layout/Footer.tsx)
- Ensure copyright year is dynamic.
- Check social media links integration.

## Verification Plan
### Manual Verification
- Navigate to `/kurumsal/kataloglarimiz` and check rendering.
- Navigate to `/kurumsal/referanslar` and verify redirect.
- Check Header mobile menu.
