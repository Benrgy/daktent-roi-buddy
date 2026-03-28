declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackPeterPenthouseClick(location: string) {
  window.gtag?.('event', 'affiliate_click', {
    event_category: 'Peter Penthouse',
    event_label: location,
    affiliate_partner: 'peter_penthouse',
    value: 2495,
  });
}
