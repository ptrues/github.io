import { ensureLib, instantiateCandidate, safeRedirect } from '/biggerpicture.js';

let ytOverlay = null;

document.addEventListener('click', async (e) => {
  const link = e.target.closest('a[data-bp][data-iframe]');
  if (!link) return;
  e.preventDefault();

  try {
    const Loaded = await ensureLib();
    const Candidate = Loaded?.default ?? Loaded?.BiggerPicture ?? Loaded;

    if (!ytOverlay) {
      ytOverlay = await instantiateCandidate(Candidate, document.body, {});
      if (!ytOverlay || typeof ytOverlay.open !== 'function') {
        throw new TypeError('BiggerPicture youtube overlay missing open()');
      }
    }

    // Reverting back to onClosed for scroll restoration
    const previousScrollPosition = window.scrollY;

    ytOverlay.open({
      items: [link],
      el: link,
      onClosed: () => {
        window.scrollTo(0, previousScrollPosition);
      },
    });
  } catch (err) {
    console.error('bp-youtube init/open error:', err);
    safeRedirect(link.href);
  }
});