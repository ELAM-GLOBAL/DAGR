import React, { useState } from 'react';
import {
    ClickableTile,
    DataTable,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
    TableContainer,
    Tag,
    Button,
    IconButton,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Dropdown
} from '@carbon/react';
import { Download, Settings, Draggable, OverflowMenuVertical, ChevronUp, ChevronDown } from '@carbon/icons-react';
import { LineChart, SimpleBarChart, StackedBarChart, ComboChart } from '@carbon/charts-react';
import { ScaleTypes } from '@carbon/charts';
import '@carbon/charts-react/styles.css';

// Returns & Ex Post Measures Data (like BarraOne Image 0)
const returnsData = [
    { id: '1', setting: 'Total - Brinson Attribution', portfolio: 'BMK Total', benchmark: 'INR', pfReturn: '4.24%', pfTrend: 'up', bmReturn: '4.29%', bmTrend: 'down', activeReturn: '-0.05%', activeTrend: 'down', mvStart: '218,231,607,009', mvEnd: '232,478,610,590' },
    { id: '2', setting: 'Fixed Income - Brinson', portfolio: 'Crisil FI BM', benchmark: 'INR', pfReturn: '2.58%', pfTrend: 'up', bmReturn: '2.55%', bmTrend: 'up', activeReturn: '0.03%', activeTrend: 'up', mvStart: '186,432,763,365', mvEnd: '197,526,093,741' },
    { id: '3', setting: 'Equity - Brinson Attribution', portfolio: 'NIFTY 200', benchmark: 'INR', pfReturn: '14.02%', pfTrend: 'up', bmReturn: '10.22%', bmTrend: 'up', activeReturn: '3.80%', activeTrend: 'up', mvStart: '28,562,117,661', mvEnd: '30,669,443,690' },
    { id: '4', setting: 'Equity - Factor Attribution', portfolio: 'NIFTY 200', benchmark: 'INR', pfReturn: '14.02%', pfTrend: 'up', bmReturn: '10.22%', bmTrend: 'up', activeReturn: '3.80%', activeTrend: 'up', mvStart: '28,562,117,661', mvEnd: '30,669,443,690' },
];

const returnsHeaders = [
    { key: 'setting', header: 'Analysis Setting' },
    { key: 'portfolio', header: 'Portfolio' },
    { key: 'benchmark', header: 'Benchmark' },
    { key: 'pfReturn', header: 'PF Return' },
    { key: 'bmReturn', header: 'BM Return' },
    { key: 'activeReturn', header: 'Active Return' },
    { key: 'mvStart', header: 'MV Start' },
    { key: 'mvEnd', header: 'MV End' },
];

// Active Returns Monthly Cumulative (like BarraOne Image 0)
const activeReturnsData = [
    { group: 'Equity', date: 'Apr', value: 0.5 },
    { group: 'Equity', date: 'May', value: -0.8 },
    { group: 'Equity', date: 'Jun', value: 0.3 },
    { group: 'Fixed Income', date: 'Apr', value: 0.2 },
    { group: 'Fixed Income', date: 'May', value: 0.1 },
    { group: 'Fixed Income', date: 'Jun', value: 0.4 },
    { group: 'Total', date: 'Apr', value: 0.7 },
    { group: 'Total', date: 'May', value: -0.7 },
    { group: 'Total', date: 'Jun', value: 0.7 },
];

// Attribution Summary Data (like BarraOne Image 1)
const attributionSummaryData = [
    { group: 'Allocation', category: 'Apr', value: 0.8 },
    { group: 'Allocation', category: 'May', value: 3.2 },
    { group: 'Allocation', category: 'Jun', value: 0.6 },
    { group: 'Selection', category: 'Apr', value: -0.5 },
    { group: 'Selection', category: 'May', value: 0.4 },
    { group: 'Selection', category: 'Jun', value: 0.3 },
    { group: 'Currency', category: 'Apr', value: 0.2 },
    { group: 'Currency', category: 'May', value: 0.1 },
    { group: 'Currency', category: 'Jun', value: -0.1 },
];

// Top/Bottom Assets Data (like BarraOne Image 2)
const topAssetsData = [
    { group: 'Portfolio', asset: 'HDFC BANK', value: 7.2 },
    { group: 'Portfolio', asset: 'WOCKHARDT', value: 5.8 },
    { group: 'Portfolio', asset: 'IDFC FIRST BANK', value: 4.2 },
    { group: 'Portfolio', asset: 'MARUTI SUZUKI', value: 3.5 },
    { group: 'Portfolio', asset: 'TCS', value: 3.1 },
];

const bottomAssetsData = [
    { group: 'Portfolio', asset: 'RELIANCE', value: -2.8 },
    { group: 'Portfolio', asset: 'INFOSYS', value: -1.9 },
    { group: 'Portfolio', asset: 'BHARTI AIRTEL', value: -1.5 },
    { group: 'Portfolio', asset: 'TATA MOTORS', value: -1.2 },
    { group: 'Portfolio', asset: 'ICICI BANK', value: -0.8 },
];

// Factor Exposures Data (like BarraOne Image 3)
const factorExposureData = [
    { group: 'Portfolio', factor: 'Liquidity', value: 82 },
    { group: 'Portfolio', factor: 'Leverage', value: 45 },
    { group: 'Portfolio', factor: 'Long-Term', value: 38 },
    { group: 'Portfolio', factor: 'Health Care', value: 25 },
    { group: 'Benchmark', factor: 'Liquidity', value: 65 },
    { group: 'Benchmark', factor: 'Leverage', value: 50 },
    { group: 'Benchmark', factor: 'Long-Term', value: 42 },
    { group: 'Benchmark', factor: 'Health Care', value: 30 },
];

// Ex Post Measures (like BarraOne Image 1)
const exPostMeasures = [
    { label: 'Variance', value: '0.01' },
    { label: 'Portfolio Volatility', value: '10.18' },
    { label: 'Benchmark Volatility (%)', value: '6.60' },
    { label: 'Covariance', value: '0.01' },
    { label: 'Correlation', value: '0.61' },
    { label: 'R-Squared', value: '0.63' },
    { label: 'Beta', value: '0.94' },
    { label: 'Sharpe Ratio', value: '1.22' },
    { label: 'Sortino Ratio', value: '1.83' },
    { label: 'Treynor Ratio', value: '0.12' },
    { label: 'Alpha (%)', value: '3.02' },
    { label: "Jensen's Alpha (%)", value: '3.14' },
    { label: 'Tracking Error (%)', value: '4.23' },
];

// Trailing Performance (like BarraOne Image 1)
const trailingPerformance = [
    { label: 'Portfolio', fullPeriod: '14.02%', mtd: '3.86%', qtd: '14.02%', ytd: '3.96%', m1: '14.02%', m3: '14.02%', m6: '14.02%', y1: '14.02%' },
    { label: 'Benchmark', fullPeriod: '10.22%', mtd: '3.50%', qtd: '10.22%', ytd: '3.50%', m1: '10.22%', m3: '10.22%', m6: '10.22%', y1: '10.22%' },
    { label: 'Active', fullPeriod: '3.80%', mtd: '0.46%', qtd: '3.80%', ytd: '0.46%', m1: '3.80%', m3: '3.80%', m6: '3.80%', y1: '3.80%' },
];

// Dashboard Card Component
interface DashboardCardProps {
    title: string;
    children: React.ReactNode;
    onDragStart?: (e: React.DragEvent) => void;
    onDragOver?: (e: React.DragEvent) => void;
    onDrop?: (e: React.DragEvent) => void;
    draggable?: boolean;
    id: string;
    headerRight?: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, children, onDragStart, onDragOver, onDrop, draggable = true, id, headerRight }) => (
    <div
        draggable={draggable}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        data-card-id={id}
        style={{
            background: '#fff',
            border: '1px solid #e0e0e0',
            display: 'flex',
            flexDirection: 'column',
            cursor: draggable ? 'grab' : 'default'
        }}
    >
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.5rem 0.75rem',
            borderBottom: '1px solid #e0e0e0',
            background: '#f4f4f4'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {draggable && <Draggable size={14} style={{ color: '#8d8d8d' }} />}
                <h4 style={{ fontSize: '0.75rem', fontWeight: 600, margin: 0, color: '#161616' }}>{title}</h4>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                {headerRight}
                <IconButton kind="ghost" size="sm" label="Options">
                    <OverflowMenuVertical size={14} />
                </IconButton>
            </div>
        </div>
        <div style={{ padding: '0.75rem', flex: 1, overflow: 'auto' }}>
            {children}
        </div>
    </div>
);

// Trend Arrow Component
const TrendArrow: React.FC<{ trend: string; value: string }> = ({ trend, value }) => (
    <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: trend === 'up' ? '#198038' : '#da1e28' }}>
        {trend === 'up' ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        {value}
    </span>
);

const PortfolioRiskDashboard: React.FC = () => {
    const [dateRange, setDateRange] = useState('Custom');
    const [draggedCard, setDraggedCard] = useState<string | null>(null);

    const handleDragStart = (cardId: string) => (e: React.DragEvent) => {
        setDraggedCard(cardId);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = () => (e: React.DragEvent) => {
        e.preventDefault();
        setDraggedCard(null);
    };

    const activeReturnsOptions = {
        title: '',
        axes: {
            bottom: { mapsTo: 'date', scaleType: ScaleTypes.LABELS },
            left: { mapsTo: 'value', scaleType: ScaleTypes.LINEAR, title: '%' }
        },
        height: '180px',
        color: { scale: { 'Equity': '#0f62fe', 'Fixed Income': '#198038', 'Total': '#6929c4' } },
        legend: { alignment: 'center' as const },
        toolbar: { enabled: false },
        points: { enabled: true, radius: 4 }
    };

    const attributionOptions = {
        title: '',
        axes: {
            bottom: { mapsTo: 'category', scaleType: ScaleTypes.LABELS },
            left: { mapsTo: 'value', scaleType: ScaleTypes.LINEAR, title: '%' }
        },
        height: '200px',
        legend: { alignment: 'center' as const },
        toolbar: { enabled: false }
    };

    const horizontalBarOptions = {
        title: '',
        axes: {
            left: { mapsTo: 'asset', scaleType: ScaleTypes.LABELS },
            bottom: { mapsTo: 'value', scaleType: ScaleTypes.LINEAR, title: '%' }
        },
        height: '160px',
        color: { scale: { 'Portfolio': '#0f62fe' } },
        legend: { enabled: false },
        toolbar: { enabled: false }
    };

    const bottomBarOptions = {
        ...horizontalBarOptions,
        color: { scale: { 'Portfolio': '#da1e28' } }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 3rem)', background: '#f4f4f4' }}>
            {/* Header Bar (like BarraOne) */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.5rem 1rem',
                background: '#fff',
                borderBottom: '1px solid #e0e0e0'
            }}>
                <Tabs>
                    <TabList aria-label="Dashboard Tabs">
                        <Tab>Summary</Tab>
                        <Tab>Group Exposure Analysis</Tab>
                        <Tab>Asset Exposure Analysis</Tab>
                        <Tab>Factor Exposure Analysis</Tab>
                        <Tab>Attribution Summary</Tab>
                        <Tab>Attribution Trend</Tab>
                    </TabList>
                </Tabs>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#525252' }}>Date Range:</span>
                    <Tag type="outline" size="sm">{dateRange}</Tag>
                    <Button kind="ghost" size="sm" renderIcon={Download} hasIconOnly iconDescription="Export" />
                    <Button kind="ghost" size="sm" renderIcon={Settings} hasIconOnly iconDescription="Settings" />
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '1rem', overflow: 'auto' }}>
                {/* Returns & Ex Post Measures Table */}
                <DashboardCard
                    id="returns-table"
                    title="Returns & Ex Post Measures – Reporting Period"
                    onDragStart={handleDragStart('returns-table')}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop()}
                >
                    <DataTable rows={returnsData} headers={returnsHeaders} size="sm">
                        {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
                            <TableContainer>
                                <Table {...getTableProps()} size="sm">
                                    <TableHead>
                                        <TableRow>
                                            {headers.map((header, i) => (
                                                <TableHeader key={`h-${i}`} {...getHeaderProps({ header })} style={{ fontSize: '0.6875rem' }}>
                                                    {header.header}
                                                </TableHeader>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row, ri) => (
                                            <TableRow key={`r-${ri}`} {...getRowProps({ row })}>
                                                {row.cells.map((cell, ci) => (
                                                    <TableCell key={`c-${ri}-${ci}`} style={{ fontSize: '0.6875rem' }}>
                                                        {cell.info.header === 'activeReturn' ? (
                                                            <TrendArrow
                                                                trend={returnsData[ri].activeTrend}
                                                                value={cell.value}
                                                            />
                                                        ) : cell.value}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </DataTable>
                </DashboardCard>

                {/* Second Row - Charts */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                    {/* Active Returns Chart */}
                    <DashboardCard
                        id="active-returns"
                        title="Active Returns - Monthly Cumulative"
                        onDragStart={handleDragStart('active-returns')}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop()}
                    >
                        <LineChart data={activeReturnsData} options={activeReturnsOptions} />
                    </DashboardCard>

                    {/* Attribution Summary Chart */}
                    <DashboardCard
                        id="attribution"
                        title="Attribution Summary Chart"
                        onDragStart={handleDragStart('attribution')}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop()}
                    >
                        <StackedBarChart data={attributionSummaryData} options={attributionOptions} />
                    </DashboardCard>

                    {/* Ex Post Measures */}
                    <DashboardCard
                        id="ex-post"
                        title="Ex Post Measures"
                        onDragStart={handleDragStart('ex-post')}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop()}
                    >
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.25rem', fontSize: '0.6875rem' }}>
                            {exPostMeasures.map((m, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0', borderBottom: '1px solid #e0e0e0' }}>
                                    <span style={{ color: '#525252' }}>{m.label}</span>
                                    <span style={{ fontWeight: 600 }}>{m.value}</span>
                                </div>
                            ))}
                        </div>
                    </DashboardCard>
                </div>

                {/* Third Row - Top/Bottom Assets */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                    <DashboardCard
                        id="top-assets"
                        title="Top Assets by Portfolio Weight"
                        onDragStart={handleDragStart('top-assets')}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop()}
                    >
                        <SimpleBarChart data={topAssetsData} options={horizontalBarOptions} />
                    </DashboardCard>

                    <DashboardCard
                        id="bottom-assets"
                        title="Bottom Assets by Active Weight"
                        onDragStart={handleDragStart('bottom-assets')}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop()}
                    >
                        <SimpleBarChart data={bottomAssetsData} options={bottomBarOptions} />
                    </DashboardCard>
                </div>

                {/* Fourth Row - Trailing Performance Table */}
                <div style={{ marginTop: '1rem' }}>
                    <DashboardCard
                        id="trailing"
                        title="Trailing Performance"
                        onDragStart={handleDragStart('trailing')}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop()}
                    >
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.6875rem' }}>
                            <thead>
                                <tr style={{ background: '#f4f4f4' }}>
                                    <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Base Return</th>
                                    <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid #e0e0e0' }}>Full Period</th>
                                    <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid #e0e0e0' }}>MTD</th>
                                    <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid #e0e0e0' }}>QTD</th>
                                    <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid #e0e0e0' }}>YTD</th>
                                    <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid #e0e0e0' }}>1 Month</th>
                                    <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid #e0e0e0' }}>3 Months</th>
                                    <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid #e0e0e0' }}>6 Months</th>
                                    <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid #e0e0e0' }}>1 Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trailingPerformance.map((row, i) => (
                                    <tr key={i} style={{ background: i === 2 ? '#e5f6ff' : 'transparent' }}>
                                        <td style={{ padding: '0.5rem', fontWeight: 600, borderBottom: '1px solid #e0e0e0' }}>{row.label}</td>
                                        <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid #e0e0e0', color: row.label === 'Active' ? '#198038' : '#161616' }}>{row.fullPeriod}</td>
                                        <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid #e0e0e0' }}>{row.mtd}</td>
                                        <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid #e0e0e0' }}>{row.qtd}</td>
                                        <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid #e0e0e0' }}>{row.ytd}</td>
                                        <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid #e0e0e0' }}>{row.m1}</td>
                                        <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid #e0e0e0' }}>{row.m3}</td>
                                        <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid #e0e0e0' }}>{row.m6}</td>
                                        <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid #e0e0e0' }}>{row.y1}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </DashboardCard>
                </div>
            </div>

            {/* Footer Status Bar */}
            <div style={{
                padding: '0.25rem 1rem',
                background: '#e0e0e0',
                borderTop: '1px solid #c6c6c6',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.6875rem',
                color: '#525252'
            }}>
                <span>● Ready</span>
                <span>60 of 60 rows • 0 marked • 23 columns • MultiFund Monthly Cumulative Performance 1 year</span>
            </div>
        </div>
    );
};

export default PortfolioRiskDashboard;
