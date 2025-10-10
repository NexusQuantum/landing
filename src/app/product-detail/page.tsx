import React from 'react';
import ProductDetailLayout1 from '@/components/sections/ProductDetailLayout1';

export default function ProductDetailPage() {
  const benefits = [
    {
      id: 1,
      title: "Quantum-Safe Security",
      description: "Advanced post-quantum cryptography ensures your data remains secure even against future quantum computing threats."
    },
    {
      id: 2,
      title: "High Performance",
      description: "Built with Rust for maximum performance and reliability in mission-critical applications."
    },
    {
      id: 3,
      title: "Easy Integration",
      description: "Seamlessly integrate quantum-resistant security into your existing infrastructure with our comprehensive APIs."
    }
  ];

  return (
    <div className="min-h-screen">
      <ProductDetailLayout1
        productName="NQRust"
        productTitle="Quantum-Safe Cryptography"
        description="Next-generation security solutions built for the quantum era"
        benefits={benefits}
      />
    </div>
  );
}





