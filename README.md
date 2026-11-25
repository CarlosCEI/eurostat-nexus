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

## Instalación y Ejecución Local

Este proyecto está desarrollado con tecnologías web estándar (**HTML5, CSS3 y Vanilla JavaScript**), por lo que no requiere Node.js, gestores de paquetes (`npm`/`yarn`) ni procesos de empaquetado para ejecutarse.

### Opción A: Clonar mediante terminal Git (Recomendado)
1. Abre tu terminal y clona el repositorio en tu equipo:
   ```bash
   git clone [https://github.com/TU-USUARIO/eurostat-nexus.git](https://github.com/TU-USUARIO/eurostat-nexus.git)
   ```
2. Entra en el directorio del proyecto:
   ```bash
   cd eurostat-nexus
   ```
3. Abre la carpeta en **Visual Studio Code**:
   ```bash
   code .
   ```
4. Inicia un servidor local para que las rutas relativas y parámetros URL (`?code=ES`) funcionen en condiciones reales:
   * **Con VS Code:** Instala la extensión **Live Server**, haz clic derecho sobre `index.html` y selecciona **"Open with Live Server"**.
   * **Con Python (si lo tienes instalado):**
     ```bash
     python -m http.server 8000
     ```
     Después abre `http://localhost:8000` en tu navegador.

### Opción B: Descarga directa
1. En la página principal del repositorio en GitHub, pulsa el botón verde **`<> Code`** y selecciona **`Download ZIP`**.
2. Descomprime el archivo y haz doble clic sobre `index.html` para abrirlo directamente en Chrome, Firefox o Edge.

---

## Despliegue en GitHub Pages

Puedes alojar esta aplicación de forma gratuita y pública usando **GitHub Pages** en menos de dos minutos:

1. Asegúrate de que todos tus archivos (`index.html`, `pais.html`, `comercio.html`, `sectores.html`, `divisas.html`, `styles.css`, `app.js` y `README.md`) estén subidos en la rama `main` de tu repositorio público.
2. En GitHub, entra en la pestaña **Settings** (Configuración) en el menú superior del repositorio.
3. En la barra lateral izquierda, baja hasta la sección **Code and automation** y haz clic en **Pages**.
4. En el apartado **Build and deployment > Source**, selecciona **`Deploy from a branch`**.
5. En **Branch**, selecciona **`main`** y deja la carpeta en **`/ (root)`**. Pulsa **Save**.
6. Espera entre 30 segundos y 2 minutos y recarga la página; aparecerá un banner superior con el enlace público en vivo:
   ```text
   [https://TU-USUARIO.github.io/eurostat-nexus/](https://TU-USUARIO.github.io/eurostat-nexus/)
   ```
   *(Consejo para tu portfolio: copia esa URL y pégala también en el campo **Website** de la sección **About** en la página principal de tu repositorio).*

---

## Posibles Mejoras Futuras

El proyecto está estructurado de forma modular para permitir futuras ampliaciones técnicas sin reescribir la base actual:

* **Conexión a APIs Oficiales en Tiempo Real:** Sustituir los datasets estáticos por peticiones asíncronas (`fetch`) a la API pública del **Banco Central Europeo (ECB Data Portal)** para actualizar los tipos de cambio FX y rentabilidades de bonos, y a la **API REST de Eurostat** para indicadores macroeconómicos.
* **Cobertura Completa de la UE-27:** Ampliar la cartografía SVG interactiva y el array `EUROPE_DATA` para incluir los 27 Estados miembros de la Unión Europea junto con países candidatos.
* **Exportación de Datos y Reportes:** Añadir generación nativa de archivos **CSV** desde la matriz macroeconómica y exportación en **PDF** del dossier individual de cada país (`pais.html`).
* **Comparativa Histórica Multi-anual:** Incorporar un selector de rango temporal (2015–2026) en las gráficas de barras y en los expedientes nacionales para analizar el impacto de ciclos económicos previos.
* **Accesibilidad y Atajos de Teclado:** Implementar navegación por teclado estilo terminal bursátil (por ejemplo, pulsar `/` para enfocar el buscador de países o teclas numéricas `1`–`5` para cambiar entre vistas).