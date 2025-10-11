import ProductDetailLayout2 from '@/components/sections/ProductDetailLayout2';

export default function NQRustGuardPage() {
  const productData = {
    productName: "NQRust",
    productTitle: "Guard",
    description: "Offers immutable protection via WORM backups with fast restores and automated migration. It features a 30-day quick-start program and provides high executive confidence in recovery assurance.",
    benefits: [
      {
        id: 1,
        title: "Immutable Protection",
        description: "WORM backups with fast restores and automated migration from legacy catalogs with integrity verification."
      },
      {
        id: 2,
        title: "Quick Deployment",
        description: "30-day quick-start program achieving full coverage with proven migration engine and automated processes."
      },
      {
        id: 3,
        title: "Executive Confidence",
        description: "Weighted decision matrix score 9.6/10 versus 6.0/10 alternatives on recovery assurance, cost, and compliance."
      }
    ],
    backgroundImage: "/bg-product.png",
    brochureUrl: "#",
    whitepaperUrl: "#"
  };

  return <ProductDetailLayout2 {...productData} />;
}
