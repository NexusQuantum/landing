import ProductDetailLayout1 from '@/components/sections/ProductDetailLayout1';

export default function NQRustEnclavePage() {
  const productData = {
    productName: "NQRust",
    productTitle: "Enclave",
    description: "Delivers hardware-backed confidential computing by unifying support for AMD SEV-SNP, Intel TDX, and NVIDIA H100 CC. It features minimal overhead and fast boot times.",
    benefits: [
      {
        id: 1,
        title: "Confidential Computing",
        description: "Unified TEEs supporting AMD SEV-SNP, Intel TDX, NVIDIA H100 CC with less than 125ms boot times."
      },
      {
        id: 2,
        title: "Minimal Overhead",
        description: "2-5% performance overhead typical, achieving up to 99% native throughput on analytics and 96-99% on AI/ML."
      },
      {
        id: 3,
        title: "Multi-Party Execution",
        description: "Hardware-backed remote attestation and key binding enabling secure collaboration without data exposure."
      }
    ],
    backgroundImage: "/bg-product.png",
    brochureUrl: "#",
    whitepaperUrl: "#"
  };

  return <ProductDetailLayout1 {...productData} />;
}
