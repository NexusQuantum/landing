import ProductDetailLayout1 from '@/components/sections/ProductDetailLayout1';

export default function NQRustMicroVMPage() {
  const productData = {
    productName: "NQRust",
    productTitle: "MicroVM",
    description: "Delivers container-like agility with hardware-grade VM isolation, achieving lightning-fast 100ms cold start times and significant cost optimization and ROI.",
    benefits: [
      {
        id: 1,
        title: "Lightning Fast Startup",
        description: "Approximately 100ms cold start times with only 32MB overhead, delivering container-like agility with VM-grade hardware kernel isolation."
      },
      {
        id: 2,
        title: "Cost Optimization",
        description: "Documented 60% cost reduction and 600% ROI in 18 months through elimination of speed-vs-security trade-offs."
      },
      {
        id: 3,
        title: "Seamless Integration",
        description: "Docker/K8s compatibility with parallel rollout capabilities, enabling 6-month payback in conservative migration timelines."
      }
    ],
    backgroundImage: "/bg-product.png",
    brochureUrl: "#",
    whitepaperUrl: "#"
  };

  return <ProductDetailLayout1 {...productData} />;
}
