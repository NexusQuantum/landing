'use client';

import Footer from '@/components/layout/Footer';

export default function FooterPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section untuk test footer */}
      <section className="min-h-screen flex items-center justify-center animated-bg">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h1 className="text-h4 font-bold mb-6">
            <span className="gradient-text">Footer Demo</span>
          </h1>
          <p className="text-body-large text-gray-300 mb-8">
            Scroll ke bawah untuk melihat Footer component responsive
          </p>
          <div className="glass rounded-2xl p-8">
            <h2 className="text-h2 font-bold text-white mb-4">Footer Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="text-h1 font-semibold text-white mb-3">🎨 Design System</h3>
                <ul className="text-gray-300 space-y-2 text-body-small">
                  <li>• Menggunakan design system colors yang sudah dibuat</li>
                  <li>• Typography system dengan Montserrat font</li>
                  <li>• Responsive layout untuk mobile dan desktop</li>
                  <li>• Consistent dengan komponen lainnya</li>
                </ul>
              </div>
              <div>
                <h3 className="text-h1 font-semibold text-white mb-3">📱 Responsive Layout</h3>
                <ul className="text-gray-300 space-y-2 text-body-small">
                  <li>• Desktop: 3 kolom layout (Products, Sitemap, Follow Us)</li>
                  <li>• Mobile: Stacked layout dengan proper spacing</li>
                  <li>• CTA section dengan button Start Free Trial</li>
                  <li>• Social media icons dan legal links</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections untuk test scroll */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="glass rounded-2xl p-8 mb-8">
            <h2 className="text-h3 font-bold text-white mb-6">Footer Implementation</h2>
            <p className="text-gray-300 mb-6 text-body-medium">
              Footer component sudah diimplementasi sesuai dengan design Figma dengan fitur-fitur berikut:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-subtle rounded-xl p-6">
                <h3 className="text-h1 font-semibold text-white mb-3">CTA Section</h3>
                <ul className="text-gray-300 space-y-2 text-body-small">
                  <li>• Background orange (#F26522)</li>
                  <li>• Text "AGENTIC AI DATA CENTER"</li>
                  <li>• Button "Start Free Trial" dengan icon</li>
                  <li>• Responsive padding</li>
                </ul>
              </div>
              <div className="glass-subtle rounded-xl p-6">
                <h3 className="text-h1 font-semibold text-white mb-3">Products Grid</h3>
                <ul className="text-gray-300 space-y-2 text-body-small">
                  <li>• 2 kolom grid layout</li>
                  <li>• 11 produk NQRust</li>
                  <li>• Hover effects</li>
                  <li>• Consistent typography</li>
                </ul>
              </div>
              <div className="glass-subtle rounded-xl p-6">
                <h3 className="text-h1 font-semibold text-white mb-3">Navigation & Social</h3>
                <ul className="text-gray-300 space-y-2 text-body-small">
                  <li>• Sitemap links (6 items)</li>
                  <li>• Social media icons (4 platforms)</li>
                  <li>• Legal links (3 items)</li>
                  <li>• Copyright notice</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="glass rounded-2xl p-8 mb-8">
            <h2 className="text-h3 font-bold text-white mb-6">Design System Integration</h2>
            <p className="text-gray-300 mb-6 text-body-medium">
              Footer menggunakan design system yang sudah dibuat sebelumnya:
            </p>
            <div className="space-y-6">
              <div className="glass-subtle rounded-xl p-6">
                <h3 className="text-h1 font-semibold text-white mb-3">Colors</h3>
                <ul className="text-gray-300 space-y-2 text-body-small">
                  <li>• Primary Dark 1 (#F26522) untuk CTA background</li>
                  <li>• Primary Dark 3 (#551D00) untuk main background</li>
                  <li>• Light (#FFFEFD) untuk button background</li>
                  <li>• White untuk text dan icons</li>
                </ul>
              </div>
              <div className="glass-subtle rounded-xl p-6">
                <h3 className="text-h1 font-semibold text-white mb-3">Typography</h3>
                <ul className="text-gray-300 space-y-2 text-body-small">
                  <li>• Body Large (18px) untuk headings</li>
                  <li>• Body Small (14px) untuk links dan text</li>
                  <li>• Montserrat font family</li>
                  <li>• Proper font weights (Medium, SemiBold)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Extra content untuk test scroll ke footer */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="glass rounded-2xl p-8">
            <h2 className="text-h3 font-bold text-white mb-6">Scroll to Footer</h2>
            <p className="text-gray-300 mb-6 text-body-medium">
              Scroll ke bawah untuk melihat Footer component yang sudah diimplementasi.
            </p>
            <div className="text-center">
              <button 
                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                Scroll to Footer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}

