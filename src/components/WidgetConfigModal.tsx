import React, { useState, useEffect } from 'react';
import {
    Modal,
    Form,
    FormGroup,
    FormItem,
    TextInput,
    Select,
    SelectItem,
    TextArea,
    Toggle,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Button
} from '@carbon/react';
import { WidgetNode } from '../types';

interface WidgetConfigModalProps {
    node: WidgetNode;
    open: boolean;
    onUpdate: (updatedNode: WidgetNode) => void;
    onDelete?: (nodeId: string) => void;
    onClose: () => void;
}

const WidgetConfigModal: React.FC<WidgetConfigModalProps> = ({ node, open, onUpdate, onDelete, onClose }) => {
    const [formData, setFormData] = useState<Partial<WidgetNode>>({ ...node });
    const [isDirty, setIsDirty] = useState(false);

    // Initial lanes
    const LANES = [
        'D.A.G.R. Architect',
        'D.A.G.R. Engineer',
        'D.A.G.R. Analyst',
        'D.A.G.R. BI Developer',
        'D.A.G.R. Scientist'
    ];

    useEffect(() => {
        setFormData({ ...node });
        setIsDirty(false);
    }, [node]);

    const handleChange = (field: keyof WidgetNode, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setIsDirty(true);
    };

    const handleSave = () => {
        onUpdate({ ...node, ...formData, status: 'Configured' } as WidgetNode);
        setIsDirty(false);
        onClose();
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete(node.id);
            onClose();
        }
    };

    const isDataNode = node.title.includes('Data') || node.title.includes('Market') || node.title.includes('FX');
    const isComputationNode = !isDataNode;

    return (
        <Modal
            open={open}
            modalHeading={`Configure ${node.title}`}
            modalLabel="Widget Settings"
            primaryButtonText="Apply Changes"
            secondaryButtonText="Cancel"
            onRequestClose={onClose}
            onRequestSubmit={handleSave}
            size="lg"
        >
            {/* 1rem padding at bottom for content buffer */}
            <div style={{ paddingBottom: '2rem' }}>
                <Form>
                    <Tabs>
                    <TabList aria-label="Configuration Tabs">
                        <Tab>Basic</Tab>
                        <Tab>Advanced</Tab>
                        <Tab>Expert</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            {/* Use gap and proper layout for inputs */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', paddingTop: '1.5rem' }}>
                                <TextInput
                                    id="node-title"
                                    labelText="Node Title"
                                    value={formData.title || ''}
                                    onChange={(e) => handleChange('title', e.target.value)}
                                    placeholder="Enter a title for this widget"
                                />
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <Select
                                        id="node-status"
                                        labelText="Initial Status"
                                        value={formData.status || 'NeedsSetup'}
                                        onChange={(e) => handleChange('status', e.target.value)}
                                    >
                                        <SelectItem value="NeedsSetup" text="Needs Setup" />
                                        <SelectItem value="Configured" text="Configured" />
                                        <SelectItem value="Optional" text="Optional" />
                                        <SelectItem value="Disabled" text="Disabled" />
                                    </Select>

                                    <Select
                                        id="node-lane"
                                        labelText="Lane"
                                        value={formData.lane || LANES[0]}
                                        onChange={(e) => handleChange('lane', e.target.value)}
                                        helperText="Changing lane may remove connections."
                                    >
                                        {LANES.map(lane => (
                                            <SelectItem key={lane} value={lane} text={lane} />
                                        ))}
                                    </Select>
                                </div>

                                {isDataNode && (
                                    <TextInput
                                        id="source-path"
                                        labelText="Data Source Path"
                                        placeholder="e.g., s3://bucket/data"
                                        helperText="Enter the location of the input data"
                                    />
                                )}
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', paddingTop: '1.5rem' }}>
                                <Toggle
                                    id="retry-toggle"
                                    labelText="Auto-Retry on Failure"
                                    labelA="Off"
                                    labelB="On"
                                    defaultToggled
                                />
                                <Select
                                    id="timeout-select"
                                    labelText="Timeout Duration"
                                    defaultValue="5m"
                                >
                                    <SelectItem value="1m" text="1 Minute" />
                                    <SelectItem value="5m" text="5 Minutes" />
                                    <SelectItem value="1h" text="1 Hour" />
                                </Select>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', paddingTop: '1.5rem' }}>
                                <div className="cds--label-description" style={{ fontSize: '12px', color: '#525252' }}>
                                    Override internal logic for <strong>{node.id}</strong>.
                                </div>
                                <TextArea
                                    id="code-override"
                                    labelText="Custom Script (Python/SQL)"
                                    rows={10}
                                    enablePlaceholder
                                    placeholder="def process(data):&#10;    return data.filter()"
                                    style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '12px' }}
                                />
                            </div>
                        </TabPanel>
                    </TabPanels>
                </Tabs>

                {/* Footer Action Area */}
                <div style={{ marginTop: '3rem', paddingTop: '1rem', borderTop: '1px solid #e0e0e0', display: 'flex', justifyContent: 'flex-start' }}>
                    <Button
                        kind="danger--ghost"
                        size="md"
                        onClick={handleDelete}
                    >
                        Delete Node
                    </Button>
                </div>
                </Form>
            </div>
        </Modal>
    );
};

export default WidgetConfigModal;
