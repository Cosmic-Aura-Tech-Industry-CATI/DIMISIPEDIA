/**
 * DIMISIPEDIA Hinglish Engine
 * Full-website dynamic translation engine for Romanized conversational Indian tech Hindi (देसी टेक / Hinglish).
 */

const DICTIONARY: Record<string, string> = {
  // Navigation & Branding
  "DIMISIPEDIA": "DIMISIPEDIA",
  "Knowledge Encyclopedia": "Gyaan Aur Facts Ka Digital Encyclopedia",
  "The Knowledge Encyclopedia of DIMISI Technologies": "DIMISI Technologies Ka Official Knowledge Encyclopedia",
  "Explore": "Explore",
  "Journey": "Hamara Safar",
  "People": "Founders & Team",
  "Organizations": "Organizations",
  "Projects": "Projects & Apps",
  "Technology": "Tech Stack",
  "Timeline": "Timeline",
  "Events": "Events & Milestones",
  "Articles": "Articles",
  "Sources": "Sources & Evidence",
  "Methodology": "Verification Methodology",
  "Our Journey": "Hamara Safar",
  "About": "DIMISIPEDIA Ke Baare Me",
  "Editorial Policy": "Editorial Policy",
  "Credibility Standards": "Credibility Standards",
  "Sources Registry": "Sources Registry",
  "DIMISI Technologies": "DIMISI Technologies",
  "Privacy": "Privacy Policy",
  "Terms": "Terms of Use",
  "Designed & Developed By": "Design Aur Develop Kiya Gaya Hai",
  "Operated by DIMISI Technologies Pvt. Ltd. · Kanpur, Uttar Pradesh, India": "DIMISI Technologies Pvt. Ltd. Dwara Sanchalit · Kanpur, UP, India",
  "Reading Language & Translation": "Reading Language Aur Bhasha Chunein",

  // Common UI Controls
  "Search DIMISIPEDIA": "DIMISIPEDIA Par Kuch Bhi Search Karein...",
  "Key Summary": "Quick Summary Aur Main Points",
  "Contents": "Is Page Par Kya Hai (Contents)",
  "Frequently Asked Questions": "Zaroori Sawaal Aur Unke Jawaab (FAQs)",
  "References & evidence": "Official Saboot Aur References",
  "Information coverage": "Coverage Aur Reliability Score",
  "Related Entities": "Jude Huye Founders Aur Projects",
  "Last Updated": "Aakhri Baar Update Hua",
  "Verified": "Verified / 100% Sach",
  "Sourced": "Sourced / Documented",
  "Active": "Chalu / Active",
  "Inactive": "Band / Inactive",
  "Canonical Record": "Official MCA Record",
  "Confidence Score": "Fact Check Score",
  "Download JSON": "JSON Download Karein",
  "Copy Citation": "Citation Copy Karein",
  "Cite": "Cite Karein",
  "Share": "Share Karein",
  "Back to Top": "Upar Jayein",
  "Overview": "Overview Aur Parichay",
  "Key Takeaways": "Main Points Aur Seekh",
  "Chronological Phases": "Safar Ke 10 Main Phases",
  "Founder's Chronicle": "Founder Ki Zubani",

  // Core Bio & Entity Descriptions
  "Shikhar Dixit is an Indian technology entrepreneur, software architect, and the Founder & Chief Executive Officer of DIMISI Technologies Private Limited.":
    "Shikhar Dixit ek Indian tech entrepreneur, software architect aur DIMISI Technologies Private Limited ke Founder & CEO hain.",
  "Swatantra Singh is an Indian technology entrepreneur, operations strategist, and Co-Founder & Chief Operating Officer of DIMISI Technologies Private Limited.":
    "Swatantra Singh ek Indian tech entrepreneur aur DIMISI Technologies Private Limited ke Co-Founder & COO hain.",
  "Nishkarsh Mishra is an Indian software engineer, strategic director, and Co-Founder & Chief Strategy Officer of DIMISI Technologies Private Limited.":
    "Nishkarsh Mishra ek Indian software engineer aur DIMISI Technologies Private Limited ke Co-Founder & Chief Strategy Officer hain.",
  "DIMISI Technologies Private Limited is an Indian technology and software enterprise founded in Kanpur, Uttar Pradesh.":
    "DIMISI Technologies Private Limited ek Indian software aur IT company hai jise Kanpur, Uttar Pradesh me shuru kiya gaya.",
  "The Founding Brotherhood: Shikhar Dixit, Nishkarsh Mishra & Swatantra Singh":
    "The Founding Brotherhood: Shikhar, Nishkarsh Aur Swatantra Ki Dosti Aur Safar",
  "From a six-hour home engineering sprint for Axis College's Gandhigiri technical project presentation event to CATI, Kalesh, the Sinister Six, incorporation, and DIMISIPEDIA — an unfiltered personal narrative.":
    "Ghar par 6 ghante me bane Face Recognition project se lekar CATI, Kalesh, Sinister Six, MCA incorporation aur DIMISIPEDIA tak — ek sachhi unfiltered kahani.",
  "Meet the Team": "Founding Team Se Miliye",
  "Explore DIMISI Technologies": "DIMISI Technologies Ke Baare Me Dekhein",
  "View Technical Timeline": "Tech Timeline Dekhein",

  // Roles & Metadata
  "Founder & CEO": "Founder & Chief Executive Officer",
  "Co-Founder & COO": "Co-Founder & Chief Operating Officer",
  "Co-Founder & CSO": "Co-Founder & Chief Strategy Officer",
  "Incorporation Date": "Company Registration Date",
  "Corporate Identification Number (CIN)": "Corporate ID Number (CIN)",
  "Headquarters": "Main Office (Headquarters)",
  "Primary Technology Stack": "Main Tech Stack Aur Frameworks",
};

/** Phrases to replace dynamically inside sentences */
const SUBSTRINGS: [RegExp, string][] = [
  [/is an Indian technology entrepreneur/gi, "ek Indian tech entrepreneur hain"],
  [/founded in/gi, "shuru hua"],
  [/Co-Founder & Chief Operating Officer/gi, "Co-Founder aur COO"],
  [/Co-Founder & Chief Strategy Officer/gi, "Co-Founder aur Chief Strategy Officer"],
  [/Founder & Chief Executive Officer/gi, "Founder aur CEO"],
  [/Frequently Asked Questions/gi, "Aksar Pooche Jane Wale Sawaal (FAQs)"],
  [/Primary Evidence/gi, "Asli Saboot Aur Records"],
  [/Key Achievements/gi, "Main Uplabdhiyan Aur Milestones"],
  [/Early Life & Background/gi, "Early Life Aur Shuruati Background"],
  [/Career & Ventures/gi, "Career Aur Startups"],
  [/Related Entities/gi, "Jude Huye Projects Aur Log"],
  [/Verification Methodology/gi, "Verification Methodology"],
  [/Documented/gi, "Documented / Record Me Darj"],
];

let observer: MutationObserver | null = null;
let originalNodes = new WeakMap<Node, string>();

/** Translate a single text string into Hinglish */
export function translateToHinglishText(text: string): string {
  const trimmed = text.trim();
  if (DICTIONARY[trimmed]) {
    return text.replace(trimmed, DICTIONARY[trimmed]);
  }

  let result = text;
  for (const [regex, replacement] of SUBSTRINGS) {
    if (regex.test(result)) {
      result = result.replace(regex, replacement);
    }
  }
  return result;
}

/** Translate all text nodes inside a DOM tree to Hinglish */
export function applyHinglishToDOM(root: Node = document.body) {
  if (typeof window === "undefined" || !root) return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      const tag = parent.tagName.toLowerCase();
      if (
        tag === "script" ||
        tag === "style" ||
        tag === "code" ||
        tag === "pre" ||
        parent.isContentEditable ||
        parent.closest(".notranslate") ||
        parent.closest("#google_translate_element")
      ) {
        return NodeFilter.FILTER_REJECT;
      }
      return node.nodeValue && node.nodeValue.trim().length > 0
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT;
    },
  });

  const nodes: Text[] = [];
  let current: Node | null;
  while ((current = walker.nextNode())) {
    nodes.push(current as Text);
  }

  for (const node of nodes) {
    const val = node.nodeValue;
    if (!val) continue;
    if (!originalNodes.has(node)) {
      originalNodes.set(node, val);
    }
    const translated = translateToHinglishText(val);
    if (translated !== val) {
      node.nodeValue = translated;
    }
  }
}

/** Restore original text nodes when switching away from Hinglish */
export function restoreOriginalDOM(root: Node = document.body) {
  if (typeof window === "undefined" || !root) return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let current: Node | null;
  while ((current = walker.nextNode())) {
    if (originalNodes.has(current)) {
      const orig = originalNodes.get(current);
      if (orig !== undefined && current.nodeValue !== orig) {
        current.nodeValue = orig;
      }
    }
  }
}

/** Activates or deactivates the whole-website Hinglish Translation observer */
export function setHinglishActive(active: boolean) {
  if (typeof window === "undefined") return;

  if (observer) {
    observer.disconnect();
    observer = null;
  }

  if (active) {
    applyHinglishToDOM();

    // Observe future DOM changes (route navigations, dynamic content renders)
    observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const added of Array.from(mutation.addedNodes)) {
          applyHinglishToDOM(added);
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  } else {
    restoreOriginalDOM();
  }
}
