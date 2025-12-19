import React from 'react';
import { Draggable } from '@carbon/icons-react';

interface WidgetTemplate {
    type: string;
    title: string;
    defaultStatus: string;
    lane?: string;
}

const WIDGET_TEMPLATES: WidgetTemplate[] = [
    // Architect Lane
    { type: 'input', title: 'Portfolio / Holdings', defaultStatus: 'NeedsSetup', lane: 'D.A.G.R. Architect' },
    { type: 'input', title: 'Market Prices', defaultStatus: 'NeedsSetup', lane: 'D.A.G.R. Architect' },
    { type: 'input', title: 'FX Rates', defaultStatus: 'NeedsSetup', lane: 'D.A.G.R. Architect' },
    { type: 'input', title: 'Macro Data', defaultStatus: 'NeedsSetup', lane: 'D.A.G.R. Architect' },
    { type: 'config', title: 'Benchmark', defaultStatus: 'Optional', lane: 'D.A.G.R. Architect' },
    { type: 'config', title: 'Calendar & Currency', defaultStatus: 'NeedsSetup', lane: 'D.A.G.R. Architect' },

    // Engineer Lane
    { type: 'process', title: 'Schema Profiler', defaultStatus: 'NeedsSetup', lane: 'D.A.G.R. Engineer' },
    { type: 'process', title: 'Validate (Schema + DQ)', defaultStatus: 'NeedsSetup', lane: 'D.A.G.R. Engineer' },
    { type: 'process', title: 'DQ Issue Queue', defaultStatus: 'Optional', lane: 'D.A.G.R. Engineer' },
    { type: 'process', title: 'Normalize & Align', defaultStatus: 'NeedsSetup', lane: 'D.A.G.R. Engineer' },
    { type: 'process', title: 'Join & FX Convert', defaultStatus: 'NeedsSetup', lane: 'D.A.G.R. Engineer' },
    { type: 'process', title: 'Build Return Inputs', defaultStatus: 'NeedsSetup', lane: 'D.A.G.R. Engineer' },

    // Analyst Lane
    { type: 'config', title: 'Returns Config', defaultStatus: 'NeedsSetup', lane: 'D.A.G.R. Analyst' },
    { type: 'config', title: 'Benchmark Config', defaultStatus: 'Optional', lane: 'D.A.G.R. Analyst' },
    { type: 'compute', title: 'Compute Returns', defaultStatus: 'NeedsSetup', lane: 'D.A.G.R. Analyst' },
    { type: 'qa', title: 'Output QA Checks', defaultStatus: 'NeedsSetup', lane: 'D.A.G.R. Analyst' },

    // BI Developer Lane
    { type: 'dashboard', title: 'Dashboard Cards', defaultStatus: 'NeedsSetup', lane: 'D.A.G.R. BI Developer' },
    { type: 'report', title: 'Report Generator', defaultStatus: 'NeedsSetup', lane: 'D.A.G.R. BI Developer' },
    { type: 'export', title: 'Exports / API', defaultStatus: 'NeedsSetup', lane: 'D.A.G.R. BI Developer' },
];

const WidgetLibrary: React.FC = () => {
    const handleDragStart = (e: React.DragEvent, template: WidgetTemplate) => {
        // Transfer the template data
        e.dataTransfer.setData('application/json', JSON.stringify(template));
        e.dataTransfer.effectAllowed = 'copy';
    };

    return (
        <div className="widget-library" style={{
            width: '250px',
            background: '#ffffff',
            borderRight: '1px solid #e0e0e0',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 10 // Ensure it sits above canvas level if needed, but below modal
        }}>
            <div style={{
                padding: '1rem',
                borderBottom: '1px solid #e0e0e0',
                background: '#f4f4f4',
                fontWeight: 600,
                fontSize: '14px'
            }}>
                Widget Library
            </div>

            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto' }}>
                <p style={{ fontSize: '12px', color: '#6f6f6f', marginBottom: '0.5rem' }}>
                    Drag items to the canvas
                </p>

                {WIDGET_TEMPLATES.map((template, idx) => (
                    <div
                        key={idx}
                        draggable
                        onDragStart={(e) => handleDragStart(e, template)}
                        style={{
                            padding: '0.75rem',
                            border: '1px solid #e0e0e0',
                            borderRadius: '4px',
                            backgroundColor: '#fff',
                            cursor: 'grab',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <Draggable size={16} fill="#8d8d8d" />
                        <span style={{ fontSize: '13px', fontWeight: 500 }}>{template.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WidgetLibrary;
