// EN / HU translations for sandorbito.com.
// Default language: EN. User choice is persisted in localStorage.

const TRANSLATIONS = {
  en: {
    "page.title": "Sándor Bitó — Creator on the Côte d'Azur",
    "page.desc": "Photography, indie games and curious experiments from the French Riviera. Founder of BITO GAMES, a Hungarian-born creator living between Linux and the Mediterranean.",

    "nav.about": "About",
    "nav.photo": "Photo",
    "nav.games": "Games",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    "hero.title": "CREATOR",
    "hero.subtitle": "on the French Riviera",
    "hero.tagline.html": "I am Hungarian. Living between Linux and the sea. Photography, indie games, and personal experiments.",
    "hero.tag.loc": "📍 Nice, France",
    "hero.tag.photo": "📷 Photography",
    "hero.status": "STATUS: ALWAYS BUILDING SOMETHING",

    "about.title": "// ABOUT",
    "about.p1.html": "I am Sándor. Originally from Hungary, I am currently based on the French Riviera. I enjoy experimenting across different fields: I photograph using legacy digital cameras, develop games on Linux, and build applications and games for Apple platforms (macOS, iOS, iPadOS) using SwiftUI. I am also deeply interested in the connection between artificial intelligence and digital education.",
    "about.p2.html": "BITO GAMES is my indie game studio. The photos on this site were taken along the Riviera. My developments focusing on the Apple ecosystem will be detailed on a separate page.",
    "about.philosophy": "I create because the intersection of technology and creativity offers the deepest understanding of the world.",

    "photo.title": "// PHOTOGRAPHY",
    "photo.text": "Photos: Shot on older digital cameras.",

    "games.title": "// GAMES",
    "games.h3": "Independent software and game development studio.",
    "games.focus": "Focus: Designing native applications and games for desktop (Linux, macOS) and mobile (iOS, iPadOS, Android) platforms.",
    "games.p": "Currently in development: Project Nova (working title) — a cyberpunk city builder. Developed natively for Linux and macOS.",
    "games.cta": "Visit bitogames.com →",

    "dev.badge": "IN DEVELOPMENT",
    "dev.main.label": "[MAIN PROJECT]",
    "dev.main.title": "Project Nova (working title) — cyberpunk city builder",
    "dev.main.engine": "Engine: Godot 4",
    "dev.main.status": "Status: Prototype phase",
    "dev.main.platforms": "Platforms: Linux, macOS, iOS, iPadOS, Android",
    "dev.side.label": "[ACTIVE SIDE PROJECTS]",
    "dev.side.intro": "Smaller-scale, standalone applications and experimental games. These projects will be published on isolated subpages.",
    "dev.side.swiftui": "SwiftUI: Native applications and games for the Apple ecosystem (macOS, iOS, iPadOS).",
    "dev.side.python": "Python: Developer tools, data analysis scripts, and desktop utilities.",

    "exp.title": "// INTERNAL SYSTEMS & AUTOMATION",
    "exp.intro": "Workflow-supporting systems and data analysis tools developed for personal use. Focus: Python, desktop Linux environments, and automation. In the age of AI, structural, systems-level, critical, and creative thinking are essential.",
    "exp.kozlony.title": "Official Gazette Analyzer",
    "exp.kozlony.p": "Daily data extraction and content analysis from the Hungarian Official Gazette. Automated execution via systemd timer, utilizing the existing Claude environment.",
    "exp.kozlony.tag": "Tech: Python · systemd · Claude",
    "exp.naplo.title": "Life Journal Data Logger",
    "exp.naplo.p": "Minimalist graphical interface for daily data collection. Structured logging system for long-term personal data analysis.",
    "exp.naplo.tag": "Tech: Python · Tkinter",
    "exp.bridge.title": "Distributed AI Bridge",
    "exp.bridge.p": "Asynchronous data exchange between the Linux workstation and the macOS client. The models process information via a locally synchronized file system.",
    "exp.bridge.tag": "Tech: Syncthing · Claude · Local network",

    "contact.title": "// CONTACT",
    "contact.email.label": "EMAIL",
    "contact.github.label": "GITHUB",
    "contact.linkedin.label": "LINKEDIN",
    "contact.studio.label": "STUDIO",

    "footer.copy": "© 2026 Sándor Bitó · Côte d'Azur · Made on Linux",
  },

  hu: {
    "page.title": "Bitó Sándor — Alkotó a Riviérán",
    "page.desc": "Fotózás, indie játékok, és kíváncsi kísérletek a Francia Riviéráról. A BITO GAMES alapítója — magyar srác Linux és a tenger között.",

    "nav.about": "Rólam",
    "nav.photo": "Fotók",
    "nav.games": "Játékok",
    "nav.projects": "Projektek",
    "nav.contact": "Kapcsolat",

    "hero.title": "ALKOTÓ",
    "hero.subtitle": "a Francia Riviérán",
    "hero.tagline.html": "Magyar vagyok. Linux és a tenger között élek. Fotózás, indie játékok és technológiai kísérletek.",
    "hero.tag.loc": "📍 Nizza, Franciaország",
    "hero.tag.photo": "📷 Fotó",
    "hero.status": "ÁLLAPOT: MINDIG ÉPÍTEK VALAMIT",

    "about.title": "// RÓLAM",
    "about.p1.html": "Sándor vagyok. Magyarországról indultam, jelenleg a Francia Riviérán élek. A munkám és a hobbim a folyamatos kísérletezés: régebbi digitális gépekkel fotózom, játékokat fejlesztek Linux környezetben, emellett Apple platformokra (macOS, iOS, iPadOS) készítek applikációkat és játékokat SwiftUI-ban. Kiemelten érdekel a mesterséges intelligencia és a digitális oktatás kapcsolata.",
    "about.p2.html": "A BITO GAMES a saját független játékstúdióm. Az oldalon látható fotók a Riviérán készültek. Az Apple-ökoszisztémára fókuszáló fejlesztéseim külön oldalon kapnak majd helyet.",
    "about.philosophy": "Azért alkotok, mert a technológia és a kreativitás metszéspontja nyújtja a világ legmélyebb megértését.",

    "photo.title": "// FOTÓK",
    "photo.text": "Fotók: Régebbi generációs digitális gépekkel készültek.",

    "games.title": "// JÁTÉKOK",
    "games.h3": "Független szoftver- és játékfejlesztő stúdió.",
    "games.focus": "Célpontok: Natív alkalmazások és játékok tervezése asztali (Linux, macOS) és mobil (iOS, iPadOS, Android) platformokra.",
    "games.p": "Jelenlegi projekt: Project Nova (munkacím) — cyberpunk városépítő stratégia. Fejlesztés alatt natív Linux és macOS rendszerekre.",
    "games.cta": "Tovább a bitogames.com-ra →",

    "dev.badge": "FEJLESZTÉS ALATT",
    "dev.main.label": "[FŐ PROJEKT]",
    "dev.main.title": "Project Nova (munkacím) — cyberpunk városépítő stratégia",
    "dev.main.engine": "Motor: Godot 4",
    "dev.main.status": "Állapot: Prototípus fázis",
    "dev.main.platforms": "Platformok: Linux, macOS, iOS, iPadOS, Android",
    "dev.side.label": "[AKTÍV MELLÉKPROJEKTEK]",
    "dev.side.intro": "Kisebb léptékű, önálló alkalmazások és kísérleti játékok. Ezek a projektek izolált aloldalakon kerülnek publikálásra.",
    "dev.side.swiftui": "SwiftUI: Natív alkalmazások és játékok az Apple ökoszisztémára (macOS, iOS, iPadOS).",
    "dev.side.python": "Python: Fejlesztői eszközök, adatelemző szkriptek és asztali segédprogramok.",

    "exp.title": "// BELSŐ RENDSZEREK ÉS AUTOMATIZÁCIÓ",
    "exp.intro": "Saját használatra fejlesztett, munkafolyamatokat támogató rendszerek és adatelemző eszközök. Fókusz: Python, asztali Linux környezet és automatizáció. Az AI korában a strukturális, rendszerszintű, kritikus és kreatív gondolkodás elengedhetetlen.",
    "exp.kozlony.title": "Magyar Közlöny Elemző",
    "exp.kozlony.p": "Napi adatkinyerés és tartalomelemzés a Magyar Közlönyből. Automatizált futtatás systemd időzítővel, a meglévő Claude környezet bevonásával.",
    "exp.kozlony.tag": "Technológia: Python · systemd · Claude",
    "exp.naplo.title": "Életnapló Adatgyűjtő",
    "exp.naplo.p": "Minimalista grafikus interfész napi adatgyűjtéshez. Strukturált naplózási rendszer a hosszútávú személyes adatelemzéshez.",
    "exp.naplo.tag": "Technológia: Python · Tkinter",
    "exp.bridge.title": "Elosztott AI Híd",
    "exp.bridge.p": "Aszinkron adatcsere a Linux munkaállomás és a macOS kliens között. A modellek egy lokálisan szinkronizált fájlrendszeren keresztül dolgozzák fel az információkat.",
    "exp.bridge.tag": "Technológia: Syncthing · Claude · Lokális hálózat",

    "contact.title": "// KAPCSOLAT",
    "contact.email.label": "E-MAIL",
    "contact.github.label": "GITHUB",
    "contact.linkedin.label": "LINKEDIN",
    "contact.studio.label": "STÚDIÓ",

    "footer.copy": "© 2026 Bitó Sándor · Francia Riviéra · Linuxon készült",
  },
};

(function () {
  const STORAGE_KEY = "sandorbito-lang";
  const DEFAULT_LANG = "en";

  function apply(lang) {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANG];

    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.textContent = dict[key];
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      if (dict[key] != null) el.innerHTML = dict[key];
    });

    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      // Format: "title:page.title,placeholder:hero.title"
      const pairs = el.getAttribute("data-i18n-attr").split(",");
      pairs.forEach((pair) => {
        const [attr, key] = pair.split(":").map((s) => s.trim());
        if (attr && key && dict[key] != null) el.setAttribute(attr, dict[key]);
      });
    });

    // Update <title> separately
    if (dict["page.title"]) document.title = dict["page.title"];

    // Buttons active state
    document.querySelectorAll(".lang-btn").forEach((b) => {
      b.classList.toggle("is-active", b.getAttribute("data-lang") === lang);
    });

    // Notify dynamic parts (e.g. photo count badge) so they can re-render.
    document.dispatchEvent(new CustomEvent("sb:langchange", { detail: { lang } }));
  }

  function bind() {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = btn.getAttribute("data-lang");
        try {
          localStorage.setItem(STORAGE_KEY, lang);
        } catch (e) { /* private mode */ }
        apply(lang);
      });
    });
  }

  function init() {
    let lang = DEFAULT_LANG;
    try {
      lang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    } catch (e) { /* private mode */ }
    bind();
    apply(lang);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
