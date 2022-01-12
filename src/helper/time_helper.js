export function getLastUpdated(timestamp) {
  const time = new Date(timestamp).toTimeString().slice(3, 9);

  return time;
}
