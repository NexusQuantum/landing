import React from 'react';
import ProductDetailLayout2 from '@/components/sections/ProductDetailLayout2';

export default function ProductDetail2Page() {
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
      <ProductDetailLayout2
        productName="NQRust"
        productTitle="Advanced Security Solutions"
        description="Enterprise-grade quantum-resistant cryptography for modern applications"
        benefits={benefits}
      />
    </div>
  );
}





