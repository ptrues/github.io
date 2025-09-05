import { ensureLib, instantiateCandidate } from '/biggerpicture.js';

window.createInlineGallery = async function (containerId, items = [], options = {}) {
  const container = document.getElementById(containerId);
  if (!container) throw new Error('Container not found: ' + containerId);

  const Loaded = await ensureLib();
  const Candidate = Loaded?.default ?? Loaded?.BiggerPicture ?? Loaded;
  container.innerHTML = ''; // clear previous mount
  const bp = await instantiateCandidate(Candidate, container, { forceNew: true });

  bp.open(Object.assign({
    items,
    inline: true,
    scale: 1,
    intro: 'fadeup',
    noClose: true
  }, options));

  return bp;
};