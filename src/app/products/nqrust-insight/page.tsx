import ProductDetailLayout2 from '@/components/sections/ProductDetailLayout2';

export default function NQRustInsightPage() {
  const productData = {
    productName: "NQRust",
    productTitle: "Insight",
    description: "An AI-native monitoring solution offering intelligent observability, RCA, and predictive planning. Delivers 90x improvement in MTTD and 60% monitoring cost reduction.",
    benefits: [
      {
        id: 1,
        title: "AI-Native Monitoring",
        description: "Intelligent observability with anomaly detection, RCA, and predictive capacity planning delivering 900% ROI."
      },
      {
        id: 2,
        title: "Operational Excellence",
        description: "MTTD reduction from 4.2 hours to 3 minutes (90x improvement), alerts down 99.9%, utilization improved to 90%."
      },
      {
        id: 3,
        title: "Cost Reduction",
        description: "60% monitoring cost reduction with 9 million USD per year infrastructure savings and 6x faster incident resolution."
      }
    ],
    backgroundImage: "/bg-product.png"
  };

  return <ProductDetailLayout2 {...productData} />;
}
