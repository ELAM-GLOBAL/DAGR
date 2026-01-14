import { WorkflowData } from '../types';

export const INITIAL_WORKFLOW: WorkflowData = {
    nodes: [
        // Lane 1: Architect
        { id: 'portfolio-holdings', title: 'Portfolio / Holdings', lane: 'Architect', laneIndex: 0, status: 'Configured' },
        { id: 'market-prices', title: 'Market Prices', lane: 'Architect', laneIndex: 0, status: 'Configured' },
        { id: 'fx-rates', title: 'FX Rates', lane: 'Architect', laneIndex: 0, status: 'Configured' },
        { id: 'macro-data', title: 'Macro Data', lane: 'Architect', laneIndex: 0, status: 'Disabled', isDisabled: true, description: 'Not enabled in v1 prototype.' },
        { id: 'benchmark', title: 'Benchmark', lane: 'Architect', laneIndex: 0, status: 'Optional', isOptional: true },
        { id: 'calendar-currency', title: 'Calendar & Currency', lane: 'Architect', laneIndex: 0, status: 'NeedsSetup' },

        // Lane 2: Engineer
        { id: 'schema-profiler', title: 'Schema Profiler', lane: 'Engineer', laneIndex: 1, status: 'NeedsSetup' },
        { id: 'validate', title: 'Validate (Schema + DQ)', lane: 'Engineer', laneIndex: 1, status: 'NeedsSetup' },
        { id: 'dq-issue-queue', title: 'DQ Issue Queue', lane: 'Engineer', laneIndex: 1, status: 'Optional', isOptional: true },
        { id: 'normalize-align', title: 'Normalize & Align', lane: 'Engineer', laneIndex: 1, status: 'NeedsSetup' },
        { id: 'join-fx-convert', title: 'Join & FX Convert', lane: 'Engineer', laneIndex: 1, status: 'NeedsSetup' },
        { id: 'build-return-inputs', title: 'Build Return Inputs', lane: 'Engineer', laneIndex: 1, status: 'NeedsSetup' },

        // Lane 3: Analyst (4-Domain Analytics)
        { id: 'analytics-config', title: 'Analytics Config', lane: 'Analyst', laneIndex: 2, status: 'NeedsSetup', description: 'Configure metrics, benchmarks, risk parameters' },
        { id: 'benchmark-config', title: 'Benchmark Config', lane: 'Analyst', laneIndex: 2, status: 'Optional', isOptional: true },
        { id: 'compute-performance', title: 'Performance Analytics', lane: 'Analyst', laneIndex: 2, status: 'NeedsSetup', description: 'TWRR, IRR, CAGR, Active Return' },
        { id: 'compute-risk', title: 'Risk Analytics', lane: 'Analyst', laneIndex: 2, status: 'NeedsSetup', description: 'VaR, ES, Vol, TE, Drawdown' },
        { id: 'compute-attribution', title: 'Attribution Analytics', lane: 'Analyst', laneIndex: 2, status: 'NeedsSetup', description: 'Brinson, Sector Contrib' },
        { id: 'stress-testing', title: 'Stress Testing', lane: 'Analyst', laneIndex: 2, status: 'Optional', isOptional: true, description: 'Historical & custom scenarios' },
        { id: 'risk-adjusted-metrics', title: 'Risk-Adjusted Metrics', lane: 'Analyst', laneIndex: 2, status: 'NeedsSetup', description: 'Sharpe, Sortino, Treynor, IR, Alpha' },
        { id: 'output-qa-checks', title: 'Output QA Checks', lane: 'Analyst', laneIndex: 2, status: 'NeedsSetup' },

        // Lane 4: Scientist
        { id: 'model-step', title: 'Model Step', lane: 'Scientist', laneIndex: 3, status: 'Optional', isOptional: true },

        // Lane 5: BI Developer
        { id: 'dashboard-cards', title: 'Dashboard Cards', lane: 'BI', laneIndex: 4, status: 'NeedsSetup' },
        { id: 'report-generator', title: 'Report Generator', lane: 'BI', laneIndex: 4, status: 'NeedsSetup' },
        { id: 'exports-api', title: 'Exports / API', lane: 'BI', laneIndex: 4, status: 'NeedsSetup' },
    ],
    edges: [
        // Standard flow (simplified for v1 - detailed connection map in components)
        // Architect -> Engineer
        { id: 'e1', source: 'portfolio-holdings', target: 'schema-profiler', type: 'solid' },
        { id: 'e2', source: 'market-prices', target: 'schema-profiler', type: 'solid' },
        { id: 'e3', source: 'fx-rates', target: 'schema-profiler', type: 'solid' },
        { id: 'e4', source: 'calendar-currency', target: 'join-fx-convert', type: 'solid' },

        // Engineer Flow
        { id: 'e5', source: 'schema-profiler', target: 'validate', type: 'solid' },
        { id: 'e6', source: 'validate', target: 'normalize-align', type: 'solid' },
        { id: 'e7', source: 'validate', target: 'dq-issue-queue', type: 'dashed', label: 'Issues' },
        { id: 'e8', source: 'dq-issue-queue', target: 'validate', type: 'dashed', label: 'Retry' },
        { id: 'e9', source: 'normalize-align', target: 'join-fx-convert', type: 'solid' },
        { id: 'e10', source: 'join-fx-convert', target: 'build-return-inputs', type: 'solid' },

        // Engineer -> Analyst (4-Domain Analytics)
        { id: 'e11', source: 'build-return-inputs', target: 'compute-performance', type: 'solid' },
        { id: 'e11b', source: 'build-return-inputs', target: 'compute-risk', type: 'solid' },

        // Analyst Flow (4 Domains)
        { id: 'e12', source: 'analytics-config', target: 'compute-performance', type: 'solid' },
        { id: 'e12b', source: 'analytics-config', target: 'compute-risk', type: 'solid' },
        { id: 'e12c', source: 'analytics-config', target: 'compute-attribution', type: 'solid' },
        { id: 'e13', source: 'compute-performance', target: 'compute-attribution', type: 'solid' },
        { id: 'e13b', source: 'compute-risk', target: 'risk-adjusted-metrics', type: 'solid' },
        { id: 'e13c', source: 'compute-performance', target: 'risk-adjusted-metrics', type: 'solid' },
        { id: 'e13d', source: 'risk-adjusted-metrics', target: 'output-qa-checks', type: 'solid' },
        { id: 'e13e', source: 'compute-attribution', target: 'output-qa-checks', type: 'solid' },

        // Benchmark Flow (Optional)
        { id: 'e14', source: 'benchmark', target: 'benchmark-config', type: 'dashed' },
        { id: 'e15', source: 'benchmark-config', target: 'compute-performance', type: 'dashed' },
        { id: 'e15b', source: 'benchmark-config', target: 'compute-attribution', type: 'dashed' },

        // Stress Testing Flow (Optional)
        { id: 'e16', source: 'compute-risk', target: 'stress-testing', type: 'dashed' },
        { id: 'e17', source: 'stress-testing', target: 'output-qa-checks', type: 'dashed' },

        // Scientist Flow (Optional)
        { id: 'e18', source: 'build-return-inputs', target: 'model-step', type: 'dashed' },
        { id: 'e19', source: 'model-step', target: 'compute-risk', type: 'dashed' },

        // Output Flow
        { id: 'e20', source: 'output-qa-checks', target: 'dashboard-cards', type: 'solid' },
        { id: 'e21', source: 'output-qa-checks', target: 'report-generator', type: 'solid' },
        { id: 'e22', source: 'output-qa-checks', target: 'exports-api', type: 'solid' },
    ]
};

export const LANES = ['D.A.G.R. Architect', 'D.A.G.R. Engineer', 'D.A.G.R. Analyst', 'D.A.G.R. Scientist', 'D.A.G.R. BI Developer'];
