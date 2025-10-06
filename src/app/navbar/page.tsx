'use client';

import Navbar from '@/components/layout/Navbar';

export default function NavbarPage() {
  return (
    <div className="min-h-screen">
      {/* Navbar Component */}
      <Navbar />
      
      {/* Hero Section - untuk test floating behavior */}
      <section className="min-h-screen flex items-center justify-center animated-bg">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h1 className="text-h4 font-bold mb-6">
            <span className="gradient-text">Navbar Demo</span>
          </h1>
          <p className="text-body-large text-gray-300 mb-8">
            Scroll ke bawah untuk melihat perubahan navbar dari floating ke full width
          </p>
          <div className="glass rounded-2xl p-8">
            <h2 className="text-h2 font-bold text-white mb-4">Scroll Behavior</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="text-h1 font-semibold text-white mb-3">🔝 Top Position (Floating)</h3>
                <ul className="text-gray-300 space-y-2 text-body-small">
                  <li>• Rounded corners (rounded-xl)</li>
                  <li>• Margin dari edges (mx-4 mt-4)</li>
                  <li>• Glass-strong effect dengan backdrop-blur-xl</li>
                  <li>• Border white/20 dengan glassmorphism</li>
                  <li>• 70px horizontal padding (desktop)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-h1 font-semibold text-white mb-3">📜 Scrolled (Full Width)</h3>
                <ul className="text-gray-300 space-y-2 text-body-small">
                  <li>• No rounded corners</li>
                  <li>• Full width (mx-0 mt-0)</li>
                  <li>• Glass effect dengan backdrop-blur-lg</li>
                  <li>• Border-b white/10 dengan glassmorphism</li>
                  <li>• Same padding structure</li>
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
            <h2 className="text-h3 font-bold text-white mb-6">Scroll Test Section 1</h2>
            <p className="text-gray-300 mb-6">
              Scroll ke bawah untuk melihat navbar berubah dari floating ke full width. 
              Navbar akan berubah saat scroll melebihi 100px dari atas.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-subtle rounded-xl p-6">
                <h3 className="text-h1 font-semibold text-white mb-3">Feature 1</h3>
                <p className="text-gray-300 text-body-small">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div className="glass-subtle rounded-xl p-6">
                <h3 className="text-h1 font-semibold text-white mb-3">Feature 2</h3>
                <p className="text-gray-300 text-body-small">Sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
              </div>
              <div className="glass-subtle rounded-xl p-6">
                <h3 className="text-h1 font-semibold text-white mb-3">Feature 3</h3>
                <p className="text-gray-300 text-body-small">Ut enim ad minim veniam, quis nostrud exercitation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="glass rounded-2xl p-8 mb-8">
            <h2 className="text-h3 font-bold text-white mb-6">Scroll Test Section 2</h2>
            <p className="text-gray-300 mb-6">
              Navbar sekarang sudah full width dan menempel di atas halaman. 
              Scroll ke atas untuk melihat navbar kembali ke floating state.
            </p>
            <div className="space-y-6">
              <div className="glass-subtle rounded-xl p-6">
                <h3 className="text-h1 font-semibold text-white mb-3">Implementation Details</h3>
                <ul className="text-gray-300 space-y-2 text-body-small">
                  <li>• Scroll threshold: 100px</li>
                  <li>• Smooth transitions dengan duration-300</li>
                  <li>• Conditional classes berdasarkan scroll state</li>
                  <li>• Glassmorphism effects applied</li>
                  <li>• Responsive design untuk mobile</li>
                  <li>• TypeScript interfaces</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="glass rounded-2xl p-8 mb-8">
            <h2 className="text-h3 font-bold text-white mb-6">Scroll Test Section 3</h2>
            <p className="text-gray-300 mb-6">
              Navbar component sudah siap untuk design Figma. 
              Struktur dan logic scroll detection sudah berfungsi dengan baik.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-subtle rounded-xl p-6">
                <h3 className="text-h1 font-semibold text-white mb-3">Ready for Figma</h3>
                <ul className="text-gray-300 space-y-2 text-body-small">
                  <li>• Component structure ready</li>
                  <li>• Scroll detection working</li>
                  <li>• Conditional styling implemented</li>
                  <li>• Glassmorphism effects applied</li>
                  <li>• Responsive behavior</li>
                </ul>
              </div>
              <div className="glass-subtle rounded-xl p-6">
                <h3 className="text-h1 font-semibold text-white mb-3">Next Steps</h3>
                <ul className="text-gray-300 space-y-2 text-body-small">
                  <li>✅ Figma navbar design implemented</li>
                  <li>✅ Design tokens extracted</li>
                  <li>✅ Glassmorphism effects applied</li>
                  <li>✅ Navigation links dengan hover effects</li>
                  <li>✅ Mobile menu dengan glassmorphism</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Extra content untuk test scroll lebih jauh */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="glass rounded-2xl p-8">
            <h2 className="text-h3 font-bold text-white mb-6">Final Test Section</h2>
            <p className="text-gray-300 mb-6">
              Scroll ke atas untuk melihat navbar kembali ke floating state di hero section.
            </p>
            <div className="text-center">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                Scroll to Top
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
