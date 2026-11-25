# EUROSTAT // NEXUS — Terminal de Inteligencia Macroeconómica Europea

![HTML5](https://img.shields.io/badge/HTML5-Sem%C3%A1ntico-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Animaciones_%26_Grid-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla_ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Zero Dependencies](https://img.shields.io/badge/Dependencias-0_Externas-003399?style=for-the-badge)

**EUROSTAT // NEXUS** es una aplicación web multipágina interactiva diseñada para analizar, comparar y simular indicadores macroeconómicos, flujos comerciales intraeuropeos, clústeres industriales, divisas y deuda soberana de las principales economías de Europa.

El proyecto apuesta por una dirección de arte **Swiss Editorial Brutalism + Financial Terminal**, alejándose de las plantillas genéricas mediante una estética inspirada en la prensa económica europea y las terminales bursátiles, con alternancia instantánea entre **Modo Papel Editorial** y **Modo Terminal Oscuro**.

---

## Tabla de Contenidos

1. [Arquitectura Multipágina](#arquitectura-multipágina)
2. [Características Técnicas](#características-técnicas)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Instalación y Ejecución Local](#instalación-y-ejecución-local)
5. [Despliegue en GitHub Pages](#despliegue-en-github-pages)
6. [Posibles Mejoras Futuras](#posibles-mejoras-futuras)

---

## Arquitectura Multipágina

La aplicación está compuesta por **5 vistas HTML interconectadas** mediante un sistema de transición animado (*Page Curtain*) y persistencia de estado en el navegador:

| Vista | Archivo | Función Principal |
| :--- | :--- | :--- |
| **01 // Panel General UE** | `index.html` | Cinta bursátil infinita, KPIs con contadores `requestAnimationFrame`, mapa vectorial SVG interactivo de 12 potencias europeas con filtros regionales, gráficas comparativas ordenables, matriz buscable y simulador econométrico de tipos del BCE. |
| **02 // Dossier por País** | `pais.html` | Ficha económica dinámica alimentada mediante parámetros de consulta (`?code=ES`), selector rápido de economías, evolución trimestral del PIB y cuota de especialización exportadora. |
| **03 // Corredores Bilaterales** | `comercio.html` | Comparador cara a cara entre dos socios europeos con cálculo estimado de volumen comercial bilateral, diferencial de crecimiento y complementariedad sectorial. |
| **04 // Clústeres Estratégicos** | `sectores.html` | Radar de soberanía tecnológica e industrial (semiconductores, hidrógeno verde, biofarmacia, 5G/6G) con filtrado dinámico y modal de informe ejecutivo copiable al portapapeles. |
| **05 // Divisas & Deuda 10Y** | `divisas.html` | Conversor en tiempo real de divisas europeas (EUR, USD, GBP, CHF, SEK, PLN, DKK) y monitor de primas de riesgo soberanas a 10 años frente al Bund alemán. |

---

## Características Técnicas

* **Cero dependencias externas:** Todo el motor de renderizado de gráficos (barras dinámicas, gráfico de anillo SVG y mapa vectorial interactivo), animaciones y lógica de simulación está desarrollado íntegramente con **HTML5, CSS3 y Vanilla JavaScript**.
* **Sistema de Diseño Dual (`CSS Custom Properties`):** Alternancia fluida entre tema claro (*Papel Editorial*) y tema oscuro (*Terminal Financiera*) con persistencia automática entre páginas mediante `localStorage`.
* **Transiciones y Micro-interacciones:**
  * Cortina de transición (*Page Curtain*) sincronizada con la navegación entre archivos HTML.
  * Marquesina financiera continua (`@keyframes`) con pausa inteligente al pasar el cursor (`:hover`).
  * Botones y tarjetas con sombras sólidas desplazables y respuesta táctil al clic.
* **Enrutamiento por Parámetros URL:** Uso nativo de `URLSearchParams` en `pais.html` para compartir enlaces directos a cualquier economía europea sin necesidad de backend.

---

## Estructura del Proyecto

```text
eurostat-nexus/
├── index.html       # Vista 01: Panel general, mapa SVG, gráficos y simulador BCE
├── pais.html        # Vista 02: Dossier económico dinámico individual por país
├── comercio.html    # Vista 03: Comparador bilateral entre socios comerciales
├── sectores.html    # Vista 04: Clústeres industriales y modal de síntesis ejecutiva
├── divisas.html     # Vista 05: Conversor FX europeo y primas de riesgo a 10 años
├── styles.css       # Sistema de variables, layout responsivo, transiciones y keyframes
├── app.js           # Dataset macroeconómico, motores de renderizado e interactividad
└── README.md        # Documentación técnica del proyecto