const EUROPE_DATA = [
  { code: "DE", name: "Alemania", region: "core", regionLabel: "EJE CENTRAL // EUROZONA", gdp: 4.12, growth: 0.8, inflation: 2.2, trade: "+210 MM €", sector: "Automoción e Ingeniería Mecánica", share: 38, desc: "Principal potencia industrial y exportadora de la Unión Europea, impulsada por el sector automotriz, maquinaria pesada y química avanzada." },
  { code: "FR", name: "Francia", region: "core", regionLabel: "EJE CENTRAL // EUROZONA", gdp: 2.84, growth: 1.1, inflation: 2.0, trade: "-64 MM €", sector: "Aeroespacial, Lujo y Energía Nuclear", share: 34, desc: "Segunda economía de la eurozona con liderazgo aeroespacial, agroalimentario y una matriz eléctrica descarbonizada." },
  { code: "IT", name: "Italia", region: "south", regionLabel: "ARCO MEDITERRÁNEO // EUROZONA", gdp: 2.11, growth: 0.9, inflation: 1.8, trade: "+34 MM €", sector: "Manufactura Avanzada y Moda", share: 31, desc: "Gran polo manufacturero del sur europeo con fuerte superávit en bienes de equipo, diseño industrial y farmacología." },
  { code: "ES", name: "España", region: "south", regionLabel: "ARCO MEDITERRÁNEO // EUROZONA", gdp: 1.52, growth: 2.7, inflation: 2.4, trade: "-18 MM €", sector: "Servicios Digitales, Turismo y Renovables", share: 36, desc: "Economía de mayor dinamismo entre los grandes socios de la UE, apoyada en exportación de servicios no turísticos y transición energética." },
  { code: "NL", name: "Países Bajos", region: "core", regionLabel: "EJE CENTRAL // EUROZONA", gdp: 1.08, growth: 1.3, inflation: 2.6, trade: "+89 MM €", sector: "Logística Portuaria y Semiconductores", share: 42, desc: "Nodo logístico continental a través de Róterdam y líder mundial en litografía para microchips." },
  { code: "PL", name: "Polonia", region: "core", regionLabel: "EUROPA CENTRAL // NO EURO", gdp: 0.81, growth: 3.1, inflation: 3.6, trade: "+12 MM €", sector: "Componentes Industriales y TI", share: 29, desc: "Motor de crecimiento de Europa central gracias a la reindustrialización, inversión en infraestructuras y servicios tecnológicos." },
  { code: "SE", name: "Suecia", region: "north", regionLabel: "NÓRDICOS // NO EURO", gdp: 0.59, growth: 1.5, inflation: 1.9, trade: "+28 MM €", sector: "Tecnología Limpia y Telecomunicaciones", share: 35, desc: "Economía altamente innovadora especializada en acero verde, telecomunicaciones y exportación de capital tecnológico." },
  { code: "BE", name: "Bélgica", region: "core", regionLabel: "EJE CENTRAL // EUROZONA", gdp: 0.58, growth: 1.2, inflation: 2.5, trade: "+15 MM €", sector: "Biofarmacia y Química", share: 33, desc: "Centro institucional europeo con uno de los mayores clústeres biofarmacéuticos y logísticos del continente." },
  { code: "IE", name: "Irlanda", region: "north", regionLabel: "ATLÁNTICO NORTE // EUROZONA", gdp: 0.53, growth: 2.4, inflation: 1.7, trade: "+142 MM €", sector: "Software Cloud y Farmacéutica", share: 54, desc: "Hub europeo de multinacionales tecnológicas y farmacéuticas con altísima productividad por empleado." },
  { code: "PT", name: "Portugal", region: "south", regionLabel: "ARCO MEDITERRÁNEO // EUROZONA", gdp: 0.27, growth: 1.9, inflation: 2.1, trade: "-14 MM €", sector: "Tecnología, Turismo y Componentes", share: 30, desc: "Economía abierta con creciente atracción de centros de ingeniería de software y energías limpias." },
  { code: "FI", name: "Finlandia", region: "north", regionLabel: "NÓRDICOS // EUROZONA", gdp: 0.28, growth: 1.0, inflation: 1.6, trade: "+6 MM €", sector: "Ingeniería Forestal y Redes 5G/6G", share: 32, desc: "Especialización en bioeconomía avanzada, telecomunicaciones de próxima generación e industria naval." },
  { code: "GR", name: "Grecia", region: "south", regionLabel: "ARCO MEDITERRÁNEO // EUROZONA", gdp: 0.23, growth: 2.3, inflation: 2.5, trade: "-21 MM €", sector: "Transporte Marítimo y Turismo", share: 37, desc: "Potencia mundial en flota mercante y fuerte recuperación de inversión extranjera directa." }
];

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  animateKpiCounters();
  initMapAndInspector();
  renderGdpChart("desc");
  renderMacroTable(EUROPE_DATA);
  initSimulator();
});

function initThemeToggle() {
  const btn = document.getElementById("themeToggleBtn");
  const label = document.getElementById("themeBtnText");
  const savedTheme = localStorage.getItem("eur_theme");

  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    if (label) label.textContent = "MODO PAPEL EDITORIAL";
  }

  if (!btn) return;
  btn.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("eur_theme", "light");
      if (label) label.textContent = "MODO TERMINAL OSCURO";
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("eur_theme", "dark");
      if (label) label.textContent = "MODO PAPEL EDITORIAL";
    }
  });
}

function animateKpiCounters() {
  const counters = document.querySelectorAll(".kpi-number");
  counters.forEach((el) => {
    const target = parseFloat(el.dataset.target);
    const decimals = parseInt(el.dataset.decimals, 10);
    const duration = 1200;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

function selectCountry(code) {
  const country = EUROPE_DATA.find((c) => c.code === code);
  if (!country) return;

  document.querySelectorAll(".country-node").forEach((node) => {
    node.classList.toggle("active", node.dataset.country === code);
  });

  const inspector = document.getElementById("countryInspector");
  if (!inspector) return;

  inspector.classList.remove("flash-update");
  void inspector.offsetWidth;
  inspector.classList.add("flash-update");

  document.getElementById("inspRegion").textContent = country.regionLabel;
  document.getElementById("inspName").textContent = `${country.name} (${country.code})`;
  document.getElementById("inspCode").textContent = country.code;
  document.getElementById("inspDesc").textContent = country.desc;
  document.getElementById("inspGdp").textContent = `${country.gdp.toFixed(2)} B €`;

  const growthEl = document.getElementById("inspGrowth");
  growthEl.textContent = `+${country.growth.toFixed(1)}%`;
  growthEl.className = country.growth >= 1.5 ? "up" : "";

  document.getElementById("inspInflation").textContent = `${country.inflation.toFixed(1)}%`;

  const tradeEl = document.getElementById("inspTrade");
  tradeEl.textContent = country.trade;
  tradeEl.className = country.trade.startsWith("+") ? "up" : "down";

  document.getElementById("inspSectorShare").textContent = `${country.share}%`;
  document.getElementById("inspSectorBar").style.width = `${country.share}%`;
  document.getElementById("inspSectorName").textContent = country.sector;

  const detailLink = document.getElementById("inspDetailLink");
  if (detailLink) {
    detailLink.href = `pais.html?code=${country.code}`;
    detailLink.textContent = `VER DOSSIER COMPLETO DE ${country.name.toUpperCase()} →`;
  }
}

function initMapAndInspector() {
  document.querySelectorAll(".country-node").forEach((node) => {
    node.addEventListener("click", () => selectCountry(node.dataset.country));
  });

  document.querySelectorAll(".filter-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      const region = chip.dataset.region;

      document.querySelectorAll(".country-node").forEach((node) => {
        const match = region === "all" || node.dataset.region === region;
        node.classList.toggle("dimmed", !match);
      });
    });
  });
}

function renderGdpChart(mode) {
  const container = document.getElementById("gdpBarChart");
  const sorted = [...EUROPE_DATA].sort((a, b) => {
    if (mode === "asc") return a.growth - b.growth;
    if (mode === "gdp") return b.gdp - a.gdp;
    return b.growth - a.growth;
  });

  const maxVal = mode === "gdp" ? 4.5 : 3.5;

  container.innerHTML = sorted.map((c) => {
    const val = mode === "gdp" ? c.gdp : c.growth;
    const pct = Math.min((val / maxVal) * 100, 100);
    const label = mode === "gdp" ? `${c.gdp.toFixed(1)}B` : `+${c.growth.toFixed(1)}%`;
    return `
      <div class="bar-row" onclick="selectCountry('${c.code}')" style="cursor:pointer" title="Inspeccionar ${c.name}">
        <span class="bar-code">${c.code}</span>
        <div class="bar-track">
          <div class="bar-fill" style="width: ${pct}%"></div>
        </div>
        <span class="bar-val">${label}</span>
      </div>
    `;
  }).join("");
}

document.addEventListener("change", (e) => {
  if (e.target && e.target.id === "chartSortSelect") {
    renderGdpChart(e.target.value);
  }
});

function renderMacroTable(list) {
  const tbody = document.getElementById("macroTableBody");
  tbody.innerHTML = list.map((c) => `
    <tr onclick="selectCountry('${c.code}')">
      <td><strong>${c.code}</strong></td>
      <td>${c.name}</td>
      <td>${c.region.toUpperCase()}</td>
      <td>${c.gdp.toFixed(2)} B €</td>
      <td class="up">+${c.growth.toFixed(1)}%</td>
      <td>${c.inflation.toFixed(1)}%</td>
      <td class="${c.trade.startsWith("+") ? "up" : "down"}">${c.trade}</td>
      <td>${c.sector}</td>
    </tr>
  `).join("");
}

document.addEventListener("input", (e) => {
  if (e.target && e.target.id === "countrySearchInput") {
    const q = e.target.value.toLowerCase().trim();
    const filtered = EUROPE_DATA.filter((c) =>
      c.name.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.sector.toLowerCase().includes(q)
    );
    renderMacroTable(filtered);
  }
});

function initSimulator() {
  const rateSlider = document.getElementById("rateSlider");
  const energySlider = document.getElementById("energySlider");
  const stimulusSlider = document.getElementById("stimulusSlider");
  const resetBtn = document.getElementById("resetSimBtn");

  function recalculate() {
    const rate = parseFloat(rateSlider.value);
    const energy = parseFloat(energySlider.value);
    const stimulus = parseFloat(stimulusSlider.value);

    document.getElementById("rateValDisplay").textContent = `${rate.toFixed(2)}%`;
    document.getElementById("energyValDisplay").textContent = `${energy} pts`;
    document.getElementById("stimulusValDisplay").textContent = `${stimulus.toFixed(2)}% PIB`;

    const gdpProj = 1.40 - (rate - 3.25) * 0.35 - (energy - 100) * 0.015 + (stimulus - 1.5) * 0.45;
    const infProj = 2.30 - (rate - 3.25) * 0.28 + (energy - 100) * 0.022 + (stimulus - 1.5) * 0.18;
    const compIndex = 104.2 - (energy - 100) * 0.25 + (stimulus - 1.5) * 2.1 - (rate - 3.25) * 1.2;

    const gdpEl = document.getElementById("simGdpOut");
    gdpEl.textContent = `${gdpProj >= 0 ? "+" : ""}${gdpProj.toFixed(2)}%`;
    gdpEl.className = gdpProj >= 0 ? "up" : "down";

    document.getElementById("simInfOut").textContent = `${Math.max(0.2, infProj).toFixed(2)}%`;
    document.getElementById("simCompOut").textContent = `${compIndex.toFixed(1)} pts`;

    const noteEl = document.getElementById("simStatusNote");
    if (gdpProj < 0) {
      noteEl.textContent = "Alerta: Riesgo de contracción técnica en la Eurozona";
    } else if (infProj > 3.2) {
      noteEl.textContent = "Presión inflacionaria elevada por costes energéticos";
    } else {
      noteEl.textContent = "Equilibrio macroeconómico y expansión moderada";
    }
  }

  [rateSlider, energySlider, stimulusSlider].forEach((s) => s.addEventListener("input", recalculate));

  resetBtn.addEventListener("click", () => {
    rateSlider.value = 3.25;
    energySlider.value = 100;
    stimulusSlider.value = 1.5;
    recalculate();
  });
}

function initPageTransitions() {
  const curtain = document.createElement("div");
  curtain.className = "page-curtain entering";
  curtain.innerHTML = `
    <span class="curtain-title">EUROSTAT // NEXUS</span>
    <span class="curtain-sub">SINCRONIZANDO TERMINAL DE DATOS...</span>
  `;
  document.body.appendChild(curtain);

  requestAnimationFrame(() => {
    setTimeout(() => {
      curtain.classList.remove("entering");
      curtain.classList.add("leaving");
      setTimeout(() => {
        curtain.classList.remove("leaving");
      }, 480);
    }, 120);
  });

  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("http") || link.target === "_blank") return;

    e.preventDefault();
    curtain.classList.remove("leaving");
    curtain.classList.add("entering");
    setTimeout(() => {
      window.location.href = href;
    }, 430);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initPageTransitions();
});

function initCountryDossierPage() {
  const titleEl = document.getElementById("dossierTitle");
  if (!titleEl) return;

  const params = new URLSearchParams(window.location.search);
  const codeParam = (params.get("code") || "ES").toUpperCase();
  const country = EUROPE_DATA.find((c) => c.code === codeParam) || EUROPE_DATA[0];

  const switcher = document.getElementById("countrySwitcherSelect");
  if (switcher) {
    switcher.innerHTML = EUROPE_DATA.map(
      (c) => `<option value="${c.code}" ${c.code === country.code ? "selected" : ""}>${c.name} (${c.code})</option>`
    ).join("");

    switcher.addEventListener("change", (e) => {
      window.location.href = `pais.html?code=${e.target.value}`;
    });
  }

  document.title = `${country.name.toUpperCase()} (${country.code}) // EUROSTAT NEXUS`;
  document.getElementById("dossierRegionTag").textContent = country.regionLabel;
  titleEl.innerHTML = `${country.name} <span class="accent-italic">//</span> ${country.code}`;
  document.getElementById("dossierDesc").textContent = country.desc;

  document.getElementById("dGdp").textContent = country.gdp.toFixed(2);
  document.getElementById("dGrowth").textContent = `+${country.growth.toFixed(1)}%`;
  document.getElementById("dInf").textContent = `${country.inflation.toFixed(1)}%`;

  const tradeEl = document.getElementById("dTrade");
  tradeEl.textContent = country.trade;
  tradeEl.className = `kpi-number ${country.trade.startsWith("+") ? "up" : "down"}`;

  document.getElementById("dCodeBadge").textContent = `CÓDIGO ISO: ${country.code}`;
  document.getElementById("dSectorShare").textContent = `${country.share}%`;
  document.getElementById("dSectorBar").style.width = `${country.share}%`;
  document.getElementById("dSectorName").textContent = country.sector;

  const qFactors = [0.85, 0.95, 1.05, 1.15];
  const quarters = ["Q1-26", "Q2-26", "Q3-26", "Q4-26"];
  const qContainer = document.getElementById("quarterlyBars");
  if (qContainer) {
    qContainer.innerHTML = quarters.map((q, idx) => {
      const val = (country.growth * qFactors[idx]).toFixed(2);
      const pct = Math.min((parseFloat(val) / 4.0) * 100, 100);
      return `
        <div class="bar-row">
          <span class="bar-code">${q}</span>
          <div class="bar-track">
            <div class="bar-fill" style="width: ${pct}%"></div>
          </div>
          <span class="bar-val">+${val}%</span>
        </div>
      `;
    }).join("");
  }
}

function initBilateralPage() {
  const selectA = document.getElementById("partnerASelect");
  const selectB = document.getElementById("partnerBSelect");
  if (!selectA || !selectB) return;

  const optionsHtml = EUROPE_DATA.map((c) => `<option value="${c.code}">${c.name} (${c.code})</option>`).join("");
  selectA.innerHTML = optionsHtml;
  selectB.innerHTML = optionsHtml;

  selectA.value = "ES";
  selectB.value = "DE";

  function updateComparison() {
    const a = EUROPE_DATA.find((c) => c.code === selectA.value) || EUROPE_DATA[0];
    const b = EUROPE_DATA.find((c) => c.code === selectB.value) || EUROPE_DATA[1];

    const renderMiniCard = (c) => `
      <h3 class="inspector-name" style="margin-bottom:0.4rem;">${c.name} (${c.code})</h3>
      <p class="inspector-desc" style="margin-bottom:0.9rem;">${c.sector}</p>
      <div class="inspector-metrics-grid">
        <div class="insp-metric"><span>PIB NOMINAL</span><strong>${c.gdp.toFixed(2)} B €</strong></div>
        <div class="insp-metric"><span>CRECIMIENTO</span><strong class="up">+${c.growth.toFixed(1)}%</strong></div>
      </div>
    `;

    document.getElementById("partnerACard").innerHTML = renderMiniCard(a);
    document.getElementById("partnerBCard").innerHTML = renderMiniCard(b);

    const estVolume = a.code === b.code ? 0 : ((a.gdp * b.gdp) * 14.5 + 18).toFixed(1);
    const diff = (a.growth - b.growth).toFixed(1);

    document.getElementById("bilateralVolume").textContent = estVolume;
    document.getElementById("bilateralDiff").textContent = `${diff >= 0 ? "+" : ""}${diff}%`;
    document.getElementById("bilateralLeader").textContent =
      a.code === b.code
        ? "Selecciona dos países distintos"
        : parseFloat(diff) >= 0
          ? `${a.name} crece más rápido que ${b.name}`
          : `${b.name} crece más rápido que ${a.name}`;

    document.getElementById("bilateralSynergy").textContent = a.region !== b.region ? "MUY ALTA" : "ALTA";
    document.getElementById("bilateralNote").textContent = `${a.sector.split(" ")[0]} ↔ ${b.sector.split(" ")[0]}`;
  }

  selectA.addEventListener("change", updateComparison);
  selectB.addEventListener("change", updateComparison);
  updateComparison();
}

document.addEventListener("DOMContentLoaded", () => {
  initCountryDossierPage();
  initBilateralPage();
});

const CLUSTERS_DATA = [
  { id: "tech", tag: "TECH & CHIPS", title: "Semiconductores y Litografía", leaders: "NL · DE · IE", volume: "148 MM €", growth: "+7.4%", desc: "Cadena de suministro europea de equipos de litografía ultravioleta extrema y diseño de microprocesadores.", linkCode: "NL" },
  { id: "green", tag: "ENERGÍA & VERDE", title: "Hidrógeno Verde y Eólica Offshore", leaders: "ES · SE · DK", volume: "215 MM €", growth: "+9.1%", desc: "Despliegue de interconexiones eléctricas, electrolizadores industriales y generación renovable competitiva.", linkCode: "ES" },
  { id: "industry", tag: "INDUSTRIA & PHARMA", title: "Biofarmacia y Química Avanzada", leaders: "BE · DE · IE", volume: "310 MM €", growth: "+5.8%", desc: "Producción de principios activos, biotecnología clínica y exportación farmacéutica de alto valor añadido.", linkCode: "BE" },
  { id: "industry", tag: "INDUSTRIA & PHARMA", title: "Movilidad Eléctrica y Bienes de Equipo", leaders: "DE · FR · IT", volume: "490 MM €", growth: "+3.2%", desc: "Electrificación de plataformas automotrices, robótica industrial y maquinaria de precisión.", linkCode: "DE" },
  { id: "tech", tag: "TECH & CHIPS", title: "Redes 5G/6G y Software Cloud", leaders: "FI · SE · ES", volume: "175 MM €", growth: "+6.5%", desc: "Infraestructura crítica de telecomunicaciones, ciberseguridad y centros de datos soberanos europeos.", linkCode: "FI" },
  { id: "green", tag: "ENERGÍA & VERDE", title: "Acero Verde y Economía Circular", leaders: "SE · PL · AT", volume: "132 MM €", growth: "+4.9%", desc: "Descarbonización de la metalurgia pesada mediante reducción directa con hidrógeno sin emisiones.", linkCode: "SE" }
];

function initClustersPage() {
  const grid = document.getElementById("sectorCardsGrid");
  if (!grid) return;

  function renderClusters(filter) {
    const list = filter === "all" ? CLUSTERS_DATA : CLUSTERS_DATA.filter((c) => c.id === filter);
    grid.innerHTML = list.map((c) => `
      <article class="cluster-card">
        <div class="cluster-top">
          <span class="meta-tag">${c.tag}</span>
          <strong class="up">${c.growth} YoY</strong>
        </div>
        <h3 class="cluster-title">${c.title}</h3>
        <p class="inspector-desc">${c.desc}</p>
        <div class="inspector-metrics-grid">
          <div class="insp-metric"><span>VOLUMEN ANUAL</span><strong>${c.volume}</strong></div>
          <div class="insp-metric"><span>HUBS LÍDERES</span><strong>${c.leaders}</strong></div>
        </div>
        <a href="pais.html?code=${c.linkCode}" class="brutal-btn">VER ECONOMÍA LÍDER (${c.linkCode}) →</a>
      </article>
    `).join("");
  }

  document.querySelectorAll("#sectorFilterGroup .filter-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll("#sectorFilterGroup .filter-chip").forEach((b) => b.classList.remove("active"));
      chip.classList.add("active");
      renderClusters(chip.dataset.cluster);
    });
  });

  renderClusters("all");

  const modal = document.getElementById("reportModal");
  const openBtn = document.getElementById("exportBriefBtn");
  const closeBtn = document.getElementById("closeModalBtn");
  const copyBtn = document.getElementById("copyReportBtn");

  if (openBtn && modal) {
    openBtn.addEventListener("click", () => modal.classList.add("open"));
    closeBtn.addEventListener("click", () => modal.classList.remove("open"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("open");
    });
    copyBtn.addEventListener("click", () => {
      const txt = document.getElementById("modalReportText").textContent.trim();
      navigator.clipboard.writeText(txt);
      copyBtn.textContent = "INFORME COPIADO ✓";
      setTimeout(() => {
        copyBtn.textContent = "COPIAR INFORME AL PORTAPAPELES";
      }, 2000);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initClustersPage();
});