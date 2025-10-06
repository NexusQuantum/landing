import ProductDetailLayout1 from '@/components/sections/ProductDetailLayout1';

export default function NQRustAnalyticsPage() {
  const productData = {
    productName: "NQRust",
    productTitle: "Analytics",
    description: "Provides zero-training Natural Language analytics, delivering 9x faster queries and sub-second insights for immediate business value. Ensures compliance with major enterprise security standards.",
    benefits: [
      {
        id: 1,
        title: "Natural Language",
        description: "Zero-training NL analytics with 9x faster queries and sub-second insights for immediate business value."
      },
      {
        id: 2,
        title: "Mass Adoption",
        description: "90% user adoption rates with 60% TCO savings through intuitive interface and powerful backend."
      },
      {
        id: 3,
        title: "Enterprise Security",
        description: "Multi-layer security model supporting SOC2, ISO, GDPR, PCI, HIPAA compliance with Lake integration."
      }
    ],
    backgroundImage: "/bg-product.png",
    brochureUrl: "#",
    whitepaperUrl: "#"
  };

  return <ProductDetailLayout1 {...productData} />;
}
