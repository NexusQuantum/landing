import ProductDetailLayout2 from '@/components/sections/ProductDetailLayout2';

export default function NQRustKubernetesPage() {
  const productData = {
    productName: 'NQRust',
    productTitle: 'Kubernetes',
    description:
      'A Rust-native Kubernetes distribution built for secure, high-performance container orchestration with memory-safe control plane components and enterprise-ready operations.',
    benefits: [
      {
        id: 1,
        title: 'Memory-Safe Control Plane',
        description:
          'Rust-built Kubernetes components reduce attack surface while delivering reliable cluster management at scale.',
      },
      {
        id: 2,
        title: 'Enterprise Orchestration',
        description:
          'Production-grade scheduling, autoscaling, and multi-tenant isolation for modern cloud-native workloads.',
      },
      {
        id: 3,
        title: 'Operational Confidence',
        description:
          'Integrated observability, policy enforcement, and hardened defaults for regulated and mission-critical deployments.',
      },
    ],
    backgroundImage: '/bg-product.jpg',
    brochureUrl: '#',
    whitepaperUrl: '#',
  };

  return <ProductDetailLayout2 {...productData} />;
}
