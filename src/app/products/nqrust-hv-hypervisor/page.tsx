import ProductDetailLayout1 from '@/components/sections/ProductDetailLayout1';

export default function NQRustHVHypervisorPage() {
  const productData = {
    productName: "NQRust",
    productTitle: "HV Hypervisor",
    description: "A Rust-based type-1 hypervisor that establishes a memory-safe foundation for the cloud, eliminating C/C++ vulnerabilities and enabling zero-compromise security.",
    benefits: [
      {
        id: 1,
        title: "Memory Safe Architecture",
        description: "Rust-based type-1 hypervisor eliminates entire classes of vulnerabilities found in traditional C/C++ hypervisors, providing zero-compromise security."
      },
      {
        id: 2,
        title: "Live Migration",
        description: "Seamless VM migration with less than 50ms downtime and bandwidth caps, enabling maintenance without service interruption or SLA violations."
      },
      {
        id: 3,
        title: "Enterprise Observability",
        description: "Deep analytics for 99.99% SLA compliance tracking, per-VM cost metrics, and policy-driven isolation for regulated multi-tenant environments."
      }
    ],
    backgroundImage: "/bg-product.png",
    brochureUrl: "#",
    whitepaperUrl: "#"
  };

  return <ProductDetailLayout1 {...productData} />;
}
