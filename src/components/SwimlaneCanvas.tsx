import React, { useState, useEffect, useRef } from 'react';
import { LANES } from '../data/workflowTemplate';
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

    // Highlight state
    const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
    const [hoveredEdgeId, setHoveredEdgeId] = useState<string | null>(null);

    // Connection Drag State
    const [isConnecting, setIsConnecting] = useState(false);
    const [connectionStartId, setConnectionStartId] = useState<string | null>(null);
    const [dragPos, setDragPos] = useState({ x: 0, y: 0 });

    const handleNodeClick = (id: string) => {
        if (isConnecting) {
            // If we are connecting, clicking a node might be the end of the connection
            // But usually mouseUp is better for drag. 
            // Let's rely on handleConnectionEnd for the actual logic.
            return;
        }
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

        // Use elementFromPoint to find what's under the cursor, ignoring the drag line
        // This is more reliable than e.target when moving fast or if overlays exist
        const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;

        // Traverse up to find the node ID
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

    // Measure nodes whenever layout changes
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
                        height: rect.height
                    };
                }
            });
            setNodeRects(newRects);
        };

        // Helper to start observing
        const resizeObserver = new ResizeObserver(() => {
            measureNodes();
        });

        // observe the canvas itself
        if (canvasRef.current) {
            resizeObserver.observe(canvasRef.current);
        }

        // Also run immediately and after small delay for initial render
        measureNodes();
        const timeout = setTimeout(measureNodes, 500);

        return () => {
            resizeObserver.disconnect();
            clearTimeout(timeout);
        }
    }, [nodes, scientistLaneVisible]);

    // Memoized highlighting logic
    const getHighlightStatus = (currentId: string, type: 'node' | 'edge') => {
        if (!hoveredNodeId) return 'normal';

        // Find all edges connected to hoveredNodeId
        const connectedEdges = edges.filter(e => e.source === hoveredNodeId || e.target === hoveredNodeId);
        const connectedEdgeIds = new Set(connectedEdges.map(e => e.id));
        const connectedNodeIds = new Set(connectedEdges.flatMap(e => [e.source, e.target]));
        connectedNodeIds.add(hoveredNodeId);

        if (type === 'node') {
            return connectedNodeIds.has(currentId) ? 'highlighted' : 'dimmed';
        } else {
            return connectedEdgeIds.has(currentId) ? 'highlighted' : 'dimmed';
        }
    };

    // Group nodes by lane
    const nodesByLane = LANES.map(laneName => {
        return nodes.filter(n => n.lane === laneName || (laneName === 'D.A.G.R. Scientist' && n.lane === 'Scientist') || (laneName === 'D.A.G.R. BI Developer' && n.lane === 'BI') || (laneName === 'D.A.G.R. Architect' && n.lane === 'Architect') || (laneName === 'D.A.G.R. Engineer' && n.lane === 'Engineer') || (laneName === 'D.A.G.R. Analyst' && n.lane === 'Analyst'));
    });

    return (
        <div
            className="swimlane-canvas-container"
            style={{ position: 'relative', minHeight: '100%', overflow: 'visible' }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsConnecting(false)}
        >
            {/* SVG Overlay */}
            <svg
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'visiblePainted',
                    zIndex: 1,
                    overflow: 'visible'
                }}
            >
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#8d8d8d" />
                    </marker>
                    <marker id="arrowhead-dashed" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#c6c6c6" />
                    </marker>
                </defs>
                {edges.map(edge => {
                    const sourceRect = nodeRects[edge.source];
                    const targetRect = nodeRects[edge.target];

                    if (!sourceRect || !targetRect) return null;

                    const path = getManhattanPath(sourceRect, targetRect);
                    const isDashed = edge.type === 'dashed';
                    const strokeColor = isDashed ? '#c6c6c6' : '#8d8d8d';

                    const highlightStatus = getHighlightStatus(edge.id, 'edge');
                    const isDimmed = highlightStatus === 'dimmed';
                    const isHighlighted = highlightStatus === 'highlighted';

                    const isHovered = hoveredEdgeId === edge.id;

                    // Apply highlight styles
                    const finalStroke = isHovered ? '#da1e28' : (isHighlighted ? '#0f62fe' : strokeColor); // Red on hover for delete
                    const finalWidth = isHovered ? 3 : (isHighlighted ? 3 : 2);
                    const finalOpacity = isDimmed ? 0.2 : 1;

                    const handleEdgeClick = () => {
                        if (onEdgeDelete && confirm(`Delete connection from "${edge.source}" to "${edge.target}"?`)) {
                            onEdgeDelete(edge.id);
                        }
                    };

                    return (
                        <g
                            key={edge.id}
                            style={{ opacity: finalOpacity, transition: 'opacity 0.2s', cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredEdgeId(edge.id)}
                            onMouseLeave={() => setHoveredEdgeId(null)}
                            onClick={handleEdgeClick}
                        >
                            {/* Invisible wider path for easier clicking */}
                            <path
                                d={path}
                                fill="none"
                                stroke="transparent"
                                strokeWidth={16}
                                style={{ pointerEvents: 'stroke' }}
                            />
                            {/* Visible path */}
                            <path
                                d={path}
                                fill="none"
                                stroke={finalStroke}
                                strokeWidth={finalWidth}
                                strokeDasharray={isDashed ? "4 4" : "none"}
                                markerEnd={isDashed ? "url(#arrowhead-dashed)" : "url(#arrowhead)"}
                                style={{ pointerEvents: 'none', transition: 'stroke 0.15s, stroke-width 0.15s' }}
                            />
                            {edge.label && (
                                <foreignObject x={(sourceRect.x + sourceRect.width + targetRect.x) / 2 - 30} y={(sourceRect.y + targetRect.y) / 2 - 10} width="60" height="20">
                                    <div style={{
                                        background: isHovered ? '#fff1f1' : '#f4f4f4',
                                        padding: '0px 4px',
                                        fontSize: '10px',
                                        textAlign: 'center',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '8px',
                                        color: isHovered ? '#da1e28' : (isHighlighted ? '#0f62fe' : '#525252'),
                                        fontWeight: isHighlighted || isHovered ? 'bold' : 'normal',
                                        borderColor: isHovered ? '#da1e28' : (isHighlighted ? '#0f62fe' : '#e0e0e0')
                                    }}>
                                        {edge.label}
                                    </div>
                                </foreignObject>
                            )}
                            {/* Delete hint on hover */}
                            {isHovered && (
                                <foreignObject
                                    x={(sourceRect.x + sourceRect.width + targetRect.x) / 2 - 40}
                                    y={(sourceRect.y + targetRect.y) / 2 + 8}
                                    width="80"
                                    height="20"
                                >
                                    <div style={{
                                        background: '#da1e28',
                                        color: 'white',
                                        padding: '2px 6px',
                                        fontSize: '10px',
                                        textAlign: 'center',
                                        borderRadius: '4px',
                                        fontWeight: 'bold'
                                    }}>
                                        Click to delete
                                    </div>
                                </foreignObject>
                            )}
                        </g>
                    );
                })}

                {/* Temporary Connection Line */}
                {isConnecting && connectionStartId && nodeRects[connectionStartId] && (
                    <line
                        x1={nodeRects[connectionStartId].x + nodeRects[connectionStartId].width}
                        y1={nodeRects[connectionStartId].y + nodeRects[connectionStartId].height / 2}
                        x2={dragPos.x}
                        y2={dragPos.y}
                        stroke="#0f62fe"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        markerEnd="url(#arrowhead)"
                        style={{ pointerEvents: 'none' }}
                    />
                )}
            </svg>

            <div
                ref={canvasRef}
                style={{ display: 'flex', minHeight: '100%', padding: '2rem', gap: '2rem', position: 'relative', zIndex: 2 }}
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
                                        console.error("Failed to parse dropped item", err);
                                    }
                                }
                            }}
                            style={{
                                flex: 1,
                                minWidth: '220px',
                                paddingRight: '1rem',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                background: 'transparent' // could add highlighting here on drag enter
                            }}
                        >
                            {index < LANES.length - 1 && (
                                <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '1px', borderRight: '1px dashed #e0e0e0' }} />
                            )}

                            <h5 style={{ marginBottom: '1.5rem', color: '#525252', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.5px', textAlign: 'center' }}>
                                {lane}
                            </h5>

                            <div className="lane-content" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
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
                                    )
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SwimlaneCanvas;
