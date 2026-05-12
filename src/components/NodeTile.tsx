import React from 'react';
import { WidgetNode } from '../types';
import { Settings, CheckmarkFilled, WarningFilled, PlayFilled, ErrorFilled, CircleDash } from '@carbon/icons-react';

interface NodeTileProps {
    node: WidgetNode;
    isSelected?: boolean;
    onClick: (id: string) => void;
    id?: string;
    onConnectionStart?: (id: string, startX: number, startY: number) => void;
}

const getStatusColor = (status: string): string => {
    switch (status) {
        case 'Configured': return 'var(--cds-support-success, #24a148)';
        case 'NeedsSetup': return 'var(--cds-support-warning, #f1c21b)';
        case 'Running': return 'var(--cds-interactive, #0f62fe)';
        case 'Success': return 'var(--cds-support-success, #24a148)';
        case 'Error': return 'var(--cds-support-error, #da1e28)';
        case 'Optional': return 'var(--cds-text-placeholder, #a8a8a8)';
        case 'Disabled': return 'var(--cds-border-subtle-01, #c6c6c6)';
        default: return 'var(--cds-interactive, #0f62fe)';
    }
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'Configured': return <CheckmarkFilled size={16} style={{ color: 'var(--cds-support-success, #24a148)' }} />;
        case 'NeedsSetup': return <WarningFilled size={16} style={{ color: 'var(--cds-support-warning, #f1c21b)' }} />;
        case 'Running': return <PlayFilled size={16} style={{ color: 'var(--cds-interactive, #0f62fe)' }} />;
        case 'Success': return <CheckmarkFilled size={16} style={{ color: 'var(--cds-support-success, #24a148)' }} />;
        case 'Error': return <ErrorFilled size={16} style={{ color: 'var(--cds-support-error, #da1e28)' }} />;
        case 'Optional': return <CircleDash size={16} style={{ color: 'var(--cds-text-placeholder, #a8a8a8)' }} />;
        case 'Disabled': return <ErrorFilled size={16} style={{ color: 'var(--cds-border-subtle-01, #c6c6c6)' }} />;
        default: return <Settings size={16} />;
    }
};

const NodeTile: React.FC<NodeTileProps> = ({ node, isSelected, onClick, id, onConnectionStart }) => {
    const statusColor = getStatusColor(node.status);

    return (
        <div
            id={id}
            className="node-tile-wrapper"
            onClick={() => onClick(node.id)}
            style={{
                position: 'relative',
                width: '200px',
                marginBottom: '1rem',
                cursor: node.isDisabled ? 'not-allowed' : 'pointer',
                opacity: node.isDisabled ? 0.5 : 1,
                transition: 'all 0.2s cubic-bezier(0.2, 0, 0.38, 0.9)',
                transform: isSelected ? 'scale(1.02)' : 'translateY(0)',
                zIndex: 10,
            }}
        >
            <div style={{
                background: 'var(--cds-layer-02, #ffffff)',
                border: isSelected
                    ? '2px solid var(--cds-border-interactive, #0f62fe)'
                    : '1px solid var(--cds-border-subtle-00, #e0e0e0)',
                display: 'flex',
                height: '72px',
                boxShadow: isSelected
                    ? '0 4px 8px rgba(0,0,0,0.1)'
                    : '0 1px 2px rgba(0,0,0,0.05)',
            }}>
                {/* Status Strip */}
                <div
                    className="status-strip"
                    style={{
                        width: '4px',
                        height: '100%',
                        backgroundColor: statusColor,
                        flexShrink: 0,
                    }}
                />

                {/* Content */}
                <div style={{
                    padding: '0.75rem 1rem',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '2px',
                    }}>
                        <span style={{
                            fontWeight: 600,
                            fontSize: '13px',
                            lineHeight: '18px',
                            color: 'var(--cds-text-primary, #161616)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '140px',
                        }}>
                            {node.title}
                        </span>
                        {getStatusIcon(node.status)}
                    </div>

                    <span style={{
                        fontSize: '11px',
                        color: 'var(--cds-text-helper, #6f6f6f)',
                        fontFamily: '"IBM Plex Sans", sans-serif',
                    }}>
                        {node.description ? 'Info available' : node.status.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                </div>

                {/* Connection Handle (Right) — hover reveal handled via index.scss */}
                {!node.isDisabled && (
                    <div
                        className="connection-handle"
                        style={{
                            position: 'absolute',
                            right: '-14px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--cds-interactive, #0f62fe)',
                            color: 'var(--cds-text-on-color, #ffffff)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'crosshair',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                            zIndex: 200,
                            opacity: 0,
                            transition: 'all 0.15s cubic-bezier(0.2, 0, 0.38, 0.9)',
                            border: '2px solid var(--cds-background, #ffffff)',
                        }}
                        onMouseDown={(e) => {
                            e.stopPropagation();
                            if (onConnectionStart) {
                                onConnectionStart(node.id, e.clientX, e.clientY);
                            }
                        }}
                        title="Drag to connect"
                    >
                        <span style={{ fontSize: '18px', lineHeight: 1, fontWeight: 'bold', pointerEvents: 'none' }}>+</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NodeTile;
