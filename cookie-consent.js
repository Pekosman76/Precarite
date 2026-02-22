(function () {
  const CONSENT_KEY = 'cookieConsent';
  const ADSENSE_SRC = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';

  function getConsent() {
    try {
      return localStorage.getItem(CONSENT_KEY);
    } catch (error) {
      return null;
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch (error) {
      // localStorage indisponible : on n'interrompt pas l'UI
    }
  }

  function loadAdSenseIfAllowed() {
    const consent = getConsent();
    const client = document.querySelector('meta[name="adsense-client"]')?.content;

    if (consent !== 'granted' || !client) {
      return;
    }

    if (document.querySelector('script[data-adsense-script="true"]')) {
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = ADSENSE_SRC + '?client=' + encodeURIComponent(client);
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-adsense-script', 'true');
    document.head.appendChild(script);
  }

  function createBanner() {
    const banner = document.createElement('aside');
    banner.setAttribute('aria-label', 'Bandeau cookies');
    banner.setAttribute('role', 'dialog');
    banner.className = 'fixed bottom-4 left-4 right-4 z-50 max-w-3xl mx-auto bg-white border border-stone-200 rounded-xl shadow-lg p-4 text-sm';

    banner.innerHTML = `
      <p class="text-stone-700 mb-3">
        Ce site utilise des cookies à des fins de mesure d’audience et de publicité (Google AdSense). Vous pouvez accepter ou refuser.
        <a href="/politique-confidentialite.html" class="underline text-stone-900 font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8da191]">En savoir plus</a>
      </p>
      <div class="flex flex-wrap gap-2 justify-end">
        <button type="button" data-consent="denied" aria-label="Refuser les cookies" class="px-3 py-2 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8da191]">Refuser</button>
        <button type="button" data-consent="granted" aria-label="Accepter les cookies" class="px-3 py-2 rounded-lg bg-stone-900 text-white hover:bg-stone-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8da191]">Accepter</button>
      </div>
    `;

    banner.querySelectorAll('button[data-consent]').forEach((button) => {
      button.addEventListener('click', function () {
        const value = this.getAttribute('data-consent');
        if (!value) return;
        setConsent(value);
        banner.remove();
        loadAdSenseIfAllowed();
      });
    });

    const appRoot = document.querySelector('.min-h-screen') || document.body;
    appRoot.appendChild(banner);
  }

  document.addEventListener('DOMContentLoaded', function () {
    const consent = getConsent();
    if (consent !== 'granted' && consent !== 'denied') {
      createBanner();
    }
    loadAdSenseIfAllowed();
  });
})();
