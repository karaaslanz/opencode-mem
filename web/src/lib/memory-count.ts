export function getDisplayedMemoryCount(
  isSearching: boolean,
  tagFilterActive: boolean,
  resultTotal: number,
  storeTotal: number
): number {
  return isSearching || tagFilterActive ? resultTotal : storeTotal;
}
