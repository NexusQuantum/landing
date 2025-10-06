import ProductDetailLayout2 from '@/components/sections/ProductDetailLayout2';

export default function NQRustIdentityPage() {
  const productData = {
    productName: "NQRust",
    productTitle: "Identity",
    description: "Provides Universal Single Sign-On (SSO) across applications with compliance to OAuth 2.0, OpenID Connect, and SAML. It offers 6x faster authentication integration.",
    benefits: [
      {
        id: 1,
        title: "Universal SSO",
        description: "Single Sign-On across applications with Active Directory, LDAP, social logins (Google, Facebook) and AWS IAM policy compatibility."
      },
      {
        id: 2,
        title: "Security Standards",
        description: "OAuth 2.0, OpenID Connect, SAML protocols with SOC2, GDPR, HIPAA compliance and multi-factor authentication support."
      },
      {
        id: 3,
        title: "Developer Productivity",
        description: "6x faster authentication integration with ready-to-use UI and 300% ROI through reduced development overhead."
      }
    ],
    backgroundImage: "/bg-product.png"
  };

  return <ProductDetailLayout2 {...productData} />;
}
