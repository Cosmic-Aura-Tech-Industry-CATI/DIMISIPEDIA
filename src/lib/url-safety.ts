const SAFE_EXTERNAL_PROTOCOLS = new Set(["https:", "http:"]);

/**
 * Returns a normalized external URL only when protocol is http/https.
 * Blocks javascript:, data:, file:, and malformed links.
 */
export function safeExternalHref(raw?: string | null): string | null {
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (!SAFE_EXTERNAL_PROTOCOLS.has(url.protocol)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export const EXTERNAL_REL = "noopener noreferrer external";
export const EXTERNAL_REL_VERIFIED = "me noopener noreferrer external";
export const EXTERNAL_REL_UNTRUSTED = "noopener noreferrer external nofollow ugc";
