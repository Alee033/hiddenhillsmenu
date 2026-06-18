/**
 * loader.js
 * Dynamically fetches each food category partial and injects it
 * into #menuMain before main.js initialises the scroll observer.
 *
 * Order here controls the on-page order of sections.
 */

const SECTIONS = [
  'sections/soup-salads.html',
  'sections/appetizers.html',
  'sections/chinese-thai.html',
  'sections/pizza-pasta.html',
  'sections/mughlai-desi.html',
  'sections/handi.html',
  'sections/biryani-pulao.html',
  'sections/burgers-sandwiches.html',
  'sections/continental.html',
  'sections/grill.html',
  'sections/arabic.html',
  'sections/tandoor.html',
  'sections/kids-menu.html',
  'sections/desserts.html',
  'sections/beverages.html',
];

(async () => {
  const main = document.getElementById('menuMain');
  if (!main) return;

  // Fetch all sections in parallel, then insert in order
  const htmlParts = await Promise.all(
    SECTIONS.map(url =>
      fetch(url)
        .then(r => r.text())
        .catch(() => `<!-- Failed to load ${url} -->`)
    )
  );

  main.innerHTML = htmlParts.join('\n');

  // Dispatch a custom event so main.js can safely initialise
  // after the DOM is fully populated
  document.dispatchEvent(new Event('sectionsLoaded'));
})();
