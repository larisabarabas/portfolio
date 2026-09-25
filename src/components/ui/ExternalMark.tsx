// Appended to links that open in a new tab: a visible ↗ for sighted users and
// a spoken hint for screen readers, so the new tab isn't a surprise.
export function ExternalMark() {
  return (
    <>
      <span aria-hidden="true"> ↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </>
  );
}
