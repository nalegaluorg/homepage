/* nalegalu.org — RODO/ePrivacy cookie consent + Google Consent Mode v2 */
(function () {
  var GA_ID = 'G-ZMEB28MEH6';
  var STORAGE_KEY = 'nalegalu_consent';

  // ── Consent Mode v2: default everything DENIED before any tag loads ──
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { dataLayer.push(arguments); };
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500
  });

  var gaLoaded = false;
  function loadGA() {
    if (gaLoaded) return;
    gaLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  function readConsent() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); }
    catch (e) { return null; }
  }
  function saveConsent(analytics) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        analytics: !!analytics, ts: new Date().toISOString()
      }));
    } catch (e) {}
  }
  function applyConsent(analytics) {
    gtag('consent', 'update', { analytics_storage: analytics ? 'granted' : 'denied' });
    if (analytics) loadGA();
  }

  // ── Styles (self-contained, brand tokens with fallbacks) ──
  function injectStyles() {
    if (document.getElementById('nalegalu-consent-style')) return;
    var css =
      '#nlg-consent{position:fixed;left:0;right:0;bottom:0;z-index:9999;display:none;font-family:var(--sans,"Inter",system-ui,sans-serif)}' +
      '#nlg-consent.show{display:block}' +
      '#nlg-consent .nlg-overlay{position:fixed;inset:0;background:rgba(15,23,36,.45)}' +
      '#nlg-consent .nlg-panel{position:relative;max-width:920px;margin:0 auto 1rem;background:var(--white,#fff);border:1px solid var(--border,#dde3ed);border-radius:14px;box-shadow:0 12px 40px rgba(27,46,75,.18);padding:1.5rem 1.6rem;left:0;right:0}' +
      '@media(min-width:640px){#nlg-consent .nlg-panel{margin:0 auto 1.5rem}}' +
      '#nlg-consent h2{font-family:var(--serif,"Lora",Georgia,serif);font-size:1.1rem;font-weight:600;color:var(--navy,#1b2e4b);margin:0 0 .5rem}' +
      '#nlg-consent p{font-size:.9rem;line-height:1.6;color:var(--text-mid,#3d5070);margin:0 0 1rem}' +
      '#nlg-consent a{color:var(--teal,#2f8f9d);text-decoration:underline;text-underline-offset:2px}' +
      '#nlg-consent .nlg-actions{display:flex;flex-wrap:wrap;gap:.6rem;align-items:center}' +
      '#nlg-consent button{font-family:inherit;font-size:.88rem;font-weight:600;border-radius:8px;padding:11px 20px;cursor:pointer;border:1px solid transparent;transition:background .2s,border-color .2s,color .2s}' +
      '#nlg-consent .nlg-accept{background:var(--amber,#e0a63f);color:var(--navy,#1b2e4b)}' +
      '#nlg-consent .nlg-accept:hover{background:var(--amber-dark,#c98f2c)}' +
      '#nlg-consent .nlg-reject{background:var(--cream2,#f3f1ec);color:var(--navy,#1b2e4b);border-color:var(--border,#dde3ed)}' +
      '#nlg-consent .nlg-reject:hover{background:var(--border,#dde3ed)}' +
      '#nlg-consent .nlg-settings{background:transparent;color:var(--text-mid,#3d5070);border-color:var(--border,#dde3ed)}' +
      '#nlg-consent .nlg-settings:hover{border-color:var(--navy,#1b2e4b);color:var(--navy,#1b2e4b)}' +
      '#nlg-consent .nlg-prefs{display:none;margin:.25rem 0 1.1rem;border-top:1px solid var(--border,#dde3ed);padding-top:1rem}' +
      '#nlg-consent .nlg-prefs.show{display:block}' +
      '#nlg-consent .nlg-cat{display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;padding:.7rem 0;border-bottom:1px solid var(--border,#dde3ed)}' +
      '#nlg-consent .nlg-cat:last-child{border-bottom:none}' +
      '#nlg-consent .nlg-cat h3{font-size:.9rem;font-weight:600;color:var(--navy,#1b2e4b);margin:0 0 .2rem}' +
      '#nlg-consent .nlg-cat p{font-size:.8rem;margin:0;color:var(--text-light,#6b7fa3)}' +
      '#nlg-consent .nlg-cat .nlg-fixed{font-size:.78rem;font-weight:600;color:var(--teal,#2f8f9d);white-space:nowrap;padding-top:.15rem}' +
      '#nlg-consent .nlg-switch{position:relative;width:42px;height:24px;flex:0 0 auto;margin-top:.1rem}' +
      '#nlg-consent .nlg-switch input{opacity:0;width:0;height:0;position:absolute}' +
      '#nlg-consent .nlg-slider{position:absolute;inset:0;background:#c8d3e5;border-radius:24px;transition:.2s;cursor:pointer}' +
      '#nlg-consent .nlg-slider:before{content:"";position:absolute;width:18px;height:18px;left:3px;top:3px;background:#fff;border-radius:50%;transition:.2s}' +
      '#nlg-consent input:checked+.nlg-slider{background:var(--teal,#2f8f9d)}' +
      '#nlg-consent input:checked+.nlg-slider:before{transform:translateX(18px)}' +
      '#nlg-consent input:focus-visible+.nlg-slider{outline:2px solid var(--navy,#1b2e4b);outline-offset:2px}';
    var st = document.createElement('style');
    st.id = 'nalegalu-consent-style';
    st.textContent = css;
    document.head.appendChild(st);
  }

  // ── Banner markup ──
  function buildBanner() {
    if (document.getElementById('nlg-consent')) return document.getElementById('nlg-consent');
    injectStyles();
    var wrap = document.createElement('div');
    wrap.id = 'nlg-consent';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-modal', 'true');
    wrap.setAttribute('aria-label', 'Zgoda na pliki cookies');
    wrap.innerHTML =
      '<div class="nlg-overlay" data-nlg-close></div>' +
      '<div class="nlg-panel">' +
        '<h2>Szanujemy Twoją prywatność</h2>' +
        '<p>Używamy niezbędnych plików cookies, aby strona działała poprawnie. Za Twoją zgodą korzystamy też z analityki (Google Analytics), aby lepiej rozumieć, jak używana jest strona. Możesz zaakceptować wszystkie, odrzucić opcjonalne lub dostosować wybór. Szczegóły w <a href="polityka-cookies.html">Polityce cookies</a>.</p>' +
        '<div class="nlg-prefs" id="nlg-prefs">' +
          '<div class="nlg-cat">' +
            '<div><h3>Niezbędne</h3><p>Konieczne do działania i bezpieczeństwa strony. Zawsze aktywne.</p></div>' +
            '<span class="nlg-fixed">Zawsze aktywne</span>' +
          '</div>' +
          '<div class="nlg-cat">' +
            '<div><h3>Analityczne</h3><p>Google Analytics — anonimowe statystyki odwiedzin. Domyślnie wyłączone.</p></div>' +
            '<label class="nlg-switch"><input type="checkbox" id="nlg-analytics" aria-label="Analityczne pliki cookies"><span class="nlg-slider"></span></label>' +
          '</div>' +
        '</div>' +
        '<div class="nlg-actions">' +
          '<button type="button" class="nlg-accept" id="nlg-accept">Akceptuję wszystkie</button>' +
          '<button type="button" class="nlg-reject" id="nlg-reject">Odrzucam</button>' +
          '<button type="button" class="nlg-settings" id="nlg-toggle" aria-expanded="false" aria-controls="nlg-prefs">Ustawienia</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(wrap);

    var prefs = wrap.querySelector('#nlg-prefs');
    var toggle = wrap.querySelector('#nlg-toggle');
    var analyticsBox = wrap.querySelector('#nlg-analytics');

    toggle.addEventListener('click', function () {
      var open = prefs.classList.toggle('show');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    function commit(analytics) { saveConsent(analytics); applyConsent(analytics); hide(); }
    wrap.querySelector('#nlg-accept').addEventListener('click', function () {
      // "Akceptuję wszystkie" turns analytics on and reflects it in the toggle.
      if (analyticsBox) analyticsBox.checked = true;
      commit(true);
    });
    wrap.querySelector('#nlg-reject').addEventListener('click', function () {
      if (analyticsBox) analyticsBox.checked = false;
      commit(false);
    });
    return wrap;
  }

  function show() {
    var w = buildBanner();
    var stored = readConsent();
    var box = w.querySelector('#nlg-analytics');
    if (box) box.checked = stored ? !!stored.analytics : false;
    w.classList.add('show');
  }
  function hide() {
    var w = document.getElementById('nlg-consent');
    if (w) w.classList.remove('show');
  }

  // Public API for the footer "Ustawienia cookies" link
  window.nalegaluOpenConsent = function () {
    var w = buildBanner();
    w.querySelector('#nlg-prefs').classList.add('show');
    w.querySelector('#nlg-toggle').setAttribute('aria-expanded', 'true');
    show();
  };

  function init() {
    var stored = readConsent();
    if (stored) {
      applyConsent(!!stored.analytics); // re-apply saved choice, no prompt
    } else {
      show(); // first visit
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
