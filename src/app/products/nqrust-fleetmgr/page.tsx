import ProductDetailLayout1 from '@/components/sections/ProductDetailLayout1';

export default function NQRustFleetMgrPage() {
  const productData = {
    productName: "NQRust",
    productTitle: "FleetMgr",
    description: "A unified, Git-native control plane for managing MicroVMs, containers, and GPU resources. Ensures Indonesian regulatory adherence and delivers 9x faster deployments.",
    benefits: [
      {
        id: 1,
        title: "Unified Orchestration",
        description: "Single control plane managing containers, MicroVMs, GPU/AI storage, and edge with a policy-first, Git-native approach."
      },
      {
        id: 2,
        title: "Indonesian Compliance",
        description: "Built-in automation for UU PDP, OJK, BI, and residency requirements, ensuring regulatory adherence without operational overhead."
      },
      {
        id: 3,
        title: "AI-Driven Efficiency",
        description: "60% operational savings and 9x faster deployments with intelligent scheduling achieving 90% CPU, 96% GPU utilization."
      }
    ],
    backgroundImage: "/bg-product.png",
    brochureUrl: "#",
    whitepaperUrl: "#"
  };

  return <ProductDetailLayout1 {...productData} />;
}
