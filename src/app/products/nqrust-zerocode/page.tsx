import ProductDetailLayout2 from '@/components/sections/ProductDetailLayout2';

export default function NQRustZeroCodePage() {
  const productData = {
    productName: "NQRust",
    productTitle: "ZeroCode",
    description: "Enables 9x faster API development and 600% ROI through automation. It generates APIs from legacy systems and modern protocols via a drag-and-drop GUI.",
    benefits: [
      {
        id: 1,
        title: "Universal Connectivity",
        description: "Pipeline-based API generation from REST, SOAP, gRPC, AS/400 banking systems, databases, and legacy systems via drag-and-drop GUI."
      },
      {
        id: 2,
        title: "Complete Lifecycle",
        description: "Full API lifecycle from design to retirement with auto-generated documentation, SDKs, testing, monitoring, and scalable deployment."
      },
      {
        id: 3,
        title: "Enterprise Integration",
        description: "9x faster API development with built-in security filters, business logic functions, and 600% ROI through automation."
      }
    ],
    backgroundImage: "/bg-product.png",
    brochureUrl: "#",
    whitepaperUrl: "#"
  };

  return <ProductDetailLayout2 {...productData} />;
}
