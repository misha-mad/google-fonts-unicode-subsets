/**
 * Convert kebab-case to SCREAMING_SNAKE_CASE
 */
export function toConstName(subset: string): string {
  return subset.toUpperCase().replace(/-/g, "_");
}
