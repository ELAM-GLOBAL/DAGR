import { WorkflowData } from '../types';

/**
 * Phoenix Ebra five-agent workflow. Day-1 work uses orders + shipping;
 * Day-N expansion adds chamber telemetry, LIMS, and compliance.
 */
export const INITIAL_WORKFLOW: WorkflowData = {
    nodes: [
        // Architect (INGEST) — secure data sync from source systems
        { id: 'orderflow-feed', title: 'OrderFlow Feed', lane: 'Architect', laneIndex: 0, status: 'Configured', description: "Kevin's platform — orders, line items, ASP" },
        { id: 'shiptrack-feed', title: 'ShipTrack Feed', lane: 'Architect', laneIndex: 0, status: 'Configured', description: "Scott's platform — shipments, lanes, carriers" },
        { id: 'lims-stream', title: 'LIMS Stream', lane: 'Architect', laneIndex: 0, status: 'NeedsSetup', description: 'Genetic assays, sterility events' },
        { id: 'chamber-telemetry', title: 'Chamber Telemetry', lane: 'Architect', laneIndex: 0, status: 'NeedsSetup', description: 'Biora chambers — temp, humidity, CO₂, PAR' },
        { id: 'mes-events', title: 'Robotics MES', lane: 'Architect', laneIndex: 0, status: 'Optional', isOptional: true, description: 'Bot cycle time, abort events' },
        { id: 'usda-feed', title: 'USDA APHIS', lane: 'Architect', laneIndex: 0, status: 'Optional', isOptional: true, description: 'Phytosanitary registry pulls' },

        // Engineer (DESIGN) — clean & prepare the conformed mart
        { id: 'conform-orders', title: 'Conform Orders', lane: 'Engineer', laneIndex: 1, status: 'NeedsSetup', description: 'Normalize order IDs, customer IDs, SKUs' },
        { id: 'conform-shipments', title: 'Conform Shipments', lane: 'Engineer', laneIndex: 1, status: 'NeedsSetup', description: 'Normalize lanes, carriers, cost breakdown' },
        { id: 'dq-gate', title: 'DQ Gate', lane: 'Engineer', laneIndex: 1, status: 'NeedsSetup', description: 'Schema + completeness checks' },
        { id: 'join-order-ship', title: 'Join Order ↔ Ship', lane: 'Engineer', laneIndex: 1, status: 'NeedsSetup', description: 'The day-1 join: per-order fulfillment cost' },
        { id: 'lineage-builder', title: 'Lineage Builder', lane: 'Engineer', laneIndex: 1, status: 'Optional', isOptional: true, description: 'Donor lot → plantlet provenance graph' },
        { id: 'mart-publish', title: 'Publish Conformed Mart', lane: 'Engineer', laneIndex: 1, status: 'NeedsSetup' },

        // Analyst (ANALYZE) — generate insights from the mart
        { id: 'margin-engine', title: 'Margin Engine', lane: 'Analyst', laneIndex: 2, status: 'NeedsSetup', description: 'True margin per order, customer, SKU, lane' },
        { id: 'lane-pl', title: 'Carrier & Lane P&L', lane: 'Analyst', laneIndex: 2, status: 'NeedsSetup' },
        { id: 'customer-ltv', title: 'Customer LTV', lane: 'Analyst', laneIndex: 2, status: 'NeedsSetup', description: 'LTV after fulfillment + service costs' },
        { id: 'cultivar-pl', title: 'Cultivar P&L', lane: 'Analyst', laneIndex: 2, status: 'Optional', isOptional: true, description: 'Per-cultivar cost-to-serve' },
        { id: 'contamination-watch', title: 'Contamination Watch', lane: 'Analyst', laneIndex: 2, status: 'Optional', isOptional: true, description: 'Rate per chamber, shift, cultivar' },

        // Scientist (PREDICT) — build scenarios + forecasts
        { id: 'demand-forecast', title: 'Demand Forecast', lane: 'Scientist', laneIndex: 3, status: 'NeedsSetup', description: 'Order velocity → propagation lead-time alignment' },
        { id: 'contamination-risk', title: 'Contamination Risk', lane: 'Scientist', laneIndex: 3, status: 'Optional', isOptional: true, description: 'Predictive risk per chamber-shift' },
        { id: 'yield-forecast', title: 'Yield Forecast', lane: 'Scientist', laneIndex: 3, status: 'Optional', isOptional: true, description: 'Days-to-harvest, expected scrap' },
        { id: 'capex-sim', title: 'Capex Simulator', lane: 'Scientist', laneIndex: 3, status: 'Optional', isOptional: true, description: 'When adding chamber N pulls breakeven earlier' },

        // BI Developer (VISUALIZE) — publish dashboards & exports
        { id: 'exec-scorecard', title: 'Exec Scorecard', lane: 'BI', laneIndex: 4, status: 'NeedsSetup', description: 'CEO/COO weekly view' },
        { id: 'shift-console', title: 'Shift Console', lane: 'BI', laneIndex: 4, status: 'Optional', isOptional: true, description: 'Live chamber & work queue view' },
        { id: 'compliance-pack', title: 'Compliance Pack', lane: 'BI', laneIndex: 4, status: 'Optional', isOptional: true, description: 'USDA APHIS audit-ready export' },
        { id: 'grower-portal', title: 'Grower Portal', lane: 'BI', laneIndex: 4, status: 'Optional', isOptional: true, description: 'Buy-In program outcome submission' },
    ],
    edges: [
        // Architect → Engineer
        { id: 'e1', source: 'orderflow-feed', target: 'conform-orders', type: 'solid' },
        { id: 'e2', source: 'shiptrack-feed', target: 'conform-shipments', type: 'solid' },
        { id: 'e3', source: 'lims-stream', target: 'lineage-builder', type: 'dashed' },
        { id: 'e4', source: 'chamber-telemetry', target: 'lineage-builder', type: 'dashed' },
        { id: 'e5', source: 'mes-events', target: 'lineage-builder', type: 'dashed' },
        { id: 'e6', source: 'usda-feed', target: 'lineage-builder', type: 'dashed' },

        // Engineer flow
        { id: 'e7', source: 'conform-orders', target: 'dq-gate', type: 'solid' },
        { id: 'e8', source: 'conform-shipments', target: 'dq-gate', type: 'solid' },
        { id: 'e9', source: 'dq-gate', target: 'join-order-ship', type: 'solid' },
        { id: 'e10', source: 'join-order-ship', target: 'mart-publish', type: 'solid' },
        { id: 'e11', source: 'lineage-builder', target: 'mart-publish', type: 'dashed' },

        // Engineer → Analyst
        { id: 'e12', source: 'mart-publish', target: 'margin-engine', type: 'solid' },
        { id: 'e13', source: 'mart-publish', target: 'lane-pl', type: 'solid' },
        { id: 'e14', source: 'mart-publish', target: 'customer-ltv', type: 'solid' },
        { id: 'e15', source: 'mart-publish', target: 'cultivar-pl', type: 'dashed' },
        { id: 'e16', source: 'mart-publish', target: 'contamination-watch', type: 'dashed' },

        // Analyst → Scientist
        { id: 'e17', source: 'margin-engine', target: 'demand-forecast', type: 'solid' },
        { id: 'e18', source: 'contamination-watch', target: 'contamination-risk', type: 'dashed' },
        { id: 'e19', source: 'cultivar-pl', target: 'yield-forecast', type: 'dashed' },
        { id: 'e20', source: 'cultivar-pl', target: 'capex-sim', type: 'dashed' },

        // Analyst/Scientist → BI
        { id: 'e21', source: 'margin-engine', target: 'exec-scorecard', type: 'solid' },
        { id: 'e22', source: 'lane-pl', target: 'exec-scorecard', type: 'solid' },
        { id: 'e23', source: 'customer-ltv', target: 'exec-scorecard', type: 'solid' },
        { id: 'e24', source: 'demand-forecast', target: 'exec-scorecard', type: 'solid' },
        { id: 'e25', source: 'contamination-watch', target: 'shift-console', type: 'dashed' },
        { id: 'e26', source: 'contamination-risk', target: 'shift-console', type: 'dashed' },
        { id: 'e27', source: 'contamination-watch', target: 'compliance-pack', type: 'dashed' },
        { id: 'e28', source: 'customer-ltv', target: 'grower-portal', type: 'dashed' },
    ],
};

export const LANES = ['D.A.G.R. Architect', 'D.A.G.R. Engineer', 'D.A.G.R. Analyst', 'D.A.G.R. Scientist', 'D.A.G.R. BI Developer'];

/** Sub-titles describing each agent's role in the Phoenix Ebra context. */
export const LANE_DESCRIPTIONS: Record<string, string> = {
    'D.A.G.R. Architect': 'INGEST · Connect OrderFlow, ShipTrack, LIMS, ChamberOS',
    'D.A.G.R. Engineer': 'DESIGN · Conform & join into one mart',
    'D.A.G.R. Analyst': 'ANALYZE · Margin, lane P&L, LTV, cultivar P&L',
    'D.A.G.R. Scientist': 'PREDICT · Demand, contamination, yield, capex',
    'D.A.G.R. BI Developer': 'VISUALIZE · Scorecards, consoles, exports',
};
