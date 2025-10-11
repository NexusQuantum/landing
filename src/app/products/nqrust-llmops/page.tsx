import ProductDetailLayout2 from '@/components/sections/ProductDetailLayout2';

export default function NQRustLLMOpsPage() {
  const productData = {
    productName: "NQRust",
    productTitle: "LLMOps",
    description: "An end-to-end pipeline solution that achieves 6x faster AI training and 60% lower infrastructure costs through GPU-efficient scheduling. It features a rapid 30-day implementation program.",
    benefits: [
      {
        id: 1,
        title: "Training Acceleration",
        description: "6x faster training and 60% lower AI infrastructure costs through GPU-efficient scheduling and optimization."
      },
      {
        id: 2,
        title: "Complete Pipeline",
        description: "End-to-end training, fine-tuning, evals, guardrails, and serving with enterprise SDKs and open formats."
      },
      {
        id: 3,
        title: "Rapid Implementation",
        description: "30-day program from install through fine-tune, integrate, to production with comprehensive model profiles."
      }
    ],
    backgroundImage: "/bg-product.png",
    brochureUrl: "#",
    whitepaperUrl: "#"
  };

  return <ProductDetailLayout2 {...productData} />;
}
