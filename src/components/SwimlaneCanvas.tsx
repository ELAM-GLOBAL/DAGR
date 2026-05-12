import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '@carbon/react';
import { LANES, LANE_DESCRIPTIONS } from '../data/workflowTemplate';
import NodeTile from './NodeTile';
import { WidgetNode, WidgetEdge } from '../types';
import { getManhattanPath, Rect } from '../utils/routing';

interface SwimlaneCanvasProps {
    nodes: WidgetNode[];
    edges: WidgetEdge[];
    onNodeSelect: (id: string) => void;
    selectedNodeId: string | null;
    scientistLaneVisible: boolean;
    onNodeDrop?: (template: any, lane: string, laneIndex: number) => void;
    onEdgeCreate?: (sourceId: string, targetId: string) => void;
    onEdgeDelete?: (edgeId: string) => void;
}

const SwimlaneCanvas: React.FC<SwimlaneCanvasProps> = ({
    nodes,
    edges,
    onNodeSelect,
    selectedNodeId,
    scientistLaneVisible,
    onNodeDrop,
    onEdgeCreate,
    onEdgeDelete
}) => {
    const [nodeRects, setNodeRects] = useState<Record<string, Rect>>({});
    const canvasRef = useRef<HTMLDivElement>(null);

    const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
    const [hoveredEdgeId, setHoveredEdgeId] = useState<string | null>(null);

    const [isConnecting, setIsConnecting] = useState(false);
    const [connectionStartId, setConnectionStartId] = useState<string | null>(null);
    const [dragPos, setDragPos] = useState({ x: 0, y: 0 });

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [edgeToDelete, setEdgeToDelete] = useState<WidgetEdge | null>(null);

    const handleNodeClick = (id: string) => {
        if (isConnecting) return;
        onNodeSelect(id);
    };

    const handleConnectionStart = (id: string, startX: number, startY: number) => {
        if (!canvasRef.current) return;
        const canvasRect = canvasRef.current.getBoundingClientRect();
        setIsConnecting(true);
        setConnectionStartId(id);
        setDragPos({ x: startX - canvasRect.left, y: startY - canvasRect.top });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isConnecting || !canvasRef.current) return;
        const canvasRect = canvasRef.current.getBoundingClientRect();
        setDragPos({ x: e.clientX - canvasRect.left, y: e.clientY - canvasRect.top });
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        if (!isConnecting) return;

        const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
        let target = elementUnderCursor;
        let targetId: string | null = null;

        while (target && target !== document.body) {
            if (target.id && target.id.startsWith('node-')) {
                targetId = target.id.replace('node-', '');
                break;
            }
            target = target.parentElement as HTMLElement;
        }

        if (targetId && targetId !== connectionStartId && onEdgeCreate) {
            onEdgeCreate(connectionStartId!, targetId);
        }

        setIsConnecting(false);
        setConnectionStartId(null);
    };

    useEffect(() => {
        const measureNodes = () => {
            if (!canvasRef.current) return;
            const canvasRect = canvasRef.current.getBoundingClientRect();
            const newRects: Record<string, Rect> = {};
            nodes.forEach(node => {
                const el = document.getElementById(`node-${node.id}`);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    newRects[node.id] = {
                        x: rect.left - canvasRect.left,
                        y: rect.top - canvasRect.top,
                        width: rect.width,
                        height: rect.height,
                    };
                }
            });
            setNodeRects(newRects);
        };

        const resizeObserver = new ResizeObserver(() => { measureNodes(); });
        if (canvasRef.current) resizeObserver.observe(canvasRef.current);

        measureNodes();
        const timeout = setTimeout(measureNodes, 500);

        return () => {
            resizeObserver.disconnect();
            clearTimeout(timeout);
        };
    }, [nodes, scientistLaneVisible]);

    const getHighlightStatus = (currentId: string, type: 'node' | 'edge') => {
        if (!hoveredNodeId) return 'normal';
        const connectedEdges = edges.filter(e => e.source === hoveredNodeId || e.target === hoveredNodeId);
        const connectedEdgeIds = new Set(connectedEdges.map(e => e.id));
        const connectedNodeIds = new Set(connectedEdges.flatMap(e => [e.source, e.target]));
        connectedNodeIds.add(hoveredNodeId);
        if (type === 'node') return connectedNodeIds.has(currentId) ? 'highlighted' : 'dimmed';
        return connectedEdgeIds.has(currentId) ? 'highlighted' : 'dimmed';
    };

    const nodesByLane = LANES.map(laneName =>
        nodes.filter(n =>
            n.lane === laneName ||
            (laneName === 'D.A.G.R. Scientist' && n.lane === 'Scientist') ||
            (laneName === 'D.A.G.R. BI Developer' && n.lane === 'BI') ||
            (laneName === 'D.A.G.R. Architect' && n.lane === 'Architect') ||
            (laneName === 'D.A.G.R. Engineer' && n.lane === 'Engineer') ||
            (laneName === 'D.A.G.R. Analyst' && n.lane === 'Analyst')
        )
    );

    return (
        <div
            className="swimlane-canvas-container"
            style={{ position: 'relative', minHeight: '100%', overflow: 'visible' }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsConnecting(false)}
        >
            {/* SVG edge overlay */}
            <svg
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 10,
                    overflow: 'visible',
                }}
            >
                <defs>
                    <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill="var(--cds-border-strong-01, #8d8d8d)" />
                    </marker>
                    <marker id="arrowhead-dashed" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill="var(--cds-border-subtle-01, #c6c6c6)" />
                    </marker>
                    <marker id="arrowhead-hover" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill="var(--cds-support-error, #da1e28)" />
                    </marker>
                    <marker id="arrowhead-active" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill="var(--cds-interactive, #0f62fe)" />
                    </marker>
                </defs>

                {edges.map(edge => {
                    const sourceRect = nodeRects[edge.source];
                    const targetRect = nodeRects[edge.target];
                    if (!sourceRect || !targetRect) return null;

                    const path = getManhattanPath(sourceRect, targetRect);
                    const isDashed = edge.type === 'dashed';
                    const highlightStatus = getHighlightStatus(edge.id, 'edge');
                    const isDimmed = highlightStatus === 'dimmed';
                    const isHighlighted = highlightStatus === 'highlighted';
                    const isHovered = hoveredEdgeId === edge.id;

                    const strokeColor = isHovered
                        ? 'var(--cds-support-error, #da1e28)'
                        : isHighlighted
                            ? 'var(--cds-interactive, #0f62fe)'
                            : isDashed
                                ? 'var(--cds-border-subtle-01, #c6c6c6)'
                                : 'var(--cds-border-strong-01, #8d8d8d)';

                    const markerEnd = isHovered
                        ? 'url(#arrowhead-hover)'
                        : isHighlighted
                            ? 'url(#arrowhead-active)'
                            : isDashed
                                ? 'url(#arrowhead-dashed)'
                                : 'url(#arrowhead)';

                    const strokeWidth = isHovered || isHighlighted ? 3 : 2;

                    return (
                        <g
                            key={edge.id}
                            style={{
                                opacity: isDimmed ? 0.2 : 1,
                                transition: 'opacity 0.2s',
                                cursor: 'pointer',
                                pointerEvents: 'auto',
                            }}
                            onMouseEnter={() => setHoveredEdgeId(edge.id)}
                            onMouseLeave={() => setHoveredEdgeId(null)}
                            onClick={() => {
                                if (onEdgeDelete) {
                                    setEdgeToDelete(edge);
                                    setDeleteModalOpen(true);
                                }
                            }}
                        >
                            {/* Invisible wider hit area */}
                            <path
                                d={path}
                                fill="none"
                                stroke="transparent"
                                strokeWidth={16}
                                style={{ pointerEvents: 'stroke' }}
                            />
                            {/* Visible edge */}
                            <path
                                d={path}
                                fill="none"
                                stroke={strokeColor}
                                strokeWidth={strokeWidth}
                                strokeDasharray={isDashed ? '4 4' : 'none'}
                                markerEnd={markerEnd}
                                style={{ pointerEvents: 'none', transition: 'stroke 0.15s, stroke-width 0.15s' }}
                            />
                            {edge.label && (
                                <foreignObject
                                    x={(sourceRect.x + sourceRect.width + targetRect.x) / 2 - 30}
                                    y={(sourceRect.y + targetRect.y) / 2 - 10}
                                    width="60"
                                    height="20"
                                >
                                    <div style={{
                                        background: isHovered
                                            ? 'var(--cds-notification-error-background, #fff1f1)'
                                            : 'var(--cds-layer-01, #f4f4f4)',
                                        padding: '0px 4px',
                                        fontSize: '10px',
                                        textAlign: 'center',
                                        border: `1px solid ${isHovered
                                            ? 'var(--cds-support-error, #da1e28)'
                                            : isHighlighted
                                                ? 'var(--cds-interactive, #0f62fe)'
                                                : 'var(--cds-border-subtle-00, #e0e0e0)'}`,
                                        borderRadius: '8px',
                                        color: isHovered
                                            ? 'var(--cds-support-error, #da1e28)'
                                            : isHighlighted
                                                ? 'var(--cds-interactive, #0f62fe)'
                                                : 'var(--cds-text-secondary, #525252)',
                                        fontWeight: isHighlighted || isHovered ? 'bold' : 'normal',
                                    }}>
                                        {edge.label}
                                    </div>
                                </foreignObject>
                            )}
                        </g>
                    );
                })}

                {/* Temporary connection drag line */}
                {isConnecting && connectionStartId && nodeRects[connectionStartId] && (
                    <line
                        x1={nodeRects[connectionStartId].x + nodeRects[connectionStartId].width}
                        y1={nodeRects[connectionStartId].y + nodeRects[connectionStartId].height / 2}
                        x2={dragPos.x}
                        y2={dragPos.y}
                        stroke="var(--cds-interactive, #0f62fe)"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        markerEnd="url(#arrowhead-active)"
                        style={{ pointerEvents: 'none' }}
                    />
                )}
            </svg>

            {/* Lane columns */}
            <div
                ref={canvasRef}
                style={{
                    display: 'flex',
                    minHeight: '100%',
                    padding: '2rem',
                    gap: '2rem',
                    position: 'relative',
                    zIndex: 2,
                }}
            >
                {LANES.map((lane, index) => {
                    if (lane === 'D.A.G.R. Scientist' && !scientistLaneVisible) return null;

                    return (
                        <div
                            key={lane}
                            onDragOver={(e) => {
                                e.preventDefault();
                                e.dataTransfer.dropEffect = 'copy';
                            }}
                            onDrop={(e) => {
                                e.preventDefault();
                                const data = e.dataTransfer.getData('application/json');
                                if (data && onNodeDrop) {
                                    try {
                                        const template = JSON.parse(data);
                                        onNodeDrop(template, lane, index);
                                    } catch (err) {
                                        console.error('Failed to parse dropped item', err);
                                    }
                                }
                            }}
                            style={{
                                flex: 1,
                                minWidth: '180px',
                                paddingRight: '1.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                            }}
                        >
                            {/* Vertical lane divider */}
                            {index < LANES.length - 1 && (
                                <div style={{
                                    position: 'absolute',
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                    width: '1px',
                                    borderRight: '1px dashed var(--cds-border-subtle-00, #e0e0e0)',
                                }} />
                            )}

                            {/* Lane header */}
                            <div style={{ marginBottom: '1.25rem', textAlign: 'center' }}>
                                <h5 style={{
                                    color: 'var(--cds-text-secondary, #525252)',
                                    textTransform: 'uppercase',
                                    fontSize: '11px',
                                    letterSpacing: '0.5px',
                                    fontWeight: 600,
                                    margin: 0,
                                }}>
                                    {lane}
                                </h5>
                                {LANE_DESCRIPTIONS[lane] && (
                                    <div style={{
                                        fontSize: '10px',
                                        color: 'var(--cds-text-helper, #6f6f6f)',
                                        marginTop: '0.25rem',
                                        lineHeight: 1.35,
                                        padding: '0 0.25rem',
                                    }}>
                                        {LANE_DESCRIPTIONS[lane]}
                                    </div>
                                )}
                            </div>

                            {/* Nodes */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                alignItems: 'center',
                            }}>
                                {nodesByLane[index].map(node => {
                                    const highlightStatus = getHighlightStatus(node.id, 'node');
                                    const isDimmed = highlightStatus === 'dimmed';

                                    return (
                                        <div
                                            key={node.id}
                                            onMouseEnter={() => setHoveredNodeId(node.id)}
                                            onMouseLeave={() => setHoveredNodeId(null)}
                                            style={{ opacity: isDimmed ? 0.4 : 1, transition: 'opacity 0.2s' }}
                                        >
                                            <NodeTile
                                                id={`node-${node.id}`}
                                                node={node}
                                                isSelected={selectedNodeId === node.id}
                                                onClick={handleNodeClick}
                                                onConnectionStart={handleConnectionStart}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Edge delete confirmation modal */}
            <Modal
                open={deleteModalOpen}
                modalHeading="Delete Connection"
                primaryButtonText="Delete"
                secondaryButtonText="Cancel"
                danger
                onRequestClose={() => {
                    setDeleteModalOpen(false);
                    setEdgeToDelete(null);
                }}
                onRequestSubmit={() => {
                    if (edgeToDelete && onEdgeDelete) {
                        onEdgeDelete(edgeToDelete.id);
                    }
                    setDeleteModalOpen(false);
                    setEdgeToDelete(null);
                }}
            >
                <p>Are you sure you want to delete this connection?</p>
                {edgeToDelete && (
                    <p style={{
                        marginTop: '0.5rem',
                        color: 'var(--cds-text-secondary, #525252)',
                        fontSize: '0.875rem',
                    }}>
                        From <strong>{edgeToDelete.source}</strong> to <strong>{edgeToDelete.target}</strong>
                    </p>
                )}
            </Modal>
        </div>
    );
};

export default SwimlaneCanvas;
