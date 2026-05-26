import { WorkflowData } from '../types';

/**
 * Trading-firm five-agent workflow.
 *
 * Day-1: Zerodha API + Broker RPA → conform → trader P&L + report card.
 * Day-N: Bloomberg / Reuters / MSCI regime data + SEBI compliance feed.
 */
export const INITIAL_WORKFLOW: WorkflowData = {
    nodes: [
        // Architect (INGEST) — secure data sync from broker source systems
        { id: 'zerodha-feed', title: 'Zerodha API', lane: 'Architect', laneIndex: 0, status: 'Configured', description: 'Kite Connect — orders, fills, brokerage stream' },
        { id: 'broker-rpa', title: 'Broker RPA Ingest', lane: 'Architect', laneIndex: 0, status: 'Configured', description: 'ICICI / Motilal / Sharekhan / IIFL spreadsheets' },
        { id: 'broker-pnl', title: 'Broker P&L Statements', lane: 'Architect', laneIndex: 0, status: 'NeedsSetup', description: 'End-of-day settlement reconciliation' },
        { id: 'bloomberg-feed', title: 'Bloomberg Terminal', lane: 'Architect', laneIndex: 0, status: 'NeedsSetup', description: 'NSE/BSE/MCX tick + Nifty regime tag' },
        { id: 'reuters-feed', title: 'Reuters Eikon', lane: 'Architect', laneIndex: 0, status: 'Optional', isOptional: true, description: 'FII/DII flows, macro context' },
        { id: 'sebi-feed', title: 'SEBI Regulatory', lane: 'Architect', laneIndex: 0, status: 'Optional', isOptional: true, description: 'Margin reporting, AIF/PMS gate' },

        // Engineer (DESIGN) — clean & prepare the conformed mart
        { id: 'conform-orders', title: 'Conform Orders', lane: 'Engineer', laneIndex: 1, status: 'NeedsSetup', description: 'Normalize order IDs, trader IDs, instrument IDs (ISIN)' },
        { id: 'conform-trades', title: 'Conform Trades', lane: 'Engineer', laneIndex: 1, status: 'NeedsSetup', description: 'Normalize fills, broker, brokerage, slippage, regime tag' },
        { id: 'dq-gate', title: 'DQ Gate', lane: 'Engineer', laneIndex: 1, status: 'NeedsSetup', description: 'Schema + completeness + broker reconciliation' },
        { id: 'join-order-trade', title: 'Join Order ↔ Trade ↔ Trader', lane: 'Engineer', laneIndex: 1, status: 'NeedsSetup', description: 'The day-1 join: trader-keyed unified ledger' },
        { id: 'regime-tagger', title: 'Regime Tagger', lane: 'Engineer', laneIndex: 1, status: 'Optional', isOptional: true, description: 'Stamp every trade with Bull/Bear/Range/Hi-Vol/Lo-Vol' },
        { id: 'mart-publish', title: 'Publish Trade Ledger', lane: 'Engineer', laneIndex: 1, status: 'NeedsSetup' },

        // Analyst (ANALYZE) — generate insights from the ledger
        { id: 'trader-pnl', title: 'True P&L per Trader', lane: 'Analyst', laneIndex: 2, status: 'NeedsSetup', description: 'Net of brokerage, slippage, STT, GST, stop-loss damage' },
        { id: 'broker-strategy-pl', title: 'Broker & Strategy P&L', lane: 'Analyst', laneIndex: 2, status: 'NeedsSetup' },
        { id: 'scorecard-12cat', title: '12-Category Scorecard', lane: 'Analyst', laneIndex: 2, status: 'NeedsSetup', description: 'The monthly report card per trader' },
        { id: 'regime-attribution', title: 'Regime Attribution', lane: 'Analyst', laneIndex: 2, status: 'Optional', isOptional: true, description: 'Skill vs regime tailwind split' },
        { id: 'risk-flag-engine', title: 'Risk Flag Engine', lane: 'Analyst', laneIndex: 2, status: 'Optional', isOptional: true, description: 'Overtrading / oversizing / concentration' },

        // Scientist (PREDICT) — build scenarios + forecasts
        { id: 'cashflow-projection', title: 'Cash-Flow Projection', lane: 'Scientist', laneIndex: 3, status: 'NeedsSetup', description: 'Forward 12-mo bench P&L at current performance' },
        { id: 'drawdown-sentinel', title: 'Drawdown Sentinel', lane: 'Scientist', laneIndex: 3, status: 'Optional', isOptional: true, description: 'Pattern-match against historical blow-up profiles' },
        { id: 'reallocation-engine', title: 'Reallocation Engine', lane: 'Scientist', laneIndex: 3, status: 'Optional', isOptional: true, description: 'Next-month capital allocation recommendation' },
        { id: 'pre-trade-quality', title: 'Pre-Trade Quality Score', lane: 'Scientist', laneIndex: 3, status: 'Optional', isOptional: true, description: 'In-flight order eval vs trader\'s own edge' },

        // BI Developer (VISUALIZE) — publish dashboards & exports
        { id: 'exec-scorecard', title: 'Executive Scorecard', lane: 'BI', laneIndex: 4, status: 'NeedsSetup', description: 'Raghav\'s daily operator console' },
        { id: 'risk-pl-console', title: 'Risk & P&L Command Centre', lane: 'BI', laneIndex: 4, status: 'Optional', isOptional: true, description: 'Live bench-wide drawdown + exposure' },
        { id: 'audit-vault', title: 'Audit & Report Card Vault', lane: 'BI', laneIndex: 4, status: 'Optional', isOptional: true, description: 'SEBI-ready export for AIF Cat-3 step' },
        { id: 'lp-narrative', title: 'LP / Fundraising Narrative', lane: 'BI', laneIndex: 4, status: 'Optional', isOptional: true, description: 'Bench-explained projection for investors' },
    ],
    edges: [
        // Architect → Engineer
        { id: 'e1', source: 'zerodha-feed', target: 'conform-orders', type: 'solid' },
        { id: 'e2', source: 'broker-rpa', target: 'conform-orders', type: 'solid' },
        { id: 'e3', source: 'zerodha-feed', target: 'conform-trades', type: 'solid' },
        { id: 'e4', source: 'broker-rpa', target: 'conform-trades', type: 'solid' },
        { id: 'e5', source: 'broker-pnl', target: 'conform-trades', type: 'solid' },
        { id: 'e6', source: 'bloomberg-feed', target: 'regime-tagger', type: 'dashed' },
        { id: 'e7', source: 'reuters-feed', target: 'regime-tagger', type: 'dashed' },
        { id: 'e8', source: 'sebi-feed', target: 'mart-publish', type: 'dashed' },

        // Engineer flow
        { id: 'e9', source: 'conform-orders', target: 'dq-gate', type: 'solid' },
        { id: 'e10', source: 'conform-trades', target: 'dq-gate', type: 'solid' },
        { id: 'e11', source: 'dq-gate', target: 'join-order-trade', type: 'solid' },
        { id: 'e12', source: 'join-order-trade', target: 'mart-publish', type: 'solid' },
        { id: 'e13', source: 'regime-tagger', target: 'mart-publish', type: 'dashed' },

        // Engineer → Analyst
        { id: 'e14', source: 'mart-publish', target: 'trader-pnl', type: 'solid' },
        { id: 'e15', source: 'mart-publish', target: 'broker-strategy-pl', type: 'solid' },
        { id: 'e16', source: 'mart-publish', target: 'scorecard-12cat', type: 'solid' },
        { id: 'e17', source: 'mart-publish', target: 'regime-attribution', type: 'dashed' },
        { id: 'e18', source: 'mart-publish', target: 'risk-flag-engine', type: 'dashed' },

        // Analyst → Scientist
        { id: 'e19', source: 'trader-pnl', target: 'cashflow-projection', type: 'solid' },
        { id: 'e20', source: 'risk-flag-engine', target: 'drawdown-sentinel', type: 'dashed' },
        { id: 'e21', source: 'scorecard-12cat', target: 'reallocation-engine', type: 'dashed' },
        { id: 'e22', source: 'scorecard-12cat', target: 'pre-trade-quality', type: 'dashed' },

        // Analyst/Scientist → BI
        { id: 'e23', source: 'trader-pnl', target: 'exec-scorecard', type: 'solid' },
        { id: 'e24', source: 'broker-strategy-pl', target: 'exec-scorecard', type: 'solid' },
        { id: 'e25', source: 'scorecard-12cat', target: 'exec-scorecard', type: 'solid' },
        { id: 'e26', source: 'cashflow-projection', target: 'exec-scorecard', type: 'solid' },
        { id: 'e27', source: 'risk-flag-engine', target: 'risk-pl-console', type: 'dashed' },
        { id: 'e28', source: 'drawdown-sentinel', target: 'risk-pl-console', type: 'dashed' },
        { id: 'e29', source: 'scorecard-12cat', target: 'audit-vault', type: 'dashed' },
        { id: 'e30', source: 'cashflow-projection', target: 'lp-narrative', type: 'dashed' },
    ],
};

export const LANES = ['D.A.G.R. Architect', 'D.A.G.R. Engineer', 'D.A.G.R. Analyst', 'D.A.G.R. Scientist', 'D.A.G.R. BI Developer'];

/** Sub-titles describing each agent's role in the trading-firm context. */
export const LANE_DESCRIPTIONS: Record<string, string> = {
    'D.A.G.R. Architect': 'INGEST · Zerodha API, Broker RPA, broker P&L, market data',
    'D.A.G.R. Engineer': 'DESIGN · Conform & join into one trader-keyed ledger',
    'D.A.G.R. Analyst': 'ANALYZE · Trader P&L, broker P&L, 12-cat scorecard, risk flags',
    'D.A.G.R. Scientist': 'PREDICT · Cash-flow, drawdown sentinel, reallocation, pre-trade quality',
    'D.A.G.R. BI Developer': 'VISUALIZE · Exec scorecard, risk console, audit vault, LP narrative',
};
