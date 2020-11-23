export function getAssetURL(url: string, blockId: string): string {
  return `/api/asset?assetUrl=${encodeURIComponent(
    url as any,
  )}&blockId=${blockId}`;
}
