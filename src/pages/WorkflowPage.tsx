import { Content, Button } from '@carbon/react';
import SwimlaneCanvas from '../components/SwimlaneCanvas';
import WidgetConfigModal from '../components/WidgetConfigModal';
import WidgetLibrary from '../components/WidgetLibrary';
import { useState } from 'react';
import { INITIAL_WORKFLOW } from '../data/workflowTemplate';
import { WidgetNode, WidgetEdge } from '../types';
import { Play, Reset, View, ViewOff } from '@carbon/icons-react';

const WorkflowPage = () => {
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    const [nodes, setNodes] = useState<WidgetNode[]>(INITIAL_WORKFLOW.nodes);
    const [edges, setEdges] = useState(INITIAL_WORKFLOW.edges);
    const [isRunning, setIsRunning] = useState(false);
    const [scientistLaneVisible, setScientistLaneVisible] = useState(false);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleNodeUpdate = (updatedNode: WidgetNode) => {
        setNodes(prev => prev.map(n => {
            if (n.id === updatedNode.id) {
                // Check if lane changed
                if (n.lane !== updatedNode.lane) {
                    // Remove all connected edges
                    setEdges(currentEdges => currentEdges.filter(e => e.source !== n.id && e.target !== n.id));
                }
                return updatedNode;
            }
            return n;
        }));
    };

    const handleNodeDelete = (nodeId: string) => {
        setNodes(prev => prev.filter(n => n.id !== nodeId));
        setEdges(prev => prev.filter(e => e.source !== nodeId && e.target !== nodeId));
        setSelectedNodeId(null);
        setIsModalOpen(false);
    };

    const handleNodeDrop = (template: any, lane: string, laneIndex: number) => {
        const newNode: WidgetNode = {
            id: `${template.type}-${Date.now()}`,
            title: template.title,
            lane: lane,
            laneIndex: laneIndex,
            status: 'NeedsSetup',
            description: 'Newly added widget',
            isDisabled: false
        };
        setNodes(prev => [...prev, newNode]);
    };

    const handleEdgeCreate = (sourceId: string, targetId: string) => {
        if (sourceId === targetId) return; // No self-loops

        setEdges(prev => {
            // Check if edge already exists
            const exists = prev.some(e => e.source === sourceId && e.target === targetId);
            if (exists) return prev;

            const newEdge: WidgetEdge = {
                id: `edge-${sourceId}-${targetId}-${Date.now()}`,
                source: sourceId,
                target: targetId,
                type: 'solid'
            };
            return [...prev, newEdge];
        });
    };

    const handleEdgeDelete = (edgeId: string) => {
        setEdges(prev => prev.filter(e => e.id !== edgeId));
    };

    const handleNodeSelect = (id: string) => {
        // ... existing handleNodeSelect logic from line 22
        setSelectedNodeId(id);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        // ... existing handleModalClose logic from line 27
        setIsModalOpen(false);
        setSelectedNodeId(null);
    };

    const handleRunSimulation = () => {
        // ... existing logic
        setIsRunning(true);
        // Simulation logic to be added
        setTimeout(() => {
            // Mock simulation
            setNodes(prev => prev.map(n => (n.status === 'NeedsSetup' || n.status === 'Configured') ? { ...n, status: 'Running' } : n));

            setTimeout(() => {
                setNodes(prev => prev.map(n => n.status === 'Running' ? { ...n, status: 'Success' } : n));
                setIsRunning(false);
            }, 2000);
        }, 500);
    };

    const handleReset = () => {
        setNodes(INITIAL_WORKFLOW.nodes);
        setIsRunning(false);
    };

    const selectedNode = nodes.find(n => n.id === selectedNodeId);

    return (
        <Content className="workflow-page-content" style={{ padding: 0, height: 'calc(100vh - 3rem)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

            {/* Header Controls (Mock) */}
            <div className="page-actions" style={{ padding: '0.5rem 2rem', borderBottom: '1px solid #e0e0e0', display: 'flex', gap: '1rem', alignItems: 'center', background: '#fff' }}>
                <Button size="sm" renderIcon={Play} onClick={handleRunSimulation} disabled={isRunning}>Run (Simulate)</Button>
                <Button size="sm" kind="ghost" renderIcon={Reset} onClick={handleReset}>Reset Workflow</Button>
                <Button
                    size="sm"
                    kind="ghost"
                    renderIcon={scientistLaneVisible ? ViewOff : View}
                    onClick={() => setScientistLaneVisible(!scientistLaneVisible)}
                >
                    {scientistLaneVisible ? 'Hide Scientist Lane' : 'Show Scientist Lane'}
                </Button>
            </div>

            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                {/* Left Side: Widget Library */}
                <WidgetLibrary />

                {/* Center: Canvas */}
                <div className="canvas-container" style={{ flex: 1, position: 'relative', overflow: 'auto', background: '#f4f4f4' }}>
                    <SwimlaneCanvas
                        nodes={nodes}
                        edges={edges}
                        onNodeSelect={handleNodeSelect}
                        selectedNodeId={selectedNodeId}
                        scientistLaneVisible={scientistLaneVisible}
                        onNodeDrop={handleNodeDrop}
                        onEdgeCreate={handleEdgeCreate}
                        onEdgeDelete={handleEdgeDelete}
                    />
                </div>

                {selectedNode && (
                    <WidgetConfigModal
                        node={selectedNode}
                        open={isModalOpen}
                        onUpdate={handleNodeUpdate}
                        onDelete={handleNodeDelete}
                        onClose={handleModalClose}
                    />
                )}
            </div>
        </Content>
    );
};

export default WorkflowPage;
