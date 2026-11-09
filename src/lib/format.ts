export function formatVideoCount(count: number): string {
  return `${count} ${count === 1 ? 'video' : 'videos'}`;
}
