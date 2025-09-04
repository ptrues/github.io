import { ensureLib, instantiateCandidate, safeRedirect } from './biggerpicture.js';

let overlayInstance = null;

// Reverting back to onClosed for scroll restoration
let previousScrollPosition = 0;

document.addEventListener('click', async (e) => {
  const link = e.target.closest('a[data-bp][data-img]');
  if (!link) return;
  e.preventDefault();

  try {
    const Loaded = await ensureLib();
    const Candidate = Loaded?.default ?? Loaded?.BiggerPicture ?? Loaded;

    if (!overlayInstance) {
      overlayInstance = await instantiateCandidate(Candidate, document.body, {});
      if (!overlayInstance || typeof overlayInstance.open !== 'function') {
        throw new TypeError('BiggerPicture overlay instance missing open()');
      }
    }

    previousScrollPosition = window.scrollY;

    overlayInstance.open({
      items: [link],
      el: link,
      onClosed: () => {
        window.scrollTo(0, previousScrollPosition);
      },
    });
  } catch (err) {
    console.error('bp-responsive init/open error:', err);
    safeRedirect(link.href);
  }
});