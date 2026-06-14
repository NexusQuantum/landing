/** Brochure PDF filenames in public/Finalized Brochure/ */
export const BROCHURE_DIR = '/Finalized Brochure';

export const brochureMapping: Record<string, string> = {
  Analytics: '[Nexus] Brochure NQRust-Analytics v3.pdf',
  'Backup & Restore': '[Nexus] Brochure NQRust-Backup & Restore Brochure V1.pdf',
  HV: '[Nexus] Brochure NQRust-HyperVisor v2.pdf',
  'HV Hypervisor': '[Nexus] Brochure NQRust-HyperVisor v2.pdf',
  Hypervisor: '[Nexus] Brochure NQRust-HyperVisor v2.pdf',
  HyperVisor: '[Nexus] Brochure NQRust-HyperVisor v2.pdf',
  Identity: '[Nexus] Brochure NQRust-Identity v2.pdf',
  Kubernetes: '[Nexus] Brochure NQRust-K8s V1.pdf',
  K8s: '[Nexus] Brochure NQRust-K8s V1.pdf',
  MicroVM: '[Nexus] Brochure NQRust-MicroVM v2.pdf',
  Storage: '[Nexus] Brochure NQRust-Storage V1.pdf',
};

export function getBrochureUrl(productTitle: string): string | null {
  const fileName = brochureMapping[productTitle];
  if (!fileName?.trim()) return null;
  return `${BROCHURE_DIR}/${fileName}`;
}
