/**
 * Create dates relative to a reference point
 */
export function createRelativeDates(referenceDate = new Date()) {
  return {
    past: new Date(referenceDate.getTime() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    now: referenceDate,
    future: new Date(referenceDate.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days ahead
    yesterday: new Date(referenceDate.getTime() - 24 * 60 * 60 * 1000),
    tomorrow: new Date(referenceDate.getTime() + 24 * 60 * 60 * 1000)
  };
}
