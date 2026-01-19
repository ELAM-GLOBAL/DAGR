import React, { useState, useEffect } from 'react';
import {
    Modal,
    TextInput,
    Select,
    SelectItem,
    TextArea,
    Toggle,

    Button,
    RadioButtonGroup,
    RadioButton,
    Slider,
    NumberInput,
    FileUploader,
    DatePicker,
    DatePickerInput
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
const WIDGET_CONFIGS: Record<string, {
    fields: Array<{
        id: string;
        label: string;
        type: string;
        options?: string[];
        defaultValue?: any;
        helperText?: string;
        required?: boolean;
        section?: string;
    }>;
    schemaInfo?: { columns: string[]; description: string };
}> = {
    'portfolio-holdings': {
        fields: [
            { id: 'sourceType', label: 'Data Source', type: 'radio', options: ['CSV Upload', 'Database', 'API'], defaultValue: 'CSV Upload', section: 'source' },
            { id: 'file', label: 'Upload Holdings File', type: 'file', helperText: 'CSV or Excel file', section: 'source' },
            { id: 'portfolioFilter', label: 'Portfolio Filter', type: 'text', helperText: 'Filter by portfolio ID (leave blank for all)', section: 'filter' },
            { id: 'dateRangeStart', label: 'Start Date', type: 'date', section: 'filter' },
            { id: 'dateRangeEnd', label: 'End Date', type: 'date', section: 'filter' },
            { id: 'dateColumn', label: 'Date Column', type: 'select', options: ['date', 'position_date', 'as_of_date', 'trade_date'], defaultValue: 'date', section: 'mapping' },
            { id: 'portfolioIdColumn', label: 'Portfolio ID Column', type: 'select', options: ['portfolio_id', 'account_id', 'fund_id'], defaultValue: 'portfolio_id', section: 'mapping' },
            { id: 'assetIdColumn', label: 'Asset ID Column', type: 'select', options: ['asset_id', 'security_id', 'isin', 'cusip', 'ticker'], defaultValue: 'asset_id', section: 'mapping' },
            { id: 'quantityColumn', label: 'Quantity Column', type: 'select', options: ['quantity', 'units', 'shares', 'position'], defaultValue: 'quantity', section: 'mapping' },
            { id: 'currencyColumn', label: 'Currency Column', type: 'select', options: ['currency', 'ccy', 'position_ccy'], defaultValue: 'currency', section: 'mapping' },
        ],
        schemaInfo: {
            columns: ['date', 'portfolio_id', 'asset_id', 'quantity', 'book_value', 'market_value', 'currency'],
            description: 'Portfolio position data including holdings, quantities, and book values'
        }
    },
    'market-prices': {
        fields: [
            { id: 'source', label: 'Price Source', type: 'radio', options: ['Bloomberg', 'Reuters', 'Internal', 'CSV Upload'], defaultValue: 'Internal', section: 'source' },
            { id: 'file', label: 'Upload Price File', type: 'file', helperText: 'CSV with date, asset_id, price columns', section: 'source' },
            { id: 'priceType', label: 'Price Type', type: 'select', options: ['Close', 'Adjusted Close', 'Mid', 'VWAP'], defaultValue: 'Close', section: 'config' },
            { id: 'missingHandling', label: 'Missing Data Handling', type: 'radio', options: ['Forward-fill', 'Error', 'Skip'], defaultValue: 'Forward-fill', section: 'config' },
            { id: 'stalenessDays', label: 'Staleness Alert (days)', type: 'number', defaultValue: 3, helperText: 'Warn if prices older than N days', section: 'config' },
            { id: 'adjustForSplits', label: 'Adjust for Splits/Dividends', type: 'toggle', defaultValue: true, section: 'config' },
        ],
        schemaInfo: {
            columns: ['date', 'asset_id', 'price', 'currency', 'adjust_factor'],
            description: 'Daily closing prices for all portfolio securities'
        }
    },
    'fx-rates': {
        fields: [
            { id: 'source', label: 'FX Source', type: 'select', options: ['WM/Reuters', 'ECB', 'Bloomberg', 'Custom CSV'], defaultValue: 'WM/Reuters', section: 'source' },
            { id: 'file', label: 'Upload FX Rates', type: 'file', helperText: 'CSV with date, base_ccy, quote_ccy, rate', section: 'source' },
            { id: 'rateType', label: 'Rate Type', type: 'radio', options: ['4PM London Fix', 'Closing', 'Opening'], defaultValue: '4PM London Fix', section: 'config' },
            { id: 'triangulationCcy', label: 'Triangulation Currency', type: 'select', options: ['USD', 'EUR', 'GBP'], defaultValue: 'USD', helperText: 'Used for cross-rate calculation', section: 'config' },
            { id: 'forwardFillDays', label: 'Forward-fill (days)', type: 'number', defaultValue: 5, helperText: 'Max days to fill for weekends/holidays', section: 'config' },
        ],
        schemaInfo: {
            columns: ['date', 'base_ccy', 'quote_ccy', 'rate'],
            description: 'Daily FX rates for currency conversion'
        }
    },
    'macro-data': {
        fields: [
            { id: 'source', label: 'Data Source', type: 'select', options: ['FRED', 'Bloomberg', 'Custom'], defaultValue: 'FRED', section: 'source' },
            { id: 'indicators', label: 'Indicators', type: 'text', helperText: 'Comma-separated: GDP, CPI, UNEMPLOYMENT', section: 'config' },
            { id: 'frequency', label: 'Frequency', type: 'radio', options: ['Daily', 'Weekly', 'Monthly', 'Quarterly'], defaultValue: 'Monthly', section: 'config' },
        ],
        schemaInfo: {
            columns: ['date', 'indicator', 'value'],
            description: 'Macro economic data feeds'
        }
    },
    'benchmark': {
        fields: [
            { id: 'benchmarkId', label: 'Benchmark Index', type: 'select', options: ['S&P 500', 'MSCI World', 'MSCI ACWI', 'Russell 2000', 'FTSE 100', 'Custom'], defaultValue: 'S&P 500', section: 'config' },
            { id: 'returnType', label: 'Return Type', type: 'radio', options: ['Total Return', 'Price Return'], defaultValue: 'Total Return', section: 'config' },
            { id: 'frequency', label: 'Frequency', type: 'radio', options: ['Daily', 'Monthly'], defaultValue: 'Daily', section: 'config' },
            { id: 'file', label: 'Custom Benchmark File', type: 'file', helperText: 'CSV with date, return columns', section: 'source' },
        ],
        schemaInfo: {
            columns: ['date', 'benchmark_id', 'return', 'level', 'currency'],
            description: 'Benchmark index returns for relative performance'
        }
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
            { id: 'autoDetect', label: 'Auto-detect Types', type: 'toggle', defaultValue: true, section: 'config' },
            { id: 'sampleSize', label: 'Sample Size (rows)', type: 'number', defaultValue: 1000, section: 'config' },
        ],
        schemaInfo: {
            columns: ['column_name', 'inferred_type', 'null_count', 'unique_count', 'sample_values'],
            description: 'Analyzes incoming data schemas, detects types, and computes statistics'
        }
    },
    'validate': {
        fields: [
            { id: 'failureMode', label: 'Failure Mode', type: 'radio', options: ['Block', 'Warn', 'Skip'], defaultValue: 'Warn', section: 'config' },
            { id: 'nullTolerance', label: 'Null Tolerance (%)', type: 'slider', defaultValue: 1, section: 'rules' },
            { id: 'checkDuplicates', label: 'Check for Duplicates', type: 'toggle', defaultValue: true, section: 'rules' },
            { id: 'dateRecency', label: 'Max Staleness (days)', type: 'number', defaultValue: 3, section: 'rules' },
        ],
        schemaInfo: {
            columns: ['validation_rule', 'severity', 'status', 'affected_rows'],
            description: 'Validates data against schema rules and data quality checks'
        }
    },
    'dq-issue-queue': {
        fields: [
            { id: 'autoResolve', label: 'Auto-resolve Minor Issues', type: 'toggle', defaultValue: false, section: 'config' },
        ],
        schemaInfo: {
            columns: ['issue_id', 'type', 'severity', 'affected_rows', 'resolution'],
            description: 'Captures and manages data quality issues for manual review/fix'
        }
    },
    'normalize-align': {
        fields: [
            { id: 'idFormat', label: 'Primary ID Format', type: 'select', options: ['ISIN', 'CUSIP', 'SEDOL', 'Ticker', 'Bloomberg ID'], defaultValue: 'ISIN', section: 'config' },
            { id: 'forwardFillDays', label: 'Forward-fill Days', type: 'number', defaultValue: 3, helperText: 'Max days to fill for holidays', section: 'config' },
            { id: 'applyPAF', label: 'Apply Price Adjustment Factors', type: 'toggle', defaultValue: true, section: 'config' },
        ],
        schemaInfo: {
            columns: ['date', 'asset_id', 'normalized_id', 'adjusted_values'],
            description: 'Standardizes identifiers, aligns to trading calendar, handles corporate actions'
        }
    },
    'join-fx-convert': {
        fields: [
            { id: 'joinType', label: 'Join Type', type: 'radio', options: ['Inner', 'Left Outer'], defaultValue: 'Left Outer', section: 'config' },
            { id: 'missingFx', label: 'Missing FX Handling', type: 'radio', options: ['Triangulate', 'Error', 'Assume 1.0'], defaultValue: 'Triangulate', section: 'config' },
        ],
        schemaInfo: {
            columns: ['date', 'portfolio_id', 'asset_id', 'mv_local', 'fx_rate', 'mv_base'],
            description: 'Joins holdings with prices and converts all values to base currency'
        }
    },
    'build-return-inputs': {
        fields: [
            { id: 'aggregation', label: 'Aggregation Level', type: 'select', options: ['Portfolio', 'Account', 'Strategy'], defaultValue: 'Portfolio', section: 'config' },
        ],
        schemaInfo: {
            columns: ['date', 'portfolio_id', 'mv_begin', 'mv_end', 'net_cf', 'weight'],
            description: 'Computes daily portfolio valuations and cash flows for return calculation'
        }
    },
    'analytics-config': {
        fields: [
            { id: 'cfTiming', label: 'Cash Flow Timing', type: 'radio', options: ['SOD', 'MOD', 'EOD'], defaultValue: 'EOD', helperText: 'Start/Mid/End of Day', section: 'returns' },
            { id: 'grossNet', label: 'Return Basis', type: 'radio', options: ['Gross', 'Net'], defaultValue: 'Gross', section: 'returns' },
            { id: 'varMethod', label: 'VaR Method', type: 'select', options: ['Historical Simulation', 'Parametric', 'Monte Carlo'], defaultValue: 'Historical Simulation', section: 'risk' },
            { id: 'varConfidence', label: 'VaR Confidence Level', type: 'select', options: ['95%', '99%', 'Both'], defaultValue: 'Both', section: 'risk' },
            { id: 'varLookback', label: 'VaR Lookback (days)', type: 'slider', defaultValue: 250, section: 'risk' },
            { id: 'rfSource', label: 'Risk-Free Rate', type: 'select', options: ['SOFR', '10Y Treasury', '3M T-Bill', 'Custom'], defaultValue: 'SOFR', section: 'metrics' },
            { id: 'annualize', label: 'Annualization', type: 'radio', options: ['Auto (GIPS)', 'Force', 'None'], defaultValue: 'Auto (GIPS)', section: 'metrics' },
        ],
        schemaInfo: {
            columns: ['config_key', 'config_value'],
            description: 'Central configuration for all analytics calculations including returns, risk, and metrics'
        }
    },
    'benchmark-config': {
        fields: [
            { id: 'primaryBenchmark', label: 'Primary Benchmark', type: 'select', options: ['S&P 500', 'MSCI World', 'Russell 2000', 'Custom Composite'], defaultValue: 'S&P 500', section: 'config' },
            { id: 'useComposite', label: 'Use Composite Benchmark', type: 'toggle', defaultValue: false, section: 'config' },
        ],
        schemaInfo: {
            columns: ['benchmark_id', 'weight', 'return_series'],
            description: 'Configure benchmark for relative return, alpha, and attribution analysis'
        }
    },
    'compute-performance': {
        fields: [
            { id: 'metrics', label: 'Return Metrics', type: 'text', defaultValue: 'TWRR, CAGR', helperText: 'TWRR, IRR, XIRR, CAGR, HPR', section: 'config' },
            { id: 'outputFormat', label: 'Output Format', type: 'radio', options: ['Percentage', 'Decimal', 'Basis Points'], defaultValue: 'Percentage', section: 'display' },
            { id: 'decimalPlaces', label: 'Decimal Places', type: 'number', defaultValue: 2, section: 'display' },
        ],
        schemaInfo: {
            columns: ['metric', 'MTD', 'QTD', 'YTD', '1Y', '3Y_Ann', '5Y_Ann'],
            description: 'Calculate portfolio return metrics: TWRR, IRR, XIRR, CAGR, Active Return'
        }
    },
    'compute-risk': {
        fields: [
            { id: 'metrics', label: 'Risk Metrics', type: 'text', defaultValue: 'VaR, ES, Vol', helperText: 'VaR, ES, Volatility, Tracking Error, Drawdown', section: 'config' },
            { id: 'scalingMethod', label: 'Vol Scaling', type: 'radio', options: ['Sqrt Time', 'Actual'], defaultValue: 'Sqrt Time', section: 'config' },
        ],
        schemaInfo: {
            columns: ['metric', 'value', 'confidence', 'lookback_period'],
            description: 'Calculate risk metrics: VaR, Expected Shortfall, Volatility, Tracking Error, Drawdown'
        }
    },
    'compute-attribution': {
        fields: [
            { id: 'model', label: 'Attribution Model', type: 'select', options: ['Brinson-Fachler', 'Brinson-Hood-Beebower', 'Factor Model'], defaultValue: 'Brinson-Fachler', section: 'config' },
            { id: 'grouping', label: 'Grouping Dimension', type: 'select', options: ['Sector', 'Country', 'Asset Class', 'Custom'], defaultValue: 'Sector', section: 'config' },
            { id: 'linking', label: 'Multi-period Linking', type: 'radio', options: ['Geometric', 'Arithmetic'], defaultValue: 'Geometric', section: 'config' },
        ],
        schemaInfo: {
            columns: ['group', 'allocation_effect', 'selection_effect', 'interaction_effect', 'total_effect'],
            description: 'Brinson attribution decomposing active return into allocation and selection effects'
        }
    },
    'stress-testing': {
        fields: [
            { id: 'scenarioType', label: 'Scenario Type', type: 'radio', options: ['Historical', 'Custom', 'Hypothetical'], defaultValue: 'Historical', section: 'config' },
            { id: 'scenarios', label: 'Selected Scenarios', type: 'text', defaultValue: '2008 GFC, COVID-19', helperText: 'Comma-separated scenario names', section: 'config' },
        ],
        schemaInfo: {
            columns: ['scenario', 'portfolio_impact', 'var_impact', 'worst_sector'],
            description: 'Run historical and custom stress scenarios on portfolio'
        }
    },
    'risk-adjusted-metrics': {
        fields: [
            { id: 'metrics', label: 'Metrics', type: 'text', defaultValue: 'Sharpe, Sortino, IR', helperText: 'Sharpe, Sortino, Treynor, Information Ratio, Alpha', section: 'config' },
            { id: 'sortinoTarget', label: 'Sortino Target Return', type: 'radio', options: ['Risk-Free Rate', 'Zero', 'Custom'], defaultValue: 'Risk-Free Rate', section: 'config' },
        ],
        schemaInfo: {
            columns: ['metric', 'value', 'benchmark', 'period'],
            description: 'Calculate Sharpe, Sortino, Treynor, Information Ratio, and Alpha'
        }
    },
    'output-qa-checks': {
        fields: [
            { id: 'tolerance', label: 'Tolerance (%)', type: 'number', defaultValue: 0.01, section: 'config' },
            { id: 'crossCheck', label: 'Cross-check Sources', type: 'toggle', defaultValue: true, section: 'config' },
        ],
        schemaInfo: {
            columns: ['check_name', 'status', 'expected', 'actual', 'variance'],
            description: 'Validate calculation outputs against tolerance thresholds'
        }
    },
    'model-step': {
        fields: [
            { id: 'modelType', label: 'Model Type', type: 'select', options: ['Regression', 'ML Classifier', 'Custom Python'], defaultValue: 'Regression', section: 'config' },
        ],
        schemaInfo: {
            columns: ['model_output', 'prediction', 'confidence'],
            description: 'Optional custom ML/statistical models for enhanced analytics'
        }
    },
    'dashboard-cards': {
        fields: [
            { id: 'layout', label: 'Card Layout', type: 'select', options: ['2 Columns', '3 Columns', '4 Columns'], defaultValue: '4 Columns', section: 'display' },
            { id: 'theme', label: 'Theme', type: 'radio', options: ['Light', 'Dark', 'Corporate'], defaultValue: 'Dark', section: 'display' },
            { id: 'refreshRate', label: 'Auto-refresh (min)', type: 'number', defaultValue: 5, section: 'config' },
        ],
        schemaInfo: {
            columns: ['card_id', 'metric', 'value', 'trend'],
            description: 'Dashboard widget cards for portfolio risk KPIS'
        }
    },
    'report-generator': {
        fields: [
            { id: 'template', label: 'Report Template', type: 'select', options: ['Standard', 'Executive Summary', 'Detailed', 'Custom'], defaultValue: 'Standard', section: 'config' },
            { id: 'format', label: 'Output Format', type: 'radio', options: ['PDF', 'Excel', 'Both'], defaultValue: 'PDF', section: 'config' },
            { id: 'schedule', label: 'Generation Schedule', type: 'select', options: ['Daily', 'Weekly', 'Monthly', 'On-demand'], defaultValue: 'On-demand', section: 'config' },
        ],
        schemaInfo: {
            columns: ['section', 'content', 'charts'],
            description: 'Generate formatted portfolio risk reports'
        }
    },
    'exports-api': {
        fields: [
            { id: 'enableApi', label: 'Enable REST API', type: 'toggle', defaultValue: true, section: 'config' },
            { id: 'enableCsv', label: 'Enable CSV Export', type: 'toggle', defaultValue: true, section: 'config' },
            { id: 'enableJson', label: 'Enable JSON Export', type: 'toggle', defaultValue: true, section: 'config' },
        ],
        schemaInfo: {
            columns: ['endpoint', 'method', 'parameters'],
            description: 'API endpoints and data export capabilities'
        }
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

            case 'file':
                return (
                    <FileUploader
                        labelTitle={field.label}
                        labelDescription={field.helperText || 'Only .csv or .xlsx files'}
                        buttonLabel="Select file"
                        buttonKind="tertiary"
                        size="md"
                        filenameStatus="edit"
                        accept={['.csv', '.xlsx', '.xls']}
                        multiple={false}
                        disabled={false}
                        iconDescription="Delete file"
                        name={field.id}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                handleFieldChange(field.id, file.name);
                            }
                        }}
                    />
                );

            case 'date':
                return (
                    <DatePicker
                        datePickerType="single"
                        onChange={(dates) => {
                            if (dates[0]) {
                                handleFieldChange(field.id, dates[0].toISOString().split('T')[0]);
                            }
                        }}
                    >
                        <DatePickerInput
                            id={field.id}
                            labelText={field.label}
                            placeholder="mm/dd/yyyy"
                            size="md"
                        />
                    </DatePicker>
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
            <div className="modal-content-container" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem 0' }}>

                {/* Schema Info Panel */}
                {widgetConfig.schemaInfo && (
                    <div style={{
                        padding: '1rem',
                        backgroundColor: '#f4f4f4',
                        borderLeft: '4px solid #0f62fe',
                        borderRadius: '0 4px 4px 0'
                    }}>
                        <p style={{ fontSize: '14px', color: '#161616', marginBottom: '0.5rem', fontWeight: 600 }}>
                            {widgetConfig.schemaInfo.description}
                        </p>
                        <div>
                            <span style={{ fontSize: '12px', color: '#525252', fontWeight: 600 }}>Required Columns: </span>
                            <code style={{
                                backgroundColor: '#e0e0e0',
                                padding: '2px 6px',
                                borderRadius: '3px',
                                fontSize: '11px',
                                fontFamily: '"IBM Plex Mono", monospace'
                            }}>
                                {widgetConfig.schemaInfo.columns.join(', ')}
                            </code>
                        </div>
                    </div>
                )}

                {/* Configuration Fields */}
                {widgetConfig.fields.length > 0 ? (
                    <>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#525252', borderBottom: '1px solid #e0e0e0', paddingBottom: '0.5rem' }}>Configuration</h4>
                            {widgetConfig.fields.filter(f => !f.section || f.section === 'source' || f.section === 'config').map(field => (
                                <div key={field.id}>
                                    {renderField(field)}
                                </div>
                            ))}
                        </div>

                        {widgetConfig.fields.filter(f => f.section && f.section !== 'source' && f.section !== 'config').length > 0 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
                                <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#525252', borderBottom: '1px solid #e0e0e0', paddingBottom: '0.5rem' }}>Advanced Settings</h4>
                                {widgetConfig.fields.filter(f => f.section && f.section !== 'source' && f.section !== 'config').map(field => (
                                    <div key={field.id}>
                                        {renderField(field)}
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <p style={{ color: '#6f6f6f', fontStyle: 'italic' }}>
                        No specific configuration options available for this widget.
                    </p>
                )}

                {/* Basic Node Settings */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px dashed #e0e0e0' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#525252' }}>Node Settings</h4>
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
                            labelText="Status"
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
                        >
                            {LANES.map(lane => (
                                <SelectItem key={lane} value={lane.replace('D.A.G.R. ', '')} text={lane} />
                            ))}
                        </Select>
                    </div>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '2rem', display: 'flex', justifyContent: 'flex-start' }}>
                    <Button
                        kind="danger--ghost"
                        onClick={handleDelete}
                        size="md"
                    >
                        Delete Node
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default WidgetConfigModal;
