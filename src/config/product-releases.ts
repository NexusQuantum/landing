/**
 * Homepage “new release” banner — edit this file when a product launches.
 *
 * - Set `enabled` to false to hide the whole section.
 * - One item: single banner layout.
 * - Multiple items: carousel with dots and prev/next (optional auto-rotate).
 *
 * Each release has three CTAs:
 *   exploreProduct — product landing page
 *   tryDemo       — demo site (use href: '#' if not available yet)
 *   viewDocs      — documentation
 */

export type ProductReleaseCtaLink = {
  /** Omit to use default label from `defaultCtaLabels` */
  label?: string;
  /** Absolute URL (https://…) opens in a new tab; site paths use in-app navigation */
  href: string;
};

export type ProductReleaseCtas = {
  exploreProduct: ProductReleaseCtaLink;
  tryDemo: ProductReleaseCtaLink;
  viewDocs: ProductReleaseCtaLink;
};

export type ProductReleaseDemoSite = {
  name: string;
  href: string;
  username: string;
  password: string;
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
  ctas: ProductReleaseCtas;
  /** Optional demo environments with login credentials */
  demoSites?: ProductReleaseDemoSite[];
};

export type ProductReleasesConfig = {
  enabled: boolean;
  /** Badge when `item.badge` is omitted */
  defaultBadge?: string;
  /** Default CTA button labels */
  defaultCtaLabels?: {
    exploreProduct: string;
    tryDemo: string;
    viewDocs: string;
  };
  /**
   * Auto-advance carousel when there is more than one item.
   * Omit or set 0 to disable.
   */
  autoRotateIntervalMs?: number;
  items: ProductReleaseItem[];
};

export const DEFAULT_RELEASE_CTA_LABELS = {
  exploreProduct: 'Explore Product',
  tryDemo: 'Try Demo',
  viewDocs: 'View Docs',
} as const;

export const productReleasesConfig: ProductReleasesConfig = {
  enabled: true,
  defaultBadge: 'New release',
  defaultCtaLabels: DEFAULT_RELEASE_CTA_LABELS,
  autoRotateIntervalMs: 3000,
  items: [
    {
      id: 'nqrust-identity',
      productName: 'NQRust-Identity',
      description:
        'Enterprise IAM with Universal SSO, OAuth 2.0, OpenID Connect, and SAML—sovereign identity governance for government, regulated industries, and corporate environments in Indonesia.',
      demoSites: [
        {
          name: 'Demo Portal',
          href: 'https://demo.portal.nexusquantum.id',
          username: 'demo',
          password: 'demo',
        },
        {
          name: 'Demo IDM',
          href: 'https://demo.identity.nexusquantum.id',
          username: 'admin',
          password: 'identity',
        },
      ],
      ctas: {
        exploreProduct: { href: 'https://identity.nexusquantum.id/' },
        tryDemo: { href: 'https://demo.portal.nexusquantum.id' },
        viewDocs: { href: 'https://docs-identity.nexusquantum.id/' },
      },
    },
    {
      id: 'nqrust-hypervisor',
      productName: 'NQRust-HyperVisor',
      description:
        'Memory-safe enterprise hypervisor built with Rust—strong isolation, near bare-metal performance, and a significantly reduced attack surface for secure, large-scale virtualization.',
      ctas: {
        exploreProduct: { href: 'https://hypervisor.nexusquantum.id/' },
        tryDemo: { href: 'https://hypervisor.nexusquantum.id/dashboard' },
        viewDocs: { href: 'https://hypervisor.nexusquantum.id/docs/' },
      },
    },
    {
      id: 'nqrust-microvm',
      productName: 'NQRust-MicroVM',
      description:
        'Bridges containers and VMs with fast startup, lightweight resource use, and strong isolation—ideal for multi-tenant platforms, serverless workloads, and secure application sandboxes.',
      ctas: {
        exploreProduct: { href: 'https://microvm.nexusquantum.id/' },
        tryDemo: { href: 'https://demo.microvm.nexusquantum.id/dashboard' },
        viewDocs: { href: 'https://microvm.nexusquantum.id/docs/introduction/' },
      },
    },
    {
      id: 'nqrust-analytics',
      productName: 'NQRust-Analytics',
      description:
        'Turn complex business questions into real-time insights with high-performance query execution and scalable data processing for faster decisions across your organization.',
      ctas: {
        exploreProduct: { href: 'https://analytics.nexusquantum.id/' },
        tryDemo: { href: 'https://demo.analytics.nexusquantum.id/home' },
        viewDocs: { href: 'https://docs.analytics.nexusquantum.id/' },
      },
    },
  ],
};

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export function isReleaseCtaExternal(href: string): boolean {
  return isExternalHref(href);
}

export function getProductReleaseItem(releaseId: string): ProductReleaseItem | undefined {
  return productReleasesConfig.items.find((item) => item.id === releaseId);
}
