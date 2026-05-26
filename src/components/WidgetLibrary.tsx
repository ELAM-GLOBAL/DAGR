import React from 'react';
import { Draggable } from '@carbon/icons-react';

interface WidgetTemplate {
    type: string;
    title: string;
    defaultStatus: string;
    lane?: string;
}

const WIDGET_TEMPLATES: WidgetTemplate[] = [
    // Architect lane (INGEST)
    { type: 'input', title: 'Zerodha API', defaultStatus: 'Configured', lane: 'D.A.G.R. Architect' },
    { type: 'input', title: 'Broker RPA Ingest', defaultStatus: 'Configured', lane: 'D.A.G.R. Architect' },
    { type: 'input', title: 'Broker P&L Statements', defaultStatus: 'NeedsSetup', lane: 'D.A.G.R. Architect' },
    { type: 'input', title: 'Bloomberg Terminal', defaultStatus: 'NeedsSetup', lane: 'D.A.G.R. Architect' },
    { type: 'input', title: 'Reuters Eikon', defaultStatus: 'Optional', lane: 'D.A.G.R. Architect' },
    { type: 'input', title: 'SEBI Regulatory', defaultStatus: 'Optional', lane: 'D.A.G.R. Architect' },

    // Engineer lane (DESIGN)
    { type: 'process', title: 'Conform Orders', defaultStatus: 'NeedsSetup', lane: 'D.A.G.R. Engineer' },
    { type: 'process', title: 'Conform Trades', defaultStatus: 'NeedsSetup', lane: 'D.A.G.R. Engineer' },
    { type: 'process', title: 'DQ Gate', defaultStatus: 'NeedsSetup', lane: 'D.A.G.R. Engineer' },
    { type: 'process', title: 'Join Order ↔ Trade ↔ Trader', defaultStatus: 'NeedsSetup', lane: 'D.A.G.R. Engineer' },
    { type: 'process', title: 'Regime Tagger', defaultStatus: 'Optional', lane: 'D.A.G.R. Engineer' },

    // Analyst lane (ANALYZE)
    { type: 'compute', title: 'True P&L per Trader', defaultStatus: 'NeedsSetup', lane: 'D.A.G.R. Analyst' },
    { type: 'compute', title: 'Broker & Strategy P&L', defaultStatus: 'NeedsSetup', lane: 'D.A.G.R. Analyst' },
    { type: 'compute', title: '12-Category Scorecard', defaultStatus: 'NeedsSetup', lane: 'D.A.G.R. Analyst' },
    { type: 'compute', title: 'Regime Attribution', defaultStatus: 'Optional', lane: 'D.A.G.R. Analyst' },
    { type: 'compute', title: 'Risk Flag Engine', defaultStatus: 'Optional', lane: 'D.A.G.R. Analyst' },

    // Scientist lane (PREDICT)
    { type: 'predict', title: 'Cash-Flow Projection', defaultStatus: 'NeedsSetup', lane: 'D.A.G.R. Scientist' },
    { type: 'predict', title: 'Drawdown Sentinel', defaultStatus: 'Optional', lane: 'D.A.G.R. Scientist' },
    { type: 'predict', title: 'Reallocation Engine', defaultStatus: 'Optional', lane: 'D.A.G.R. Scientist' },
    { type: 'predict', title: 'Pre-Trade Quality Score', defaultStatus: 'Optional', lane: 'D.A.G.R. Scientist' },

    // BI Developer lane (VISUALIZE)
    { type: 'dashboard', title: 'Executive Scorecard', defaultStatus: 'NeedsSetup', lane: 'D.A.G.R. BI Developer' },
    { type: 'dashboard', title: 'Risk & P&L Console', defaultStatus: 'Optional', lane: 'D.A.G.R. BI Developer' },
    { type: 'report', title: 'Audit & Report Card Vault', defaultStatus: 'Optional', lane: 'D.A.G.R. BI Developer' },
    { type: 'export', title: 'LP / Fundraising Narrative', defaultStatus: 'Optional', lane: 'D.A.G.R. BI Developer' },
];

const WidgetLibrary: React.FC = () => {
    const handleDragStart = (e: React.DragEvent, template: WidgetTemplate) => {
        e.dataTransfer.setData('application/json', JSON.stringify(template));
        e.dataTransfer.effectAllowed = 'copy';
    };

    return (
        <div className="widget-library" style={{
            width: '250px',
            background: 'var(--cds-layer-02)',
            borderRight: '1px solid var(--cds-border-subtle-00)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 10,
        }}>
            <div style={{
                padding: '1rem',
                borderBottom: '1px solid var(--cds-border-subtle-00)',
                background: 'var(--cds-layer-01)',
                fontWeight: 600,
                fontSize: '14px',
                color: 'var(--cds-text-primary)',
            }}>
                Widget Library
            </div>

            <div style={{
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                overflowY: 'auto',
            }}>
                <p style={{
                    fontSize: '12px',
                    color: 'var(--cds-text-helper)',
                    marginBottom: '0.5rem',
                }}>
                    Drag items into a swimlane
                </p>

                {WIDGET_TEMPLATES.map((template, idx) => (
                    <div
                        key={idx}
                        draggable
                        onDragStart={(e) => handleDragStart(e, template)}
                        style={{
                            padding: '0.625rem 0.75rem',
                            border: '1px solid var(--cds-border-subtle-00)',
                            background: 'var(--cds-layer-02)',
                            cursor: 'grab',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                            transition: 'background 0.15s',
                        }}
                    >
                        <Draggable size={14} style={{ color: 'var(--cds-icon-secondary)' }} />
                        <span style={{
                            fontSize: '0.8125rem',
                            fontWeight: 500,
                            color: 'var(--cds-text-primary)',
                        }}>
                            {template.title}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WidgetLibrary;
