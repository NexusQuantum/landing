import ProductDetailLayout2 from '@/components/sections/ProductDetailLayout2';

export default function NQRustEdgePage() {
  const productData = {
    productName: "NQRust",
    productTitle: "Edge",
    description: "An autonomous, one-click edge runtime solution supporting 3,000+ sites globally. It provides 900% first-year ROI with 3ms latency and 99.9% uptime.",
    benefits: [
      {
        id: 1,
        title: "Autonomous Operation",
        description: "One-click, offline-capable edge runtime with 90x faster deployment, 3ms latency, and 99.9% uptime."
      },
      {
        id: 2,
        title: "Massive Scale",
        description: "3,000+ edge sites support with GDPR/PP71/PDPA/ISO27001 alignment and 90% management cost reduction."
      },
      {
        id: 3,
        title: "Industry ROI",
        description: "900% first-year ROI through 5G MEC optimization, smart factory integration, and retail privacy-preserving analytics."
      }
    ],
    backgroundImage: "/bg-product.png",
    brochureUrl: "#",
    whitepaperUrl: "#"
  };

  return <ProductDetailLayout2 {...productData} />;
}
