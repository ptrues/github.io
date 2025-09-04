// Shared loader + helpers for Bigger Picture (ES module)
const LIB_URL = 'https://cdn.jsdelivr.net/npm/bigger-picture/dist/bigger-picture.min.js';

// avoid loading multiple times
if (!window._bpLoader) {
  window._bpLoader = null;
}

export async function ensureLib() {
  if (window.BiggerPicture) return window.BiggerPicture;
  if (window._bpLoader) return window._bpLoader;

  window._bpLoader = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = LIB_URL;
    s.async = true;
    s.setAttribute('data-bp-lib', '1');
    s.onload = () => {
      if (window.BiggerPicture) resolve(window.BiggerPicture);
      else reject(new Error('BiggerPicture not found on window after script load'));
    };
    s.onerror = (e) => reject(new Error('Failed to load BiggerPicture script'));
    document.head.appendChild(s);
  });

  return window._bpLoader;
}

// instantiateCandidate: try `new`, then call-as-factory, then accept singleton instance
// options: { forceNew: boolean } - note: if library only exposes a singleton, forceNew will fall back to it.
export async function instantiateCandidate(Candidate, target, options = {}) {
  const forceNew = !!options.forceNew;

  if (typeof Candidate === 'function') {
    try {
      return new Candidate({ target });
    } catch (errNew) {
      try {
        return Candidate({ target });
      } catch (errCall) {
        throw new TypeError('Candidate function is neither constructable nor callable: ' + errCall);
      }
    }
  }

  if (Candidate && typeof Candidate.open === 'function') {
    if (forceNew) {
      console.warn('instantiateCandidate: requested forceNew but Candidate is a singleton instance. Using singleton.');
    }
    return Candidate;
  }

  throw new TypeError('Loaded BiggerPicture is not a constructor, factory, or instance with open()');
}

export function safeRedirect(href) {
  try {
    const url = new URL(href, location.href);
    const allowedSchemes = ['http:', 'https:'];
    if (allowedSchemes.includes(url.protocol) && url.origin === location.origin) {
      window.location.href = url.href;
    } else {
      console.warn('Blocked unsafe redirect to', url.href);
    }
  } catch (err) {
    console.warn('Invalid URL for redirect:', href, err);
  }
}