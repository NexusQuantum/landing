import ProductDetailLayout2 from '@/components/sections/ProductDetailLayout2';

export default function NQRustAIAppliancePage() {
  const productData = {
    productName: "NQRust",
    productTitle: "AI Appliance",
    description: "A turnkey, pre-integrated rack solution featuring up to 16x H100 SXM5 GPUs. It offers sub-24 hour deployment and high performance, beating DIY solutions.",
    benefits: [
      {
        id: 1,
        title: "Turnkey Solution",
        description: "Pre-integrated rack with up to 16x H100 SXM5, shipping complete with security, attestation, and software stack."
      },
      {
        id: 2,
        title: "Rapid Deployment",
        description: "Less than 24 hour deployment with multi-year TCO beating DIY/DGX solutions and up to 600% ROI by year-3."
      },
      {
        id: 3,
        title: "Enterprise Performance",
        description: "LLAMA-3 70B training in 3 days, TTFT 30-60ms for large models, 90% GPU utilization."
      }
    ],
    backgroundImage: "/bg-product.png"
  };

  return <ProductDetailLayout2 {...productData} />;
}
