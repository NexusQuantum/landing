import React from 'react';
import ProductDetailLayout1 from '@/components/sections/ProductDetailLayout1';

export default function ProductDetailMainPage() {
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
        productTitle="Main Product Details"
        description="Complete quantum-resistant security solution for enterprise applications"
        benefits={benefits}
      />
    </div>
  );
}





