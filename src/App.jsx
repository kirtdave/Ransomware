import { useState, useEffect, useRef } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Home", "Discussion", "Articles", "Reflection", "About"];

const STATS = [
  { val: "$4.9M", label: "Avg. breach cost in 2024" },
  { val: "200K+", label: "WannaCry victims" },
  { val: "150", label: "Countries affected" },
  { val: "72%", label: "Attacks start via phishing" },
];

const TIMELINE = [
  {
    year: "1989",
    event:
      "AIDS Trojan world's first ransomware, distributed on floppy disks by Dr. Joseph Popp at a WHO conference.",
  },
  {
    year: "2013",
    event:
      "CryptoLocker launches the modern ransomware era Bitcoin payments and RSA-2048 encryption.",
  },
  {
    year: "2017",
    event:
      "WannaCry infects 200,000+ systems in 150 countries in 24 hours using a leaked NSA exploit.",
  },
  {
    year: "2019",
    event:
      "Maze group pioneers double-extortion: encrypt AND leak data if ransom is unpaid.",
  },
  {
    year: "2021",
    event:
      "Colonial Pipeline: US fuel infrastructure crippled, $4.4M paid, national emergency declared.",
  },
  {
    year: "2024",
    event:
      "LockBit dismantled by global law enforcement in Operation Cronos 2,000+ prior victims.",
  },
];

const ARTICLES = [
  {
    num: "01",
    title: "Colonial Pipeline Paid $4.4M in Ransom After Cyberattack",
    source: "The Wall Street Journal",
    date: "May 19, 2021",
    url: "https://www.wsj.com/articles/colonial-pipeline-ceo-tells-why-he-paid-hackers-a-4-4-million-ransom-11621435636",
    summary:
      "Colonial Pipeline CEO Joseph Blount confirmed the company paid $4.4 million to the DarkSide ransomware group following a May 2021 attack that shut down the largest US fuel pipeline for nearly a week, triggering widespread fuel shortages across the East Coast.",
    tag: "Incident",
    color: "#3b82f6",
    points: [
      "$4.4M paid in Bitcoin FBI later recovered ~$2.3M",
      "5,500 miles of pipeline offline for nearly a week",
      "17-state regional emergency declared",
      "Attacker entry point: a single leaked VPN password",
    ],
  },
  {
    num: "02",
    title: "WannaCry: The Cyberattack That Paralyzed the World",
    source: "BBC News Technology",
    date: "May 13, 2017",
    url: "https://www.bbc.com/news/technology-39901382",
    summary:
      "WannaCry spread to 200,000 computers in 150 countries in under 24 hours by exploiting EternalBlue a cyberweapon stolen from the NSA. The UK's National Health Service was devastated, with hospitals forced to cancel thousands of operations and turn away patients.",
    tag: "Outbreak",
    color: "#60a5fa",
    points: [
      "200,000+ systems hit across 150 countries in one day",
      "UK NHS among worst affected operations cancelled",
      "EternalBlue exploit had a patch available never applied",
      "Kill switch found accidentally by researcher Marcus Hutchins",
    ],
  },
  {
    num: "03",
    title: "Average Ransomware Payment Hits $2M in 2024",
    source: "Sophos State of Ransomware 2024",
    date: "April 30, 2024",
    url: "https://www.sophos.com/en-us/whitepaper/state-of-ransomware",
    summary:
      "Sophos's annual ransomware survey of 5,000 IT leaders across 14 countries found the average ransom payment surged to $2 million in 2024 a fivefold jump from the prior year. 59% of organizations were hit by ransomware, and only 47% of encrypted data was recovered after paying.",
    tag: "Research",
    color: "#818cf8",
    points: [
      "Average payment: $2M up 5× year-over-year",
      "59% of organizations hit by ransomware in 2024",
      "Education, healthcare, government are top targets",
      "Only 47% of data recovered after paying ransom",
    ],
  },
  {
    num: "04",
    title: "LockBit Ransomware Gang Dismantled in Operation Cronos",
    source: "Europol",
    date: "February 20, 2024",
    url: "https://www.europol.europa.eu/media-press/newsroom/news/lockbit-taken-down",
    summary:
      "Authorities from 10 countries seized LockBit's infrastructure in Operation Cronos taking down the world's most prolific ransomware group responsible for 2,000+ attacks and $120M+ in payments. Decryption keys were recovered and suspects arrested across multiple continents.",
    tag: "Takedown",
    color: "#34d399",
    points: [
      "LockBit: 2,000+ attacks, $120M+ collected",
      "Infrastructure seized across US, UK, EU, Asia-Pacific",
      "Free decryptor keys released via No More Ransom",
      "Several affiliates arrested or sanctioned globally",
    ],
  },
  {
    num: "05",
    title: "Ransomware Attacks on Hospitals Are Killing Patients",
    source: "MIT Technology Review",
    date: "October 12, 2023",
    url: "https://www.technologyreview.com",
    summary:
      "Researchers have linked ransomware attacks on hospitals directly to increased patient mortality. When hospital IT goes down, staff revert to paper, diagnostics fail, and emergency cases are diverted. A University of Minnesota study found elevated death rates at nearby hospitals during ransomware events.",
    tag: "Healthcare",
    color: "#fb923c",
    points: [
      "Hospitals are among the most-targeted ransomware victims",
      "Outages force patient diversions and paper-only workflows",
      "Diagnostic equipment and medication systems go offline",
      "Studies link these disruptions to measurable mortality increases",
    ],
  },
];

const DISCUSSION_SECTIONS = [
  {
    id: "def",
    label: "01",
    title: "What Is Ransomware?",
    icon: "🔒",
    blocks: [
      {
        type: "text",
        text: 'Ransomware is a category of malicious software that encrypts a victim\'s files or entire systems, then demands payment usually in cryptocurrency — in exchange for a decryption key. The term combines "ransom" and "software": it holds your data hostage until you pay.',
      },
      {
        type: "text",
        text: "Unlike malware that hides in the background, ransomware is intentionally visible. The attacker needs the victim to see the ransom note to collect payment. Every file extension gets changed, every folder becomes inaccessible and the clock starts ticking.",
      },
      {
        type: "highlight",
        text: "DEFINITION: Ransomware = Malicious Code + Strong Encryption + Extortion Demand + Cryptocurrency Payment",
      },
    ],
  },
  {
    id: "how",
    label: "02",
    title: "How a Ransomware Attack Works",
    icon: "⚙️",
    blocks: [
      {
        type: "text",
        text: "Every ransomware attack follows a recognizable kill chain. Understanding each stage reveals where defenses can interrupt it:",
      },
      {
        type: "steps",
        items: [
          {
            name: "Initial Access",
            desc: "Entry via phishing email, malicious attachment, stolen RDP credentials, or an unpatched vulnerability. Human error is the #1 vector.",
          },
          {
            name: "Execution",
            desc: "Malware runs often disguised as a PDF invoice, software updater, or compressed archive. Macros and scripts are common triggers.",
          },
          {
            name: "Lateral Movement",
            desc: "Advanced strains spread across the network using tools like PsExec or exploits like EternalBlue, infecting every reachable machine.",
          },
          {
            name: "Encryption",
            desc: "Files locked with AES-256 or RSA-2048. Shadow copies and backups are deleted first to eliminate recovery options.",
          },
          {
            name: "Ransom Note",
            desc: "Wallpaper replaced, README files dropped in every folder, countdown timer displayed. Double-extortion variants also threaten data leaks.",
          },
          {
            name: "Negotiation / End",
            desc: "Victims pay (no guarantee of key), restore from backup, use a free decryptor from law enforcement, or lose the data entirely.",
          },
        ],
      },
    ],
  },
  {
    id: "types",
    label: "03",
    title: "Types of Ransomware",
    icon: "🗂️",
    blocks: [
      {
        type: "text",
        text: "Ransomware has evolved into multiple distinct variants, each with different mechanics and goals:",
      },
      {
        type: "table",
        items: [
          {
            term: "Crypto Ransomware",
            color: "#60a5fa",
            def: "Encrypts individual files. Most common type. Examples: CryptoLocker, WannaCry, REvil, Ryuk.",
          },
          {
            term: "Locker Ransomware",
            color: "#38bdf8",
            def: "Locks the OS/device entirely no login possible. Files may not be encrypted. Example: Reveton.",
          },
          {
            term: "Double Extortion",
            color: "#818cf8",
            def: "Encrypts + exfiltrates data. Threatens public leak if unpaid. Pioneered by Maze in 2019.",
          },
          {
            term: "Triple Extortion",
            color: "#a78bfa",
            def: "Adds a DDoS attack on top of encryption and exfiltration triple simultaneous pressure.",
          },
          {
            term: "RaaS (Ransomware-as-a-Service)",
            color: "#34d399",
            def: "Ransomware rented to affiliates. Operators take a cut. DarkSide, LockBit, REvil all used this model.",
          },
          {
            term: "Wiper Malware",
            color: "#fb923c",
            def: "Looks like ransomware but destroys data with no real decryption. NotPetya $10B in damage.",
          },
        ],
      },
    ],
  },
  {
    id: "cases",
    label: "04",
    title: "Major Case Studies",
    icon: "📋",
    blocks: [
      {
        type: "cases",
        items: [
          {
            name: "WannaCry (2017)",
            target: "Global NHS, Telefónica, FedEx, Deutsche Bahn",
            impact: "$4–8B damages, 200K+ victims in 150 countries",
            detail:
              "Exploited EternalBlue, a stolen NSA exploit, to spread automatically without user interaction. A security researcher accidentally triggered a kill switch by registering a domain found in the code.",
          },
          {
            name: "NotPetya (2017)",
            target: "Ukraine Maersk, Merck, FedEx TNT",
            impact:
              "$10B+ total damages most destructive cyberattack in history",
            detail:
              "Disguised as ransomware but was a pure wiper no functional decryption existed. Attributed to Sandworm, a Russian military unit. Maersk alone lost $300M and had to reinstall 45,000 PCs.",
          },
          {
            name: "Colonial Pipeline (2021)",
            target: "US fuel infrastructure",
            impact:
              "$4.4M ransom paid; East Coast fuel crisis; national emergency",
            detail:
              "DarkSide RaaS group gained access via a single leaked VPN password with no MFA. Shutdown of 5,500 miles of pipeline caused panic buying and fuel shortages across 17 states.",
          },
        ],
      },
    ],
  },
  {
    id: "defense",
    label: "05",
    title: "How to Defend Against Ransomware",
    icon: "🛡️",
    blocks: [
      {
        type: "text",
        text: "No single control stops ransomware defense requires multiple overlapping layers:",
      },
      {
        type: "table",
        items: [
          {
            term: "3-2-1 Backups",
            color: "#3b82f6",
            def: "3 copies of data, 2 different media, 1 offsite/offline. This is the single most effective recovery control.",
          },
          {
            term: "Patch Management",
            color: "#3b82f6",
            def: "WannaCry exploited a vulnerability that had a patch for 2 months. Unpatched systems are the biggest attack surface.",
          },
          {
            term: "Multi-Factor Auth (MFA)",
            color: "#3b82f6",
            def: "Prevents credential-based entry. Colonial Pipeline was breached via a leaked password with no MFA on the VPN.",
          },
          {
            term: "Least Privilege Access",
            color: "#3b82f6",
            def: "Limit user permissions. Infected accounts can't encrypt what they can't access.",
          },
          {
            term: "EDR / XDR Tools",
            color: "#3b82f6",
            def: "Endpoint Detection & Response software identifies ransomware behavior mass file changes before encryption completes.",
          },
          {
            term: "Security Awareness",
            color: "#3b82f6",
            def: "Most ransomware enters via phishing. Regular training and simulated phishing exercises cut click rates by up to 70%.",
          },
          {
            term: "Incident Response Plan",
            color: "#3b82f6",
            def: "Know who to call and what to isolate before an attack, not during one. Every minute of delay increases damage.",
          },
        ],
      },
    ],
  },
];

// ── SWAP 1: FLOATING PADLOCKS BACKGROUND ─────────────────────────────────────
// Replaces the old NetworkBg canvas function entirely.

function FloatingPadlocksBg() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ICONS = ["🔒", "🔑", "🔓", "💀", "🔒", "🔑", "🔒", "🔒", "🔑"];
    const COUNT = 22;
    const items = [];

    for (let i = 0; i < COUNT; i++) {
      const el = document.createElement("div");
      const icon = ICONS[i % ICONS.length];
      const size = 14 + Math.random() * 22; // 14–36px
      const startX = Math.random() * 100; // % across screen
      const startY = Math.random() * 100; // % down screen
      const dur = 18 + Math.random() * 24; // 18–42s orbit cycle
      const driftX = (Math.random() - 0.5) * 180; // px horizontal drift
      const driftY = (Math.random() - 0.5) * 140; // px vertical drift
      const delay = -(Math.random() * dur); // stagger start
      const rot = (Math.random() - 0.5) * 30; // slight rotation
      const opacity = 0.06 + Math.random() * 0.1; // very subtle 6–16%

      el.textContent = icon;
      el.style.cssText = `
        position: absolute;
        font-size: ${size}px;
        left: ${startX}%;
        top: ${startY}%;
        opacity: ${opacity};
        user-select: none;
        pointer-events: none;
        filter: grayscale(1) brightness(0.6) sepia(1) hue-rotate(190deg);
        animation: padlock-float-${i} ${dur}s ease-in-out ${delay}s infinite;
      `;

      // inject per-element keyframes
      const sheet = document.styleSheets[0];
      try {
        sheet.insertRule(
          `
          @keyframes padlock-float-${i} {
            0%   { transform: translate(0px, 0px) rotate(0deg); }
            25%  { transform: translate(${driftX * 0.5}px, ${driftY * 0.4}px) rotate(${rot * 0.5}deg); }
            50%  { transform: translate(${driftX}px, ${driftY}px) rotate(${rot}deg); }
            75%  { transform: translate(${driftX * 0.3}px, ${driftY * 0.7}px) rotate(${rot * -0.3}deg); }
            100% { transform: translate(0px, 0px) rotate(0deg); }
          }
        `,
          sheet.cssRules.length,
        );
      } catch (e) {
        /* cross-origin stylesheet — skip */
      }

      container.appendChild(el);
      items.push(el);
    }

    return () => items.forEach((el) => el.remove());
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    />
  );
}

// ── SWAP 2: RANSOM NOTE LOADING SCREEN ───────────────────────────────────────
// Replaces the old LoadingScreen function entirely.

function LoadingScreen({ onDone }) {
  const [visible, setVisible] = useState(true);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState("typing"); // typing | skull | exit
  const [showSkull, setShowSkull] = useState(false);

  const noteLines = [
    "YOUR FILES ARE MINE.",
    "",
    "Every document. Every photo.",
    "Every secret you thought was safe.",
    "All of it encrypted.",
    "",
    "Want them back?",
    "Send 0.1 BTC to:",
    "1Macky4RansomWare9XxBtc...",
    "",
    "You have 72 hours.",
    "After that...",
    "...goodbye forever. 💀",
    "",
    "— The Ransomware",
    "",
    "",
    "   ...just kidding 😂",
    "   This is a school project.",
    "   Your files are fine. Probably.",
  ];

  const fullText = noteLines.join("\n");

  useEffect(() => {
    let idx = 0;
    const speed = 28; // ms per character
    const t = setInterval(() => {
      idx++;
      setTyped(fullText.slice(0, idx));
      if (idx >= fullText.length) {
        clearInterval(t);
        setTimeout(() => setPhase("skull"), 400);
      }
    }, speed);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (phase !== "skull") return;
    setShowSkull(true);
    const t = setTimeout(() => setPhase("exit"), 1600);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "exit") return;
    setVisible(false);
    const t = setTimeout(onDone, 800);
    return () => clearTimeout(t);
  }, [phase]);

  // progress: chars typed / total chars
  const progress = Math.min(typed.length / fullText.length, 1);

  // colour each line differently
  const renderLines = () =>
    typed.split("\n").map((line, i) => {
      let color = "#c8b9a0"; // default ink
      if (line.includes("YOUR FILES ARE MINE")) color = "#cc2200";
      if (line.includes("encrypted")) color = "#cc2200";
      if (line.includes("0.1 BTC") || line.includes("1Macky"))
        color = "#e8a020";
      if (line.includes("72 hours")) color = "#cc6600";
      if (line.includes("goodbye forever")) color = "#990000";
      if (line.includes("— The Ransomware")) color = "#884422";
      if (
        line.includes("kidding") ||
        line.includes("school") ||
        line.includes("fine")
      )
        color = "#6b9fd4";
      return (
        <div key={i} style={{ color, minHeight: "1.45em", lineHeight: "1.45" }}>
          {line || "\u00A0"}
        </div>
      );
    });

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#1a1208",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Space Mono', monospace",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s ease",
        padding: "1rem",
        overflow: "hidden",
      }}
    >
      {/* Paper texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(180,160,120,0.04) 28px)",
          zIndex: 1,
        }}
      />

      {/* Red margin line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "calc(50% - 230px)",
          width: "2px",
          background: "rgba(180,40,20,0.25)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Big skull watermark — fades in at end */}
      <div
        style={{
          position: "absolute",
          fontSize: "clamp(10rem, 30vw, 22rem)",
          opacity: showSkull ? 0.06 : 0,
          transition: "opacity 0.8s ease",
          userSelect: "none",
          pointerEvents: "none",
          zIndex: 1,
          filter: "grayscale(1)",
        }}
      >
        💀
      </div>

      {/* Note paper */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          width: "min(500px, 92vw)",
          background:
            "linear-gradient(160deg, #f5edd8 0%, #ede0c4 60%, #e8d9b8 100%)",
          boxShadow:
            "0 8px 40px rgba(0,0,0,0.7), 2px 2px 0 rgba(0,0,0,0.15) inset",
          padding: "clamp(1.2rem, 4vw, 2rem) clamp(1.5rem, 5vw, 2.5rem)",
          borderRadius: "1px",
          transform: "rotate(-1.2deg)",
          minHeight: "320px",
          maxHeight: "65vh",
          overflow: "hidden",
        }}
      >
        {/* Torn top edge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background:
              "linear-gradient(90deg, #e8d5b0 0%, #f2e6cc 30%, #ddd0b0 60%, #ece0c8 100%)",
            clipPath:
              "polygon(0 100%, 3% 0, 7% 80%, 12% 20%, 18% 90%, 24% 10%, 30% 70%, 36% 30%, 42% 85%, 48% 15%, 54% 75%, 60% 25%, 66% 80%, 72% 20%, 78% 70%, 84% 10%, 90% 60%, 95% 30%, 100% 0, 100% 100%)",
          }}
        />

        {/* Header */}
        <div
          style={{
            fontFamily: "serif",
            fontSize: "clamp(1rem, 3.5vw, 1.4rem)",
            color: "#880000",
            textAlign: "center",
            marginBottom: "1rem",
            fontWeight: "bold",
            letterSpacing: "1px",
            textShadow: "1px 1px 0 rgba(0,0,0,0.15)",
            borderBottom: "1px solid rgba(150,100,60,0.3)",
            paddingBottom: "0.5rem",
          }}
        >
          ☠ RANSOM NOTE ☠
        </div>

        {/* Typed text */}
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(0.58rem, 1.6vw, 0.72rem)",
            lineHeight: "1.45",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {renderLines()}
          {phase === "typing" && (
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "1em",
                background: "#cc2200",
                verticalAlign: "text-bottom",
                animation: "rn-blink 0.7s step-end infinite",
                marginLeft: "1px",
              }}
            />
          )}
        </div>
      </div>

      {/* Branding below */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          marginTop: "1.25rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "clamp(0.9rem, 3vw, 1.2rem)",
            fontWeight: 700,
            letterSpacing: "3px",
            color: "#dbeafe",
          }}
        >
          RANSOM
          <span
            style={{
              color: "#2563eb",
              textShadow: "0 0 16px rgba(37,99,235,0.9)",
            }}
          >
            WARE
          </span>
          <span style={{ color: "#60a5fa" }}>.Macky</span>
        </div>
        <div
          style={{
            fontSize: "9px",
            color: "#4a6a8e",
            letterSpacing: "2px",
            marginTop: "4px",
          }}
        >
          EDUCATIONAL USE ONLY 🙏
        </div>
      </div>

      {/* Progress bar */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          width: "min(500px,92vw)",
          height: "3px",
          background: "#102040",
          marginTop: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            background:
              phase === "exit"
                ? "linear-gradient(90deg,#22c55e,#60a5fa)"
                : "linear-gradient(90deg,#cc2200,#e8a020)",
            width: `${progress * 100}%`,
            transition: "width 0.1s linear",
            boxShadow: "0 0 8px rgba(200,50,0,0.5)",
          }}
        />
      </div>
      <div
        style={{
          position: "relative",
          zIndex: 3,
          fontSize: "9px",
          color: "#4a6a8e",
          marginTop: "5px",
          letterSpacing: "2px",
        }}
      >
        {phase === "exit"
          ? "LOADING SITE..."
          : `WRITING NOTE... ${Math.round(progress * 100)}%`}
      </div>

      <style>{`
        @keyframes rn-blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </div>
  );
}

// ── NAV ───────────────────────────────────────────────────────────────────────

function NavBar({ active, setActive }) {
  const [open, setOpen] = useState(false);
  const go = (p) => {
    setActive(p);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <nav className="rw-nav">
      <button className="rw-nav-brand" onClick={() => go("Home")}>
        <span className="rw-nav-badge">R</span>
        <span className="rw-nav-name">
          RANSOMWARE<span className="rw-nav-dot">.</span>Macky
        </span>
      </button>
      <div className="rw-nav-links">
        {NAV_LINKS.map((l) => (
          <button
            key={l}
            className={`rw-nav-link ${active === l ? "rw-active" : ""}`}
            onClick={() => go(l)}
          >
            {l}
          </button>
        ))}
      </div>
      <button className="rw-hamburger" onClick={() => setOpen(!open)}>
        <span
          style={{
            transform: open ? "rotate(45deg) translate(4px,5px)" : "none",
          }}
        />
        <span style={{ opacity: open ? 0 : 1 }} />
        <span
          style={{
            transform: open ? "rotate(-45deg) translate(4px,-5px)" : "none",
          }}
        />
      </button>
      {open && (
        <div className="rw-mobile-menu">
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              className={`rw-mobile-link ${active === l ? "rw-active" : ""}`}
              onClick={() => go(l)}
            >
              <span className="rw-mobile-arrow">→</span> {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ── HOME ──────────────────────────────────────────────────────────────────────

function Home({ setActive }) {
  return (
    <div className="rw-page">
      <section className="rw-hero">
        <div className="rw-hero-left">
          <div className="rw-hero-eyebrow">
            <span className="rw-hero-eyebrow-dot" />
            CYBERSECURITY · TOPIC 003 · 2026
          </div>
          <h1 className="rw-hero-h1">
            RANSOM
            <br />
            <span className="rw-hero-hollow">WARE</span>
          </h1>
          <p className="rw-hero-desc">
            Malicious software that encrypts your files and holds them hostage
            demanding cryptocurrency payment for their return. The defining
            cyber threat of the modern era.
          </p>
          <div className="rw-hero-actions">
            <button
              className="rw-btn-solid"
              onClick={() => setActive("Discussion")}
            >
              Explore Topic →
            </button>
            <button
              className="rw-btn-ghost"
              onClick={() => setActive("Articles")}
            >
              Read Articles
            </button>
          </div>
        </div>
        <div className="rw-hero-right">
          <div className="rw-threat-box">
            <div className="rw-threat-header">
              <span className="rw-threat-dot rw-dot-red" />
              <span className="rw-threat-dot rw-dot-yellow" />
              <span className="rw-threat-dot rw-dot-dim" />
              <span className="rw-threat-title">THREAT.PROFILE</span>
            </div>
            <div className="rw-threat-body">
              <div className="rw-threat-level-row">
                <span className="rw-threat-level">CRITICAL</span>
                <span className="rw-threat-badge">ACTIVE</span>
              </div>
              <div className="rw-threat-bar">
                <div className="rw-threat-fill" />
              </div>
              {[
                { k: "CATEGORY", v: "Extortionware" },
                { k: "VECTOR", v: "Phishing / RDP" },
                { k: "ENCRYPTION", v: "AES-256 / RSA-2048" },
                { k: "PAYMENT", v: "Bitcoin / Monero" },
                { k: "FIRST SEEN", v: "1989" },
              ].map((r) => (
                <div key={r.k} className="rw-threat-row">
                  <span className="rw-threat-key">{r.k}</span>
                  <span className="rw-threat-val">{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rw-stats-row">
        {STATS.map((s, i) => (
          <div
            key={s.val}
            className="rw-stat"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <span className="rw-stat-val">{s.val}</span>
            <span className="rw-stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      <section className="rw-section">
        <div className="rw-section-head">
          <span className="rw-eyebrow">// 01 — OVERVIEW</span>
          <h2 className="rw-h2">The Basics</h2>
        </div>
        <div className="rw-split-3">
          {[
            {
              num: "A",
              title: "WHAT IT DOES",
              icon: "🔒",
              body: "Encrypts every accessible file documents, photos, databases and replaces them with locked, unreadable versions. Access is restored only after ransom payment, if at all.",
            },
            {
              num: "B",
              title: "HOW IT SPREADS",
              icon: "⚡",
              body: "Enters via phishing emails, malicious attachments, unpatched software, or stolen remote-access credentials. Once inside, advanced strains spread automatically across entire networks.",
            },
            {
              num: "C",
              title: "WHY IT MATTERS",
              icon: "🌐",
              body: "Has shut down hospitals mid-surgery, halted oil pipelines, crippled schools, and cost the global economy tens of billions. Every connected device is a potential target.",
            },
          ].map((c) => (
            <div key={c.num} className="rw-split-card">
              <div className="rw-split-icon">{c.icon}</div>
              <div className="rw-split-num">{c.num}</div>
              <div className="rw-split-title">{c.title}</div>
              <p className="rw-split-body">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rw-section">
        <div className="rw-section-head">
          <span className="rw-eyebrow">// 02 — HISTORY</span>
          <h2 className="rw-h2">Key Milestones</h2>
        </div>
        <div className="rw-timeline">
          {TIMELINE.map((t, i) => (
            <div key={t.year} className="rw-tl-row">
              <div className="rw-tl-year">{t.year}</div>
              <div className="rw-tl-mid">
                <div className="rw-tl-node" />
                {i < TIMELINE.length - 1 && <div className="rw-tl-line" />}
              </div>
              <div className="rw-tl-text">{t.event}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="rw-cta-strip">
        <div>
          <span className="rw-eyebrow">// LEARN MORE</span>
          <p className="rw-cta-headline">Ready to go deeper?</p>
        </div>
        <div className="rw-cta-btns">
          <button
            className="rw-btn-solid"
            onClick={() => setActive("Discussion")}
          >
            Full Discussion →
          </button>
          <button
            className="rw-btn-ghost"
            onClick={() => setActive("Reflection")}
          >
            Read Reflection
          </button>
        </div>
      </section>
    </div>
  );
}

// ── DISCUSSION ────────────────────────────────────────────────────────────────

function Discussion() {
  const [tab, setTab] = useState("def");
  const cur = DISCUSSION_SECTIONS.find((s) => s.id === tab);
  return (
    <div className="rw-page">
      <div className="rw-page-head">
        <span className="rw-eyebrow"></span>
        <h1 className="rw-page-title">Understanding Ransomware</h1>
        <p className="rw-page-intro">
          A detailed breakdown of ransomware what it is, how it works, its
          variants, real cases, and how to defend against it.
        </p>
      </div>
      <div className="rw-tab-bar">
        {DISCUSSION_SECTIONS.map((s) => (
          <button
            key={s.id}
            className={`rw-tab ${tab === s.id ? "rw-tab-active" : ""}`}
            onClick={() => setTab(s.id)}
          >
            <span className="rw-tab-num">{s.label}</span>
            <span className="rw-tab-name">{s.title}</span>
          </button>
        ))}
      </div>
      <div className="rw-tab-content">
        <div className="rw-tab-content-header">
          <span className="rw-tab-content-icon">{cur.icon}</span>
          <h2 className="rw-tab-content-title">{cur.title}</h2>
        </div>
        {cur.blocks.map((block, i) => {
          if (block.type === "text")
            return (
              <p key={i} className="rw-disc-text">
                {block.text}
              </p>
            );
          if (block.type === "highlight")
            return (
              <div key={i} className="rw-disc-highlight">
                <span className="rw-disc-mono">{block.text}</span>
              </div>
            );
          if (block.type === "steps")
            return (
              <div key={i} className="rw-steps">
                {block.items.map((s, j) => (
                  <div key={j} className="rw-step">
                    <div className="rw-step-left">
                      <div className="rw-step-num">
                        {String(j + 1).padStart(2, "0")}
                      </div>
                      {j < block.items.length - 1 && (
                        <div className="rw-step-connector" />
                      )}
                    </div>
                    <div className="rw-step-right">
                      <div className="rw-step-name">{s.name}</div>
                      <p className="rw-step-desc">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            );
          if (block.type === "table")
            return (
              <div key={i} className="rw-disc-table">
                {block.items.map((row, j) => (
                  <div key={j} className="rw-disc-row">
                    <span
                      className="rw-disc-term"
                      style={{
                        borderLeftColor: row.color || "var(--rw-accent)",
                      }}
                    >
                      {row.term}
                    </span>
                    <span className="rw-disc-def">{row.def}</span>
                  </div>
                ))}
              </div>
            );
          if (block.type === "cases")
            return (
              <div key={i} className="rw-cases">
                {block.items.map((c, j) => (
                  <div key={j} className="rw-case">
                    <div className="rw-case-top">
                      <span className="rw-case-name">{c.name}</span>
                      <span className="rw-case-badge">CASE STUDY</span>
                    </div>
                    <div className="rw-case-meta">
                      <span className="rw-case-key">TARGET</span>
                      <span className="rw-case-val">{c.target}</span>
                    </div>
                    <div className="rw-case-meta">
                      <span className="rw-case-key">IMPACT</span>
                      <span className="rw-case-val">{c.impact}</span>
                    </div>
                    <p className="rw-case-detail">{c.detail}</p>
                  </div>
                ))}
              </div>
            );
          return null;
        })}
      </div>
    </div>
  );
}

// ── ARTICLES ──────────────────────────────────────────────────────────────────

function Articles() {
  return (
    <div className="rw-page">
      <div className="rw-page-head">
        <span className="rw-eyebrow"></span>
        <h1 className="rw-page-title">In the Headlines</h1>
        <p className="rw-page-intro">
          Five key articles and reports on real ransomware attacks, research
          findings, and law-enforcement actions.
        </p>
      </div>
      <div className="rw-articles">
        {ARTICLES.map((a) => (
          <article key={a.num} className="rw-article">
            <div className="rw-article-left" style={{ borderColor: a.color }}>
              <span className="rw-article-num" style={{ color: a.color }}>
                {a.num}
              </span>
              <span className="rw-article-tag" style={{ background: a.color }}>
                {a.tag}
              </span>
              <span className="rw-article-date">{a.date}</span>
            </div>
            <div className="rw-article-right">
              <p className="rw-article-source">{a.source}</p>
              <h2 className="rw-article-title">{a.title}</h2>
              <p className="rw-article-summary">{a.summary}</p>
              <div className="rw-article-points">
                {a.points.map((pt, i) => (
                  <div key={i} className="rw-point">
                    <span
                      className="rw-point-bullet"
                      style={{ background: a.color }}
                    />
                    <span className="rw-point-text">{pt}</span>
                  </div>
                ))}
              </div>
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rw-source-link"
                style={{ color: a.color }}
              >
                Read Source →
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

// ── REFLECTION ────────────────────────────────────────────────────────────────

function Reflection() {
  const paras = [
    {
      num: "01",
      title: "THE SHOCK OF SCALE",
      text: "Before studying ransomware in depth, I assumed cyberattacks were mostly problems for large corporations entities far removed from everyday life. Learning about WannaCry completely dismantled that assumption. The idea that a single piece of code could spiral across 150 countries within a single day and force hospitals to turn away patients in genuine medical need was genuinely alarming to me. It revealed that digital threats are not abstract technical issues confined to server rooms they are physical-world emergencies with life-or-death consequences. The fact that the vulnerability exploited by WannaCry had a patch available that many organizations had simply never applied made it even more sobering. Negligence in the digital space costs lives in the real world.",
    },
    {
      num: "02",
      title: "THE HUMAN ELEMENT",
      text: "What surprised me most was how little of ransomware's success depends on sophisticated code, and how much depends on human psychology. The majority of attacks begin with a phishing email carefully crafted to look trustworthy and provoke urgency. Attackers do not need to break through firewalls if they can simply trick a person into opening a door for them. This made me reflect on my own digital habits: How carefully do I read email senders? Do I verify links before clicking? Am I using multi-factor authentication? Studying ransomware has made me far more conscious of my online behavior not out of paranoia, but out of informed awareness. Cybersecurity is less about technology and more about cultivating a disciplined, skeptical mindset.",
    },
    {
      num: "03",
      title: "A SHARED RESPONSIBILITY",
      text: "Ransomware thrives because of a global ecosystem that enables it unpatched systems, poor password hygiene, lack of training, and tolerance of cybercriminal groups. The Colonial Pipeline attack showed ransomware is now a matter of national security, not just an IT problem. Yet I believe individual awareness is where meaningful change begins. Every person who learns to spot a phishing email, every organization that maintains offline backups, and every institution that runs security training is a link in a chain of collective defense. This topic has genuinely changed how I see my role as a digital citizen. We are not passive bystanders we are participants and the choices we make about how we use and protect technology have real consequences for communities and critical infrastructure worldwide.",
    },
  ];
  return (
    <div className="rw-page">
      <div className="rw-page-head">
        <span className="rw-eyebrow"></span>
        <h1 className="rw-page-title">My Reflection</h1>
        <p className="rw-page-intro">
          Three paragraphs on what studying ransomware taught me about
          technology, people, and responsibility.
        </p>
      </div>
      <div className="rw-quote-block">
        <div className="rw-quote-mark">"</div>
        <div className="rw-quote-body">
          <p className="rw-quote-text">
            It takes 20 years to build a reputation and a few minutes of
            cyber-incident to ruin it.
          </p>
          <p className="rw-quote-attr">— Stephane Nappo, Global CISO</p>
        </div>
      </div>
      <div className="rw-reflections">
        {paras.map((p) => (
          <div key={p.num} className="rw-reflection-card">
            <div className="rw-rc-header">
              <span className="rw-rc-num">{p.num}</span>
              <span className="rw-rc-title">{p.title}</span>
            </div>
            <p className="rw-rc-text">{p.text}</p>
          </div>
        ))}
      </div>
      <div className="rw-closing">
        <span className="rw-eyebrow">// FINAL THOUGHT</span>
        <p className="rw-closing-text">KNOWLEDGE IS THE BEST FIREWALL.</p>
      </div>
    </div>
  );
}

// ── ABOUT ─────────────────────────────────────────────────────────────────────

function About() {
  return (
    <div className="rw-page">
      <div className="rw-page-head">
        <span className="rw-eyebrow"></span>
        <h1 className="rw-page-title">About Me</h1>
        <p className="rw-page-intro">
          The person behind this cybersecurity awareness project.
        </p>
      </div>
      <div className="rw-identity">
        <div className="rw-id-avatar">
          <img
            src="/me.jpg"
            alt="Macky"
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              boxShadow: "0 0 24px var(--rw-glow)",
            }}
          />
        </div>
        <div className="rw-id-info">
          <div className="rw-id-name">
            Jan Kramdae B. Caduyac{" "}
            <span style={{ color: "var(--rw-accent2)", fontSize: "1rem" }}>
              / Macky
            </span>
          </div>
          <div className="rw-id-grid">
            {[
              { k: "YEAR LEVEL", v: "BSIT 3" },
              { k: "SECTION", v: "3A" },
              { k: "SCHOOL", v: "Gingoog City Colleges" },
              { k: "SUBJECT", v: "Computer / IT" },
              { k: "TOPIC NO.", v: "003 — Ransomware" },
              { k: "YEAR", v: "2026" },
            ].map((d) => (
              <div key={d.k} className="rw-id-field">
                <span className="rw-id-key">{d.k}</span>
                <span className="rw-id-val">{d.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="rw-about-block">
        <div className="rw-about-block-label">INTRODUCTION</div>
        <div className="rw-about-block-body">
          <p className="rw-about-para">
            Hi! My name is Macky, a BSIT student from GCC. I am passionate about
            technology and believe that understanding digital threats is one of
            the most critical skills of the 21st century. This website was
            created as a school project to raise awareness about ransomware one
            of the fastest-growing and most financially devastating cyber
            threats today.
          </p>
          <p className="rw-about-para">
            I chose ransomware because it sits at the intersection of
            technology, crime, and real-world consequences. Reading about
            WannaCry and Colonial Pipeline made me realize how deeply our
            physical world depends on digital systems, and how vulnerable they
            become when we grow complacent.
          </p>
          <p className="rw-about-para">
            Beyond school, I enjoy gaming, coding, reading, and Basketball. I
            look forward to learning more in computer science and cybersecurity.
            Thank you for visiting I hope this site leaves you more informed and
            more vigilant online.
          </p>
        </div>
      </div>
      <div className="rw-about-block">
        <div className="rw-about-block-label">INTERESTS & SKILLS</div>
        <div className="rw-skills">
          {[
            "Programmer",
            "Videographer",
            "Web Development",
            "Digital Safety",
            "Research",
            "Problem Solving",
            "Playing Basketball",
            "Video Games",
          ].map((s) => (
            <span key={s} className="rw-skill">
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="rw-about-note">
        <span className="rw-eyebrow">// PROJECT NOTE</span>
        <p className="rw-note-text">
          This website was built as a school cybersecurity project on the topic
          of <strong style={{ color: "var(--rw-accent2)" }}>Ransomware</strong>.
          All content is compiled from credible sources including CISA, IBM
          Security, Europol, Sophos, BBC, WSJ, and MIT Technology Review. Its
          purpose is to educate and raise awareness about this critical threat.
        </p>
      </div>
    </div>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────

function Footer({ setActive }) {
  return (
    <footer className="rw-footer">
      <div className="rw-footer-inner">
        <div>
          <div className="rw-footer-brand">
            RANSOM<span style={{ color: "var(--rw-accent)" }}>WARE</span>
            <span style={{ color: "var(--rw-accent2)" }}>Macky</span>
          </div>
          <p className="rw-footer-desc">
            A school cybersecurity awareness project about ransomware how it
            works, why it matters, and how to stay protected.
          </p>
        </div>
        <div>
          <p className="rw-footer-col-label">NAVIGATION</p>
          <div className="rw-footer-links">
            {NAV_LINKS.map((l) => (
              <button
                key={l}
                className="rw-footer-link"
                onClick={() => {
                  setActive(l);
                  window.scrollTo({ top: 0 });
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="rw-footer-col-label">SOURCES</p>
          <p className="rw-footer-sources">
            WSJ · BBC News · Sophos · Europol · MIT Tech Review · CISA · IBM
            Security · FBI IC3
          </p>
        </div>
      </div>
      <div className="rw-footer-bottom">
        <span>© 2026 — Macky Caduyac — School Cybersecurity Project</span>
        <span className="rw-footer-tag">
          TOPIC 003 · RANSOMWARE · STAY PROTECTED
        </span>
      </div>
    </footer>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState("Home");
  const [loading, setLoading] = useState(true);

  const pages = {
    Home: <Home setActive={setActive} />,
    Discussion: <Discussion />,
    Articles: <Articles />,
    Reflection: <Reflection />,
    About: <About />,
  };

  if (loading) return <LoadingScreen onDone={() => setLoading(false)} />;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }

        :root {
          --rw-bg:      #03080f;
          --rw-bg2:     #050d1a;
          --rw-surface: #081425;
          --rw-surf2:   #0a1a30;
          --rw-border:  #102040;
          --rw-accent:  #2563eb;
          --rw-accent2: #60a5fa;
          --rw-accent3: #93c5fd;
          --rw-text:    #dbeafe;
          --rw-muted:   #6b9fd4;
          --rw-dim:     #2a4a6e;
          --rw-glow:    rgba(37,99,235,0.25);
          --rw-head:    'Space Grotesk', sans-serif;
          --rw-mono:    'Space Mono', monospace;
        }

        body { background:var(--rw-bg); color:var(--rw-text); font-family:var(--rw-head); min-height:100vh; overflow-x:hidden; }
        ::selection { background:var(--rw-accent); color:#fff; }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-track { background:var(--rw-bg); }
        ::-webkit-scrollbar-thumb { background:var(--rw-accent); }

        /* radial glow blobs */
        .rw-bg-blobs {
          position:fixed; inset:0; z-index:0; pointer-events:none;
          background:
            radial-gradient(ellipse 55% 45% at 15% 25%, rgba(37,99,235,0.07) 0%, transparent 65%),
            radial-gradient(ellipse 40% 50% at 85% 75%, rgba(96,165,250,0.05) 0%, transparent 60%),
            radial-gradient(ellipse 35% 35% at 50% 95%, rgba(37,99,235,0.06) 0%, transparent 60%);
          animation: blobDrift 12s ease-in-out infinite alternate;
        }
        @keyframes blobDrift { 0%{opacity:0.7;transform:scale(1)} 100%{opacity:1;transform:scale(1.04)} }

        .rw-nav, .rw-page, .rw-footer { position:relative; z-index:1; }

        @keyframes pulseNode {
          0%,100% { box-shadow:0 0 4px rgba(96,165,250,0.3); }
          50%      { box-shadow:0 0 14px rgba(96,165,250,0.7), 0 0 28px rgba(37,99,235,0.3); }
        }
        @keyframes slideInUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn    { from{opacity:0} to{opacity:1} }

        /* NAV */
        .rw-nav { position:sticky; top:0; z-index:100; display:flex; align-items:center; padding:0 2rem; height:58px; background:rgba(3,8,15,0.92); border-bottom:1px solid var(--rw-border); backdrop-filter:blur(16px); gap:2rem; }
        .rw-nav-brand { display:flex; align-items:center; gap:10px; background:none; border:none; cursor:pointer; flex-shrink:0; }
        .rw-nav-badge { width:28px; height:28px; background:var(--rw-accent); display:flex; align-items:center; justify-content:center; font-family:var(--rw-mono); font-size:12px; font-weight:700; color:#fff; animation:pulseNode 3s ease-in-out infinite; }
        .rw-nav-name  { font-family:var(--rw-mono); font-size:13px; letter-spacing:2px; color:var(--rw-text); font-weight:700; }
        .rw-nav-dot   { color:var(--rw-accent2); }
        .rw-nav-links { display:flex; align-items:center; gap:2px; margin-left:auto; }
        .rw-nav-link  { padding:6px 14px; background:none; border:none; cursor:pointer; font-family:var(--rw-head); font-size:13px; font-weight:500; color:var(--rw-muted); letter-spacing:0.5px; border-radius:3px; transition:color 0.15s,background 0.15s; }
        .rw-nav-link:hover { color:var(--rw-text); background:var(--rw-surface); }
        .rw-nav-link.rw-active { color:var(--rw-accent2); background:rgba(37,99,235,0.12); }
        .rw-hamburger { display:none; flex-direction:column; gap:5px; background:none; border:none; cursor:pointer; padding:6px; margin-left:auto; }
        .rw-hamburger span { display:block; width:20px; height:1.5px; background:var(--rw-text); transition:all 0.2s; }
        .rw-mobile-menu { position:absolute; top:58px; left:0; right:0; background:var(--rw-surface); border-bottom:1px solid var(--rw-border); display:flex; flex-direction:column; z-index:99; }
        .rw-mobile-link { padding:14px 24px; background:none; border:none; cursor:pointer; font-family:var(--rw-head); font-size:14px; font-weight:500; color:var(--rw-muted); text-align:left; border-bottom:1px solid var(--rw-border); display:flex; align-items:center; gap:10px; transition:color 0.15s; }
        .rw-mobile-link:hover,.rw-mobile-link.rw-active { color:var(--rw-accent2); }
        .rw-mobile-arrow { font-family:var(--rw-mono); font-size:12px; color:var(--rw-dim); }
        .rw-mobile-link.rw-active .rw-mobile-arrow { color:var(--rw-accent); }

        /* PAGE SHELL */
        .rw-page { max-width:1060px; margin:0 auto; padding:3rem 1.5rem 6rem; animation:fadeIn 0.5s ease; }
        .rw-section { margin-bottom:4rem; }
        .rw-section-head { margin-bottom:1.5rem; }
        .rw-eyebrow { display:block; font-family:var(--rw-mono); font-size:10px; letter-spacing:2.5px; color:var(--rw-accent2); margin-bottom:6px; }
        .rw-h2 { font-family:var(--rw-head); font-size:clamp(1.4rem,3vw,2rem); font-weight:700; color:var(--rw-text); letter-spacing:-0.3px; }
        .rw-page-head { margin-bottom:2.5rem; animation:slideInUp 0.6s ease; }
        .rw-page-title { font-family:var(--rw-head); font-size:clamp(2rem,6vw,3.5rem); font-weight:700; color:var(--rw-text); letter-spacing:-0.5px; line-height:1.05; margin-bottom:0.75rem; }
        .rw-page-intro { font-family:var(--rw-mono); font-size:12px; line-height:1.9; color:var(--rw-muted); max-width:600px; }

        /* HERO */
        .rw-hero { display:grid; grid-template-columns:1fr 1fr; gap:3rem; align-items:center; padding:3rem 0 2rem; margin-bottom:2rem; }
        .rw-hero-eyebrow { font-family:var(--rw-mono); font-size:10px; letter-spacing:2px; color:var(--rw-muted); margin-bottom:1.25rem; display:flex; align-items:center; gap:8px; }
        .rw-hero-eyebrow-dot { width:6px; height:6px; border-radius:50%; background:var(--rw-accent); display:inline-block; animation:pulseNode 2s infinite; }
        .rw-hero-h1 { font-family:var(--rw-head); font-size:clamp(3.5rem,9vw,6.5rem); font-weight:700; line-height:0.95; letter-spacing:-2px; color:var(--rw-text); margin-bottom:1.25rem; animation:slideInUp 0.7s ease; }
        .rw-hero-hollow { -webkit-text-stroke:2px var(--rw-accent); -webkit-text-fill-color:transparent; }
        .rw-hero-desc { font-size:14px; line-height:1.75; color:var(--rw-muted); max-width:460px; margin-bottom:2rem; }
        .rw-hero-actions { display:flex; flex-wrap:wrap; gap:10px; }
        .rw-btn-solid { padding:10px 22px; background:var(--rw-accent); color:#fff; border:none; cursor:pointer; font-family:var(--rw-head); font-size:13px; font-weight:600; border-radius:2px; transition:filter 0.15s,transform 0.1s; }
        .rw-btn-solid:hover { filter:brightness(1.15); transform:translateY(-1px); }
        .rw-btn-ghost { padding:10px 22px; background:transparent; border:1px solid var(--rw-border); color:var(--rw-muted); cursor:pointer; font-family:var(--rw-head); font-size:13px; font-weight:600; border-radius:2px; transition:border-color 0.15s,color 0.15s; }
        .rw-btn-ghost:hover { border-color:var(--rw-accent2); color:var(--rw-text); }

        /* Threat box */
        .rw-threat-box { background:var(--rw-surface); border:1px solid var(--rw-border); border-top:2px solid var(--rw-accent); }
        .rw-threat-header { display:flex; align-items:center; gap:6px; padding:10px 16px; border-bottom:1px solid var(--rw-border); }
        .rw-threat-dot { width:8px; height:8px; border-radius:50%; }
        .rw-dot-red{background:#ef4444} .rw-dot-yellow{background:#f59e0b} .rw-dot-dim{background:var(--rw-dim)}
        .rw-threat-title { margin-left:auto; font-family:var(--rw-mono); font-size:9px; letter-spacing:2px; color:var(--rw-muted); }
        .rw-threat-body { padding:16px; }
        .rw-threat-level-row { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
        .rw-threat-level { font-family:var(--rw-head); font-size:2rem; font-weight:700; color:#ef4444; letter-spacing:2px; text-shadow:0 0 20px rgba(239,68,68,0.4); }
        .rw-threat-badge { font-family:var(--rw-mono); font-size:9px; letter-spacing:1.5px; padding:3px 8px; border:1px solid #ef4444; color:#ef4444; animation:pulseNode 2s infinite; }
        .rw-threat-bar { height:4px; background:var(--rw-border); margin-bottom:16px; border-radius:2px; overflow:hidden; }
        .rw-threat-fill { width:95%; height:100%; background:linear-gradient(90deg,var(--rw-accent),#ef4444); }
        .rw-threat-row { display:flex; justify-content:space-between; padding:7px 0; border-bottom:1px solid var(--rw-border); }
        .rw-threat-row:last-child { border-bottom:none; }
        .rw-threat-key { font-family:var(--rw-mono); font-size:9px; letter-spacing:1.5px; color:var(--rw-dim); }
        .rw-threat-val { font-family:var(--rw-mono); font-size:10px; color:var(--rw-accent2); }

        /* Stats */
        .rw-stats-row { display:grid; grid-template-columns:repeat(4,1fr); border:1px solid var(--rw-border); margin-bottom:4rem; background:var(--rw-surface); }
        .rw-stat { padding:1.25rem 1.5rem; border-right:1px solid var(--rw-border); position:relative; overflow:hidden; transition:background 0.2s; }
        .rw-stat:last-child{border-right:none}
        .rw-stat:hover{background:rgba(37,99,235,0.06)}
        .rw-stat::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--rw-accent);transform:scaleX(0);transform-origin:left;transition:transform 0.3s}
        .rw-stat:hover::after{transform:scaleX(1)}
        .rw-stat-val   { display:block; font-family:var(--rw-head); font-weight:700; font-size:clamp(1.4rem,3vw,2rem); color:var(--rw-accent2); letter-spacing:-0.5px; }
        .rw-stat-label { display:block; font-family:var(--rw-mono); font-size:10px; color:var(--rw-muted); margin-top:4px; letter-spacing:0.5px; }

        /* Split 3 */
        .rw-split-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:var(--rw-border); }
        .rw-split-card { background:var(--rw-surface); padding:2rem 1.5rem; transition:background 0.2s; }
        .rw-split-card:hover{background:var(--rw-surf2)}
        .rw-split-icon  { font-size:1.75rem; margin-bottom:12px; display:block; }
        .rw-split-num   { font-family:var(--rw-mono); font-size:11px; font-weight:700; color:var(--rw-accent); letter-spacing:2px; margin-bottom:10px; width:28px; height:28px; border:1px solid var(--rw-accent); display:flex; align-items:center; justify-content:center; }
        .rw-split-title { font-family:var(--rw-mono); font-size:11px; font-weight:700; letter-spacing:2px; color:var(--rw-text); margin-bottom:12px; }
        .rw-split-body  { font-size:13px; line-height:1.75; color:var(--rw-muted); }

        /* Timeline */
        .rw-timeline { display:flex; flex-direction:column; }
        .rw-tl-row   { display:grid; grid-template-columns:56px 28px 1fr; gap:0 16px; align-items:start; }
        .rw-tl-year  { font-family:var(--rw-mono); font-size:12px; font-weight:700; color:var(--rw-accent); padding-top:2px; text-align:right; }
        .rw-tl-mid   { display:flex; flex-direction:column; align-items:center; }
        .rw-tl-node  { width:10px; height:10px; border-radius:50%; background:var(--rw-accent); flex-shrink:0; box-shadow:0 0 8px var(--rw-glow); margin-top:3px; animation:pulseNode 3s infinite; }
        .rw-tl-line  { flex:1; width:1px; background:var(--rw-border); min-height:28px; }
        .rw-tl-text  { font-size:13px; line-height:1.65; color:var(--rw-muted); padding-bottom:20px; }

        /* CTA */
        .rw-cta-strip { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1.5rem; padding:2rem; background:var(--rw-surface); border:1px solid var(--rw-border); border-left:3px solid var(--rw-accent); }
        .rw-cta-headline { font-family:var(--rw-head); font-size:1.3rem; font-weight:700; color:var(--rw-text); margin-top:4px; }
        .rw-cta-btns { display:flex; gap:10px; flex-wrap:wrap; }

        /* DISCUSSION TABS */
        .rw-tab-bar { display:flex; flex-wrap:wrap; gap:2px; margin-bottom:2px; border-bottom:1px solid var(--rw-border); }
        .rw-tab { display:flex; align-items:center; gap:8px; padding:10px 16px; background:none; border:none; cursor:pointer; border-bottom:2px solid transparent; margin-bottom:-1px; transition:color 0.15s; }
        .rw-tab-num  { font-family:var(--rw-mono); font-size:10px; color:var(--rw-dim); letter-spacing:1px; }
        .rw-tab-name { font-family:var(--rw-head); font-size:12px; font-weight:600; color:var(--rw-muted); white-space:nowrap; }
        .rw-tab:hover .rw-tab-name{color:var(--rw-text)}
        .rw-tab-active{border-bottom-color:var(--rw-accent)}
        .rw-tab-active .rw-tab-name{color:var(--rw-accent2)}
        .rw-tab-active .rw-tab-num{color:var(--rw-accent)}
        .rw-tab-content { padding:2rem; background:var(--rw-surface); border:1px solid var(--rw-border); border-top:none; min-height:300px; animation:fadeIn 0.3s ease; }
        .rw-tab-content-header { display:flex; align-items:center; gap:12px; margin-bottom:1.5rem; padding-bottom:1rem; border-bottom:1px solid var(--rw-border); }
        .rw-tab-content-icon{font-size:1.5rem}
        .rw-tab-content-title { font-family:var(--rw-head); font-size:1.3rem; font-weight:700; color:var(--rw-text); }
        .rw-disc-text { font-size:13.5px; line-height:1.9; color:var(--rw-muted); margin-bottom:1rem; }
        .rw-disc-highlight { padding:14px 18px; background:var(--rw-bg2); border-left:3px solid var(--rw-accent); margin:1rem 0; }
        .rw-disc-mono { font-family:var(--rw-mono); font-size:11px; color:var(--rw-accent2); letter-spacing:0.5px; }
        .rw-steps{display:flex;flex-direction:column}
        .rw-step{display:flex;gap:16px}
        .rw-step-left{display:flex;flex-direction:column;align-items:center;flex-shrink:0}
        .rw-step-num{width:36px;height:36px;border-radius:50%;background:var(--rw-accent);color:#fff;font-family:var(--rw-mono);font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .rw-step-connector{flex:1;width:1px;background:var(--rw-border);min-height:20px}
        .rw-step-right{padding-bottom:1.5rem;flex:1}
        .rw-step-name{font-family:var(--rw-head);font-size:13px;font-weight:700;color:var(--rw-accent2);margin-bottom:4px;margin-top:6px}
        .rw-step-desc{font-size:13px;line-height:1.75;color:var(--rw-muted)}
        .rw-disc-table{display:flex;flex-direction:column;gap:2px}
        .rw-disc-row{display:flex;background:var(--rw-bg2);border:1px solid var(--rw-border);transition:background 0.15s}
        .rw-disc-row:hover{background:rgba(37,99,235,0.05)}
        .rw-disc-term{font-family:var(--rw-mono);font-size:11px;font-weight:700;color:var(--rw-accent2);padding:12px 16px;border-left:3px solid var(--rw-accent);min-width:220px;flex-shrink:0;border-right:1px solid var(--rw-border);display:flex;align-items:center}
        .rw-disc-def{font-size:13px;line-height:1.6;color:var(--rw-muted);padding:12px 16px}
        .rw-cases{display:flex;flex-direction:column;gap:16px}
        .rw-case{padding:1.25rem;background:var(--rw-bg2);border:1px solid var(--rw-border);border-top:2px solid var(--rw-accent)}
        .rw-case-top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:12px}
        .rw-case-name{font-family:var(--rw-head);font-size:1rem;font-weight:700;color:var(--rw-text)}
        .rw-case-badge{font-family:var(--rw-mono);font-size:9px;letter-spacing:1.5px;padding:3px 8px;background:var(--rw-accent);color:#fff;flex-shrink:0}
        .rw-case-meta{display:flex;gap:10px;margin-bottom:6px;font-family:var(--rw-mono);font-size:11px}
        .rw-case-key{color:var(--rw-accent);min-width:55px}
        .rw-case-val{color:var(--rw-muted)}
        .rw-case-detail{font-size:13px;line-height:1.75;color:var(--rw-muted);margin-top:10px;padding-top:10px;border-top:1px solid var(--rw-border)}

        /* ARTICLES */
        .rw-articles{display:flex;flex-direction:column;gap:1px;background:var(--rw-border)}
        .rw-article{display:flex;background:var(--rw-surface);transition:background 0.2s}
        .rw-article:hover{background:var(--rw-surf2)}
        .rw-article-left{display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:10px;padding:1.5rem 1rem;flex-shrink:0;width:90px;border-right:2px solid var(--rw-border)}
        .rw-article-num{font-family:var(--rw-mono);font-size:11px;font-weight:700;letter-spacing:1px}
        .rw-article-tag{font-family:var(--rw-mono);font-size:9px;font-weight:700;letter-spacing:1px;padding:3px 6px;color:#000;text-align:center}
        .rw-article-date{font-family:var(--rw-mono);font-size:9px;color:var(--rw-dim);text-align:center;writing-mode:vertical-rl;transform:rotate(180deg);margin-top:auto}
        .rw-article-right{flex:1;padding:1.5rem}
        .rw-article-source{font-family:var(--rw-mono);font-size:10px;letter-spacing:1.5px;color:var(--rw-accent2);margin-bottom:6px}
        .rw-article-title{font-family:var(--rw-head);font-size:clamp(1rem,2.5vw,1.3rem);font-weight:700;color:var(--rw-text);margin-bottom:10px;line-height:1.25}
        .rw-article-summary{font-size:13px;line-height:1.75;color:var(--rw-muted);margin-bottom:14px}
        .rw-article-points{display:flex;flex-direction:column;gap:6px;margin-bottom:16px}
        .rw-point{display:flex;align-items:flex-start;gap:10px}
        .rw-point-bullet{width:6px;height:6px;border-radius:50%;flex-shrink:0;margin-top:5px}
        .rw-point-text{font-size:12px;color:var(--rw-muted);line-height:1.6}
        .rw-source-link{font-family:var(--rw-mono);font-size:11px;letter-spacing:1.5px;text-decoration:none;transition:letter-spacing 0.2s}
        .rw-source-link:hover{letter-spacing:2.5px}

        /* REFLECTION */
        .rw-quote-block{display:flex;gap:1.5rem;padding:2rem;background:var(--rw-surface);border:1px solid var(--rw-border);margin-bottom:2.5rem;border-left:4px solid var(--rw-accent)}
        .rw-quote-mark{font-family:var(--rw-head);font-size:5rem;font-weight:700;color:var(--rw-accent);line-height:0.7;flex-shrink:0}
        .rw-quote-text{font-family:var(--rw-head);font-size:clamp(1rem,2.5vw,1.4rem);font-weight:600;color:var(--rw-text);line-height:1.4;margin-bottom:10px}
        .rw-quote-attr{font-family:var(--rw-mono);font-size:11px;color:var(--rw-muted)}
        .rw-reflections{display:flex;flex-direction:column;gap:2px;background:var(--rw-border);margin-bottom:2rem}
        .rw-reflection-card{background:var(--rw-surface);padding:2rem}
        .rw-rc-header{display:flex;align-items:center;gap:16px;margin-bottom:1rem}
        .rw-rc-num{font-family:var(--rw-mono);font-size:11px;font-weight:700;color:var(--rw-accent);letter-spacing:1px;width:32px;height:32px;border:1px solid var(--rw-accent);display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .rw-rc-title{font-family:var(--rw-mono);font-size:11px;font-weight:700;letter-spacing:2px;color:var(--rw-accent2)}
        .rw-rc-text{font-size:14px;line-height:1.9;color:var(--rw-muted);text-align:justify}
        .rw-closing{padding:2.5rem;background:linear-gradient(135deg,var(--rw-surface) 0%,var(--rw-bg2) 100%);border:1px solid var(--rw-border);border-left:4px solid var(--rw-accent);text-align:center}
        .rw-closing-text{font-family:var(--rw-head);font-size:clamp(1.2rem,3.5vw,2rem);font-weight:700;color:var(--rw-text);letter-spacing:1px;margin-top:8px}

        /* ABOUT */
        .rw-identity{display:flex;margin-bottom:2.5rem;border:1px solid var(--rw-border);background:var(--rw-surface)}
        .rw-id-avatar{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:2rem 1.5rem;flex-shrink:0;min-width:150px;background:var(--rw-bg2);border-right:1px solid var(--rw-border)}
        .rw-id-photo-label{font-family:var(--rw-mono);font-size:9px;letter-spacing:1.5px;color:var(--rw-dim);text-align:center}
        .rw-id-info{flex:1;padding:1.5rem}
        .rw-id-name{font-family:var(--rw-head);font-size:1.5rem;font-weight:700;color:var(--rw-text);margin-bottom:1rem;padding-bottom:1rem;border-bottom:1px solid var(--rw-border)}
        .rw-id-grid{display:grid;grid-template-columns:repeat(2,1fr)}
        .rw-id-field{display:flex;flex-direction:column;gap:2px;padding:10px 12px;border-right:1px solid var(--rw-border);border-bottom:1px solid var(--rw-border)}
        .rw-id-field:nth-child(even){border-right:none}
        .rw-id-key{font-family:var(--rw-mono);font-size:9px;letter-spacing:1.5px;color:var(--rw-accent)}
        .rw-id-val{font-family:var(--rw-head);font-size:13px;font-weight:500;color:var(--rw-text)}
        .rw-about-block{display:flex;margin-bottom:1.5rem;border:1px solid var(--rw-border)}
        .rw-about-block-label{font-family:var(--rw-mono);font-size:9px;font-weight:700;letter-spacing:2px;color:var(--rw-accent);padding:1.5rem 1rem;background:var(--rw-bg2);border-right:1px solid var(--rw-border);writing-mode:vertical-rl;transform:rotate(180deg);flex-shrink:0;display:flex;align-items:center}
        .rw-about-block-body{padding:1.5rem;flex:1;background:var(--rw-surface)}
        .rw-about-para{font-size:13.5px;line-height:1.85;color:var(--rw-muted);margin-bottom:0.85rem}
        .rw-about-para:last-child{margin-bottom:0}
        .rw-skills{display:flex;flex-wrap:wrap;gap:8px}
        .rw-skill{font-family:var(--rw-mono);font-size:10px;letter-spacing:1px;padding:6px 14px;border:1px solid var(--rw-accent);color:var(--rw-accent2);border-radius:1px;transition:background 0.15s,transform 0.1s;cursor:default}
        .rw-skill:hover{background:rgba(37,99,235,0.1);transform:translateY(-1px)}
        .rw-about-note{padding:1.5rem;background:var(--rw-bg2);border:1px solid var(--rw-border);border-left:3px solid var(--rw-accent);margin-top:0.5rem}
        .rw-note-text{font-size:13px;line-height:1.8;color:var(--rw-muted);margin-top:6px}

        /* FOOTER */
        .rw-footer{border-top:1px solid var(--rw-border);background:var(--rw-bg2);margin-top:4rem}
        .rw-footer-inner{max-width:1060px;margin:0 auto;padding:3rem 1.5rem;display:grid;grid-template-columns:2fr 1fr 1fr;gap:3rem}
        .rw-footer-brand{font-family:var(--rw-head);font-size:1.1rem;font-weight:700;color:var(--rw-text);letter-spacing:1px;margin-bottom:10px;display:block}
        .rw-footer-desc{font-size:13px;line-height:1.7;color:var(--rw-muted)}
        .rw-footer-col-label{font-family:var(--rw-mono);font-size:9px;font-weight:700;letter-spacing:2px;color:var(--rw-accent);margin-bottom:14px}
        .rw-footer-links{display:flex;flex-direction:column;gap:8px}
        .rw-footer-link{background:none;border:none;cursor:pointer;font-family:var(--rw-head);font-size:13px;font-weight:500;color:var(--rw-muted);text-align:left;padding:0;transition:color 0.15s}
        .rw-footer-link:hover{color:var(--rw-accent2)}
        .rw-footer-sources{font-family:var(--rw-mono);font-size:10px;color:var(--rw-dim);line-height:1.9;letter-spacing:0.5px}
        .rw-footer-bottom{max-width:1060px;margin:0 auto;padding:1.25rem 1.5rem;border-top:1px solid var(--rw-border);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;font-family:var(--rw-mono);font-size:10px;color:var(--rw-dim)}
        .rw-footer-tag{color:var(--rw-accent);opacity:0.7}

        /* RESPONSIVE */
        @media(max-width:900px){
          .rw-hero{grid-template-columns:1fr;gap:2rem}
          .rw-hero-right{display:none}
          .rw-stats-row{grid-template-columns:repeat(2,1fr)}
          .rw-stat:nth-child(2){border-right:none}
          .rw-split-3{grid-template-columns:repeat(2,1fr)}
          .rw-tab-bar{overflow-x:auto;flex-wrap:nowrap}
          .rw-tab{flex-shrink:0}
          .rw-disc-term{min-width:160px}
          .rw-footer-inner{grid-template-columns:1fr 1fr}
          .rw-footer-inner>div:first-child{grid-column:1/-1}
          .rw-nav-links{display:none}
          .rw-hamburger{display:flex}
        }
        @media(max-width:600px){
          .rw-nav{padding:0 1rem}
          .rw-page{padding:2rem 1rem 5rem}
          .rw-hero-h1{font-size:clamp(3rem,14vw,5rem);letter-spacing:-1px}
          .rw-stats-row{grid-template-columns:repeat(2,1fr)}
          .rw-stat{padding:1rem}
          .rw-split-3{grid-template-columns:1fr}
          .rw-tl-row{grid-template-columns:44px 20px 1fr}
          .rw-disc-row{flex-direction:column}
          .rw-disc-term{min-width:unset;border-right:none;border-bottom:1px solid var(--rw-border)}
          .rw-article{flex-direction:column}
          .rw-article-left{flex-direction:row;width:100%;border-right:none;border-bottom:1px solid var(--rw-border);padding:10px 16px;align-items:center}
          .rw-article-date{writing-mode:horizontal-tb;transform:none;margin-top:0;margin-left:auto}
          .rw-identity{flex-direction:column}
          .rw-id-avatar{border-right:none;border-bottom:1px solid var(--rw-border);min-width:unset;padding:1.25rem;flex-direction:row}
          .rw-id-grid{grid-template-columns:1fr}
          .rw-id-field:nth-child(even){border-right:none}
          .rw-id-field{border-right:none}
          .rw-about-block{flex-direction:column}
          .rw-about-block-label{writing-mode:horizontal-tb;transform:none;border-right:none;border-bottom:1px solid var(--rw-border);padding:10px 16px}
          .rw-quote-block{flex-direction:column;gap:0.5rem}
          .rw-quote-mark{font-size:3rem}
          .rw-footer-inner{grid-template-columns:1fr;gap:2rem}
          .rw-footer-inner>div:first-child{grid-column:unset}
          .rw-footer-bottom{flex-direction:column;align-items:flex-start}
          .rw-tab-content{padding:1.25rem}
          .rw-cta-strip{flex-direction:column;align-items:flex-start}
          .rw-hero-actions,.rw-cta-btns{flex-direction:column}
          .rw-btn-solid,.rw-btn-ghost{width:100%;text-align:center}
        }
        @media(max-width:380px){
          .rw-stats-row{grid-template-columns:1fr 1fr}
          .rw-page-title{font-size:1.8rem}
          .rw-tab-name{display:none}
        }
      `}</style>

      <FloatingPadlocksBg />
      <div className="rw-bg-blobs" />
      <NavBar active={active} setActive={setActive} />
      {pages[active]}
      <Footer setActive={setActive} />
    </>
  );
}
