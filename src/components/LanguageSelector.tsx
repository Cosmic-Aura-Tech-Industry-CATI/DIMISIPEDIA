import { useState, useEffect } from "react";
import { Check, ChevronDown, Sparkles } from "lucide-react";
import { setHinglishActive } from "@/lib/hinglishEngine";
import { protectBrandElements } from "@/lib/brandProtection";

export type LanguageOption =
  | "en"
  | "hinglish"
  | "hi"
  | "bn"
  | "mr"
  | "te"
  | "ta"
  | "gu"
  | "pa"
  | "es"
  | "fr"
  | "de"
  | "ja"
  | "ar"
  | "ru";

interface LangItem {
  id: LanguageOption;
  label: string;
  sub: string;
  flag: string;
  group: "featured" | "indian" | "global";
}

const languages: LangItem[] = [
  { id: "en", label: "English", sub: "Official / Global", flag: "🌐", group: "featured" },
  {
    id: "hinglish",
    label: "Hinglish",
    sub: "देसी टेक (Conversational)",
    flag: "🇮🇳",
    group: "featured",
  },
  { id: "hi", label: "हिन्दी", sub: "Hindi", flag: "🕉️", group: "featured" },

  // Indian Languages
  { id: "bn", label: "বাংলা", sub: "Bengali", flag: "🇮🇳", group: "indian" },
  { id: "mr", label: "मराठी", sub: "Marathi", flag: "🇮🇳", group: "indian" },
  { id: "te", label: "తెలుగు", sub: "Telugu", flag: "🇮🇳", group: "indian" },
  { id: "ta", label: "தமிழ்", sub: "Tamil", flag: "🇮🇳", group: "indian" },
  { id: "gu", label: "ગુજરાતી", sub: "Gujarati", flag: "🇮🇳", group: "indian" },
  { id: "pa", label: "ਪੰਜਾਬੀ", sub: "Punjabi", flag: "🇮🇳", group: "indian" },

  // Global Languages
  { id: "es", label: "Español", sub: "Spanish", flag: "🇪🇸", group: "global" },
  { id: "fr", label: "Français", sub: "French", flag: "🇫🇷", group: "global" },
  { id: "de", label: "Deutsch", sub: "German", flag: "🇩🇪", group: "global" },
  { id: "ja", label: "日本語", sub: "Japanese", flag: "🇯🇵", group: "global" },
  { id: "ar", label: "العربية", sub: "Arabic", flag: "🇸🇦", group: "global" },
  { id: "ru", label: "Русский", sub: "Russian", flag: "🇷🇺", group: "global" },
];

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: new (
          options: { pageLanguage: string; autoDisplay?: boolean; includedLanguages?: string },
          containerId: string,
        ) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

/** Helper to set cookies for Google Translate DOM bridge */
function setTranslateCookie(targetLang: string) {
  if (typeof document === "undefined") return;

  const cookieVal =
    targetLang === "en" || targetLang === "hinglish" ? "/en/en" : `/en/${targetLang}`;
  const hostname = window.location.hostname;

  document.cookie = `googtrans=${cookieVal}; path=/;`;
  document.cookie = `googtrans=${cookieVal}; path=/; domain=${hostname};`;
  if (hostname.includes(".")) {
    const rootDomain = hostname.split(".").slice(-2).join(".");
    document.cookie = `googtrans=${cookieVal}; path=/; domain=.${rootDomain};`;
  }
}

/** Injects Google Translate Element script if not already present */
function ensureTranslateScript() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  if (!document.getElementById("google-translate-script")) {
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en", autoDisplay: false },
          "google_translate_element",
        );
      }
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.type = "text/javascript";
    script.async = true;
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);
  }
}

export function useLanguage() {
  const [lang, setLang] = useState<LanguageOption>("en");

  useEffect(() => {
    const stored = (localStorage.getItem("dp-lang") as LanguageOption) || "en";
    setLang(stored);
    ensureTranslateScript();
    if (stored === "hinglish") {
      setHinglishActive(true);
    }

    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<LanguageOption>;
      if (customEvent.detail) {
        setLang(customEvent.detail);
        if (customEvent.detail === "hinglish") {
          setHinglishActive(true);
        } else {
          setHinglishActive(false);
        }
      }
    };

    window.addEventListener("dp-language-change", handler);
    return () => window.removeEventListener("dp-language-change", handler);
  }, []);

  const changeLanguage = (newLang: LanguageOption) => {
    setLang(newLang);
    localStorage.setItem("dp-lang", newLang);
    setTranslateCookie(newLang);

    if (newLang === "hinglish") {
      setHinglishActive(true);
    } else {
      setHinglishActive(false);
    }

    window.dispatchEvent(new CustomEvent("dp-language-change", { detail: newLang }));
    setTimeout(() => protectBrandElements(), 100);
    setTimeout(() => protectBrandElements(), 700);

    // Trigger Google Translate frame if target is not plain English
    if (newLang !== "en" && newLang !== "hinglish") {
      ensureTranslateScript();
      const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (select) {
        select.value = newLang;
        select.dispatchEvent(new Event("change"));
      } else {
        // Trigger reload to apply cookie across the whole page
        setTimeout(() => {
          const sel = document.querySelector<HTMLSelectElement>(".goog-te-combo");
          if (sel) {
            sel.value = newLang;
            sel.dispatchEvent(new Event("change"));
          }
        }, 600);
      }
    } else {
      // Return to original English / native Hinglish
      const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (select) {
        select.value = "en";
        select.dispatchEvent(new Event("change"));
      }
    }
  };

  return { lang, changeLanguage };
}

export function LanguageSelector({ placement = "top" }: { placement?: "top" | "bottom" }) {
  const { lang, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<"all" | "indian" | "global">("all");

  const current = languages.find((l) => l.id === lang) ?? languages[0]!;

  const filteredList =
    tab === "all"
      ? languages
      : tab === "indian"
        ? languages.filter((l) => l.group === "featured" || l.group === "indian")
        : languages.filter((l) => l.group === "featured" || l.group === "global");

  return (
    <div className="relative inline-block">
      {/* Hidden container for Google Translate Element */}
      <div id="google_translate_element" className="hidden" aria-hidden="true" />

      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Change reading language across whole website"
        className="flex items-center gap-1.5 border border-border bg-background px-3 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground cursor-pointer"
      >
        <span className="text-xs">{current.flag}</span>
        <span className="font-medium">{current.label}</span>
        <ChevronDown className="size-3 text-muted-foreground" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div
            className={`absolute left-0 z-50 w-[calc(100vw-28px)] max-w-xs sm:w-72 max-h-[75vh] overflow-hidden flex flex-col border border-border bg-surface shadow-2xl ${
              placement === "top" ? "bottom-full mb-1.5" : "top-full mt-1.5"
            }`}
          >
            <div className="p-3 border-b border-rule bg-background/50">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Whole-Website Language
                </span>
                <span className="label-mono flex items-center gap-1 text-[10px] text-primary">
                  <Sparkles className="size-3" /> Live
                </span>
              </div>

              {/* Group Tabs */}
              <div className="mt-2.5 flex rounded-none border border-border bg-background p-0.5 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setTab("all")}
                  className={`flex-1 py-1 text-center transition-colors cursor-pointer ${
                    tab === "all"
                      ? "bg-primary text-primary-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All ({languages.length})
                </button>
                <button
                  type="button"
                  onClick={() => setTab("indian")}
                  className={`flex-1 py-1 text-center transition-colors cursor-pointer ${
                    tab === "indian"
                      ? "bg-primary text-primary-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  🇮🇳 Indian
                </button>
                <button
                  type="button"
                  onClick={() => setTab("global")}
                  className={`flex-1 py-1 text-center transition-colors cursor-pointer ${
                    tab === "global"
                      ? "bg-primary text-primary-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  🌍 Global
                </button>
              </div>
            </div>

            {/* Language Selection List */}
            <div className="overflow-y-auto max-h-64 p-1 divide-y divide-rule/50">
              {filteredList.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => {
                    changeLanguage(l.id);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-3 py-2 text-left text-xs transition-colors cursor-pointer ${
                    lang === l.id
                      ? "bg-primary text-primary-foreground font-medium"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm">{l.flag}</span>
                    <div>
                      <div className="font-medium leading-none">{l.label}</div>
                      <div
                        className={`text-[10px] mt-0.5 ${
                          lang === l.id ? "text-primary-foreground/80" : "text-muted-foreground"
                        }`}
                      >
                        {l.sub}
                      </div>
                    </div>
                  </div>
                  {lang === l.id && <Check className="size-3.5" />}
                </button>
              ))}
            </div>

            <div className="border-t border-rule bg-background/50 p-2.5 text-[10px] text-muted-foreground leading-snug">
              Translates the entire platform — all articles, leadership profiles, timeline, and
              company records.
            </div>
          </div>
        </>
      )}
    </div>
  );
}
