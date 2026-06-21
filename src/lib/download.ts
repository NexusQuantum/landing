/**
 * Download a file by fetching it first (to verify it exists), then triggering
 * a browser download via a temporary anchor element. Falls back to opening the
 * URL in a new tab when the fetch fails or throws.
 *
 * Shared by product pages and product-detail layouts so the blob/anchor logic
 * lives in a single place.
 */
export async function triggerDownload(url: string, fileName?: string): Promise<void> {
  const resolvedName = fileName || url.split('/').pop() || 'download.pdf';

  try {
    const response = await fetch(url);
    if (response.ok) {
      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = resolvedName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(objectUrl);
    } else {
      window.open(url, '_blank');
    }
  } catch (error) {
    console.error('Download failed:', error);
    window.open(url, '_blank');
  }
}
