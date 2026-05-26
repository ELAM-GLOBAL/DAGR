import React, { useState, useEffect } from 'react';
import { Button, Tabs, TabList, Tab, TabPanels, TabPanel, TextInput, Select, SelectItem, Toggle, Tag } from '@carbon/react';
import { Close, Warning } from '@carbon/icons-react';
import { WidgetNode } from '../types';

interface WidgetSidePanelProps {
    node: WidgetNode;
    onUpdate: (node: WidgetNode) => void;
    onClose: () => void;
}

const WidgetSidePanel: React.FC<WidgetSidePanelProps> = ({ node, onUpdate, onClose }) => {
    // Local state for form values
    const [formData, setFormData] = useState<Partial<WidgetNode>>({ ...node });
    const [, setIsDirty] = useState(false);

    // Sync with node when selection changes
    useEffect(() => {
        setFormData({ ...node });
        setIsDirty(false);
    }, [node]);

    const handleCreateOrUpdate = () => {
        onUpdate({ ...node, ...formData, status: 'Configured' } as WidgetNode);
        setIsDirty(false);
    };

    // Custom Override Logic
    const canEdit = !node.isDisabled;

    return (
        <div
            className="widget-side-panel"
            style={{
                width: '480px',
                height: '100%',
                borderLeft: '1px solid #e0e0e0',
                backgroundColor: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                color: '#161616',
                zIndex: 50,
                boxShadow: '-4px 0 12px rgba(0,0,0,0.08)'
            }}
        >
            {/* Header */}
            <div className="panel-header" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e0e0e0', background: '#f4f4f4' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>{node.title}</h4>
                    <div style={{ marginTop: '0.25rem' }}>
                        <Tag type={node.status === 'Configured' ? 'blue' : 'gray'} title={node.status} size="sm">{node.status}</Tag>
                    </div>
                </div>
                <Button kind="ghost" size="sm" hasIconOnly renderIcon={Close} iconDescription="Close" onClick={onClose} />
            </div>

            {/* Tabs */}
            <div className="panel-tabs" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <Tabs>
                    <TabList aria-label="Configuration Tabs">
                        <Tab>Basic</Tab>
                        <Tab>Advanced</Tab>
                        <Tab>Expert</Tab>
                    </TabList>
                    <TabPanels>
                        {/* Basic Tab */}
                        <TabPanel>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem' }}>
                                {node.description && (
                                    <p style={{ fontSize: '14px', lineHeight: '20px', color: '#525252' }}>{node.description}</p>
                                )}

                                {node.isDisabled ? (
                                    <div style={{ padding: '1rem', background: '#f4f4f4', borderLeft: '4px solid #e0e0e0' }}>
                                        <p>This widget is not enabled in the current v1 prototype.</p>
                                    </div>
                                ) : (
                                    <>
                                        <TextInput
                                            id="widget-name"
                                            labelText="Widget Name"
                                            value={formData.title || ''}
                                            onChange={(e) => { setFormData({ ...formData, title: e.target.value }); setIsDirty(true); }}
                                        />

                                        <Select
                                            id="input-source"
                                            labelText="Input Source"
                                            defaultValue="default"
                                            onChange={() => setIsDirty(true)}
                                        >
                                            <SelectItem value="default" text="Default Input" />
                                            <SelectItem value="custom" text="Custom Query" />
                                        </Select>

                                        <Toggle
                                            id="enable-widget"
                                            labelText="Enable Widget"
                                            labelA="Off"
                                            labelB="On"
                                            defaultToggled
                                            onToggle={() => setIsDirty(true)}
                                        />
                                    </>
                                )}
                            </div>
                        </TabPanel>

                        {/* Advanced Tab */}
                        <TabPanel>
                            <div style={{ padding: '1rem' }}>
                                <p style={{ marginBottom: '1rem' }}>Advanced configuration options.</p>
                                <TextInput
                                    id="timeout"
                                    labelText="Timeout (ms)"
                                    placeholder="5000"
                                    disabled={!canEdit}
                                />
                            </div>
                        </TabPanel>

                        {/* Expert Tab */}
                        <TabPanel>
                            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f1c21b' }}>
                                    <Warning />
                                    <span style={{ fontSize: '12px' }}>Prototype only. No backend execution.</span>
                                </div>

                                <Toggle
                                    id="toggle-expert"
                                    labelText="Enable Custom Override"
                                    labelA="Off"
                                    labelB="On"
                                />

                                <p style={{ fontSize: '12px', color: '#8d8d8d', marginBottom: '0.5rem' }}>Widget Definition (Read-Only Stub)</p>
                                <div style={{ background: '#f4f4f4', padding: '1rem', fontFamily: 'monospace', fontSize: '12px', color: '#0f62fe' }}>
                                    {`{
  "widget": "${node.id}",
  "version": "1.0.0",
  "config": {
    "retries": 3,
    "strategy": "standard"
  }
}`}
                                </div>
                            </div>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>

            {/* Footer */}
            <div className="panel-footer" style={{ padding: '1rem', borderTop: '1px solid #e0e0e0', display: 'flex', gap: '1rem', background: '#f4f4f4' }}>
                <Button kind="primary" onClick={handleCreateOrUpdate} disabled={!canEdit}>Apply</Button>
                <Button kind="secondary" onClick={onClose}>Cancel</Button>
                <Button kind="ghost" size="sm" style={{ marginLeft: 'auto' }}>Reset</Button>
            </div>
        </div>
    );
};

export default WidgetSidePanel;
