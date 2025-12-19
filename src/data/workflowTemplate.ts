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

        // Lane 3: Analyst
        { id: 'returns-config', title: 'Returns Config', lane: 'Analyst', laneIndex: 2, status: 'NeedsSetup' },
        { id: 'benchmark-config', title: 'Benchmark Config', lane: 'Analyst', laneIndex: 2, status: 'Optional', isOptional: true },
        { id: 'compute-returns', title: 'Compute Returns', lane: 'Analyst', laneIndex: 2, status: 'NeedsSetup' },
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

        // Engineer -> Analyst
        { id: 'e11', source: 'build-return-inputs', target: 'compute-returns', type: 'solid' },

        // Analyst Flow
        { id: 'e12', source: 'returns-config', target: 'compute-returns', type: 'solid' },
        { id: 'e13', source: 'compute-returns', target: 'output-qa-checks', type: 'solid' },

        // Benchmark Flow (Optional)
        { id: 'e14', source: 'benchmark', target: 'benchmark-config', type: 'dashed' },
        { id: 'e15', source: 'benchmark-config', target: 'compute-returns', type: 'dashed' },

        // Scientist Flow (Optional)
        { id: 'e16', source: 'build-return-inputs', target: 'model-step', type: 'dashed' },
        { id: 'e17', source: 'model-step', target: 'compute-returns', type: 'dashed' },

        // Output Flow
        { id: 'e18', source: 'output-qa-checks', target: 'dashboard-cards', type: 'solid' },
        { id: 'e19', source: 'output-qa-checks', target: 'report-generator', type: 'solid' },
        { id: 'e20', source: 'output-qa-checks', target: 'exports-api', type: 'solid' },
    ]
};

export const LANES = ['D.A.G.R. Architect', 'D.A.G.R. Engineer', 'D.A.G.R. Analyst', 'D.A.G.R. Scientist', 'D.A.G.R. BI Developer'];
