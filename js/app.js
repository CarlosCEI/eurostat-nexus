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
  btn.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      label.textContent = "MODO TERMINAL OSCURO";
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      label.textContent = "MODO PAPEL EDITORIAL";
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