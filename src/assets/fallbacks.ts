/**
 * High-fidelity, custom-designed SVG illustrations for the final 7 characters requested by the user.
 * These are stylized as luxury cosmic/gothic collection cards with gorgeous gradients, glow filters,
 * runic borders, and highly detailed vector elements.
 */

// 1. Elegant Male Vampire (Grade 2 - Vampire/Goth)
export const maleVampireVelvetSVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <defs>
    <linearGradient id="vampGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%231a0b2e"/>
      <stop offset="50%" stop-color="%230f051d"/>
      <stop offset="100%" stop-color="%232b001a"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%23ffd700"/>
      <stop offset="50%" stop-color="%23b8860b"/>
      <stop offset="100%" stop-color="%238b6508"/>
    </linearGradient>
    <filter id="crimsonGlow">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <!-- Background -->
  <rect width="100%" height="100%" fill="url(%23vampGrad)"/>
  <circle cx="200" cy="180" r="130" fill="none" stroke="%239b1c1c" stroke-width="1.5" stroke-dasharray="10 5" opacity="0.3"/>
  <circle cx="200" cy="180" r="100" fill="none" stroke="%239b1c1c" stroke-width="1" opacity="0.2"/>
  
  <!-- Gothic Cathedral Windows Silhouettes -->
  <path d="M120,240 V150 A30,30 0 0,1 180,150 V240" fill="%23000000" opacity="0.4"/>
  <path d="M220,240 V150 A30,30 0 0,1 280,150 V240" fill="%23000000" opacity="0.4"/>
  
  <!-- Vampire Silhouette & Velvet Cape -->
  <path d="M100,380 C110,300 130,260 170,230 C150,210 150,170 175,140 C165,110 190,80 200,80 C210,80 235,110 225,140 C250,170 250,210 230,230 C270,260 290,300 300,380 Z" fill="%230a0314" stroke="%239b1c1c" stroke-width="1.5"/>
  <!-- Velvet Purple Collar -->
  <path d="M140,240 C145,210 175,200 200,215 C225,200 255,210 260,240 C240,260 210,270 200,270 C190,270 160,260 140,240 Z" fill="%234c1d95" opacity="0.8" stroke="%239b1c1c" stroke-width="1"/>
  <!-- Red Cravat -->
  <path d="M190,245 L210,245 L215,280 L200,300 L185,280 Z" fill="%239b1c1c"/>
  <circle cx="200" cy="252" r="4" fill="url(%23goldGrad)"/>

  <!-- Red Glowing Eyes -->
  <circle cx="188" cy="140" r="2.5" fill="%23ff3333" filter="url(%23crimsonGlow)"/>
  <circle cx="212" cy="140" r="2.5" fill="%23ff3333" filter="url(%23crimsonGlow)"/>

  <!-- Crow & Candles -->
  <path d="M70,280 L73,285 L65,287 Z" fill="%23333333"/>
  <!-- Candle left -->
  <rect x="70" y="290" width="8" height="40" fill="%23f4f4f5"/>
  <path d="M74,280 Q77,272 74,265 Q71,272 74,280 Z" fill="%23ea580c" filter="url(%23crimsonGlow)"/>
  
  <!-- Outer Runic Border -->
  <rect x="15" y="15" width="370" height="370" fill="none" stroke="url(%23goldGrad)" stroke-width="1.5" opacity="0.8"/>
  <rect x="22" y="22" width="356" height="356" fill="none" stroke="%239b1c1c" stroke-width="0.5" opacity="0.4"/>
  <text x="200" y="365" font-family="'Courier New', monospace" font-size="12" fill="url(%23goldGrad)" letter-spacing="4" text-anchor="middle" font-weight="bold">VELVET VAMPIRE LORD</text>
  <text x="200" y="45" font-family="'Courier New', monospace" font-size="9" fill="%239b1c1c" letter-spacing="6" text-anchor="middle">GRADE II • NOBLE BLOOD</text>
</svg>`;

// 2. Spartan Greek Warrior (Grade 1 - Celestial/God/Warrior)
export const maleSpartanWarriorSVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <defs>
    <linearGradient id="spartanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%233b1a0e"/>
      <stop offset="50%" stop-color="%231a0a05"/>
      <stop offset="100%" stop-color="%234c0505"/>
    </linearGradient>
    <linearGradient id="bronzeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%23cd7f32"/>
      <stop offset="50%" stop-color="%238b5a2b"/>
      <stop offset="100%" stop-color="%235c3a21"/>
    </linearGradient>
    <filter id="goldGlow">
      <feGaussianBlur stdDeviation="5" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <!-- Background -->
  <rect width="100%" height="100%" fill="url(%23spartanGrad)"/>
  <circle cx="200" cy="185" r="120" fill="none" stroke="%23cd7f32" stroke-width="1" opacity="0.25"/>
  
  <!-- Coastal Greek Columns & Temples -->
  <path d="M40,280 V160 H60 V280" fill="%231f130e"/>
  <path d="M340,280 V160 H360 V280" fill="%231f130e"/>
  <polygon points="30,160 70,160 50,140" fill="%231f130e"/>
  <polygon points="330,160 370,160 350,140" fill="%231f130e"/>
  
  <!-- Spartan Warrior Silhouette & Golden Chestplate -->
  <path d="M120,380 C130,280 150,240 180,210 C160,190 160,150 185,120 C175,90 200,60 200,60 C200,60 225,90 215,120 C240,150 240,190 220,210 C250,240 270,280 280,380 Z" fill="%23140a05" stroke="%23cd7f32" stroke-width="1.5"/>
  
  <!-- Bronze Breastplate Details -->
  <path d="M160,250 Q200,230 240,250 L245,330 Q200,350 155,330 Z" fill="url(%23bronzeGrad)" opacity="0.9" stroke="%233d2512" stroke-width="1"/>
  <!-- Muscle details on breastplate -->
  <path d="M180,270 Q190,280 180,300" stroke="%231f130e" stroke-width="2" fill="none"/>
  <path d="M220,270 Q210,280 220,300" stroke="%231f130e" stroke-width="2" fill="none"/>
  <line x1="200" y1="260" x2="200" y2="330" stroke="%231f130e" stroke-width="1.5"/>

  <!-- Red Cape -->
  <path d="M130,230 C110,260 100,320 90,380 L140,380 Z" fill="%23991b1b"/>
  <path d="M270,230 C290,260 300,320 310,380 L260,380 Z" fill="%23991b1b"/>

  <!-- Spear -->
  <line x1="110" y1="60" x2="110" y2="380" stroke="url(%23bronzeGrad)" stroke-width="3"/>
  <polygon points="105,60 115,60 110,35" fill="url(%23bronzeGrad)" filter="url(%23goldGlow)"/>

  <!-- Outer Spartan Runic Border -->
  <rect x="15" y="15" width="370" height="370" fill="none" stroke="url(%23bronzeGrad)" stroke-width="1.5" opacity="0.8"/>
  <rect x="22" y="22" width="356" height="356" fill="none" stroke="%23991b1b" stroke-width="0.5" opacity="0.3"/>
  <text x="200" y="365" font-family="'Courier New', monospace" font-size="12" fill="url(%23bronzeGrad)" letter-spacing="4" text-anchor="middle" font-weight="bold">SPARTAN GLADIATOR</text>
  <text x="200" y="45" font-family="'Courier New', monospace" font-size="9" fill="%23cd7f32" letter-spacing="6" text-anchor="middle">GRADE I • VALIANT COMMANDER</text>
</svg>`;

// 3. Ancient Greek Hero with Club (Grade 1 - Celestial/God/Warrior)
export const maleGreekHeroClubSVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <defs>
    <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%232c221e"/>
      <stop offset="50%" stop-color="%23150e0c"/>
      <stop offset="100%" stop-color="%233e2a22"/>
    </linearGradient>
    <linearGradient id="ochreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%23d97706"/>
      <stop offset="50%" stop-color="%23b45309"/>
      <stop offset="100%" stop-color="%2378350f"/>
    </linearGradient>
  </defs>
  <!-- Background -->
  <rect width="100%" height="100%" fill="url(%23heroGrad)"/>
  
  <!-- Temple Silhouette Background -->
  <path d="M100,260 L300,260 L200,200 Z" fill="%23110a08" opacity="0.6"/>
  <rect x="110" y="260" width="12" height="100" fill="%23110a08" opacity="0.6"/>
  <rect x="150" y="260" width="12" height="100" fill="%23110a08" opacity="0.6"/>
  <rect x="238" y="260" width="12" height="100" fill="%23110a08" opacity="0.6"/>
  <rect x="278" y="260" width="12" height="100" fill="%23110a08" opacity="0.6"/>

  <!-- Hero Silhouette with Muscular Torso -->
  <path d="M120,380 C130,260 140,220 180,190 C160,170 160,130 185,100 C175,70 200,40 200,40 C200,40 225,70 215,100 C240,130 240,170 220,190 C260,220 270,260 280,380 Z" fill="%230f0907" stroke="%23b45309" stroke-width="1.5"/>

  <!-- Fur Cloak -->
  <path d="M140,180 C130,200 125,240 120,300 C135,310 155,270 160,220 Z" fill="%2378350f" opacity="0.8"/>
  <path d="M150,110 C140,120 140,145 155,160 Q170,140 180,120 Z" fill="%2378350f"/>

  <!-- Wooden Club -->
  <path d="M270,160 L295,110 C300,100 310,105 305,115 L285,175 Z" fill="url(%23ochreGrad)" stroke="%23451a03" stroke-width="1.5"/>
  <circle cx="295" cy="120" r="2" fill="%23451a03"/>
  <circle cx="290" cy="135" r="2.5" fill="%23451a03"/>
  <circle cx="282" cy="150" r="2" fill="%23451a03"/>

  <!-- Frame & Border -->
  <rect x="15" y="15" width="370" height="370" fill="none" stroke="url(%23ochreGrad)" stroke-width="1.5" opacity="0.7"/>
  <text x="200" y="365" font-family="'Courier New', monospace" font-size="12" fill="url(%23ochreGrad)" letter-spacing="4" text-anchor="middle" font-weight="bold">HERCULEAN CHAMPION</text>
  <text x="200" y="45" font-family="'Courier New', monospace" font-size="9" fill="%23b45309" letter-spacing="6" text-anchor="middle">GRADE I • DEMIGOD STRENGTH</text>
</svg>`;

// 4. Demon Lord with Wings (Grade 2 - Demon/Cathedral)
export const maleDemonWingsSVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <defs>
    <linearGradient id="demonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%231a0202"/>
      <stop offset="50%" stop-color="%23050000"/>
      <stop offset="100%" stop-color="%232b0213"/>
    </linearGradient>
    <linearGradient id="wingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%23dc2626"/>
      <stop offset="50%" stop-color="%237f1d1d"/>
      <stop offset="100%" stop-color="%231e0000"/>
    </linearGradient>
    <filter id="hellGlow">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <!-- Background -->
  <rect width="100%" height="100%" fill="url(%23demonGrad)"/>
  
  <!-- Gothic Rose Window Silhouette -->
  <circle cx="200" cy="140" r="60" fill="none" stroke="%23dc2626" stroke-width="1.5" opacity="0.2" filter="url(%23hellGlow)"/>
  <path d="M200,80 L200,200 M140,140 L260,140" stroke="%23dc2626" stroke-width="1" opacity="0.15" filter="url(%23hellGlow)"/>

  <!-- Demonic Bat Wings -->
  <!-- Left Wing -->
  <path d="M170,180 C110,120 70,140 40,110 C60,160 80,180 60,230 C100,210 130,210 170,190 Z" fill="url(%23wingGrad)" stroke="%237f1d1d" stroke-width="1.5"/>
  <!-- Right Wing -->
  <path d="M230,180 C290,120 330,140 360,110 C340,160 320,180 340,230 C300,210 270,210 230,190 Z" fill="url(%23wingGrad)" stroke="%237f1d1d" stroke-width="1.5"/>

  <!-- Demon Lord Silhouette -->
  <path d="M130,380 C140,280 155,240 180,210 C165,190 165,150 185,120 C170,90 190,60 200,55 C210,60 230,90 215,120 C235,150 235,190 220,210 C245,240 260,280 270,380 Z" fill="%230a0000" stroke="%23dc2626" stroke-width="1"/>

  <!-- Curving Black Horns -->
  <path d="M185,115 Q170,90 160,80 Q175,80 188,105 Z" fill="%23000000" stroke="%23dc2626" stroke-width="1"/>
  <path d="M215,115 Q230,90 240,80 Q225,80 212,105 Z" fill="%23000000" stroke="%23dc2626" stroke-width="1"/>

  <!-- Yellow/Orange Glowing Eyes -->
  <circle cx="190" cy="132" r="2.5" fill="%23fbbf24" filter="url(%23hellGlow)"/>
  <circle cx="210" cy="132" r="2.5" fill="%23fbbf24" filter="url(%23hellGlow)"/>

  <!-- Frame & Border -->
  <rect x="15" y="15" width="370" height="370" fill="none" stroke="%23dc2626" stroke-width="1.5" opacity="0.8"/>
  <text x="200" y="365" font-family="'Courier New', monospace" font-size="12" fill="%23dc2626" letter-spacing="4" text-anchor="middle" font-weight="bold">ARCHDEMON SOVEREIGN</text>
  <text x="200" y="45" font-family="'Courier New', monospace" font-size="9" fill="%237f1d1d" letter-spacing="6" text-anchor="middle">GRADE II • HELLFIRE COMMAND</text>
</svg>`;

// 5. Modern Gothic Demon in Leather (Grade 2 - Demon/Leather)
export const maleDemonLeatherSVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <defs>
    <linearGradient id="leatherGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%23111827"/>
      <stop offset="50%" stop-color="%23030712"/>
      <stop offset="100%" stop-color="%231f1625"/>
    </linearGradient>
    <filter id="neonRed">
      <feGaussianBlur stdDeviation="4" result="neon"/>
      <feMerge>
        <feMergeNode in="neon"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <!-- Background -->
  <rect width="100%" height="100%" fill="url(%23leatherGrad)"/>
  
  <!-- Cyberpunk/Gothic Neon Cross or Sigil in background -->
  <line x1="200" y1="80" x2="200" y2="280" stroke="%23ef4444" stroke-width="1.5" filter="url(%23neonRed)" opacity="0.3"/>
  <line x1="130" y1="150" x2="270" y2="150" stroke="%23ef4444" stroke-width="1.5" filter="url(%23neonRed)" opacity="0.3"/>

  <!-- Demon Wing Outlines -->
  <path d="M180,190 C120,130 90,160 50,140 C65,180 80,210 70,250 C110,230 140,220 180,200 Z" fill="%23ef4444" opacity="0.1" stroke="%23ef4444" stroke-width="1"/>
  <path d="M220,190 C280,130 310,160 350,140 C335,180 320,210 330,250 C290,230 260,220 220,200 Z" fill="%23ef4444" opacity="0.1" stroke="%23ef4444" stroke-width="1"/>

  <!-- Demon Silhouette with Leather Jacket Collar -->
  <path d="M120,380 C130,280 150,240 180,210 C165,190 165,150 185,120 C175,95 195,65 200,60 C205,65 225,95 215,120 C235,150 235,190 220,210 C250,240 270,280 280,380 Z" fill="%23030712" stroke="%23ef4444" stroke-width="1"/>

  <!-- Black Horns -->
  <path d="M185,115 Q175,95 170,85 Q180,90 188,105 Z" fill="%23000000" stroke="%23ef4444" stroke-width="0.8"/>
  <path d="M215,115 Q225,95 230,85 Q220,90 212,105 Z" fill="%23000000" stroke="%23ef4444" stroke-width="0.8"/>

  <!-- Stylish Leather Jacket Lapels (Asymmetric & Dark Red shirt peek) -->
  <path d="M150,240 L180,220 L195,250 L180,310 Z" fill="%23ef4444" opacity="0.15" stroke="%23ef4444" stroke-width="0.5"/>
  <path d="M250,240 L220,220 L205,250 L220,310 Z" fill="%23ef4444" opacity="0.15" stroke="%23ef4444" stroke-width="0.5"/>
  <path d="M190,250 L210,250 L205,330 L195,330 Z" fill="%237f1d1d"/> <!-- Red open collar shirt -->

  <!-- Red Eyes -->
  <circle cx="190" cy="132" r="2.5" fill="%23ef4444" filter="url(%23neonRed)"/>
  <circle cx="210" cy="132" r="2.5" fill="%23ef4444" filter="url(%23neonRed)"/>

  <!-- Border -->
  <rect x="15" y="15" width="370" height="370" fill="none" stroke="%23ef4444" stroke-width="1.5" opacity="0.6"/>
  <text x="200" y="365" font-family="'Courier New', monospace" font-size="12" fill="%23ef4444" letter-spacing="4" text-anchor="middle" font-weight="bold">GOTHIC LEATHER DEMON</text>
  <text x="200" y="45" font-family="'Courier New', monospace" font-size="9" fill="%239ca3af" letter-spacing="6" text-anchor="middle">GRADE II • NOIR CHIC HORROR</text>
</svg>`;

// 6. Zeus, Sovereign of Thunder (Grade 1 - Celestial/God)
export const maleZeusThunderSVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <defs>
    <linearGradient id="zeusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%231e3a8a"/>
      <stop offset="50%" stop-color="%230f172a"/>
      <stop offset="100%" stop-color="%231d4ed8"/>
    </linearGradient>
    <linearGradient id="lightningGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%23ffffff"/>
      <stop offset="50%" stop-color="%2360a5fa"/>
      <stop offset="100%" stop-color="%233b82f6"/>
    </linearGradient>
    <filter id="lightningGlow">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <!-- Background -->
  <rect width="100%" height="100%" fill="url(%23zeusGrad)"/>
  
  <!-- Lightning bolts in sky -->
  <path d="M50,0 L120,150 L90,160 L180,300" stroke="%2393c5fd" stroke-width="2" fill="none" filter="url(%23lightningGlow)" opacity="0.8"/>
  <path d="M350,0 L280,180 L310,195 L220,330" stroke="%2393c5fd" stroke-width="1.5" fill="none" filter="url(%23lightningGlow)" opacity="0.6"/>

  <!-- Zeus Silhouette with White Hair/Beard Outline -->
  <path d="M120,380 C130,270 145,230 175,200 C155,180 150,135 180,100 C170,70 195,40 200,40 C205,40 230,70 220,100 C250,135 245,180 225,200 C255,230 270,270 280,380 Z" fill="%230f172a" stroke="%2360a5fa" stroke-width="1.5"/>

  <!-- Flowing White Beard & Hair Details -->
  <path d="M170,120 C155,140 150,180 175,200 C190,215 210,215 225,200 C250,180 245,140 230,120" fill="%23f4f4f5" opacity="0.95" stroke="%23cbd5e1" stroke-width="1"/>
  <path d="M180,160 L200,240 L220,160 L210,220 L200,230 L190,220 Z" fill="%23f4f4f5" stroke="%23cbd5e1" stroke-width="0.8"/> <!-- Long flowing beard spikes -->

  <!-- Lightning Bolt Scepter (Hammer-like scepter) -->
  <path d="M290,160 L250,280" stroke="url(%23lightningGrad)" stroke-width="4" filter="url(%23lightningGlow)"/>
  <polygon points="275,140 315,150 280,210 325,180 260,250" fill="url(%23lightningGrad)" filter="url(%23lightningGlow)"/>

  <!-- Eagle Silhouette -->
  <path d="M60,80 C80,65 95,80 110,75 C95,90 85,95 60,80 Z" fill="%23020617"/>

  <!-- Outer Divine Border -->
  <rect x="15" y="15" width="370" height="370" fill="none" stroke="url(%23lightningGrad)" stroke-width="1.5" opacity="0.8"/>
  <rect x="22" y="22" width="356" height="356" fill="none" stroke="%2360a5fa" stroke-width="0.5" opacity="0.4"/>
  <text x="200" y="365" font-family="'Courier New', monospace" font-size="12" fill="url(%23lightningGrad)" letter-spacing="4" text-anchor="middle" font-weight="bold">OLYMPIAN ZEUS SOVEREIGN</text>
  <text x="200" y="45" font-family="'Courier New', monospace" font-size="9" fill="%2360a5fa" letter-spacing="6" text-anchor="middle">GRADE I • THUNDER &amp; JUSTICE</text>
</svg>`;

// 7. Poseidon, Ruler of the Abyss (Grade 1 - Celestial/God)
export const malePoseidonTridentSVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <defs>
    <linearGradient id="seaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%23042f2e"/>
      <stop offset="50%" stop-color="%23022c22"/>
      <stop offset="100%" stop-color="%23064e3b"/>
    </linearGradient>
    <linearGradient id="goldTrident" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%232dd4bf"/>
      <stop offset="50%" stop-color="%230d9488"/>
      <stop offset="100%" stop-color="%23115e59"/>
    </linearGradient>
    <filter id="aquaGlow">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <!-- Background -->
  <rect width="100%" height="100%" fill="url(%23seaGrad)"/>
  
  <!-- Sea Waves Background -->
  <path d="M0,320 Q100,280 200,320 Q300,360 400,320 L400,400 L0,400 Z" fill="%23022c22" opacity="0.6"/>
  <path d="M0,340 Q100,310 200,350 Q300,390 400,340 L400,400 L0,400 Z" fill="%23042f2e" opacity="0.8"/>

  <!-- Poseidon Silhouette with Wet Hair & Beard Outline -->
  <path d="M120,380 C130,270 145,230 175,200 C155,180 150,135 180,100 C170,70 195,40 200,40 C205,40 230,70 220,100 C250,135 245,180 225,200 C255,230 270,270 280,380 Z" fill="%23022c22" stroke="%232dd4bf" stroke-width="1.5"/>

  <!-- Aqua/Seaweed Hair & Beard Details -->
  <path d="M170,120 C155,140 150,180 175,200 C190,215 210,215 225,200 C250,180 245,140 230,120" fill="%230f766e" opacity="0.9" stroke="%232dd4bf" stroke-width="0.8"/>
  <path d="M185,170 Q200,250 200,250 Q200,250 215,170" stroke="%232dd4bf" stroke-width="1.5" fill="none"/>

  <!-- Ancient Trident -->
  <line x1="100" y1="60" x2="100" y2="380" stroke="url(%23goldTrident)" stroke-width="3.5" filter="url(%23aquaGlow)"/>
  <!-- Middle prong -->
  <polygon points="95,60 105,60 100,30" fill="url(%23goldTrident)" filter="url(%23aquaGlow)"/>
  <!-- Left prong -->
  <path d="M80,70 Q95,70 95,60" fill="none" stroke="url(%23goldTrident)" stroke-width="2.5" filter="url(%23aquaGlow)"/>
  <polygon points="77,70 83,65 80,50" fill="url(%23goldTrident)" filter="url(%23aquaGlow)"/>
  <!-- Right prong -->
  <path d="M120,70 Q105,70 105,60" fill="none" stroke="url(%23goldTrident)" stroke-width="2.5" filter="url(%23aquaGlow)"/>
  <polygon points="123,70 117,65 120,50" fill="url(%23goldTrident)" filter="url(%23aquaGlow)"/>

  <!-- Shipwreck Silhouette -->
  <path d="M310,280 L350,270 L340,310 Z" fill="%23022c22"/>
  <line x1="330" y1="275" x2="330" y2="240" stroke="%23022c22" stroke-width="2"/>

  <!-- Outer Divine Border -->
  <rect x="15" y="15" width="370" height="370" fill="none" stroke="url(%23goldTrident)" stroke-width="1.5" opacity="0.8"/>
  <rect x="22" y="22" width="356" height="356" fill="none" stroke="%232dd4bf" stroke-width="0.5" opacity="0.4"/>
  <text x="200" y="365" font-family="'Courier New', monospace" font-size="12" fill="url(%23goldTrident)" letter-spacing="4" text-anchor="middle" font-weight="bold">POSEIDON DEEP SOVEREIGN</text>
  <text x="200" y="45" font-family="'Courier New', monospace" font-size="9" fill="%232dd4bf" letter-spacing="6" text-anchor="middle">GRADE I • ABYSS &amp; OCEANS</text>
</svg>`;

export function getGothicCardSVG(gender: string, grade: number, characterName: string): string {
  let primaryColor = "%239b1c1c"; // crimson red
  let stopColor1 = "%231a0b2e";
  let stopColor2 = "%230f051d";
  let stopColor3 = "%232b001a";
  let subtitle = "GRADE II • NOBLE BLOOD";
  let symbolPath = "";
  
  if (grade === 1) {
    primaryColor = "%23ffd700"; // gold
    stopColor1 = "%232e1f0b";
    stopColor2 = "%231d1205";
    stopColor3 = "%23442a08";
    subtitle = "GRADE I • CELESTIAL IMMORTAL";
    symbolPath = `<path d="M150,160 L170,200 L200,150 L230,200 L250,160 L240,240 L160,240 Z" fill="url(%23goldGrad)" filter="url(%23glow)"/>`;
  } else if (grade === 2) {
    primaryColor = "%23ef4444"; // bright red
    stopColor1 = "%231a0202";
    stopColor2 = "%23050000";
    stopColor3 = "%232b0213";
    subtitle = "GRADE II • ARCHDEMON SOVEREIGN";
    symbolPath = `<path d="M140,180 C160,160 180,190 200,180 C220,190 240,160 260,180 C240,210 210,210 200,200 C190,210 160,210 140,180 Z" fill="%239b1c1c" stroke="%23ff3333" stroke-width="1.5" filter="url(%23glow)"/>
                  <path d="M185,170 Q170,140 160,130 Q175,140 188,160 Z" fill="%23000000" stroke="%23ff3333" stroke-width="1"/>
                  <path d="M215,170 Q230,140 240,130 Q225,140 212,160 Z" fill="%23000000" stroke="%23ff3333" stroke-width="1"/>`;
  } else if (grade === 3) {
    primaryColor = "%232dd4bf"; // teal
    stopColor1 = "%23042f2e";
    stopColor2 = "%23022c22";
    stopColor3 = "%23064e3b";
    subtitle = "GRADE III • SPECTRAL APPARITION";
    symbolPath = `<circle cx="200" cy="180" r="35" fill="none" stroke="%232dd4bf" stroke-width="2" stroke-dasharray="5 5" filter="url(%23glow)"/>
                  <path d="M180,180 Q200,140 220,180 Q200,220 180,180 Z" fill="none" stroke="%232dd4bf" stroke-width="1" opacity="0.5"/>`;
  } else {
    primaryColor = "%2322c55e"; // green
    stopColor1 = "%23022c22";
    stopColor2 = "%23020617";
    stopColor3 = "%2314532d";
    subtitle = "GRADE IV • UNDEAD ABOMINATION";
    symbolPath = `<path d="M180,160 L220,200 M220,160 L180,200" stroke="%2322c55e" stroke-width="3" stroke-linecap="round" filter="url(%23glow)"/>
                  <circle cx="200" cy="180" r="10" fill="%23020617" stroke="%2322c55e" stroke-width="2"/>`;
  }

  const safeName = characterName.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${stopColor1}"/>
      <stop offset="50%" stop-color="${stopColor2}"/>
      <stop offset="100%" stop-color="${stopColor3}"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%23ffd700"/>
      <stop offset="50%" stop-color="%23b8860b"/>
      <stop offset="100%" stop-color="%238b6508"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(%23bgGrad)"/>
  <circle cx="200" cy="180" r="110" fill="none" stroke="${primaryColor}" stroke-width="1.5" stroke-dasharray="10 5" opacity="0.3"/>
  <circle cx="200" cy="180" r="90" fill="none" stroke="${primaryColor}" stroke-width="0.5" opacity="0.2"/>
  <path d="M120,280 V160 A80,80 0 0,1 280,160 V280" fill="none" stroke="${primaryColor}" stroke-width="1" opacity="0.15"/>
  <path d="M140,280 V170 A60,60 0 0,1 260,170 V280" fill="none" stroke="${primaryColor}" stroke-width="0.5" opacity="0.1"/>
  ${symbolPath}
  <rect x="15" y="15" width="370" height="370" fill="none" stroke="${primaryColor}" stroke-width="1.5" opacity="0.7" filter="url(%23glow)"/>
  <rect x="22" y="22" width="356" height="356" fill="none" stroke="%23ffffff" stroke-width="0.5" opacity="0.2"/>
  <path d="M15,25 H25 M20,15 V25" stroke="${primaryColor}" stroke-width="1.5"/>
  <path d="M375,25 H385 M380,15 V25" stroke="${primaryColor}" stroke-width="1.5"/>
  <path d="M15,375 H25 M20,365 V385" stroke="${primaryColor}" stroke-width="1.5"/>
  <path d="M375,375 H385 M380,365 V385" stroke="${primaryColor}" stroke-width="1.5"/>
  <text x="200" y="345" font-family="'Cinzel', 'Playfair Display', 'Georgia', serif" font-size="14" fill="%23ffffff" text-anchor="middle" font-weight="900" letter-spacing="2" filter="url(%23glow)">${safeName}</text>
  <text x="200" y="365" font-family="'Courier New', monospace" font-size="10" fill="${primaryColor}" letter-spacing="4" text-anchor="middle" font-weight="bold">${subtitle}</text>
  <text x="200" y="50" font-family="'Courier New', monospace" font-size="9" fill="${primaryColor}" letter-spacing="6" text-anchor="middle">THE MIRROR OF TRUTH</text>
</svg>`;
}
