import ProductDetailLayout1 from '@/components/sections/ProductDetailLayout1';

export default function NQRustStoragePage() {
  const productData = {
    productName: "NQRust",
    productTitle: "Storage",
    description: "Provides memory-safe distributed storage for enterprise workloads, achieving 9x faster I/O performance, sub-100 microsecond latency, and 90% storage cost reduction.",
    benefits: [
      {
        id: 1,
        title: "Distributed Performance",
        description: "Memory-safe distributed storage with 2.5M IOPS/node, sub-100 microsecond latency, and 9x faster I/O performance."
      },
      {
        id: 2,
        title: "Cost Optimization",
        description: "90% storage cost reduction versus traditional SAN/NAS with 900% ROI in 18 months through consolidation."
      },
      {
        id: 3,
        title: "Enterprise Reliability",
        description: "99.999% durability with erasure coding, automatic repair, end-to-end encryption, and policy-driven tiering."
      }
    ],
    backgroundImage: "/bg-product.png",
    brochureUrl: "#",
    whitepaperUrl: "#"
  };

  return <ProductDetailLayout1 {...productData} />;
}
