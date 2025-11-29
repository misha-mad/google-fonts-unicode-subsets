/**
 * Convert kebab-case to Title Case
 */
export function toDisplayName(subset: string): string {
  return subset
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
