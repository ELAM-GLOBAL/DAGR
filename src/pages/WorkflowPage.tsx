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
    const [scientistLaneVisible, setScientistLaneVisible] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleNodeUpdate = (updatedNode: WidgetNode) => {
        setNodes(prev => prev.map(n => {
            if (n.id === updatedNode.id) {
                if (n.lane !== updatedNode.lane) {
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
            lane,
            laneIndex,
            status: 'NeedsSetup',
            description: 'Newly added widget',
            isDisabled: false,
        };
        setNodes(prev => [...prev, newNode]);
    };

    const handleEdgeCreate = (sourceId: string, targetId: string) => {
        if (sourceId === targetId) return;
        setEdges(prev => {
            const exists = prev.some(e => e.source === sourceId && e.target === targetId);
            if (exists) return prev;
            const newEdge: WidgetEdge = {
                id: `edge-${sourceId}-${targetId}-${Date.now()}`,
                source: sourceId,
                target: targetId,
                type: 'solid',
            };
            return [...prev, newEdge];
        });
    };

    const handleEdgeDelete = (edgeId: string) => {
        setEdges(prev => prev.filter(e => e.id !== edgeId));
    };

    const handleNodeSelect = (id: string) => {
        setSelectedNodeId(id);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedNodeId(null);
    };

    const handleRunSimulation = () => {
        setIsRunning(true);
        setTimeout(() => {
            setNodes(prev => prev.map(n =>
                (n.status === 'NeedsSetup' || n.status === 'Configured') ? { ...n, status: 'Running' } : n
            ));
            setTimeout(() => {
                setNodes(prev => prev.map(n => n.status === 'Running' ? { ...n, status: 'Success' } : n));
                setIsRunning(false);
            }, 2000);
        }, 500);
    };

    const handleReset = () => {
        setNodes(INITIAL_WORKFLOW.nodes);
        setEdges(INITIAL_WORKFLOW.edges);
        setIsRunning(false);
    };

    const selectedNode = nodes.find(n => n.id === selectedNodeId);

    return (
        <Content
            style={{
                padding: 0,
                height: 'calc(100vh - 3rem)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}
        >
            {/* Header band */}
            <div style={{
                padding: '0.75rem 2rem',
                borderBottom: '1px solid var(--cds-border-subtle-00, #e0e0e0)',
                background: 'var(--cds-layer-02, #ffffff)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
            }}>
                <div>
                    <div style={{
                        fontSize: '0.6875rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: 'var(--cds-text-secondary, #525252)',
                    }}>
                        Layer 3 · Agent runtime
                    </div>
                    <h2 style={{ margin: '0.125rem 0 0 0', fontWeight: 300, fontSize: '1.5rem', color: 'var(--cds-text-primary, #161616)' }}>
                        Trading firm · Agent Workflow
                    </h2>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <Button
                        size="sm"
                        renderIcon={Play}
                        onClick={handleRunSimulation}
                        disabled={isRunning}
                    >
                        Run (Simulate)
                    </Button>
                    <Button size="sm" kind="ghost" renderIcon={Reset} onClick={handleReset}>
                        Reset
                    </Button>
                    <Button
                        size="sm"
                        kind="ghost"
                        renderIcon={scientistLaneVisible ? ViewOff : View}
                        onClick={() => setScientistLaneVisible(!scientistLaneVisible)}
                    >
                        {scientistLaneVisible ? 'Hide Scientist' : 'Show Scientist'}
                    </Button>
                </div>
            </div>

            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                {/* Widget Library */}
                <WidgetLibrary />

                {/* Canvas */}
                <div style={{
                    flex: 1,
                    position: 'relative',
                    overflow: 'auto',
                    background: 'var(--cds-layer-01, #f4f4f4)',
                }}>
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
