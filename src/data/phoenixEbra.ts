/**
 * Central Phoenix Ebra demo data.
 * Day-1 join story: Kevin's OrderFlow + Scott's ShipTrack -> margin per customer/product/lane.
 * Day-N expansion: LIMS, ChamberOS, ERP, USDA APHIS -> lineage, contamination, cultivar P&L.
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
    { id: 'orderflow', name: "OrderFlow", operator: "Kevin's platform", description: 'Customer orders, line items, ASP, billing', status: 'live', phase: 'day-1' },
    { id: 'shiptrack', name: 'ShipTrack', operator: "Scott's platform", description: 'Shipments, carriers, lanes, fulfillment cost', status: 'live', phase: 'day-1' },
    { id: 'lims', name: 'LIMS', operator: 'Phoenix Ebra lab', description: 'Genetic assays, sterility events, lot intake', status: 'connected', phase: 'day-n' },
    { id: 'chamberos', name: 'ChamberOS', operator: 'Biora chambers', description: 'Temperature, humidity, CO₂, PAR telemetry', status: 'planned', phase: 'day-n' },
    { id: 'mes', name: 'Robotics MES', operator: 'Propagation cell PLCs', description: 'Bot cycle time, throughput, abort events', status: 'planned', phase: 'day-n' },
    { id: 'erp', name: 'ERP', operator: 'Finance', description: 'COGS, inventory, returns, service costs', status: 'planned', phase: 'day-n' },
    { id: 'usda', name: 'USDA APHIS Feed', operator: 'Regulatory', description: 'Pathogen-free certification, phyto registries', status: 'planned', phase: 'day-n' },
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

export const ENTITIES: OntologyEntity[] = [
    {
        id: 'order',
        name: 'Order',
        domain: 'commerce',
        sources: ['orderflow'],
        phase: 'day-1',
        description: 'A customer purchase. Links to Customer, Product, Shipment.',
        fields: [
            { name: 'order_id', type: 'string' },
            { name: 'customer_id', type: 'fk:Customer' },
            { name: 'product_id', type: 'fk:Product' },
            { name: 'qty', type: 'integer' },
            { name: 'asp_realized', type: 'currency' },
            { name: 'ordered_at', type: 'timestamp' },
        ],
    },
    {
        id: 'customer',
        name: 'Customer',
        domain: 'commerce',
        sources: ['orderflow', 'erp'],
        phase: 'day-1',
        description: 'A buyer. Aggregates orders, shipments, service tickets, downstream outcomes.',
        fields: [
            { name: 'customer_id', type: 'string' },
            { name: 'name', type: 'string' },
            { name: 'tier', type: 'enum' },
            { name: 'region', type: 'string' },
            { name: 'acquired_at', type: 'date' },
        ],
    },
    {
        id: 'product',
        name: 'Product',
        domain: 'commerce',
        sources: ['orderflow'],
        phase: 'day-1',
        description: 'A SKU sold to customers. Maps to one Cultivar lineage.',
        fields: [
            { name: 'product_id', type: 'string' },
            { name: 'sku', type: 'string' },
            { name: 'cultivar_id', type: 'fk:Cultivar' },
            { name: 'tier', type: 'enum' },
            { name: 'list_price', type: 'currency' },
        ],
    },
    {
        id: 'shipment',
        name: 'Shipment',
        domain: 'commerce',
        sources: ['shiptrack'],
        phase: 'day-1',
        description: 'A fulfillment event. Joins to Order on order_id; carries fulfillment cost.',
        fields: [
            { name: 'shipment_id', type: 'string' },
            { name: 'order_id', type: 'fk:Order' },
            { name: 'carrier_id', type: 'fk:Carrier' },
            { name: 'lane_id', type: 'fk:Lane' },
            { name: 'fulfillment_cost', type: 'currency' },
            { name: 'service_cost', type: 'currency' },
            { name: 'shipped_at', type: 'timestamp' },
        ],
    },
    {
        id: 'carrier',
        name: 'Carrier',
        domain: 'commerce',
        sources: ['shiptrack'],
        phase: 'day-1',
        description: 'A logistics provider. Owns service-level and cost trends per lane.',
        fields: [
            { name: 'carrier_id', type: 'string' },
            { name: 'name', type: 'string' },
            { name: 'avg_transit_days', type: 'float' },
            { name: 'damage_rate', type: 'percent' },
        ],
    },
    {
        id: 'lane',
        name: 'Lane',
        domain: 'commerce',
        sources: ['shiptrack'],
        phase: 'day-1',
        description: 'An origin-destination pair. Used for cost-per-lane and demand windows.',
        fields: [
            { name: 'lane_id', type: 'string' },
            { name: 'origin', type: 'string' },
            { name: 'destination', type: 'string' },
            { name: 'cost_per_unit', type: 'currency' },
        ],
    },
    {
        id: 'cultivar',
        name: 'Cultivar',
        domain: 'manufacturing',
        sources: ['lims'],
        phase: 'day-n',
        description: 'A genetic line. Aggregates Cohorts, propagation success, contamination history.',
        fields: [
            { name: 'cultivar_id', type: 'string' },
            { name: 'genus_species', type: 'string' },
            { name: 'origin_lot', type: 'string' },
            { name: 'triploid', type: 'boolean' },
        ],
    },
    {
        id: 'cohort',
        name: 'Cohort',
        domain: 'manufacturing',
        sources: ['lims', 'mes'],
        phase: 'day-n',
        description: 'A propagation batch. Tracks days-in-chamber, scrap rate, yield.',
        fields: [
            { name: 'cohort_id', type: 'string' },
            { name: 'cultivar_id', type: 'fk:Cultivar' },
            { name: 'started_at', type: 'date' },
            { name: 'plantlets_seeded', type: 'integer' },
            { name: 'scrap_rate', type: 'percent' },
        ],
    },
    {
        id: 'chamber',
        name: 'Chamber',
        domain: 'manufacturing',
        sources: ['chamberos'],
        phase: 'day-n',
        description: 'A Biora controlled-environment unit. Streams telemetry at 99% accuracy SLA.',
        fields: [
            { name: 'chamber_id', type: 'string' },
            { name: 'site', type: 'string' },
            { name: 'capacity', type: 'integer' },
            { name: 'last_telemetry_at', type: 'timestamp' },
        ],
    },
    {
        id: 'plantlet',
        name: 'Plantlet',
        domain: 'manufacturing',
        sources: ['lims', 'chamberos', 'mes'],
        phase: 'day-n',
        description: 'The unit of inventory. Has a full digital twin: lineage, telemetry, sterility, outcome.',
        fields: [
            { name: 'plantlet_id', type: 'string' },
            { name: 'cohort_id', type: 'fk:Cohort' },
            { name: 'chamber_id', type: 'fk:Chamber' },
            { name: 'sterility_pass', type: 'boolean' },
            { name: 'assay_passed_at', type: 'timestamp' },
        ],
    },
    {
        id: 'sterility-event',
        name: 'Sterility Event',
        domain: 'compliance',
        sources: ['lims'],
        phase: 'day-n',
        description: 'Pass/fail record per cleaning cycle. Feeds the Contamination Sentinel.',
        fields: [
            { name: 'event_id', type: 'string' },
            { name: 'chamber_id', type: 'fk:Chamber' },
            { name: 'outcome', type: 'enum' },
            { name: 'root_cause', type: 'string' },
        ],
    },
    {
        id: 'compliance-cert',
        name: 'Compliance Cert',
        domain: 'compliance',
        sources: ['usda', 'lims'],
        phase: 'day-n',
        description: 'Pathogen-free certification artifact, exportable to USDA APHIS on demand.',
        fields: [
            { name: 'cert_id', type: 'string' },
            { name: 'cohort_id', type: 'fk:Cohort' },
            { name: 'issued_at', type: 'date' },
            { name: 'expires_at', type: 'date' },
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
    { from: 'order', to: 'product', cardinality: 'N:N', label: 'for SKU' },
    { from: 'order', to: 'shipment', cardinality: '1:N', label: 'fulfilled by', highlight: true },
    { from: 'shipment', to: 'carrier', cardinality: 'N:N', label: 'shipped via' },
    { from: 'shipment', to: 'lane', cardinality: 'N:N', label: 'on lane' },
    { from: 'product', to: 'cultivar', cardinality: 'N:N', label: 'genetics' },
    { from: 'cohort', to: 'cultivar', cardinality: 'N:N', label: 'of cultivar' },
    { from: 'plantlet', to: 'cohort', cardinality: 'N:N', label: 'from cohort' },
    { from: 'plantlet', to: 'chamber', cardinality: 'N:N', label: 'grown in' },
    { from: 'sterility-event', to: 'chamber', cardinality: 'N:N', label: 'observed in' },
    { from: 'compliance-cert', to: 'cohort', cardinality: 'N:N', label: 'certifies' },
    { from: 'plantlet', to: 'product', cardinality: 'N:N', label: 'sold as' },
];

/** Named outputs (the "customer-named systems" inside D.A.G.R.). */
export interface DerivedOutput {
    id: string;
    name: string;
    summary: string;
    feeds: string[];
    phase: 'day-1' | 'day-n';
}

export const OUTPUTS: DerivedOutput[] = [
    { id: 'margin-per-order', name: 'True Margin per Order', summary: 'Joins order ASP, COGS, fulfillment, service, returns for unit economics by SKU, customer, lane.', feeds: ['order', 'shipment', 'product'], phase: 'day-1' },
    { id: 'supply-demand', name: 'Supply ↔ Demand Window', summary: 'Aligns order velocity with propagation lead times; flags misaligned windows before they cost a customer.', feeds: ['order', 'shipment', 'cohort'], phase: 'day-1' },
    { id: 'lane-pl', name: 'Carrier & Lane P&L', summary: 'Cost-per-unit and damage rate by carrier and lane; surfaces renegotiation candidates.', feeds: ['shipment', 'carrier', 'lane'], phase: 'day-1' },
    { id: 'customer-ltv', name: 'Customer LTV by Cohort', summary: 'True LTV after fulfillment and service costs, not gross revenue. Flags double-down targets and unprofitable accounts.', feeds: ['order', 'customer', 'shipment'], phase: 'day-1' },
    { id: 'lineage-ledger', name: 'Lineage Ledger', summary: 'Donor lot → delivered plantlet, with full sterility, telemetry, and genetic verification chain.', feeds: ['plantlet', 'cohort', 'cultivar', 'sterility-event'], phase: 'day-n' },
    { id: 'contamination-sentinel', name: 'Contamination Sentinel', summary: 'Predictive contamination risk per chamber-shift, plus root-cause tracer when an event occurs.', feeds: ['sterility-event', 'chamber', 'cohort'], phase: 'day-n' },
    { id: 'cultivar-pl', name: 'Cultivar P&L', summary: 'Per-cultivar cost-to-serve and downstream yield outcome reconciliation.', feeds: ['cultivar', 'cohort', 'plantlet', 'order'], phase: 'day-n' },
    { id: 'compliance-vault', name: 'Compliance Vault', summary: 'Audit-ready pathogen-free evidence pack, exportable to USDA APHIS format on demand.', feeds: ['compliance-cert', 'sterility-event'], phase: 'day-n' },
];

/* ──────────── Sample data for tables/charts ──────────── */

export const SAMPLE_ORDERS = [
    { id: 'O-10487', customer: 'Sunbelt Growers', sku: 'GZ-AGAVE-T2', qty: 1200, asp: 15.00, gross: 18000, status: 'Shipped' },
    { id: 'O-10488', customer: 'Pacific Bloom Co.', sku: 'GZ-BLUE-T1', qty: 320, asp: 60.00, gross: 19200, status: 'Shipped' },
    { id: 'O-10489', customer: 'Texas Nut Cooperative', sku: 'GZ-PISTACH-T2', qty: 2800, asp: 15.00, gross: 42000, status: 'In Chamber' },
    { id: 'O-10490', customer: 'Sonoma Vineyards', sku: 'GZ-VITIS3N-T1', qty: 540, asp: 60.00, gross: 32400, status: 'Shipped' },
    { id: 'O-10491', customer: 'Heritage Orchard', sku: 'GZ-PEACH-T2', qty: 1800, asp: 15.00, gross: 27000, status: 'Returned' },
    { id: 'O-10492', customer: 'Sunbelt Growers', sku: 'GZ-AGAVE-T2', qty: 950, asp: 15.00, gross: 14250, status: 'Shipped' },
    { id: 'O-10493', customer: 'Greenleaf Hemp', sku: 'GZ-CANN-T2', qty: 4200, asp: 15.00, gross: 63000, status: 'In Chamber' },
    { id: 'O-10494', customer: 'Pacific Bloom Co.', sku: 'GZ-ORCH-T1', qty: 180, asp: 60.00, gross: 10800, status: 'Shipped' },
];

export const SAMPLE_SHIPMENTS = [
    { id: 'S-44102', orderId: 'O-10487', carrier: 'ColdLink Logistics', lane: 'TX-DFW → CA-FRES', cost: 1840, transit: '2d', damage: 'None' },
    { id: 'S-44103', orderId: 'O-10488', carrier: 'AgriExpress', lane: 'TX-DFW → OR-PDX', cost: 920, transit: '3d', damage: 'None' },
    { id: 'S-44104', orderId: 'O-10490', carrier: 'ColdLink Logistics', lane: 'TX-DFW → CA-NAP', cost: 1180, transit: '2d', damage: 'None' },
    { id: 'S-44105', orderId: 'O-10491', carrier: 'GoldRush Freight', lane: 'TX-DFW → GA-ATL', cost: 2240, transit: '4d', damage: '14% loss' },
    { id: 'S-44106', orderId: 'O-10492', carrier: 'ColdLink Logistics', lane: 'TX-DFW → CA-FRES', cost: 1840, transit: '2d', damage: 'None' },
    { id: 'S-44107', orderId: 'O-10494', carrier: 'AgriExpress', lane: 'TX-DFW → OR-PDX', cost: 920, transit: '3d', damage: 'None' },
];

export const SAMPLE_CULTIVARS = [
    { id: 'GZ-AGAVE-T2', name: 'Blue Weber Agave (Gen Zero)', triploid: false, propSuccess: 96.4, cogsPerPlantlet: 2.40, monthlyVolume: 28400 },
    { id: 'GZ-BLUE-T1', name: 'Highbush Blueberry (premium clone)', triploid: false, propSuccess: 92.1, cogsPerPlantlet: 3.10, monthlyVolume: 4200 },
    { id: 'GZ-PISTACH-T2', name: 'UCB-1 Pistachio Rootstock', triploid: false, propSuccess: 88.6, cogsPerPlantlet: 2.85, monthlyVolume: 16800 },
    { id: 'GZ-VITIS3N-T1', name: 'Seedless Table Grape (3n)', triploid: true, propSuccess: 84.2, cogsPerPlantlet: 4.20, monthlyVolume: 3600 },
    { id: 'GZ-PEACH-T2', name: 'Texas Mid-Chill Peach', triploid: false, propSuccess: 90.8, cogsPerPlantlet: 2.70, monthlyVolume: 9200 },
    { id: 'GZ-CANN-T2', name: 'Industrial Hemp (low-THC)', triploid: false, propSuccess: 94.7, cogsPerPlantlet: 2.20, monthlyVolume: 42000 },
    { id: 'GZ-ORCH-T1', name: 'Phalaenopsis Orchid (boutique)', triploid: false, propSuccess: 86.3, cogsPerPlantlet: 5.40, monthlyVolume: 1800 },
];

export const SAMPLE_CHAMBERS = [
    { id: 'CH-001', site: 'Dallas A', cultivar: 'GZ-AGAVE-T2', temp: 24.1, humidity: 71, co2: 612, par: 145, status: 'Nominal' },
    { id: 'CH-002', site: 'Dallas A', cultivar: 'GZ-CANN-T2', temp: 26.4, humidity: 68, co2: 605, par: 158, status: 'Nominal' },
    { id: 'CH-003', site: 'Dallas A', cultivar: 'GZ-PISTACH-T2', temp: 22.8, humidity: 74, co2: 618, par: 132, status: 'Nominal' },
    { id: 'CH-004', site: 'Dallas B', cultivar: 'GZ-VITIS3N-T1', temp: 23.6, humidity: 70, co2: 622, par: 140, status: 'Watch' },
    { id: 'CH-005', site: 'Dallas B', cultivar: 'GZ-BLUE-T1', temp: 21.4, humidity: 76, co2: 598, par: 128, status: 'Nominal' },
    { id: 'CH-006', site: 'Dallas B', cultivar: 'GZ-PEACH-T2', temp: 23.2, humidity: 72, co2: 610, par: 138, status: 'Nominal' },
    { id: 'CH-007', site: 'Dallas C', cultivar: 'GZ-ORCH-T1', temp: 25.7, humidity: 78, co2: 590, par: 122, status: 'Nominal' },
    { id: 'CH-008', site: 'Dallas C', cultivar: 'GZ-AGAVE-T2', temp: 24.3, humidity: 71, co2: 614, par: 146, status: 'Nominal' },
];

export const KPI_SNAPSHOT = {
    /* Commercial */
    monthlyRevenue: 26000,
    revenueGrowthMoM: 18.2,
    orderBacklogValue: 295500,         // $ committed deferred revenue
    orderBacklogUnits: 15800,
    avgDaysToPromise: 31,
    /* Operations */
    turnaroundDays: 14,                 // blended order-to-ship from inventory
    turnaroundTarget: 10,
    onTimeFulfillment: 91.4,            // %
    /* Capital & inventory */
    inventorySpendMtd: 342000,
    inventorySpendNext30d: 389000,
    inventorySpendNext90dTotal: 1262000,
    /* Unit economics */
    blendedAsp: 16.20,
    blendedCogs: 2.78,
    grossMargin: 82.8,
    /* Path to scale */
    breakevenTarget: 650000,
    currentMonthlyPlantlets: 106000,
    /* Ops detail (secondary) */
    contaminationRate: 0.6,
    activeChambers: 24,
    cultivarsInProduction: 7,
};

/* Order backlog — what's committed but not yet shipped */
export const ORDER_BACKLOG = [
    { id: 'B-20114', customer: 'Greenleaf Hemp', sku: 'GZ-CANN-T2', cultivar: 'Industrial Hemp', qty: 6800, value: 102000, daysToPromise: 18, status: 'In Chamber' },
    { id: 'B-20115', customer: 'Texas Nut Cooperative', sku: 'GZ-PISTACH-T2', cultivar: 'Pistachio', qty: 4200, value: 63000, daysToPromise: 42, status: 'In Chamber' },
    { id: 'B-20116', customer: 'Sonoma Vineyards', sku: 'GZ-VITIS3N-T1', cultivar: 'Grape (3n)', qty: 720, value: 43200, daysToPromise: 65, status: 'Sprouting' },
    { id: 'B-20117', customer: 'Sunbelt Growers', sku: 'GZ-AGAVE-T2', cultivar: 'Agave', qty: 2400, value: 36000, daysToPromise: 14, status: 'Ready' },
    { id: 'B-20118', customer: 'Pacific Bloom Co.', sku: 'GZ-BLUE-T1', cultivar: 'Blueberry', qty: 580, value: 34800, daysToPromise: 28, status: 'In Chamber' },
    { id: 'B-20119', customer: 'Heritage Orchard', sku: 'GZ-PEACH-T2', cultivar: 'Peach', qty: 1100, value: 16500, daysToPromise: 21, status: 'In Chamber' },
];

/* Turn-around time per cultivar (days, order-to-ship) — current vs target */
export const TAT_BY_CULTIVAR = [
    { cultivar: 'Hemp', current: 78, target: 75, units: 4200 },
    { cultivar: 'Agave', current: 96, target: 95, units: 2840 },
    { cultivar: 'Peach', current: 112, target: 110, units: 920 },
    { cultivar: 'Blueberry', current: 124, target: 120, units: 420 },
    { cultivar: 'Pistachio', current: 146, target: 140, units: 1680 },
    { cultivar: 'Orchid', current: 158, target: 160, units: 180 },
    { cultivar: 'Grape (3n)', current: 192, target: 180, units: 360 },
];

/* Order-to-ship TAT trend — last 6 months blended */
export const TAT_TREND = [
    { group: 'Actual', month: 'Dec', value: 22 },
    { group: 'Actual', month: 'Jan', value: 20 },
    { group: 'Actual', month: 'Feb', value: 18 },
    { group: 'Actual', month: 'Mar', value: 17 },
    { group: 'Actual', month: 'Apr', value: 15 },
    { group: 'Actual', month: 'May', value: 14 },
    { group: 'Target', month: 'Dec', value: 10 },
    { group: 'Target', month: 'Jan', value: 10 },
    { group: 'Target', month: 'Feb', value: 10 },
    { group: 'Target', month: 'Mar', value: 10 },
    { group: 'Target', month: 'Apr', value: 10 },
    { group: 'Target', month: 'May', value: 10 },
];

/* Inventory spend — actuals + 90-day projection driven by backlog */
export const INVENTORY_SPEND_TREND = [
    { group: 'Actual ($K)', month: 'Dec', value: 278 },
    { group: 'Actual ($K)', month: 'Jan', value: 291 },
    { group: 'Actual ($K)', month: 'Feb', value: 308 },
    { group: 'Actual ($K)', month: 'Mar', value: 322 },
    { group: 'Actual ($K)', month: 'Apr', value: 335 },
    { group: 'Actual ($K)', month: 'May', value: 342 },
    { group: 'Projected ($K)', month: 'May', value: 342 },
    { group: 'Projected ($K)', month: 'Jun', value: 389 },
    { group: 'Projected ($K)', month: 'Jul', value: 421 },
    { group: 'Projected ($K)', month: 'Aug', value: 452 },
];

/* Inventory spend breakdown by category (current month) */
export const INVENTORY_SPEND_BREAKDOWN = [
    { group: 'WIP Plantlets', key: 'May', value: 232 },
    { group: 'Tissue Culture Media', key: 'May', value: 48 },
    { group: 'Sterile Consumables', key: 'May', value: 36 },
    { group: 'Genetic Assay Kits', key: 'May', value: 18 },
    { group: 'Packaging & Biora Inserts', key: 'May', value: 8 },
];

/* Margin-per-customer derived view (the "day-one win") */
export const CUSTOMER_MARGIN = [
    { customer: 'Sunbelt Growers', revenue: 32250, fulfillment: 3680, service: 240, returns: 0, trueMargin: 24180, marginPct: 75.0 },
    { customer: 'Pacific Bloom Co.', revenue: 30000, fulfillment: 1840, service: 180, returns: 0, trueMargin: 23740, marginPct: 79.1 },
    { customer: 'Texas Nut Cooperative', revenue: 42000, fulfillment: 0, service: 0, returns: 0, trueMargin: 34020, marginPct: 81.0 },
    { customer: 'Sonoma Vineyards', revenue: 32400, fulfillment: 1180, service: 320, returns: 0, trueMargin: 24732, marginPct: 76.3 },
    { customer: 'Heritage Orchard', revenue: 27000, fulfillment: 2240, service: 1850, returns: 3780, trueMargin: 14271, marginPct: 52.9 },
    { customer: 'Greenleaf Hemp', revenue: 63000, fulfillment: 0, service: 0, returns: 0, trueMargin: 53760, marginPct: 85.3 },
];

export const LANE_PL = [
    { lane: 'TX-DFW → CA-FRES', carrier: 'ColdLink Logistics', shipments: 18, costPerUnit: 1.46, damageRate: 0.0, marginImpact: 'Strong' },
    { lane: 'TX-DFW → OR-PDX', carrier: 'AgriExpress', shipments: 8, costPerUnit: 1.84, damageRate: 0.0, marginImpact: 'Strong' },
    { lane: 'TX-DFW → CA-NAP', carrier: 'ColdLink Logistics', shipments: 6, costPerUnit: 2.18, damageRate: 0.0, marginImpact: 'Strong' },
    { lane: 'TX-DFW → GA-ATL', carrier: 'GoldRush Freight', shipments: 4, costPerUnit: 1.24, damageRate: 14.0, marginImpact: 'Renegotiate' },
    { lane: 'TX-DFW → FL-MIA', carrier: 'GoldRush Freight', shipments: 3, costPerUnit: 1.18, damageRate: 6.7, marginImpact: 'Watch' },
];

export const DEMAND_SUPPLY_TREND = [
    { group: 'Orders (units)', month: 'Jan', value: 18400 },
    { group: 'Orders (units)', month: 'Feb', value: 21200 },
    { group: 'Orders (units)', month: 'Mar', value: 26800 },
    { group: 'Orders (units)', month: 'Apr', value: 31600 },
    { group: 'Orders (units)', month: 'May', value: 38900 },
    { group: 'Propagation (units)', month: 'Jan', value: 19200 },
    { group: 'Propagation (units)', month: 'Feb', value: 22100 },
    { group: 'Propagation (units)', month: 'Mar', value: 25400 },
    { group: 'Propagation (units)', month: 'Apr', value: 28800 },
    { group: 'Propagation (units)', month: 'May', value: 34200 },
];

export const CULTIVAR_MARGIN_CONTRIB = [
    { group: 'Margin contrib ($K)', cultivar: 'Hemp', value: 53.8 },
    { group: 'Margin contrib ($K)', cultivar: 'Pistachio', value: 34.0 },
    { group: 'Margin contrib ($K)', cultivar: 'Agave', value: 24.2 },
    { group: 'Margin contrib ($K)', cultivar: 'Grape (3n)', value: 24.7 },
    { group: 'Margin contrib ($K)', cultivar: 'Blueberry', value: 23.7 },
    { group: 'Margin contrib ($K)', cultivar: 'Peach', value: 14.3 },
    { group: 'Margin contrib ($K)', cultivar: 'Orchid', value: 7.1 },
];
