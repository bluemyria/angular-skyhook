export function snapToGrid(x, y) {
  const snappedX = Math.round(x / 128) * 128;
  const snappedY = Math.round(y / 32) * 32;

  return [snappedX, snappedY];
}
