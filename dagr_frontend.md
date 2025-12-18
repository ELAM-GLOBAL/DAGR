# PRD — D.A.G.R. Risk Pack: Portfolio Returns Workflow Builder (Frontend-Only)

## 1) Purpose

Build a **single frontend page** that visually represents and allows configuration of a **Portfolio Returns workflow** using:

- **IBM Carbon** visual language + components (overall page UI).
- **IBM Carbon “network / investigation graph” layout** (lane-based columns with connected cards).
- **Orange Data Mining-style widgets**: clicking any card opens a **compact configuration panel** (“mini window”) to customize that widget’s parameters.

This PRD is **UI-only**: no backend, no persistence required (use local state + mock data).

---

## 2) Primary User & Jobs-to-be-Done

### Primary User (MVP target)
**“Operator / Builder”** at an SMB or mid-market firm:
- Not a full data engineer.
- Needs to assemble and run repeatable workflows to produce portfolio returns dashboards/reports.
- Wants guardrails and defaults, but also wants configuration depth when needed.

### Secondary Users
- **Analyst**: chooses metrics and assumptions.
- **BI Developer**: consumes outputs into dashboards/reports (represented visually on the right).

### Jobs-to-be-Done
- See the workflow end-to-end at a glance.
- Configure inputs (Portfolio, Market, FX, Benchmark, Calendar/Currency).
- Configure return metrics (checkbox-driven).
- Identify which widgets are optional.
- Preview what each widget consumes/produces (schema preview, mock).
- Validate mental model visually (connections), even if no actual execution exists yet.

---

## 3) In-Scope vs Out-of-Scope

### In Scope (Frontend-only)
- A single page with:
  - Network/lane columns with connected widget cards
  - Click-to-configure widget mini-window
  - Basic/Advanced/Expert tabs inside widget config
  - “Template defaults” preloaded for Portfolio Returns workflow
  - Mock data previews (tables/snippets) in config panels
  - Optional widgets visually indicated (Benchmark)
  - A “Run” button that simulates execution (UI-only) with fake status

### Out of Scope (for MVP UI prototype)
- No backend API calls
- No real authentication
- No saving to DB (optional: localStorage only if easy)
- No real data ingestion
- No real computation of returns
- No multi-page navigation (single page only)

---

## 4) Page Name & Route

- **Page name:** Portfolio Returns — Workflow
- **Route (suggested):** `/packs/risk/portfolio-returns/workflow`

---

## 5) Layout & Visual Design Requirements

### Design System
- Use **IBM Carbon** components and spacing rules.
- Typography, buttons, panels, tables, tabs should be Carbon.

### Core Visual Structure (Network/Lane Design)
The page is a horizontal, left-to-right workflow with **vertical lanes (columns)**:

1. **D.A.G.R. Architect**
2. **D.A.G.R. Engineer**
3. **D.A.G.R. Analyst**
4. **D.A.G.R. Scientist (optional lane; collapsed by default)**
5. **D.A.G.R. BI Developer**

Each lane contains **widget cards**. Cards connect via arrows/lines to show flow.

### Card Styling
- Carbon-style card containers (light background, subtle border).
- Each card includes:
  - Widget name
  - Small icon placeholder (Carbon icon)
  - Status pill (e.g., “Configured”, “Needs setup”, “Optional”, “Draft”)

### Connections
- Use simple SVG lines/arrows (or canvas) to connect widgets across lanes.
- Optional connections should be **dashed**.

---

## 6) Workflow Template: Portfolio Returns (v1)

### LANE 1 — D.A.G.R. Architect (Inputs must be separate cards)
Widgets (Cards):
1. **Portfolio / Holdings (Input)**
2. **Market Prices (Input)**
3. **FX Rates (Input)**
4. **Benchmark (Input) — Optional**
5. **Calendar & Currency (Config)**

### LANE 2 — D.A.G.R. Engineer
Widgets:
6. **Schema Profiler**
7. **Validate (Schema + DQ)**
8. **DQ Issue Queue (Fix / Remap / Retry)**
9. **Normalize & Align (IDs, Dates)**
10. **Join & FX Convert**
11. **Build Return Inputs (PnL, Flows, MV)**

### LANE 3 — D.A.G.R. Analyst
Widgets:
12. **Returns Config (Metric Selection)**
13. **Benchmark Config — Optional**
14. **Compute Returns**
15. **Output QA Checks**

### LANE 4 — D.A.G.R. Scientist (Optional lane, collapsed by default)
Widgets:
16. **Model Step (Optional)**  
(For future: forecasts/scenarios/signals that flow into BI outputs)

### LANE 5 — D.A.G.R. BI Developer
Widgets:
17. **Dashboard Cards**
18. **Report Generator**
19. **Exports / API**

---

## 7) Interactions & Behavior

### 7.1 Selecting a Widget (Orange-style mini-window)
- Clicking a widget card opens a **configuration “mini window”**.
- The mini window appears as:
  - A right-side panel drawer OR
  - A floating modal/popover anchored to the card  
(Choose whichever is simplest while still feeling “Orange-like”.)

Required mini-window structure:
- Header: widget name + icon + close button
- Tabs:
  - **Basic**
  - **Advanced**
  - **Expert**
- Footer actions:
  - **Apply**
  - **Cancel**
  - **Reset to Defaults**

### 7.2 Widget Status
Each widget card shows a status:
- **Needs setup** (default for required inputs)
- **Configured** (after Apply)
- **Optional** (Benchmark-related widgets)
- **Blocked** (if upstream required widgets not configured)
- **Simulated success** (after Run)

### 7.3 Simulated Run (UI only)
- A “Run” button in the page header triggers:
  - Animated status progression left-to-right:
    - “Running…” → “Success”
- Optional: show a small run log panel with mock messages.

### 7.4 Optional Widgets Behavior
- Benchmark and Benchmark Config:
  - Shown by default but visually marked “Optional”.
  - Dashed connectors.
  - If Benchmark is disabled in its config:
    - Hide/disable Benchmark Config widget (or grey it out).

### 7.5 Scientist Lane
- Collapsed by default (since most Portfolio Returns workflows won’t need it).
- Toggle control: “Show Scientist lane”
- When enabled:
  - Inserts the lane visually between Analyst and BI Developer.
  - Connectors update (dashed optional route).

---

## 8) Widget Configuration Requirements (What each widget must expose)

### Common fields for ALL widgets (Basic tab)
- Short description (“What this widget does”)
- Inputs (mock list)
- Outputs (mock list)
- A small “Data Preview” panel (mock table or JSON)

### Expert tab (Frontend-only placeholder)
- Show a code-like editor area (read-only by default) with:
  - “Implementation stub” (pseudo-SQL / pseudo-Python)
  - Toggle: “Enable custom override” (still frontend-only)
- Warning text: “Prototype only. No backend execution.”

> Important: Keep Expert mode present, but it should not imply real execution.

---

## 9) Widget-Specific Configuration (MVP mock)

### 9.1 Portfolio / Holdings (Input)
Basic:
- File/source selector (mock dropdown):
  - “CSV Upload (mock)”
  - “Custodian Export (mock)”
  - “Manual Entry (mock)”
- Required fields checklist (read-only list):
  - portfolio_id, as_of_date, asset_id, quantity
Advanced:
- Identifier mapping table (mock):
  - asset_id → internal_asset_id
Expert:
- Mapping rules editor (stub)

### 9.2 Market Prices (Input)
Basic:
- Source selector (mock): “Alpha Vantage (mock)”, “Bloomberg (mock)”, “CSV (mock)”
- Data points checklist:
  - Price, Adj Close, Volume, Open/High/Low
Advanced:
- Frequency selector: Daily / Monthly
- Corporate actions toggle: On/Off (visual only)
Expert:
- Field mapping / transform stub

### 9.3 FX Rates (Input)
Basic:
- Source selector (mock)
- Base currency dropdown (also mirrored in Calendar & Currency)
Advanced:
- Missing FX handling: “Reject / Forward fill / Nearest”
Expert:
- FX conversion rule stub

### 9.4 Benchmark (Optional Input)
Basic:
- Toggle: Enable benchmark (On/Off)
- Benchmark selector (mock)
Advanced:
- Series type: “Index level” vs “Return series”
Expert:
- Benchmark mapping stub

### 9.5 Calendar & Currency (Config)
Basic:
- Base currency
- Timezone
- Frequency
Advanced:
- Business day policy: Strict / Nearest / Forward fill
Expert:
- Calendar rule stub

---

### 9.6 Schema Profiler (Engineer)
Basic:
- “Profile now” button (UI only)
- Mock output: types inferred, key candidates
Advanced:
- Key selection dropdown
Expert:
- Profiling rule stub

### 9.7 Validate (Schema + DQ)
Basic:
- DQ checks checklist (toggleable):
  - Nulls, duplicates, gaps, stale prices, FX holes
Advanced:
- Threshold controls (sliders/inputs)
Expert:
- Validation rule stub

### 9.8 DQ Issue Queue
Basic:
- Mock issues table (severity, type, count)
- Button: “Apply fixes” (UI only)
Advanced:
- Remap controls (asset_id, currency codes)
Expert:
- Remediation stub

### 9.9 Normalize & Align (IDs, Dates)
Basic:
- Date alignment strategy dropdown
Advanced:
- ID normalization toggles
Expert:
- Transform stub

### 9.10 Join & FX Convert
Basic:
- Join keys display (read-only)
- FX conversion toggle
Advanced:
- Join type: left/inner (mock)
Expert:
- Join logic stub

### 9.11 Build Return Inputs (PnL, Flows, MV)
Basic:
- Show canonical output table columns (mock):
  - date, portfolio_id, MV_start, MV_end, net_flow, PnL
Advanced:
- Cashflow support toggle (Off by default)
Expert:
- Calculation stub

---

### 9.12 Returns Config (Analyst)
Basic:
- Metric checkboxes:
  - Absolute return
  - HPR
  - TWRR
  - IRR/XIRR (disabled unless “cashflows enabled”)
  - CAGR
  - Alpha (disabled unless benchmark enabled)
  - Ex-Ante expected return (optional placeholder)
Advanced:
- Period selection: Daily / Monthly / Custom
Expert:
- Custom metric formula stub

### 9.13 Benchmark Config (Optional)
Basic:
- Active return toggle
- Alpha method dropdown (mock)
Advanced:
- Tracking error placeholder toggle (visual only)
Expert:
- Benchmark logic stub

### 9.14 Compute Returns
Basic:
- “Compute” button (UI only)
- Mock results preview (mini table)
Advanced:
- Return aggregation options (portfolio-only vs include assets)
Expert:
- Compute stub

### 9.15 Output QA Checks
Basic:
- Sanity checks checklist
- “Run QA” button (UI only)
Advanced:
- Threshold inputs
Expert:
- QA rule stub

---

### 9.16 Model Step (Scientist) — Optional
Basic:
- Toggle: Enable model step
- Model type dropdown (mock)
Advanced:
- Drift checks toggle
Expert:
- Model code stub

---

### 9.17 Dashboard Cards (BI Dev)
Basic:
- Select cards (checkbox list)
- Layout selector (mock)
Advanced:
- Filters/drilldowns toggles
Expert:
- Dashboard config JSON stub

### 9.18 Report Generator
Basic:
- Report sections checklist
- Schedule toggle (UI only)
Advanced:
- Delivery method placeholder
Expert:
- Template stub

### 9.19 Exports / API
Basic:
- Export formats: CSV / JSON
Advanced:
- Snapshot frequency (UI only)
Expert:
- API schema stub

---

## 10) Page Header & Controls

Header (top bar):
- Title: **Portfolio Returns — Workflow**
- Buttons:
  - **Run (Simulate)**
  - **Reset Workflow**
  - **Save Template (Mock)**

Optional controls:
- Zoom in/out (for network view)
- Fit-to-screen
- Mini-map (optional, only if easy)

---

## 11) Acceptance Criteria (UI Prototype)

1. The workflow renders as **5 vertical lanes** with widget cards placed as specified.
2. Each input source is a **separate card** (Portfolio, Market, FX, Benchmark optional, Calendar/Currency).
3. Clicking any widget opens a **mini-window** with Basic/Advanced/Expert tabs.
4. Metric selection in Returns Config is checkbox-based and updates the widget status to “Configured” on Apply.
5. Optional benchmark widgets:
   - show dashed connectors
   - can be disabled and visually deactivated
6. “Run (Simulate)” animates a fake execution state across the pipeline.
7. Visual styling is Carbon-like (components, spacing, typography).

---

## 12) Technical Notes (Frontend Only)

- Recommended stack:
  - React + TypeScript
  - Carbon React components
  - SVG overlay for connections (simple and reliable)
- State management:
  - Local component state or lightweight store
  - Optional: localStorage persistence for widget configs

---

## 13) Deliverables

- A single functional page implementing:
  - lane-based network workflow
  - clickable configurable widgets (mini-window)
  - simulated run statuses
  - IBM Carbon styling throughout