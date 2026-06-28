export type ProductLayout = 'carousel' | 'cards';

export interface Product {
  name: string;
  href: string;
  description: string;
  layout: ProductLayout;
}

/** Products that are ready and shown across the site. */
export const PUBLIC_PRODUCTS: Product[] = [
  {
    name: 'NQRust-HyperVisor',
    href: '/products/nqrust-hv-hypervisor',
    description:
      'A memory-safe enterprise hypervisor for modern AI workloads with sub-second VM provisioning and hardware acceleration.',
    layout: 'carousel',
  },
  {
    name: 'NQRust-MicroVM',
    href: '/products/nqrust-microvm',
    description:
      'Container-speed, VM-grade security for serverless AI and regulated workloads with perfect balance of performance and isolation.',
    layout: 'carousel',
  },
  {
    name: 'NQRust-Storage',
    href: '/products/nqrust-storage',
    description:
      'High-performance, distributed storage system with built-in encryption and data integrity guarantees for enterprise workloads.',
    layout: 'carousel',
  },
  {
    name: 'NQRust-Analytics',
    href: '/products/nqrust-analytics',
    description:
      'Natural language analytics for instant answers over unified data with AI-powered insights and recommendations.',
    layout: 'carousel',
  },
  {
    name: 'NQRust-Lake',
    href: '/products/nqrust-lake',
    description:
      'A Rust-native data lakehouse with columnar storage, vector-ready architecture, and low-latency queries for analytics and AI workloads.',
    layout: 'carousel',
  },
  {
    name: 'NQRust-LLMOps',
    href: '/products/nqrust-llmops',
    description:
      'End-to-end LLM operations for fine-tuning, evals, safety checks, and GPU-efficient serving with production guardrails.',
    layout: 'cards',
  },
  {
    name: 'NQRust-Identity',
    href: '/products/nqrust-identity',
    description:
      'Zero-trust identity and access management with hardware-backed authentication and fine-grained authorization controls.',
    layout: 'cards',
  },
  {
    name: 'NQRust-Backup & Restore',
    href: '/products/nqrust-backup-restore',
    description:
      'Immutable backups, air-gapped restores, and policy-driven data protection for enterprise workloads.',
    layout: 'cards',
  },
  {
    name: 'NQRust-Kubernetes',
    href: '/products/nqrust-kubernetes',
    description:
      'Memory-safe Kubernetes distribution for secure, scalable container orchestration with enterprise-grade reliability.',
    layout: 'cards',
  },
];

export function splitIntoColumns<T>(items: T[], columnCount: number): T[][] {
  const columns: T[][] = Array.from({ length: columnCount }, () => []);
  items.forEach((item, index) => {
    columns[index % columnCount].push(item);
  });
  return columns;
}

export const NAV_PRODUCT_COLUMNS = splitIntoColumns(PUBLIC_PRODUCTS, 3);
