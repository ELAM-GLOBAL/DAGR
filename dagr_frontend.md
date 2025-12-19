# PRD — D.A.G.R. Risk Pack: Frontend Prototype

Version: **v1.2 (UI Shell + Workflow Builder + Core Pages)**  
Scope: **Frontend-only**, **No backend**, **IBM Carbon Design System**

---

## 1) Objective

Build a comprehensive **Frontend Prototype** for the D.A.G.R. Risk Pack that demonstrates:

1. **Global UI Shell**: A responsive Carbon UI Shell with context-aware navigation (Home vs. Module-specific).
2. **Core Risk Pages**: Overview dashboard, Data Connections, and Job Monitor.
3. **Portfolio Returns Workflow**: A complex QRadar-style swimlane builder for configuring return calculation pipelines.

---

## 2) Global UI Shell & Navigation

**Component:** `ShellLayout.tsx`

The application uses a persistent **IBM Carbon UI Shell** containing a global header and a collapsible left side navigation.

### 2.1 Navigation Contexts

The sidebar menu adapts dynamically based on the current URL route:

**A. Risk Home Context** (Default)

- **Routes**: `/packs/risk/home`, `/packs/risk/data-connections`, etc.
- **Menu Items**:
  - **Overview** (Home icon)
  - **Data Connections** (Connect icon) - *Manage DB/API sources*
  - **Job Monitor** (Activity icon) - *View pipeline statuses*
  - **Pack Registry** (IBM Cloud icon)
  - **Users & RBAC** (User Admin icon)
  - **Workspace Settings** (Settings icon)

**B. Portfolio Returns Context**

- **Routes**: `/packs/risk/portfolio-returns/*`
- **Menu Items**:
  - **Header**: Navigation back to Home or other modules.
  - **Dashboard** (Dashboard icon) - *High-level metrics (Placeheld)*
  - **Workflow Builder** (Activity icon) - *The visual graph editor*
  - **Data Visual** (Menu)
    - Portfolio Data
    - Market Data
    - FX Rates
    - Benchmark

**C. VaR / CVaR Context**

- **Routes**: `/packs/risk/var-cvar/*`
- **Menu Items**:
  - Similar structure to Portfolio Returns (Dashboard, Workflow, Data Visual).

### 2.2 Header

- **Title**: "D.A.G.R. | RISK"
- **Top Bar Links**: Home, Portfolio Returns, VaR / CVaR, Dashboards.
- **Global Actions**: Search, Notifications, App Switcher, User Profile.

---

## 3) Implemented Pages (Features)

### 3.1 Risk Overview (Home)

**Component:** `StubPages.tsx > RiskHome`

- **Goal**: Landing page for the Risk Pack.
- **Features**:
  - **Quick Actions Tiles**: "New Workflow", "Manage Connections", "View Jobs".
  - **Active Pipelines Table**: Shows running/scheduled pipelines (e.g., "EOD_Global_Equity").
  - **System Status**: Uptime tile (99.9%) and Pending Approvals.

### 3.2 Data Connections

**Component:** `StubPages.tsx > DataConnections`

- **Goal**: Manage database and API connections.
- **Features**:
  - **Connection Table**: Lists sources like "Portfolio_Master_DB" (PostgreSQL) and "Bloomberg_Feed" (API).
  - **Status Indicators**: Connected (Green), Error (Red).

### 3.3 Placeholders

**Component:** `StubPages.tsx > DashboardStub / PlaceholderStub`

- **Dashboard**: "Build in Progress" state for analytics dashboards.
- **VaR/CVaR**: Placeholder pages for future modules.

---

## 4) Feature: Portfolio Returns Workflow Builder

**Route**: `/packs/risk/portfolio-returns/workflow`  
**Description**: A QRadar-style swimlane network diagram for configuring calculation piplines.

### 4.1 Design Objective

1. Displays the **Portfolio Returns workflow** as a **QRadar-style swimlane network diagram** (lanes + node tiles + orthogonal connectors).
2. Allows users to **configure any node/widget** by clicking it and editing settings in a **Carbon “Side panel” editing window** (Orange-like in-context editing, but Carbon-native).

### 4.2 Widget Editing Window Component

**Side panel** (right side, 480px width, **no overlay**, stays open).
matches Carbon's "Create Flow" pattern for in-context editing.

### 4.3 Workflow Page Layout

1. **Header**: Buttons for Run (Simulate), Reset, Save.
2. **Workflow Canvas**:
    - **Lane 1 (Architect)**: Inputs (Portfolio, Market, FX) & Setup.
    - **Lane 2 (Engineer)**: Schema, Validation, Normalization, Join.
    - **Lane 3 (Analyst)**: Returns Config, Compute, QA.
    - **Lane 4 (Scientist)**: Optional Model Step.
    - **Lane 5 (BI Developer)**: Reporting & Exports.
3. **Widget Editor Side Panel**: Opens on node click.

### 4.4 Simulation

- **"Run" Button**: Triggers a visualization where node statuses animate from `NeedsSetup`/`Idle` to `Running` -> `Success` (left-to-right).

---

## 5) Visual Requirements (Global)

- **Theme**: Carbon g100 (Dark) or g10 (White) mixed correctly.
- **Spacing**: Use Carbon tokens (`$spacing-05`, etc.).
- **Typography**: IBM Plex Sans.
- **Icons**: Official `@carbon/icons-react`.

---

## 6) Acceptance Criteria (v1.2)

- [x] **Shell**: Header and SideNav render correctly and persist across routes.
- [x] **Routing**: Navigation switches context menus (Home vs Portfolio) correctly.
- [x] **Home Page**: Displays Tiles and Pipeline Status table.
- [x] **Connections Page**: Displays Data Source table.
- [ ] **Workflow Page**:
  - Canvas visually matches QRadar swimlane network style.
  - Clicking nodes opens Side Panel (Context Editor).
  - Run Simulation animates connectivity.
