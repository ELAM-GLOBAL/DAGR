/**
 * Trading-firm demo data for D.A.G.R.
 *
 * Customer: Raghav Jain Trading Firm — self-funded prop desk, ~INR 30 Cr AUM,
 * small bench of consultant-traders on NSE / BSE / MCX, path-to-hedge-fund ambition.
 *
 * Day-1 join story: Zerodha API (orders, fills) + Broker RPA (medium brokers without APIs)
 * -> trader-keyed P&L, win-rate, brokerage drag, and the "parent-teacher report card"
 * Raghav explicitly asked for at commission-payment time.
 *
 * Day-N expansion: Bloomberg / Reuters / MSCI market & regime data, broker P&L
 * reconciliation, SEBI regulatory feed for the fund-formation step.
 */

export type SourceStatus = 'live' | 'connected' | 'planned';

export interface SourceSystem {
    id: string;
    name: string;
    operator: string;
    description: string;
    status: SourceStatus;
    phase: 'day-1' | 'day-n';
}

export const SOURCES: SourceSystem[] = [
    { id: 'zerodha', name: 'Zerodha API', operator: 'Primary broker · Kite Connect', description: 'Order, fill, brokerage stream; ~70% of book flows here', status: 'live', phase: 'day-1' },
    { id: 'broker-rpa', name: 'Broker RPA Ingest', operator: 'ICICI / Motilal / Sharekhan / IIFL', description: 'Scheduled spreadsheet ingest from the 4 "medium brokers" without APIs', status: 'live', phase: 'day-1' },
    { id: 'broker-pnl', name: 'Broker P&L Statements', operator: 'End-of-day reconciliation', description: 'Settlement, brokerage, STT, GST per trade; trader-level normalization', status: 'connected', phase: 'day-1' },
    { id: 'bloomberg', name: 'Bloomberg Terminal', operator: 'Market data', description: 'NSE / BSE / MCX tick data, Nifty regime tagging, Greeks', status: 'connected', phase: 'day-n' },
    { id: 'reuters', name: 'Reuters Eikon', operator: 'Macro overlay', description: 'FII / DII flows, global macro context, currency cross-rates', status: 'planned', phase: 'day-n' },
    { id: 'msci', name: 'MSCI India Feed', operator: 'Index data', description: 'Index composition, benchmark active return reconciliation', status: 'planned', phase: 'day-n' },
    { id: 'sebi', name: 'SEBI Regulatory Feed', operator: 'Compliance · fund-formation gate', description: 'Margin reporting, AIF / PMS posture, category-3 readiness', status: 'planned', phase: 'day-n' },
];

export interface OntologyEntity {
    id: string;
    name: string;
    domain: 'commerce' | 'manufacturing' | 'compliance';
    sources: string[];
    description: string;
    fields: { name: string; type: string }[];
    phase: 'day-1' | 'day-n';
}

/**
 * Domains are repurposed: commerce = trading desk (order flow), manufacturing = execution
 * & risk (the operational machine), compliance = regulatory & audit.
 */
export const ENTITIES: OntologyEntity[] = [
    {
        id: 'order',
        name: 'Order',
        domain: 'commerce',
        sources: ['zerodha', 'broker-rpa'],
        phase: 'day-1',
        description: 'A buy or sell intent. Links to Trader, Instrument, Broker, and the executed Trade fill.',
        fields: [
            { name: 'order_id', type: 'string' },
            { name: 'trader_id', type: 'fk:Trader' },
            { name: 'instrument_id', type: 'fk:Instrument' },
            { name: 'side', type: 'enum: buy/sell' },
            { name: 'qty', type: 'integer' },
            { name: 'limit_price', type: 'currency:INR' },
            { name: 'placed_at', type: 'timestamp' },
        ],
    },
    {
        id: 'customer',
        name: 'Trader',
        domain: 'commerce',
        sources: ['zerodha', 'broker-rpa', 'broker-pnl'],
        phase: 'day-1',
        description: 'A consultant-trader on the bench. Aggregates orders, fills, P&L, drawdown, the monthly report card.',
        fields: [
            { name: 'trader_id', type: 'string' },
            { name: 'name', type: 'string' },
            { name: 'tier', type: 'enum: Senior/Junior/Probation' },
            { name: 'allocated_capital_cr', type: 'currency:INR' },
            { name: 'commission_rate_pct', type: 'percent' },
            { name: 'joined_at', type: 'date' },
        ],
    },
    {
        id: 'product',
        name: 'Instrument',
        domain: 'commerce',
        sources: ['zerodha', 'bloomberg'],
        phase: 'day-1',
        description: 'A tradable security. ISIN-normalized across NSE / BSE / MCX.',
        fields: [
            { name: 'instrument_id', type: 'string' },
            { name: 'ticker', type: 'string' },
            { name: 'venue', type: 'enum: NSE/BSE/MCX' },
            { name: 'asset_class', type: 'enum' },
            { name: 'lot_size', type: 'integer' },
            { name: 'isin', type: 'string' },
        ],
    },
    {
        id: 'shipment',
        name: 'Trade',
        domain: 'commerce',
        sources: ['zerodha', 'broker-rpa'],
        phase: 'day-1',
        description: 'An executed fill. Joins to Order on order_id; carries broker, brokerage, slippage, regime.',
        fields: [
            { name: 'trade_id', type: 'string' },
            { name: 'order_id', type: 'fk:Order' },
            { name: 'broker_id', type: 'fk:Broker' },
            { name: 'strategy_id', type: 'fk:Strategy' },
            { name: 'fill_price', type: 'currency:INR' },
            { name: 'brokerage_inr', type: 'currency:INR' },
            { name: 'slippage_bps', type: 'float' },
            { name: 'executed_at', type: 'timestamp' },
        ],
    },
    {
        id: 'carrier',
        name: 'Broker',
        domain: 'commerce',
        sources: ['zerodha', 'broker-rpa'],
        phase: 'day-1',
        description: 'A brokerage providing market access. Owns slippage profile and brokerage drag per lot.',
        fields: [
            { name: 'broker_id', type: 'string' },
            { name: 'name', type: 'string' },
            { name: 'api_available', type: 'boolean' },
            { name: 'avg_slippage_bps', type: 'float' },
            { name: 'brokerage_per_lot', type: 'currency:INR' },
        ],
    },
    {
        id: 'lane',
        name: 'Strategy',
        domain: 'commerce',
        sources: ['zerodha', 'broker-pnl'],
        phase: 'day-1',
        description: 'A tagged trade style (Momentum, Mean-Reversion, Options-Income, Pairs, Macro). Used for P&L attribution.',
        fields: [
            { name: 'strategy_id', type: 'string' },
            { name: 'name', type: 'string' },
            { name: 'pnl_contribution_inr', type: 'currency:INR' },
            { name: 'sharpe_3m', type: 'float' },
        ],
    },
    {
        id: 'cultivar',
        name: 'Position',
        domain: 'manufacturing',
        sources: ['zerodha', 'broker-pnl'],
        phase: 'day-n',
        description: 'A live or closed exposure. Aggregates open lots, MTM, Greeks, drawdown to date.',
        fields: [
            { name: 'position_id', type: 'string' },
            { name: 'instrument_id', type: 'fk:Instrument' },
            { name: 'trader_id', type: 'fk:Trader' },
            { name: 'side', type: 'enum: long/short' },
            { name: 'mtm_inr', type: 'currency:INR' },
            { name: 'opened_at', type: 'timestamp' },
        ],
    },
    {
        id: 'cohort',
        name: 'Capital Allocation',
        domain: 'manufacturing',
        sources: ['broker-pnl'],
        phase: 'day-n',
        description: 'A monthly capital grant to a trader. Tracks utilization, scaling trajectory, drawdown depth.',
        fields: [
            { name: 'allocation_id', type: 'string' },
            { name: 'trader_id', type: 'fk:Trader' },
            { name: 'period', type: 'string' },
            { name: 'capital_inr', type: 'currency:INR' },
            { name: 'utilization_pct', type: 'percent' },
        ],
    },
    {
        id: 'chamber',
        name: 'Market Regime',
        domain: 'manufacturing',
        sources: ['bloomberg', 'reuters'],
        phase: 'day-n',
        description: 'A tagged market state (Bull / Bear / Range / Hi-Vol / Lo-Vol). Every trade is regime-stamped for alignment analysis.',
        fields: [
            { name: 'regime_id', type: 'string' },
            { name: 'name', type: 'string' },
            { name: 'started_at', type: 'date' },
            { name: 'nifty_drift_pct', type: 'percent' },
            { name: 'vix_avg', type: 'float' },
        ],
    },
    {
        id: 'plantlet',
        name: 'Drawdown Event',
        domain: 'manufacturing',
        sources: ['broker-pnl', 'zerodha'],
        phase: 'day-n',
        description: 'A peak-to-trough capital decline beyond threshold. Triggers the manual 20–30% trader-removal rule today.',
        fields: [
            { name: 'drawdown_id', type: 'string' },
            { name: 'trader_id', type: 'fk:Trader' },
            { name: 'peak_capital_inr', type: 'currency:INR' },
            { name: 'trough_capital_inr', type: 'currency:INR' },
            { name: 'pct_decline', type: 'percent' },
            { name: 'recovered_at', type: 'timestamp' },
        ],
    },
    {
        id: 'sterility-event',
        name: 'Risk Flag',
        domain: 'compliance',
        sources: ['broker-pnl', 'zerodha'],
        phase: 'day-n',
        description: 'A behavioral or risk anomaly: overtrading-after-loss, oversizing, concentration breach, regime misalignment.',
        fields: [
            { name: 'flag_id', type: 'string' },
            { name: 'trader_id', type: 'fk:Trader' },
            { name: 'flag_type', type: 'enum' },
            { name: 'severity', type: 'enum: low/med/high' },
            { name: 'resolved', type: 'boolean' },
        ],
    },
    {
        id: 'compliance-cert',
        name: 'Trader Report Card',
        domain: 'compliance',
        sources: ['sebi', 'broker-pnl'],
        phase: 'day-n',
        description: 'The monthly 12-category scorecard handed to a trader at commission time. Exportable, audit-grade.',
        fields: [
            { name: 'report_id', type: 'string' },
            { name: 'trader_id', type: 'fk:Trader' },
            { name: 'period', type: 'string' },
            { name: 'composite_score', type: 'float' },
            { name: 'commission_inr', type: 'currency:INR' },
            { name: 'issued_at', type: 'date' },
        ],
    },
];

export interface OntologyLink {
    from: string;
    to: string;
    cardinality: '1:1' | '1:N' | 'N:N';
    label: string;
    highlight?: boolean;
}

export const LINKS: OntologyLink[] = [
    { from: 'order', to: 'customer', cardinality: 'N:N', label: 'placed by' },
    { from: 'order', to: 'product', cardinality: 'N:N', label: 'on instrument' },
    { from: 'order', to: 'shipment', cardinality: '1:N', label: 'filled by', highlight: true },
    { from: 'shipment', to: 'carrier', cardinality: 'N:N', label: 'via broker' },
    { from: 'shipment', to: 'lane', cardinality: 'N:N', label: 'tagged strategy' },
    { from: 'product', to: 'cultivar', cardinality: 'N:N', label: 'held as' },
    { from: 'cohort', to: 'customer', cardinality: 'N:N', label: 'allocated to' },
    { from: 'plantlet', to: 'customer', cardinality: 'N:N', label: 'experienced by' },
    { from: 'plantlet', to: 'chamber', cardinality: 'N:N', label: 'in regime' },
    { from: 'sterility-event', to: 'customer', cardinality: 'N:N', label: 'raised on' },
    { from: 'compliance-cert', to: 'customer', cardinality: 'N:N', label: 'scores' },
    { from: 'cultivar', to: 'customer', cardinality: 'N:N', label: 'owned by' },
];

export interface DerivedOutput {
    id: string;
    name: string;
    summary: string;
    feeds: string[];
    phase: 'day-1' | 'day-n';
}

export const OUTPUTS: DerivedOutput[] = [
    { id: 'margin-per-order', name: 'True P&L per Trader', summary: 'Joins order intent, fill price, brokerage, slippage, STT/GST per trader — not the raw broker P&L Raghav sees today.', feeds: ['order', 'shipment', 'customer'], phase: 'day-1' },
    { id: 'supply-demand', name: 'Bench Capacity vs Allocation', summary: 'Bench-wide capital utilization against monthly allocation. Flags idle capital and over-leveraged traders before the books close.', feeds: ['order', 'shipment', 'cohort'], phase: 'day-1' },
    { id: 'lane-pl', name: 'Broker & Strategy P&L', summary: 'Brokerage drag per broker and Sharpe per strategy. Surfaces renegotiation candidates and strategies to scale or kill.', feeds: ['shipment', 'carrier', 'lane'], phase: 'day-1' },
    { id: 'customer-ltv', name: 'Trader Trajectory', summary: 'Forward 12-month projection per trader at current performance — the "if I hold this bench, where is my book?" view.', feeds: ['order', 'customer', 'shipment'], phase: 'day-1' },
    { id: 'lineage-ledger', name: 'Unified Trade Ledger', summary: 'Single source of truth: every trade across every broker, normalized to one schema with regime, strategy, and trader joined.', feeds: ['cultivar', 'cohort', 'product', 'sterility-event'], phase: 'day-n' },
    { id: 'contamination-sentinel', name: 'Drawdown Sentinel', summary: 'Predictive drawdown alert per trader — pattern-matches today\'s behavior against historical blow-up profiles within 90 days.', feeds: ['sterility-event', 'chamber', 'cohort'], phase: 'day-n' },
    { id: 'cultivar-pl', name: 'Position & Regime P&L', summary: 'Per-position cost-to-hold and per-regime alignment score. Identifies whether returns are skill or regime tailwind.', feeds: ['cultivar', 'cohort', 'plantlet', 'order'], phase: 'day-n' },
    { id: 'compliance-vault', name: 'Audit & Report Card Vault', summary: 'Monthly 12-category trader report card, plus SEBI-ready audit trail for the AIF / PMS fund-formation step.', feeds: ['compliance-cert', 'sterility-event'], phase: 'day-n' },
];

/* ──────────── Sample data for tables/charts ──────────── */

export const SAMPLE_ORDERS = [
    { id: 'O-77104', customer: 'Trader 01 · Mumbai', sku: 'NSE:RELIANCE', qty: 800, asp: 2840, gross: 22.72, status: 'Filled' },
    { id: 'O-77105', customer: 'Trader 03 · Gurugram', sku: 'NSE:HDFCBANK', qty: 1200, asp: 1612, gross: 19.34, status: 'Filled' },
    { id: 'O-77106', customer: 'Trader 02 · Pune', sku: 'NSE:NIFTYBANK-OPT', qty: 40, asp: 482, gross: 7.71, status: 'Open' },
    { id: 'O-77107', customer: 'Trader 04 · Bangalore', sku: 'NSE:TCS', qty: 320, asp: 3920, gross: 12.54, status: 'Filled' },
    { id: 'O-77108', customer: 'Trader 05 · Hyderabad', sku: 'MCX:GOLD', qty: 6, asp: 72340, gross: 4.34, status: 'Stop-Loss' },
    { id: 'O-77109', customer: 'Trader 01 · Mumbai', sku: 'NSE:INFY', qty: 600, asp: 1488, gross: 8.93, status: 'Filled' },
    { id: 'O-77110', customer: 'Trader 03 · Gurugram', sku: 'MCX:CRUDEOIL', qty: 12, asp: 6420, gross: 7.70, status: 'Filled' },
    { id: 'O-77111', customer: 'Trader 04 · Bangalore', sku: 'NSE:NIFTY-FUT', qty: 100, asp: 24180, gross: 24.18, status: 'Open' },
];

export const SAMPLE_SHIPMENTS = [
    { id: 'T-44102', orderId: 'O-77104', carrier: 'Zerodha', lane: 'Momentum · LargeCap', cost: 264, transit: '0.4s', damage: 'None' },
    { id: 'T-44103', orderId: 'O-77105', carrier: 'Zerodha', lane: 'Mean-Reversion', cost: 312, transit: '0.6s', damage: 'None' },
    { id: 'T-44104', orderId: 'O-77107', carrier: 'ICICI Direct', lane: 'Momentum · LargeCap', cost: 480, transit: '1.8s', damage: '0.8 bps' },
    { id: 'T-44105', orderId: 'O-77108', carrier: 'Motilal Oswal', lane: 'Commodity Macro', cost: 720, transit: '2.4s', damage: '3.2 bps · SL hit' },
    { id: 'T-44106', orderId: 'O-77109', carrier: 'Zerodha', lane: 'Mean-Reversion', cost: 198, transit: '0.5s', damage: 'None' },
    { id: 'T-44107', orderId: 'O-77110', carrier: 'Sharekhan', lane: 'Commodity Macro', cost: 540, transit: '1.6s', damage: 'None' },
];

/**
 * "Cultivars" = positions/strategies. Reusing the column shape so existing chart
 * configs continue to work; field names are renamed where it matters in the UI.
 */
export const SAMPLE_CULTIVARS = [
    { id: 'STR-MOM-LC', name: 'Momentum · LargeCap (NSE-50)', triploid: false, propSuccess: 71.2, cogsPerPlantlet: 28, monthlyVolume: 142 },
    { id: 'STR-MR-MC', name: 'Mean-Reversion · MidCap', triploid: false, propSuccess: 64.8, cogsPerPlantlet: 36, monthlyVolume: 96 },
    { id: 'STR-OPT-BNK', name: 'Options-Income · BankNifty', triploid: false, propSuccess: 58.4, cogsPerPlantlet: 412, monthlyVolume: 184 },
    { id: 'STR-PAIRS', name: 'Pairs · Sector-Neutral', triploid: true, propSuccess: 62.1, cogsPerPlantlet: 84, monthlyVolume: 48 },
    { id: 'STR-MCX-MAC', name: 'Commodity Macro · MCX', triploid: false, propSuccess: 54.7, cogsPerPlantlet: 540, monthlyVolume: 62 },
    { id: 'STR-ARB-IDX', name: 'Index Cash-Futures Arb', triploid: false, propSuccess: 88.9, cogsPerPlantlet: 142, monthlyVolume: 28 },
    { id: 'STR-SC-MOM', name: 'SmallCap Momentum (BSE)', triploid: false, propSuccess: 49.3, cogsPerPlantlet: 22, monthlyVolume: 24 },
];

/**
 * "Chambers" = market regime contexts the bench is currently exposed to.
 * Re-using shape so charts keep working.
 */
export const SAMPLE_CHAMBERS = [
    { id: 'REG-01', site: 'Bull · Hi-Vol', cultivar: 'Momentum · LargeCap', temp: 24.1, humidity: 71, co2: 612, par: 145, status: 'Nominal' },
    { id: 'REG-02', site: 'Bull · Hi-Vol', cultivar: 'Options-Income', temp: 26.4, humidity: 68, co2: 605, par: 158, status: 'Nominal' },
    { id: 'REG-03', site: 'Range · Lo-Vol', cultivar: 'Mean-Reversion', temp: 22.8, humidity: 74, co2: 618, par: 132, status: 'Nominal' },
    { id: 'REG-04', site: 'Hi-Vol · FII Outflow', cultivar: 'Pairs · Sector-Neutral', temp: 23.6, humidity: 70, co2: 622, par: 140, status: 'Watch' },
    { id: 'REG-05', site: 'Range · Lo-Vol', cultivar: 'Index Cash-Fut Arb', temp: 21.4, humidity: 76, co2: 598, par: 128, status: 'Nominal' },
    { id: 'REG-06', site: 'Bear · Pull-Back', cultivar: 'SmallCap Momentum', temp: 23.2, humidity: 72, co2: 610, par: 138, status: 'Watch' },
    { id: 'REG-07', site: 'Commodity Risk-On', cultivar: 'MCX Macro', temp: 25.7, humidity: 78, co2: 590, par: 122, status: 'Nominal' },
    { id: 'REG-08', site: 'Bull · Hi-Vol', cultivar: 'Momentum · LargeCap', temp: 24.3, humidity: 71, co2: 614, par: 146, status: 'Nominal' },
];

export const KPI_SNAPSHOT = {
    /* Commercial — book P&L MTD in INR Lakhs (1L = 100,000) */
    monthlyRevenue: 1840,                    // INR 18.4 L MTD net P&L (in thousands)
    revenueGrowthMoM: 8.2,
    orderBacklogValue: 23000,                // INR 2.3 Cr open exposure (in thousands)
    orderBacklogUnits: 47,                   // 47 open positions
    avgDaysToPromise: 6,                     // avg holding period (days)
    /* Operations */
    turnaroundDays: 8,                       // monthly trader-review cycle, days
    turnaroundTarget: 5,
    onTimeFulfillment: 96.4,                 // execution-intent fill alignment %
    /* Capital & cost */
    inventorySpendMtd: 420,                  // INR 4.2 L brokerage MTD (in thousands)
    inventorySpendNext30d: 480,              // projected brokerage 30d
    inventorySpendNext90dTotal: 1480,
    /* Unit economics */
    blendedAsp: 16.20,                       // not surfaced directly
    blendedCogs: 2.78,
    grossMargin: 67.2,                       // bench-blended win-rate %
    /* Path to scale */
    breakevenTarget: 50,                     // target bench size for hedge-fund step
    currentMonthlyPlantlets: 5,              // current bench size
    /* Risk detail */
    contaminationRate: 0.6,                  // drawdown rate %
    activeChambers: 12,                      // active strategies on the bench
    cultivarsInProduction: 28,               // distinct instruments traded
};

/* Open positions — what's committed but not yet closed. INR Lakhs. */
export const ORDER_BACKLOG = [
    { id: 'P-30114', customer: 'Trader 04 · Bangalore', sku: 'NSE:NIFTY-FUT', cultivar: 'Momentum LC', qty: 100, value: 2418, daysToPromise: 3, status: 'Open' },
    { id: 'P-30115', customer: 'Trader 02 · Pune', sku: 'NSE:NIFTYBANK-OPT', cultivar: 'Options-Income', qty: 40, value: 771, daysToPromise: 11, status: 'Open' },
    { id: 'P-30116', customer: 'Trader 01 · Mumbai', sku: 'NSE:RELIANCE', cultivar: 'Momentum LC', qty: 800, value: 2272, daysToPromise: 5, status: 'In-Profit' },
    { id: 'P-30117', customer: 'Trader 03 · Gurugram', sku: 'MCX:CRUDEOIL', cultivar: 'Commodity Macro', qty: 12, value: 770, daysToPromise: 2, status: 'In-Profit' },
    { id: 'P-30118', customer: 'Trader 05 · Hyderabad', sku: 'MCX:SILVER', cultivar: 'Commodity Macro', qty: 4, value: 354, daysToPromise: 8, status: 'Drawdown' },
    { id: 'P-30119', customer: 'Trader 04 · Bangalore', sku: 'NSE:TCS', cultivar: 'Momentum LC', qty: 320, value: 1254, daysToPromise: 4, status: 'In-Profit' },
];

/* Trader-review cycle time per strategy (days). */
export const TAT_BY_CULTIVAR = [
    { cultivar: 'Momentum LC', current: 5, target: 5, units: 142 },
    { cultivar: 'Options Inc', current: 7, target: 6, units: 184 },
    { cultivar: 'Mean-Rev MC', current: 8, target: 6, units: 96 },
    { cultivar: 'Pairs', current: 9, target: 7, units: 48 },
    { cultivar: 'MCX Macro', current: 11, target: 8, units: 62 },
    { cultivar: 'Idx Arb', current: 4, target: 5, units: 28 },
    { cultivar: 'SC Mom', current: 14, target: 10, units: 24 },
];

/* Order-to-review cycle trend — last 6 months. */
export const TAT_TREND = [
    { group: 'Actual', month: 'Dec', value: 14 },
    { group: 'Actual', month: 'Jan', value: 13 },
    { group: 'Actual', month: 'Feb', value: 12 },
    { group: 'Actual', month: 'Mar', value: 10 },
    { group: 'Actual', month: 'Apr', value: 9 },
    { group: 'Actual', month: 'May', value: 8 },
    { group: 'Target', month: 'Dec', value: 5 },
    { group: 'Target', month: 'Jan', value: 5 },
    { group: 'Target', month: 'Feb', value: 5 },
    { group: 'Target', month: 'Mar', value: 5 },
    { group: 'Target', month: 'Apr', value: 5 },
    { group: 'Target', month: 'May', value: 5 },
];

/* Brokerage drag — actuals + 30-day projection. INR thousands. */
export const INVENTORY_SPEND_TREND = [
    { group: 'Actual (INR K)', month: 'Dec', value: 312 },
    { group: 'Actual (INR K)', month: 'Jan', value: 348 },
    { group: 'Actual (INR K)', month: 'Feb', value: 386 },
    { group: 'Actual (INR K)', month: 'Mar', value: 401 },
    { group: 'Actual (INR K)', month: 'Apr', value: 412 },
    { group: 'Actual (INR K)', month: 'May', value: 420 },
    { group: 'Projected (INR K)', month: 'May', value: 420 },
    { group: 'Projected (INR K)', month: 'Jun', value: 480 },
    { group: 'Projected (INR K)', month: 'Jul', value: 512 },
    { group: 'Projected (INR K)', month: 'Aug', value: 538 },
];

/* Brokerage drag breakdown — this month. INR thousands. */
export const INVENTORY_SPEND_BREAKDOWN = [
    { group: 'Equity Brokerage', key: 'May', value: 184 },
    { group: 'F&O Brokerage', key: 'May', value: 142 },
    { group: 'Commodity (MCX) Brokerage', key: 'May', value: 48 },
    { group: 'STT + GST + Stamp', key: 'May', value: 36 },
    { group: 'Exchange Fees', key: 'May', value: 10 },
];

/* Trader-bench footprint — for the home-page operator map. */
export type SiteStatus = 'live' | 'commissioning' | 'planned';

export interface Site {
    id: string;
    name: string;
    region: string;
    role: string;
    lat: number;
    lng: number;
    status: SiteStatus;
    commissionedAt: string;
    chambers: number;          // allocated capital (INR Cr)
    monthlyVolume: number;     // trades per month
    cultivars: string[];       // strategies traded
    tatDays: number;           // avg holding period (days)
    contamination: number;     // drawdown rate (%)
    margin: number;            // win rate (%)
    /** p95 order-to-fill latency to NSE matching engine, milliseconds. */
    latencyMs: number;
    /** Physical hops — what the latency tells you about infrastructure. */
    latencyPath: string;
    note: string;
}

export const SITES: Site[] = [
    {
        id: 'mum',
        name: 'Trader 01 · Mumbai',
        region: 'Maharashtra · BKC',
        role: 'Principal · Discretionary equity & F&O',
        lat: 19.07,
        lng: 72.87,
        status: 'live',
        commissionedAt: 'Founder',
        chambers: 12,
        monthlyVolume: 142,
        cultivars: ['Momentum LC', 'Mean-Reversion', 'Options-Income'],
        tatDays: 4,
        contamination: 0.4,
        margin: 73.1,
        latencyMs: 3.2,
        latencyPath: 'BKC → NSE Colo · dark fibre',
        note: 'Principal-managed book. Largest capital allocation (INR 12 Cr). Sets bench-level risk posture; co-located with broker terminals.',
    },
    {
        id: 'pun',
        name: 'Trader 02 · Pune',
        region: 'Maharashtra',
        role: 'Senior consultant · Options-income',
        lat: 18.52,
        lng: 73.86,
        status: 'live',
        commissionedAt: '2024-09',
        chambers: 6,
        monthlyVolume: 184,
        cultivars: ['Options-Income · BankNifty', 'Index Arb'],
        tatDays: 7,
        contamination: 0.5,
        margin: 68.4,
        latencyMs: 9.4,
        latencyPath: 'Pune VPS → Mumbai IXP → NSE',
        note: 'BankNifty options income specialist. Highest trade count on the bench. Recovers from losses by reducing size — Raghav\'s reference "good behavior" profile.',
    },
    {
        id: 'del',
        name: 'Trader 03 · Gurugram',
        region: 'Delhi NCR',
        role: 'Senior consultant · Equity momentum',
        lat: 28.46,
        lng: 77.03,
        status: 'live',
        commissionedAt: '2025-02',
        chambers: 5,
        monthlyVolume: 96,
        cultivars: ['Momentum LC', 'Mean-Reversion · MidCap'],
        tatDays: 6,
        contamination: 0.6,
        margin: 71.8,
        latencyMs: 31.6,
        latencyPath: 'Gurugram → Delhi → Mumbai · public internet',
        note: 'Equity-only. Strong in trending markets, underperforms in range. Regime alignment score: 0.84 in bull, 0.42 in range.',
    },
    {
        id: 'blr',
        name: 'Trader 04 · Bangalore',
        region: 'Karnataka',
        role: 'Junior consultant · Quant systematic',
        lat: 12.97,
        lng: 77.59,
        status: 'commissioning',
        commissionedAt: '2026-03',
        chambers: 3,
        monthlyVolume: 62,
        cultivars: ['Pairs · Sector-Neutral', 'Index Arb'],
        tatDays: 9,
        contamination: 0.5,
        margin: 64.2,
        latencyMs: 26.8,
        latencyPath: 'BLR cloud (AWS ap-south-1) → Mumbai',
        note: 'Ramping. Systematic quant; pairs + arbitrage. Newest on the bench — 90-day evaluation window closes in 6 weeks.',
    },
    {
        id: 'hyd',
        name: 'Trader 05 · Hyderabad',
        region: 'Telangana',
        role: 'Probation · Commodities',
        lat: 17.39,
        lng: 78.49,
        status: 'commissioning',
        commissionedAt: '2026-02',
        chambers: 2,
        monthlyVolume: 48,
        cultivars: ['Commodity Macro · MCX'],
        tatDays: 12,
        contamination: 12.0,
        margin: 49.3,
        latencyMs: 22.4,
        latencyPath: 'HYD → Mumbai · ISP A/B failover',
        note: 'On Drawdown Sentinel watch. -12% MTD on MCX book; pattern matches two historical blow-up profiles within 90 days. Reallocation candidate at next monthly review.',
    },
];

/* Customer/Trader true-margin derived view — the "day-one win". INR thousands. */
export const CUSTOMER_MARGIN = [
    { customer: 'Trader 01 · Mumbai', revenue: 1240, fulfillment: 84, service: 12, returns: 0, trueMargin: 1144, marginPct: 92.3 },
    { customer: 'Trader 02 · Pune', revenue: 982, fulfillment: 142, service: 18, returns: 0, trueMargin: 822, marginPct: 83.7 },
    { customer: 'Trader 03 · Gurugram', revenue: 814, fulfillment: 96, service: 14, returns: 0, trueMargin: 704, marginPct: 86.5 },
    { customer: 'Trader 04 · Bangalore', revenue: 412, fulfillment: 58, service: 8, returns: 0, trueMargin: 346, marginPct: 84.0 },
    { customer: 'Trader 05 · Hyderabad', revenue: 218, fulfillment: 72, service: 22, returns: 184, trueMargin: -60, marginPct: -27.5 },
    { customer: 'Bench blended', revenue: 3666, fulfillment: 452, service: 74, returns: 184, trueMargin: 2956, marginPct: 80.6 },
];

/* Broker & strategy P&L attribution. */
export const LANE_PL = [
    { lane: 'Momentum · LargeCap', carrier: 'Zerodha', shipments: 142, costPerUnit: 1.86, damageRate: 0.0, marginImpact: 'Scale' },
    { lane: 'Options-Income · BankNifty', carrier: 'Zerodha', shipments: 184, costPerUnit: 2.24, damageRate: 0.0, marginImpact: 'Scale' },
    { lane: 'Mean-Reversion · MidCap', carrier: 'ICICI Direct', shipments: 96, costPerUnit: 3.16, damageRate: 0.8, marginImpact: 'Hold' },
    { lane: 'Pairs · Sector-Neutral', carrier: 'Zerodha', shipments: 48, costPerUnit: 4.18, damageRate: 0.0, marginImpact: 'Hold' },
    { lane: 'Commodity Macro · MCX', carrier: 'Motilal Oswal', shipments: 62, costPerUnit: 8.72, damageRate: 3.2, marginImpact: 'Renegotiate' },
    { lane: 'SmallCap Momentum (BSE)', carrier: 'Sharekhan', shipments: 24, costPerUnit: 6.41, damageRate: 4.1, marginImpact: 'Cut' },
];

/* Bench capital utilization vs allocation — units = INR Lakhs of activity. */
export const DEMAND_SUPPLY_TREND = [
    { group: 'Capital Deployed (INR L)', month: 'Jan', value: 1840 },
    { group: 'Capital Deployed (INR L)', month: 'Feb', value: 2120 },
    { group: 'Capital Deployed (INR L)', month: 'Mar', value: 2280 },
    { group: 'Capital Deployed (INR L)', month: 'Apr', value: 2360 },
    { group: 'Capital Deployed (INR L)', month: 'May', value: 2430 },
    { group: 'Allocation Ceiling (INR L)', month: 'Jan', value: 2500 },
    { group: 'Allocation Ceiling (INR L)', month: 'Feb', value: 2700 },
    { group: 'Allocation Ceiling (INR L)', month: 'Mar', value: 2800 },
    { group: 'Allocation Ceiling (INR L)', month: 'Apr', value: 2900 },
    { group: 'Allocation Ceiling (INR L)', month: 'May', value: 3000 },
];

/* Strategy P&L contribution. */
export const CULTIVAR_MARGIN_CONTRIB = [
    { group: 'P&L contrib (INR L)', cultivar: 'Options-Inc', value: 6.84 },
    { group: 'P&L contrib (INR L)', cultivar: 'Mom LC', value: 5.22 },
    { group: 'P&L contrib (INR L)', cultivar: 'Mean-Rev', value: 3.18 },
    { group: 'P&L contrib (INR L)', cultivar: 'Idx Arb', value: 2.42 },
    { group: 'P&L contrib (INR L)', cultivar: 'Pairs', value: 1.96 },
    { group: 'P&L contrib (INR L)', cultivar: 'MCX Macro', value: -0.84 },
    { group: 'P&L contrib (INR L)', cultivar: 'SC Mom', value: -0.38 },
];

/* ──────────── Execution latency — by trader (city) and by algo ────────────
 *
 * p95 order-to-fill latency to the NSE matching engine. Matters because
 * latency is opportunity cost: slippage scales linearly with it on momentum,
 * and worse, it's the difference between an algo getting the quote it saw
 * and the next print. Bench-level visibility is a precondition for Phase 3
 * Execution OS (D.A.G.R. routing) — you can't tune what you can't measure.
 */

export interface ExecutionLatency {
    id: string;
    name: string;
    /** 'trader' — a discretionary seat. 'algo' — a systematic strategy container. */
    kind: 'trader' | 'algo';
    /** Geographic or infrastructure home. */
    location: string;
    /** p50 latency in milliseconds (median). */
    p50: number;
    /** p95 latency in milliseconds (tail — what slippage tracks). */
    p95: number;
    /** Worst-case in the last 24h. */
    p99: number;
    /** Status flag for the bench-level view. */
    status: 'optimal' | 'acceptable' | 'degraded';
    /** Path the order takes. */
    path: string;
}

export const EXECUTION_LATENCY: ExecutionLatency[] = [
    /* Traders — discretionary, latency is broker terminal → NSE matching engine */
    { id: 'trader-01', name: 'Trader 01 · Mumbai', kind: 'trader', location: 'BKC, Mumbai', p50: 2.4, p95: 3.2, p99: 4.8, status: 'optimal', path: 'BKC → NSE Colo · dark fibre' },
    { id: 'trader-02', name: 'Trader 02 · Pune', kind: 'trader', location: 'Pune', p50: 7.8, p95: 9.4, p99: 12.6, status: 'optimal', path: 'Pune VPS → Mumbai IXP → NSE' },
    { id: 'trader-05', name: 'Trader 05 · Hyderabad', kind: 'trader', location: 'Hyderabad', p50: 18.2, p95: 22.4, p99: 34.0, status: 'acceptable', path: 'HYD → Mumbai · ISP A/B failover' },
    { id: 'trader-04', name: 'Trader 04 · Bangalore', kind: 'trader', location: 'Bangalore (cloud)', p50: 22.6, p95: 26.8, p99: 38.4, status: 'acceptable', path: 'BLR · AWS ap-south-1 → Mumbai' },
    { id: 'trader-03', name: 'Trader 03 · Gurugram', kind: 'trader', location: 'Delhi NCR', p50: 28.4, p95: 31.6, p99: 46.2, status: 'degraded', path: 'Gurugram → Delhi → Mumbai · public internet' },

    /* Algos — systematic, latency is colo or VPS → matching engine */
    { id: 'algo-momlc', name: 'Momentum LC · co-located', kind: 'algo', location: 'NSE Colo (Mumbai)', p50: 0.6, p95: 1.1, p99: 1.8, status: 'optimal', path: 'NSE Colo rack → matching engine · sub-ms' },
    { id: 'algo-optsinc', name: 'Options-Income · BankNifty', kind: 'algo', location: 'NSE Colo (Mumbai)', p50: 0.8, p95: 1.4, p99: 2.2, status: 'optimal', path: 'NSE Colo rack → F&O segment' },
    { id: 'algo-idxarb', name: 'Index Cash-Fut Arb', kind: 'algo', location: 'NSE Colo (Mumbai)', p50: 0.5, p95: 0.9, p99: 1.6, status: 'optimal', path: 'NSE Colo · cash+fut twin order' },
    { id: 'algo-pairs', name: 'Pairs · Sector-Neutral', kind: 'algo', location: 'AWS ap-south-1', p50: 11.8, p95: 14.6, p99: 19.4, status: 'acceptable', path: 'AWS Mumbai → NSE · public peering' },
    { id: 'algo-mcxmac', name: 'MCX Commodity Macro', kind: 'algo', location: 'AWS ap-south-1', p50: 14.2, p95: 18.0, p99: 24.8, status: 'acceptable', path: 'AWS Mumbai → MCX matching engine' },
    { id: 'algo-scmom', name: 'SmallCap Momentum (BSE)', kind: 'algo', location: 'BSE Colo (Mumbai)', p50: 1.8, p95: 2.6, p99: 4.2, status: 'optimal', path: 'BSE Colo → BSE matching engine' },
    { id: 'algo-dr', name: 'Disaster Recovery · SG backup', kind: 'algo', location: 'AWS ap-southeast-1', p50: 68.4, p95: 78.2, p99: 96.8, status: 'degraded', path: 'AWS Singapore → Mumbai · failover only' },
];

/** Reshaped for the grouped bar chart: one row per (entity × percentile). */
export const EXECUTION_LATENCY_CHART = EXECUTION_LATENCY.flatMap(e => [
    { group: 'p50', entity: e.name, value: e.p50 },
    { group: 'p95', entity: e.name, value: e.p95 },
]);

/* ──────────── Value-justification math (Brief §11) ──────────── */

export interface ValueLever {
    id: string;
    label: string;
    formula: string;
    yearOneInrLakhs: number;
}

export const VALUE_LEVERS: ValueLever[] = [
    { id: 'reallocation', label: 'Reallocation efficiency', formula: '25% of book × INR 30 Cr × 10pp top–bottom-quartile return spread', yearOneInrLakhs: 75 },
    { id: 'drawdown', label: 'Drawdown protection', formula: '1.5 events/yr × 3% capital × 50% catch rate × INR 30 Cr', yearOneInrLakhs: 67 },
    { id: 'brokerage', label: 'Brokerage drag recovery', formula: '50% of ~5,400 noise trades/yr × INR 100 cost each', yearOneInrLakhs: 3 },
    { id: 'fundraising', label: 'Time-to-fundraising', formula: '22 hrs/wk recovered → INR 10 Cr add\'l AUM × (1.5% mgmt + 20% × 13% perf)', yearOneInrLakhs: 41 },
];

export const VALUE_TOTAL_INR_LAKHS = 186;
export const PILOT_FEE_INR_LAKHS = 7.5;
export const VALUE_MULTIPLIER = Math.round(VALUE_TOTAL_INR_LAKHS / PILOT_FEE_INR_LAKHS);

/* ──────────── 12-category trader scorecard (Brief §7) ──────────── */

export interface TraderScorecardCategory {
    id: string;
    name: string;
    description: string;
    /** 0..100 composite score for the demo trader (Trader 02 · Pune by default). */
    score: number;
}

export const SCORECARD_TRADER_02: TraderScorecardCategory[] = [
    { id: 'efficiency', name: 'Trade efficiency & noise filtering', description: 'Bell curve, necessity score, cost-to-profit, signal-to-noise', score: 78 },
    { id: 'consistency', name: 'Consistency & reliability', description: 'Monthly hit rate, win rate, avg-win vs avg-loss, drawdown recovery shape', score: 84 },
    { id: 'sizing', name: 'Position sizing & risk', description: 'Avg position, max single-trade loss, leverage, concentration, risk-per-trade', score: 76 },
    { id: 'emotional', name: 'Emotional control', description: 'Loss-recovery, overtrading-after-loss, response-to-streak, holding period', score: 82 },
    { id: 'entry-exit', name: 'Entry / exit quality', description: 'Entry score, exit score, trend-vs-reversal alignment, hold-time', score: 71 },
    { id: 'regime', name: 'Market-adjusted performance', description: 'Regime tagging, alignment, performance-by-regime', score: 68 },
    { id: 'docs', name: 'Trade documentation & discipline', description: 'Rationale clarity, pre-trade planning, deviation-from-plan', score: 62 },
    { id: 'capital', name: 'Capital deployment efficiency', description: 'Utilization, scaling trajectory, capital preservation in drawdown', score: 81 },
    { id: 'recovery', name: 'Account recovery trajectory', description: 'Recovery speed, recovery method, resilience', score: 88 },
    { id: 'settlement', name: 'Accounting & settlement', description: 'P&L reconciliation vs broker, fee understanding, settlement cleanliness', score: 92 },
    { id: 'comparison', name: 'Same-P&L comparison', description: 'Side-by-side vs bench peers with same monthly P&L', score: 74 },
    { id: 'composite', name: 'Composite score', description: 'Blended weighted score across all categories', score: 78 },
];

/* ──────────── Forward 12-month cash-flow projection (Brief §11) ──────────── */

/** Bench-level projection. value = INR Lakhs cumulative net P&L at current performance. */
export const FORWARD_CASHFLOW = [
    { group: 'At current bench', month: 'Jun', value: 18 },
    { group: 'At current bench', month: 'Jul', value: 37 },
    { group: 'At current bench', month: 'Aug', value: 56 },
    { group: 'At current bench', month: 'Sep', value: 78 },
    { group: 'At current bench', month: 'Oct', value: 102 },
    { group: 'At current bench', month: 'Nov', value: 128 },
    { group: 'At current bench', month: 'Dec', value: 156 },
    { group: 'At current bench', month: 'Jan', value: 186 },
    { group: 'At current bench', month: 'Feb', value: 218 },
    { group: 'At current bench', month: 'Mar', value: 252 },
    { group: 'At current bench', month: 'Apr', value: 288 },
    { group: 'At current bench', month: 'May', value: 324 },

    { group: 'With D.A.G.R. uplift', month: 'Jun', value: 24 },
    { group: 'With D.A.G.R. uplift', month: 'Jul', value: 51 },
    { group: 'With D.A.G.R. uplift', month: 'Aug', value: 80 },
    { group: 'With D.A.G.R. uplift', month: 'Sep', value: 114 },
    { group: 'With D.A.G.R. uplift', month: 'Oct', value: 152 },
    { group: 'With D.A.G.R. uplift', month: 'Nov', value: 196 },
    { group: 'With D.A.G.R. uplift', month: 'Dec', value: 244 },
    { group: 'With D.A.G.R. uplift', month: 'Jan', value: 296 },
    { group: 'With D.A.G.R. uplift', month: 'Feb', value: 354 },
    { group: 'With D.A.G.R. uplift', month: 'Mar', value: 416 },
    { group: 'With D.A.G.R. uplift', month: 'Apr', value: 482 },
    { group: 'With D.A.G.R. uplift', month: 'May', value: 552 },
];
