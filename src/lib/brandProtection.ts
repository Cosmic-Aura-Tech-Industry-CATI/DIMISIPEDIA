/**
 * Brand protection utilities.
 *
 * NOTE: Active DOM TreeWalker / MutationObserver node modification has been
 * disabled to comply with Google Safe Browsing and search security policies.
 * Standard HTML5 `translate="no"` and `class="notranslate"` attributes are used
 * statically in components instead.
 */

export function protectBrandElements(_root?: Node): void {
  // No-op: replaced with static translate="no" HTML attributes to prevent cloaking heuristics
}

export function initBrandProtection(): void {
  // No-op: active DOM manipulation removed for security compliance
}
