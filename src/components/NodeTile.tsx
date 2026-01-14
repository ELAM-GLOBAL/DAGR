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

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Configured': return '#198038'; // Green 60
        case 'NeedsSetup': return '#f1c21b'; // Yellow 30
        case 'Optional': return '#8d8d8d'; // Gray 50
        case 'Disabled': return '#c6c6c6'; // Gray 30
        default: return '#0f62fe'; // Blue 60
    }
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'Configured': return <CheckmarkFilled size={16} fill="#198038" />;
        case 'NeedsSetup': return <WarningFilled size={16} fill="#f1c21b" />;
        case 'Optional': return <CircleDash size={16} fill="#8d8d8d" />;
        case 'Disabled': return <ErrorFilled size={16} fill="#c6c6c6" />;
        default: return <Settings size={16} />;
    }
};

const NodeTile: React.FC<NodeTileProps> = ({ node, isSelected, onClick, id, onConnectionStart }) => {
    const statusColor = getStatusColor(node.status);
    const isSelectedStyle = isSelected ? {
        border: '2px solid #0f62fe', // IBM Blue 60
    } : {};

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
                zIndex: 10
            }}
        >
            <div style={{
                background: '#ffffff',
                border: '1px solid #e0e0e0',
                display: 'flex',
                height: '72px',
                boxShadow: isSelected ? '0 4px 8px rgba(0,0,0,0.1)' : '0 1px 2px rgba(0,0,0,0.05)',
                ...isSelectedStyle
            }}>
                {/* Status Strip */}
                <div
                    className="status-strip"
                    style={{
                        width: '4px',
                        height: '100%',
                        backgroundColor: statusColor,
                        flexShrink: 0
                    }}
                />

                {/* Content */}
                <div className="content" style={{ padding: '0.75rem 1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                        <span style={{
                            fontWeight: 600,
                            fontSize: '13px',
                            lineHeight: '18px',
                            color: '#161616',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '180px'
                        }}>
                            {node.title}
                        </span>
                        {getStatusIcon(node.status)}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {/* Subtitle / Status Text */}
                        <span style={{
                            fontSize: '11px',
                            color: '#6f6f6f',
                            fontFamily: '"IBM Plex Sans", sans-serif'
                        }}>
                            {node.description ? 'Info available' : node.status.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                    </div>
                </div>

                {/* Connection Handle (Right) */}
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
                            backgroundColor: '#0f62fe', // IBM Blue 60
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'crosshair',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                            zIndex: 200,
                            opacity: 0, // Hidden by default, shown on group hover
                            transition: 'all 0.15s cubic-bezier(0.2, 0, 0.38, 0.9)',
                            border: '2px solid #fff'
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

                <style>{`
                    .node-tile-wrapper:hover .connection-handle,
                    .connection-handle:hover {
                        opacity: 1 !important;
                        transform: translateY(-50%) scale(1.1) !important;
                    }
                `}</style>
            </div>
        </div>
    );
};

export default NodeTile;
