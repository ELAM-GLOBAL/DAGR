import React, { useState, useEffect } from 'react';
import {
    Modal,
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
    Button,
    RadioButtonGroup,
    RadioButton,
    Checkbox,
    Slider,
    NumberInput
} from '@carbon/react';
import { WidgetNode } from '../types';

interface WidgetConfigModalProps {
    node: WidgetNode;
    open: boolean;
    onUpdate: (updatedNode: WidgetNode) => void;
    onDelete?: (nodeId: string) => void;
    onClose: () => void;
}

// Widget-specific configuration definitions based on PRD
const WIDGET_CONFIGS: Record<string, { fields: Array<{ id: string; label: string; type: string; options?: string[]; defaultValue?: any; helperText?: string }> }> = {
    'portfolio-holdings': {
        fields: [
            { id: 'sourceType', label: 'Source Type', type: 'radio', options: ['CSV', 'Database', 'API'], defaultValue: 'CSV' },
            { id: 'filePath', label: 'File Path', type: 'text', helperText: 'Path to holdings data file' },
        ]
    },
    'market-prices': {
        fields: [
            { id: 'source', label: 'Source', type: 'radio', options: ['Bloomberg', 'Reuters', 'Internal', 'CSV'], defaultValue: 'Internal' },
            { id: 'priceType', label: 'Price Type', type: 'select', options: ['Close', 'Adjusted Close', 'Mid'], defaultValue: 'Close' },
            { id: 'missingHandling', label: 'Missing Data', type: 'radio', options: ['Forward-fill', 'Error', 'Skip'], defaultValue: 'Forward-fill' },
            { id: 'stalenessDays', label: 'Staleness Days', type: 'number', defaultValue: 3 },
        ]
    },
    'fx-rates': {
        fields: [
            { id: 'source', label: 'FX Source', type: 'select', options: ['WM/Reuters', 'ECB', 'Bloomberg', 'Custom'], defaultValue: 'WM/Reuters' },
            { id: 'rateType', label: 'Rate Type', type: 'radio', options: ['4PM Fix', 'Closing'], defaultValue: '4PM Fix' },
            { id: 'triangulationCcy', label: 'Triangulation CCY', type: 'select', options: ['USD', 'EUR', 'GBP'], defaultValue: 'USD' },
        ]
    },
    'benchmark': {
        fields: [
            { id: 'enabled', label: 'Enable Benchmark', type: 'toggle', defaultValue: false },
            { id: 'benchmarkId', label: 'Benchmark', type: 'select', options: ['S&P 500', 'MSCI World', 'Russell 2000', 'Custom'], defaultValue: 'S&P 500' },
            { id: 'returnType', label: 'Return Type', type: 'radio', options: ['Total Return', 'Price Return'], defaultValue: 'Total Return' },
        ]
    },
    'calendar-currency': {
        fields: [
            { id: 'baseCurrency', label: 'Base Currency', type: 'select', options: ['USD', 'EUR', 'GBP', 'CAD', 'JPY', 'CHF'], defaultValue: 'USD' },
            { id: 'holidayCalendar', label: 'Holiday Calendar', type: 'select', options: ['US NYSE', 'UK LSE', 'Combined', 'Custom'], defaultValue: 'US NYSE' },
            { id: 'tradingDays', label: 'Trading Days/Year', type: 'number', defaultValue: 252 },
        ]
    },
    'schema-profiler': {
        fields: [
            { id: 'autoDetect', label: 'Auto-detect Types', type: 'toggle', defaultValue: true },
        ]
    },
    'validate': {
        fields: [
            { id: 'failureMode', label: 'Failure Mode', type: 'radio', options: ['Block', 'Warn', 'Skip'], defaultValue: 'Warn' },
            { id: 'nullTolerance', label: 'Null Tolerance (%)', type: 'slider', defaultValue: 1 },
        ]
    },
    'normalize-align': {
        fields: [
            { id: 'idFormat', label: 'ID Format', type: 'select', options: ['ISIN', 'CUSIP', 'SEDOL', 'Ticker'], defaultValue: 'ISIN' },
            { id: 'forwardFillDays', label: 'Forward-fill Days', type: 'number', defaultValue: 3 },
            { id: 'applyPAF', label: 'Apply PAF', type: 'toggle', defaultValue: true },
        ]
    },
    'join-fx-convert': {
        fields: [
            { id: 'joinType', label: 'Join Type', type: 'radio', options: ['Inner', 'Left'], defaultValue: 'Left' },
            { id: 'missingFx', label: 'Missing FX', type: 'radio', options: ['Triangulate', 'Error', 'Assume 1.0'], defaultValue: 'Triangulate' },
        ]
    },
    'analytics-config': {
        fields: [
            { id: 'cfTiming', label: 'Cash Flow Timing', type: 'radio', options: ['SOD', 'MOD', 'EOD'], defaultValue: 'EOD' },
            { id: 'varMethod', label: 'VaR Method', type: 'select', options: ['Historical Sim', 'Parametric', 'Monte Carlo'], defaultValue: 'Historical Sim' },
            { id: 'varLookback', label: 'VaR Lookback (days)', type: 'slider', defaultValue: 250 },
            { id: 'rfSource', label: 'Risk-Free Rate Source', type: 'select', options: ['SOFR', '10Y Treasury', 'Custom'], defaultValue: 'SOFR' },
        ]
    },
    'compute-performance': {
        fields: [
            { id: 'outputFormat', label: 'Output Format', type: 'radio', options: ['Percentage', 'Decimal', 'Basis Points'], defaultValue: 'Percentage' },
            { id: 'decimalPlaces', label: 'Decimal Places', type: 'number', defaultValue: 2 },
        ]
    },
    'compute-risk': {
        fields: [
            { id: 'scalingMethod', label: 'Scaling Method', type: 'radio', options: ['Sqrt', 'Actual'], defaultValue: 'Sqrt' },
        ]
    },
    'compute-attribution': {
        fields: [
            { id: 'model', label: 'Attribution Model', type: 'select', options: ['Brinson-Fachler', 'Brinson-Hood-Beebower', 'Factor'], defaultValue: 'Brinson-Fachler' },
            { id: 'grouping', label: 'Grouping', type: 'select', options: ['Sector', 'Country', 'Asset Class', 'Custom'], defaultValue: 'Sector' },
            { id: 'linking', label: 'Linking Method', type: 'radio', options: ['Geometric', 'Arithmetic'], defaultValue: 'Geometric' },
        ]
    },
    'stress-testing': {
        fields: [
            { id: 'enabled', label: 'Enable Stress Testing', type: 'toggle', defaultValue: false },
            { id: 'scenarioType', label: 'Scenario Type', type: 'radio', options: ['Historical', 'Custom'], defaultValue: 'Historical' },
        ]
    },
    'risk-adjusted-metrics': {
        fields: [
            { id: 'sortinoTarget', label: 'Sortino Target', type: 'radio', options: ['RF Rate', 'Zero', 'Custom'], defaultValue: 'RF Rate' },
        ]
    },
    'dashboard-cards': {
        fields: [
            { id: 'layout', label: 'Layout', type: 'select', options: ['2 Columns', '3 Columns', '4 Columns'], defaultValue: '4 Columns' },
            { id: 'theme', label: 'Theme', type: 'radio', options: ['Light', 'Dark', 'Corporate'], defaultValue: 'Dark' },
        ]
    },
    'report-generator': {
        fields: [
            { id: 'template', label: 'Template', type: 'select', options: ['Standard', 'Executive', 'Detailed', 'Custom'], defaultValue: 'Standard' },
        ]
    },
    'exports-api': {
        fields: [
            { id: 'enableApi', label: 'Enable API', type: 'toggle', defaultValue: true },
        ]
    },
};

const WidgetConfigModal: React.FC<WidgetConfigModalProps> = ({ node, open, onUpdate, onDelete, onClose }) => {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [nodeTitle, setNodeTitle] = useState(node.title);
    const [nodeStatus, setNodeStatus] = useState(node.status);
    const [nodeLane, setNodeLane] = useState(node.lane);

    const LANES = [
        'D.A.G.R. Architect',
        'D.A.G.R. Engineer',
        'D.A.G.R. Analyst',
        'D.A.G.R. BI Developer',
        'D.A.G.R. Scientist'
    ];

    // Get widget-specific config
    const widgetConfig = WIDGET_CONFIGS[node.id] || { fields: [] };

    useEffect(() => {
        setFormData({ ...node.config });
        setNodeTitle(node.title);
        setNodeStatus(node.status);
        setNodeLane(node.lane);
    }, [node]);

    const handleFieldChange = (fieldId: string, value: any) => {
        setFormData(prev => ({ ...prev, [fieldId]: value }));
    };

    const handleSave = () => {
        onUpdate({
            ...node,
            title: nodeTitle,
            status: 'Configured',
            lane: nodeLane,
            config: formData
        } as WidgetNode);
        onClose();
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete(node.id);
            onClose();
        }
    };

    const renderField = (field: typeof widgetConfig.fields[0]) => {
        const value = formData[field.id] ?? field.defaultValue;

        switch (field.type) {
            case 'text':
                return (
                    <TextInput
                        id={field.id}
                        labelText={field.label}
                        value={value || ''}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        helperText={field.helperText}
                    />
                );

            case 'select':
                return (
                    <Select
                        id={field.id}
                        labelText={field.label}
                        value={value || field.options?.[0]}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    >
                        {field.options?.map(opt => (
                            <SelectItem key={opt} value={opt} text={opt} />
                        ))}
                    </Select>
                );

            case 'radio':
                return (
                    <RadioButtonGroup
                        legendText={field.label}
                        name={field.id}
                        valueSelected={value}
                        onChange={(val) => handleFieldChange(field.id, val)}
                        orientation="horizontal"
                    >
                        {field.options?.map(opt => (
                            <RadioButton key={opt} labelText={opt} value={opt} id={`${field.id}-${opt}`} />
                        ))}
                    </RadioButtonGroup>
                );

            case 'toggle':
                return (
                    <Toggle
                        id={field.id}
                        labelText={field.label}
                        labelA="Off"
                        labelB="On"
                        toggled={value || false}
                        onToggle={(checked) => handleFieldChange(field.id, checked)}
                    />
                );

            case 'number':
                return (
                    <NumberInput
                        id={field.id}
                        label={field.label}
                        value={value || 0}
                        onChange={(_e, { value: v }) => handleFieldChange(field.id, v)}
                        min={0}
                        max={365}
                    />
                );

            case 'slider':
                return (
                    <Slider
                        id={field.id}
                        labelText={field.label}
                        value={value || field.defaultValue || 50}
                        min={0}
                        max={field.id.includes('Lookback') ? 1000 : 100}
                        step={1}
                        onChange={({ value: v }) => handleFieldChange(field.id, v)}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <Modal
            open={open}
            modalHeading={`Configure ${node.title}`}
            modalLabel={`${node.lane} Lane`}
            primaryButtonText="Apply Changes"
            secondaryButtonText="Cancel"
            onRequestClose={onClose}
            onRequestSubmit={handleSave}
            size="lg"
        >
            <div className="modal-tabs-container" style={{ flex: 1 }}>
                <Tabs>
                    <TabList aria-label="Configuration Tabs">
                        <Tab>Settings</Tab>
                        <Tab>Basic</Tab>
                        <Tab>Expert</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <div style={{ paddingTop: '1rem' }}>
                                {widgetConfig.fields.length > 0 ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                        {widgetConfig.fields.map(field => (
                                            <div key={field.id}>
                                                {renderField(field)}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p style={{ color: '#6f6f6f' }}>
                                        No specific configuration required for this widget.
                                    </p>
                                )}
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div style={{ paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <TextInput
                                    id="node-title"
                                    labelText="Node Title"
                                    value={nodeTitle}
                                    onChange={(e) => setNodeTitle(e.target.value)}
                                    placeholder="Enter a title for this widget"
                                />
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <Select
                                        id="node-status"
                                        labelText="Initial Status"
                                        value={nodeStatus}
                                        onChange={(e) => setNodeStatus(e.target.value as any)}
                                    >
                                        <SelectItem value="NeedsSetup" text="Needs Setup" />
                                        <SelectItem value="Configured" text="Configured" />
                                        <SelectItem value="Optional" text="Optional" />
                                        <SelectItem value="Disabled" text="Disabled" />
                                    </Select>
                                    <Select
                                        id="node-lane"
                                        labelText="Lane"
                                        value={nodeLane}
                                        onChange={(e) => setNodeLane(e.target.value)}
                                        helperText="Changing lane may remove connections."
                                    >
                                        {LANES.map(lane => (
                                            <SelectItem key={lane} value={lane} text={lane} />
                                        ))}
                                    </Select>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div style={{ paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <p style={{ fontSize: '12px', color: '#525252' }}>
                                    Override internal logic for <strong>{node.id}</strong>.
                                </p>
                                <TextArea
                                    id="code-override"
                                    labelText="Custom Script (Python/SQL)"
                                    rows={8}
                                    placeholder="def process(data):&#10;    return data.filter()"
                                    style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '12px' }}
                                />
                                <Toggle
                                    id="retry-toggle"
                                    labelText="Auto-Retry on Failure"
                                    labelA="Off"
                                    labelB="On"
                                    defaultToggled
                                />
                                <Select id="timeout-select" labelText="Timeout Duration" defaultValue="5m">
                                    <SelectItem value="1m" text="1 Minute" />
                                    <SelectItem value="5m" text="5 Minutes" />
                                    <SelectItem value="1h" text="1 Hour" />
                                </Select>
                            </div>
                        </TabPanel>
                    </TabPanels>
                </Tabs>

                <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #e0e0e0' }}>
                    <Button kind="danger--ghost" size="md" onClick={handleDelete}>
                        Delete Node
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default WidgetConfigModal;
