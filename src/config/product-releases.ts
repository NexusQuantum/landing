/**
 * Homepage “new release” banner — edit this file when a product launches.
 *
 * - Set `enabled` to false to hide the whole section.
 * - One item: single banner layout.
 * - Multiple items: carousel with dots and prev/next (optional auto-rotate).
 */

export type ProductReleasePrimaryCta = {
  label: string;
  /** Absolute URL (https://…) opens in a new tab; site paths use in-app navigation */
  href: string;
};

export type ProductReleaseSecondaryCta = {
  label: string;
  /** Must be an internal path, e.g. /products/nqrust-identity */
  href: string;
};

export type ProductReleaseItem = {
  /** Stable id for keys and a11y */
  id: string;
  /** Defaults to `defaultBadge` from config */
  badge?: string;
  /** Shown with brand gradient (e.g. NQRust Identity) */
  productName: string;
  /** Text after the product name (default: "is now available") */
  headlineSuffix?: string;
  description: string;
  primaryCta: ProductReleasePrimaryCta;
  secondaryCta?: ProductReleaseSecondaryCta;
};

export type ProductReleasesConfig = {
  enabled: boolean;
  /** Badge when `item.badge` is omitted */
  defaultBadge?: string;
  /**
   * Auto-advance carousel when there is more than one item.
   * Omit or set 0 to disable.
   */
  autoRotateIntervalMs?: number;
  items: ProductReleaseItem[];
};

export const productReleasesConfig: ProductReleasesConfig = {
  enabled: true,
  defaultBadge: 'New release',
  autoRotateIntervalMs: 9000,
  items: [
    {
      id: 'nqrust-identity',
      productName: 'NQRust Identity',
      description:
        'Self-hosted IAM with OIDC, OAuth2, and SAML, a branded portal, first-party MFA app, and an airgapped-ready installer—built for teams that need full control over identity and audit.',
      primaryCta: {
        label: 'Explore Identity',
        href: 'https://identity.nexusquantum.id/',
      },
      secondaryCta: {
        label: 'Product overview',
        href: '/products/nqrust-identity',
      },
    },
    // Add more entries here when several products launch together — the banner becomes a carousel.
    // {
    //   id: 'nqrust-example',
    //   productName: 'NQRust Example',
    //   description: 'Short value proposition for the new product.',
    //   primaryCta: { label: 'Learn more', href: 'https://example.com' },
    //   secondaryCta: { label: 'Product overview', href: '/products/nqrust-example' },
    // },
  ],
};

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export function isPrimaryCtaExternal(href: string): boolean {
  return isExternalHref(href);
}
