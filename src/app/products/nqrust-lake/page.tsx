import ProductDetailLayout1 from '@/components/sections/ProductDetailLayout1';

export default function NQRustLakePage() {
  const productData = {
    productName: "NQRust",
    productTitle: "Lake",
    description: "A data lake solution focused on cost leadership with Rust-native performance optimization, delivering 60% lower TCO and protecting customers from vendor lock-in.",
    benefits: [
      {
        id: 1,
        title: "Cost Leadership",
        description: "60% lower TCO versus traditional solutions with 600% ROI scenarios through Rust-native performance optimization."
      },
      {
        id: 2,
        title: "Open Standards",
        description: "Columnar acceleration with governance, caching, and open formats providing vendor lock-in protection."
      },
      {
        id: 3,
        title: "Strategic Positioning",
        description: "Performance-vs-cost sweet spot versus Spark, Snowflake, Databricks, and ClickHouse with proven enterprise scale."
      }
    ],
    backgroundImage: "/bg-product.png",
    brochureUrl: "#",
    whitepaperUrl: "#"
  };

  return <ProductDetailLayout1 {...productData} />;
}
