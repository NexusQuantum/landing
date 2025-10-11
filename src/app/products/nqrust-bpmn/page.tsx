import ProductDetailLayout2 from '@/components/sections/ProductDetailLayout2';

export default function NQRustBPMNPage() {
  const productData = {
    productName: "NQRust",
    productTitle: "BPMN",
    description: "Delivers process automation using BPMN notation and a DMN decision engine. It includes a Serverless Functions framework and achieves 300% productivity improvement.",
    benefits: [
      {
        id: 1,
        title: "Process Automation",
        description: "BPMN notation workflow design with DMN decision engine integration, process simulation, and statistical analysis capabilities."
      },
      {
        id: 2,
        title: "Serverless Functions",
        description: "Function-as-a-Service framework with auto-scaling, collaborative design tools, and ready-to-use task management interface."
      },
      {
        id: 3,
        title: "Business Intelligence",
        description: "3x faster process deployment with real-time monitoring, compliance tracking, and 300% productivity improvement through automation."
      }
    ],
    backgroundImage: "/bg-product.png",
    brochureUrl: "#",
    whitepaperUrl: "#"
  };

  return <ProductDetailLayout2 {...productData} />;
}
