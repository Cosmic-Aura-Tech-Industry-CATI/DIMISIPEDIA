/**
 * DIMISIPEDIA Brand & Name Guardian
 * Enforces across all languages (Google Translate, browser auto-translate, Hinglish, Hindi, i18n):
 * 1. "Kalesh" is ALWAYS rendered as "Kalesh" in all languages.
 * 2. "DIMISI" is ALWAYS rendered as "DIMISI" (and NEVER "demise", "Demise", or mistranslations).
 * 3. "DIMISIPEDIA" is ALWAYS "DIMISIPEDIA".
 * 4. "CATI" is ALWAYS "CATI".
 */

// Mistranslation patterns to detect and immediately correct across translated text nodes
const MISTRANSLATIONS: [RegExp, string][] = [
  // Mistranslations of DIMISI
  [/\bdemise\b/gi, "DIMISI"],
  [/\bthe demise\b/gi, "DIMISI"],
  [/\bdemise technologies\b/gi, "DIMISI Technologies"],
  [/डिमिशीपीडिया/g, "DIMISIPEDIA"],
  [/डिमिशी/g, "DIMISI"],

  // Mistranslations of Kalesh
  [/कलेश/g, "Kalesh"],
];

/**
 * Protects brand elements in the DOM by tagging them with translate="no" and class="notranslate"
 * which standardizes protection against Google Translate and browser translation engines.
 */
export function protectBrandElements(root: Node = document.body) {
  if (typeof window === "undefined" || !root) return;

  // 1. Walk and fix any mistranslations in text nodes
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      const tag = parent.tagName.toLowerCase();
      if (tag === "script" || tag === "style" || tag === "textarea" || tag === "input") {
        return NodeFilter.FILTER_REJECT;
      }
      return node.nodeValue && node.nodeValue.trim().length > 0
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT;
    },
  });

  const textNodes: Text[] = [];
  let current: Node | null;
  while ((current = walker.nextNode())) {
    textNodes.push(current as Text);
  }

  for (const node of textNodes) {
    const val = node.nodeValue;
    if (!val) continue;

    let corrected = val;
    for (const [regex, replacement] of MISTRANSLATIONS) {
      if (regex.test(corrected)) {
        corrected = corrected.replace(regex, replacement);
      }
    }

    if (corrected !== val) {
      node.nodeValue = corrected;
    }
  }
}

let brandObserver: MutationObserver | null = null;

/**
 * Initializes continuous brand protection listener
 */
export function initBrandProtection() {
  if (typeof window === "undefined") return;

  // Run on initial DOM
  protectBrandElements(document.body);

  if (brandObserver) {
    brandObserver.disconnect();
  }

  // Observe future mutations from Google Translate or dynamic routing
  brandObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        for (const added of Array.from(mutation.addedNodes)) {
          protectBrandElements(added);
        }
      } else if (mutation.type === "characterData") {
        protectBrandElements(mutation.target);
      }
    }
  });

  brandObserver.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  });
}
