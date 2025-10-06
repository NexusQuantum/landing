import ProductDetailLayout1 from '@/components/sections/ProductDetailLayout1';

export default function NQRustSecureGPUPage() {
  const productData = {
    productName: "NQRust",
    productTitle: "SecureGPU",
    description: "Maximizes hardware ROI by offering multi-tenant GPU slicing (MIG/SR-IOV-class) with live migration. Achieves 90% GPU utilization for rapid transformation.",
    benefits: [
      {
        id: 1,
        title: "Multi-Tenant Slicing",
        description: "MIG/SR-IOV-class GPU partitioning with fair-share scheduling and live migration, maximizing hardware utilization and ROI."
      },
      {
        id: 2,
        title: "Performance Excellence",
        description: "Customer cases show sub-30ms fraud scoring, 90% average GPU utilization versus industry standard 30%."
      },
      {
        id: 3,
        title: "Rapid Transformation",
        description: "Automated 30-day GPU optimization program from discovery through MIG layout to production cutover."
      }
    ],
    backgroundImage: "/bg-product.png",
    brochureUrl: "#",
    whitepaperUrl: "#"
  };

  return <ProductDetailLayout1 {...productData} />;
}
