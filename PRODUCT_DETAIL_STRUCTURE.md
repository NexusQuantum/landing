# Dokumentasi Struktur Product Detail Layout 1 & 2

## 📋 ProductDetailLayout1

### Props yang Diterima:
```typescript
{
  productName: string;        // Nama produk (contoh: "NQRust")
  productTitle: string;       // Judul produk (contoh: "HV Hypervisor")
  description: string;        // Deskripsi produk
  benefits: Benefit[];        // Array benefit dengan {id, title, description}
  backgroundImage?: string;   // URL gambar background (default: "/bg-product.png")
  brochureUrl?: string;       // URL brochure (default: "#")
  whitepaperUrl?: string;     // URL whitepaper (default: "#")
}
```

### Struktur Konten (Urutan dari atas ke bawah):

#### 1. **Navbar** (Line 170)
- Komponen Navbar standar

#### 2. **Hero Section** (Line 172-204)
- **Background**: 
  - Image dengan opacity 30%
  - Overlay hitam 80%
  - Height: 415px
- **Content** (LiquidGlassCard):
  - **Title**: 
    - "NQRust" (gradient orange)
    - `{productTitle}` (putih)
    - Font: 54px (desktop), 3xl-4xl (mobile)
  - **Description**: 
    - Text putih
    - Font: 18px (desktop), base-lg (mobile)
  - **Tidak ada buttons** di hero section

#### 3. **About Section** (Line 206-213)
- **Komponen**: `<AboutSection />`
- **Props**:
  - `title`: "About / {productTitle}"
  - `description`: {description}
  - `brochureUrl`: {actualBrochureUrl}
  - `whitepaperUrl`: {actualWhitepaperUrl}
  - `productTitle`: {productTitle}
- **Konten**:
  - Background: `#ffdece` (peach)
  - Layout 2 kolom:
    - **Kiri**: Title, Description, 2 Buttons (Get Brochure & Whitepaper)
    - **Kanan**: Image product illustration
  - **Buttons**: Download functionality dengan loading states

#### 4. **Product Details Section (Benefit Section)** (Line 215-269)
- **Background**: `#fffefd` (putih)
- **Layout 3 kolom**:
  - **Kolom 1 (Kiri)**: 
    - Title "Benefit {productTitle}"
    - Font: 43px (desktop), 20-32px (mobile)
    - Warna: `#ff5001` (orange)
    - Width: 279px (desktop)
  
  - **Kolom 2 (Tengah)**: 
    - Sidebar menu dengan benefit items
    - Width: 336px (desktop)
    - Setiap item:
      - Nomor dalam lingkaran (aktif: orange, non-aktif: abu-abu)
      - Title benefit
      - Clickable untuk mengubah active benefit
  
  - **Kolom 3 (Kanan)**: 
    - Detail description benefit yang aktif
    - Width: 441px (desktop)
    - Menampilkan:
      - Title benefit aktif (font-medium, `#121212`)
      - Description benefit aktif (font-normal, `#3d3d3d`)

#### 5. **Footer** (Line 271-272)
- Komponen Footer standar

---

## 📋 ProductDetailLayout2

### Props yang Diterima:
```typescript
{
  productName: string;        // Nama produk
  productTitle: string;       // Judul produk
  description: string;        // Deskripsi produk
  benefits: Benefit[];        // Array benefit
  backgroundImage?: string;   // URL gambar background
  brochureUrl?: string;       // URL brochure
  whitepaperUrl?: string;     // URL whitepaper
}
```

### Struktur Konten (Urutan dari atas ke bawah):

#### 1. **Navbar** (Line 154)
- Komponen Navbar standar

#### 2. **Main Content with Background** (Line 157-344)
- **Background**: 
  - Fixed background image (full screen)
  - Overlay hitam 80%
  - Min-height: full screen

##### 2a. **Hero Section** (Line 172-241)
- **Content** (LiquidGlassCard dengan hover effect):
  - **Title**: 
    - "NQRust" (gradient orange)
    - `{productTitle}` (putih)
    - Font: 54px (desktop), 2xl-3xl (mobile)
  - **Description**: 
    - Text putih
    - Font: 18px (desktop), base-lg (mobile)
  - **Buttons** (2 buttons):
    - **Get Brochure**: 
      - Background: `#ff6b2b` (orange)
      - Hover: scale & shadow effect
      - Loading state dengan spinner
    - **Whitepaper**: 
      - Outline style (transparent bg, border orange)
      - Hover: fill dengan orange
      - Loading state dengan spinner

##### 2b. **Benefits Grid (About Section)** (Line 243-341)
- **Container**: Div dengan glass effect (tanpa hover)
- **Background**: Transparan dengan blur(18px)
- **Layout 2 kolom**:
  - **Kolom Kiri (654px desktop)**:
    - **Title**: "About / Tag Line Product"
      - Font: 24px (desktop), 20-22px (mobile)
      - Warna: `#ff5001` (orange)
    - **Description**: 
      - Text: `{description}`
      - Font: 16px (desktop), 14-15px (mobile)
      - Warna: `#fffefd` (putih)
    - **Buttons** (2 buttons):
      - **Get Brochure**: 
        - Background: `#f26522` (orange)
        - Hover: scale & color change
      - **Whitepaper**: 
        - Background: `#fffefd` (putih)
        - Border: orange
        - Hover: scale & bg change
  
  - **Kolom Kanan (399px desktop)**:
    - **Image**: Product illustration
    - Height: 287px (desktop), 200-260px (mobile)
    - Rounded corners: 10px
    - Fallback: `/bg-product.png` jika error

#### 3. **Benefit Section** (Line 346-400)
- **Background**: `#fffefd` (putih)
- **Layout 3 kolom** (SAMA dengan ProductDetailLayout1):
  - **Kolom 1 (Kiri)**: 
    - Title "Benefit {productTitle}"
    - Font: 43px (desktop), 20-32px (mobile)
    - Warna: `#ff5001` (orange)
    - Width: 279px (desktop)
  
  - **Kolom 2 (Tengah)**: 
    - Sidebar menu dengan benefit items
    - Width: 336px (desktop)
    - Interactive buttons untuk memilih benefit
  
  - **Kolom 3 (Kanan)**: 
    - Detail description benefit yang aktif
    - Width: 441px (desktop)

#### 4. **Footer** (Line 402)
- Komponen Footer standar

---

## 🔑 Perbedaan Utama:

### ProductDetailLayout1:
- ✅ **Ada About Section** (komponen terpisah dengan background peach)
- ✅ Hero section **TIDAK ada buttons**
- ✅ Background hero: putih dengan image overlay
- ✅ Layout lebih sederhana

### ProductDetailLayout2:
- ❌ **TIDAK ada About Section terpisah**
- ✅ Hero section **ADA buttons** (Get Brochure & Whitepaper)
- ✅ Background hero: hitam dengan image full screen
- ✅ **Benefits Grid** berfungsi sebagai About Section (dalam background hitam)
- ✅ Layout lebih kompleks dengan glass effects

---

## 📝 Mapping Files:

### Whitepaper Mapping:
- File disimpan di: `/Finalized Whitepaper/`
- Format: `[Nexus] NQRust-{ProductName} v{version}.pdf`

### Brochure Mapping:
- File disimpan di: `/Finalized Brochure/`
- Format: `[Nexus] Brochure NQRust-{ProductName} v{version}.pdf`

### Products dengan Whitepaper:
- AI Appliance, FleetMgr, HV Hypervisor, Lake, MicroVM, Storage, Edge, Identity, LLMOps, SecureGPU

### Products TANPA Whitepaper:
- Analytics, BPMN, Enclave, Guard, HV, Insight, ZeroCode

---

## 🎨 Styling Key Points:

### Colors:
- Primary Orange: `#ff5001`, `#f26522`, `#ff6b2b`
- Background Light: `#fffefd`, `#ffdece`
- Text Dark: `#121212`, `#3d3d3d`, `#888888`
- Text Light: `#fffefd`

### Typography:
- Font Family: Montserrat
- H3: 43px (desktop)
- H1: 24px
- Body Medium: 16px
- Body Small: 14px

### Spacing:
- Padding: `px-[100px]` (desktop), `px-4 sm:px-8` (mobile)
- Gap: `gap-[36px]` (desktop), `gap-6 sm:gap-8` (mobile)
- Max Width: `1128px` (container utama)

---

## 🔧 State Management:

### ProductDetailLayout1:
- `activeBenefit`: Index benefit yang aktif (default: 0)
- `isDownloading`: State untuk whitepaper download
- `isDownloadingBrochure`: State untuk brochure download

### ProductDetailLayout2:
- `activeBenefit`: Index benefit yang aktif (default: 0)
- `isDownloading`: State untuk whitepaper download
- `isDownloadingBrochure`: State untuk brochure download

---

## 📍 File Locations:

- **ProductDetailLayout1**: `src/components/sections/ProductDetailLayout1.tsx`
- **ProductDetailLayout2**: `src/components/sections/ProductDetailLayout2.tsx`
- **AboutSection**: `src/components/sections/about/AboutSection.tsx`


