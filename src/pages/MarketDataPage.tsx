import { useState } from 'react';
import {
    Search,
    Button,
    Tag,
    Tabs,
    TabList,
    Tab,
    DataTable,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
    TableContainer,
} from '@carbon/react';
import { Settings, WatsonHealthAiStatus, ChartLineSmooth, ChartBar } from '@carbon/icons-react';
import { LineChart, SimpleBarChart, StackedBarChart } from '@carbon/charts-react';
import { ScaleTypes } from '@carbon/charts';
import { useDagrTheme } from '../components/ThemeContext';
import { SAMPLE_ORDERS, SAMPLE_SHIPMENTS } from '../data/raghavTrading';

const TIME_RANGES = ['1D', '1W', '1M', '3M', 'YTD'];
const accent = '#3d5a4c';

interface TraderSummary {
    name: string;
    activeOrders: number;
    pnlMtdLakhs: number;
    pnlTrend: number[];
    tier: 'Senior' | 'Junior' | 'Probation';
}

const TRADERS: TraderSummary[] = [
    { name: 'Trader 01 · Mumbai', activeOrders: 8, pnlMtdLakhs: 12.4, pnlTrend: [4.2, 6.8, 8.4, 10.2, 12.4], tier: 'Senior' },
    { name: 'Trader 02 · Pune', activeOrders: 6, pnlMtdLakhs: 9.82, pnlTrend: [3.1, 4.8, 6.2, 8.0, 9.8], tier: 'Senior' },
    { name: 'Trader 03 · Gurugram', activeOrders: 5, pnlMtdLakhs: 8.14, pnlTrend: [2.4, 3.6, 5.1, 6.8, 8.1], tier: 'Senior' },
    { name: 'Trader 04 · Bangalore', activeOrders: 4, pnlMtdLakhs: 4.12, pnlTrend: [1.2, 2.0, 2.8, 3.5, 4.1], tier: 'Junior' },
    { name: 'Trader 05 · Hyderabad', activeOrders: 3, pnlMtdLakhs: -0.60, pnlTrend: [1.8, 1.2, 0.6, -0.2, -0.6], tier: 'Probation' },
];

const Sparkline = ({ data, color, width = 60, height = 20 }: { data: number[], color: string, width?: number, height?: number }) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const points = data.map((v, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((v - min) / range) * height;
        return `${x},${y}`;
    }).join(' ');
    return (
        <svg width={width} height={height} style={{ overflow: 'visible' }}>
            <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

const MarketDataPage = () => {
    const [selected, setSelected] = useState<TraderSummary>(TRADERS[0]);
    const [timeRange, setTimeRange] = useState('1M');
    const { chartTheme } = useDagrTheme();

    const monthlyPnl = selected.pnlTrend.map((v, i) => ({
        group: 'Net P&L (INR L)',
        month: ['Jan', 'Feb', 'Mar', 'Apr', 'May'][i] ?? `M${i + 1}`,
        value: v,
    }));

    const instrumentMix = SAMPLE_ORDERS
        .filter(o => o.customer === selected.name)
        .map(o => ({ group: o.sku, key: 'orders', value: o.gross }));

    const traderOrders = SAMPLE_ORDERS.filter(o => o.customer === selected.name);
    const traderTrades = SAMPLE_SHIPMENTS.filter(s =>
        traderOrders.some(o => o.id === s.orderId)
    );

    const pnlOptions = {
        title: '',
        theme: chartTheme,
        axes: {
            bottom: { mapsTo: 'month', scaleType: ScaleTypes.LABELS, visible: true },
            left: { mapsTo: 'value', scaleType: ScaleTypes.LINEAR, title: 'Net P&L (INR L)' },
        },
        height: '300px',
        color: { scale: { 'Net P&L (INR L)': accent } },
        toolbar: { enabled: false },
        legend: { enabled: false },
        grid: { x: { enabled: false } },
        points: { enabled: true, radius: 4 },
    };

    const instrumentOptions = {
        title: '',
        theme: chartTheme,
        axes: {
            bottom: { mapsTo: 'value', scaleType: ScaleTypes.LINEAR, title: 'Notional (INR L)' },
            left: { mapsTo: 'group', scaleType: ScaleTypes.LABELS },
        },
        height: '160px',
        color: { scale: instrumentMix.reduce((acc, m) => ({ ...acc, [m.group]: '#0f62fe' }), {}) },
        toolbar: { enabled: false },
        legend: { enabled: false },
    };

    const venueMixData = [
        { group: 'NSE Equity', key: 'Mix', value: 54 },
        { group: 'NSE F&O', key: 'Mix', value: 32 },
        { group: 'BSE Equity', key: 'Mix', value: 6 },
        { group: 'MCX Commodity', key: 'Mix', value: 8 },
    ];

    const orderHeaders = [
        { key: 'id', header: 'Order' },
        { key: 'sku', header: 'Instrument' },
        { key: 'qty', header: 'Qty' },
        { key: 'gross', header: 'Notional (INR L)' },
        { key: 'status', header: 'Status' },
    ];
    const orderRows = traderOrders.map(o => ({
        id: o.id,
        sku: o.sku,
        qty: o.qty.toLocaleString(),
        gross: o.gross.toFixed(2),
        status: o.status,
    }));

    const watchHeaders = [
        { key: 'name', header: 'Trader' },
        { key: 'tier', header: 'Tier' },
        { key: 'pnlMtd', header: 'MTD' },
        { key: 'trend', header: 'Trend' },
    ];
    const watchRows = TRADERS.map(c => ({
        id: c.name,
        name: c.name,
        tier: c.tier,
        pnlMtd: c.pnlMtdLakhs >= 0 ? `+${c.pnlMtdLakhs.toFixed(1)} L` : `${c.pnlMtdLakhs.toFixed(1)} L`,
        trend: c.pnlTrend,
    }));

    return (
        <div style={{
            height: 'calc(100vh - 3rem)',
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--cds-background)',
            color: 'var(--cds-text-primary)',
            fontFamily: "'IBM Plex Sans', sans-serif",
        }}>
            {/* Top nav */}
            <div style={{
                borderBottom: '1px solid var(--cds-border-subtle-00)',
                padding: '0 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '48px',
                background: 'var(--cds-layer-02)',
            }}>
                <Tabs>
                    <TabList aria-label="Order sections">
                        <Tab>Orders</Tab>
                        <Tab>Traders</Tab>
                        <Tab>Trades</Tab>
                        <Tab>Stop-Loss Hits</Tab>
                    </TabList>
                </Tabs>
                <div style={{ width: '300px' }}>
                    <Search size="sm" placeholder="Search trader, order, instrument..." labelText="Search" />
                </div>
            </div>

            <div style={{
                flex: 1,
                display: 'grid',
                gridTemplateColumns: '280px 1fr 320px',
                overflow: 'hidden',
            }}>
                {/* Trader list */}
                <div style={{
                    borderRight: '1px solid var(--cds-border-subtle-00)',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'var(--cds-layer-02)',
                }}>
                    <div style={{
                        padding: '0.5rem',
                        borderBottom: '1px solid var(--cds-border-subtle-00)',
                        background: 'var(--cds-layer-01)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>TRADERS · MTD NET</span>
                        <Settings size={14} style={{ color: 'var(--cds-icon-secondary)' }} />
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        <DataTable rows={watchRows} headers={watchHeaders} size="sm">
                            {({ rows, headers, getTableProps, getHeaderProps }) => (
                                <TableContainer>
                                    <Table {...getTableProps()} size="sm">
                                        <TableHead>
                                            <TableRow>
                                                {headers.map((header, i) => {
                                                    const { key: _k, ...hp } = getHeaderProps({ header });
                                                    return <TableHeader key={`wh-${i}`} {...hp} style={{ fontSize: '0.625rem' }}>{header.header}</TableHeader>;
                                                })}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map(row => {
                                                const trader = TRADERS.find(c => c.name === row.id)!;
                                                return (
                                                    <TableRow
                                                        key={row.id}
                                                        onClick={() => setSelected(trader)}
                                                        style={{
                                                            cursor: 'pointer',
                                                            background: selected.name === row.id
                                                                ? 'var(--cds-layer-selected-01)'
                                                                : undefined,
                                                        }}
                                                    >
                                                        {row.cells.map(cell => (
                                                            <TableCell key={cell.id} style={{ fontSize: '0.75rem' }}>
                                                                {cell.info.header === 'tier' ? (
                                                                    <Tag type={trader.tier === 'Senior' ? 'purple' : trader.tier === 'Junior' ? 'blue' : 'red'} size="sm">{trader.tier}</Tag>
                                                                ) : cell.info.header === 'trend' ? (
                                                                    <Sparkline
                                                                        data={trader.pnlTrend}
                                                                        color={trader.pnlMtdLakhs >= 0 ? accent : '#fa4d56'}
                                                                    />
                                                                ) : cell.info.header === 'name' ? (
                                                                    <div style={{ fontWeight: 600 }}>{trader.name}</div>
                                                                ) : cell.info.header === 'pnlMtd' ? (
                                                                    <span style={{ color: trader.pnlMtdLakhs >= 0 ? 'var(--cds-support-success)' : 'var(--cds-support-error)' }}>
                                                                        {cell.value}
                                                                    </span>
                                                                ) : cell.value}
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                        </DataTable>
                    </div>
                </div>

                {/* Center: charts + orders */}
                <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--cds-background)' }}>
                    <div style={{
                        padding: '0.5rem 1rem',
                        borderBottom: '1px solid var(--cds-border-subtle-00)',
                        display: 'flex',
                        gap: '0.5rem',
                        alignItems: 'center',
                        background: 'var(--cds-layer-02)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginRight: '1rem' }}>
                            <h2 style={{ margin: 0, fontSize: '1.25rem' }}>{selected.name}</h2>
                            <Tag type={selected.tier === 'Senior' ? 'purple' : selected.tier === 'Junior' ? 'blue' : 'red'} size="sm">{selected.tier}</Tag>
                            <span style={{ fontSize: '0.875rem', color: 'var(--cds-text-secondary)' }}>
                                · {selected.activeOrders} active orders
                            </span>
                        </div>
                        <div style={{ height: '24px', width: '1px', background: 'var(--cds-border-subtle-00)', margin: '0 0.5rem' }} />
                        {TIME_RANGES.map(t => (
                            <Button key={t} kind={timeRange === t ? 'secondary' : 'ghost'} size="sm" onClick={() => setTimeRange(t)}>
                                {t}
                            </Button>
                        ))}
                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
                            <Button kind="ghost" size="sm" renderIcon={ChartLineSmooth} iconDescription="Line" hasIconOnly />
                            <Button kind="ghost" size="sm" renderIcon={ChartBar} iconDescription="Bars" hasIconOnly />
                        </div>
                    </div>

                    <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ border: '1px solid var(--cds-border-subtle-00)', padding: '0.5rem', background: 'var(--cds-layer-02)' }}>
                            <div style={{
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                marginBottom: '0.5rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                                <span>NET P&amp;L TREND</span>
                                <span style={{ color: 'var(--cds-text-helper)' }}>Zerodha + Broker RPA · last 5 months</span>
                            </div>
                            <LineChart data={monthlyPnl} options={pnlOptions} />
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '1rem',
                        }}>
                            <div style={{ border: '1px solid var(--cds-border-subtle-00)', padding: '0.5rem', background: 'var(--cds-layer-02)' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                                    INSTRUMENT MIX (this trader)
                                </div>
                                {instrumentMix.length > 0 ? (
                                    <SimpleBarChart data={instrumentMix} options={instrumentOptions} />
                                ) : (
                                    <div style={{ fontSize: '0.75rem', color: 'var(--cds-text-helper)', padding: '2rem 0', textAlign: 'center' }}>
                                        No recent orders for this trader.
                                    </div>
                                )}
                            </div>
                            <div style={{ border: '1px solid var(--cds-border-subtle-00)', padding: '0.5rem', background: 'var(--cds-layer-02)' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                                    VENUE MIX (bench-wide)
                                </div>
                                <StackedBarChart
                                    data={venueMixData}
                                    options={{
                                        title: '',
                                        theme: chartTheme,
                                        height: '160px',
                                        toolbar: { enabled: false },
                                        color: { scale: { 'NSE Equity': '#0f62fe', 'NSE F&O': '#8a3ffc', 'BSE Equity': '#42be65', 'MCX Commodity': '#f1c21b' } },
                                        axes: {
                                            left: { mapsTo: 'value', stacked: true },
                                            bottom: { mapsTo: 'key', scaleType: ScaleTypes.LABELS },
                                        },
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ border: '1px solid var(--cds-border-subtle-00)', background: 'var(--cds-layer-02)' }}>
                            <div style={{
                                padding: '0.5rem 0.75rem',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                borderBottom: '1px solid var(--cds-border-subtle-00)',
                                background: 'var(--cds-layer-01)',
                            }}>
                                ORDERS BY {selected.name.toUpperCase()}
                            </div>
                            <DataTable rows={orderRows} headers={orderHeaders} size="sm">
                                {({ rows, headers, getTableProps, getHeaderProps }) => (
                                    <TableContainer>
                                        <Table {...getTableProps()} size="sm">
                                            <TableHead>
                                                <TableRow>
                                                    {headers.map((header, i) => {
                                                        const { key: _k, ...hp } = getHeaderProps({ header });
                                                        return <TableHeader key={`oh-${i}`} {...hp} style={{ fontSize: '0.6875rem' }}>{header.header}</TableHeader>;
                                                    })}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.length === 0 ? (
                                                    <TableRow>
                                                        <TableCell colSpan={orderHeaders.length} style={{ fontSize: '0.75rem', color: 'var(--cds-text-helper)' }}>
                                                            No orders in window.
                                                        </TableCell>
                                                    </TableRow>
                                                ) : rows.map(row => (
                                                    <TableRow key={row.id}>
                                                        {row.cells.map(cell => (
                                                            <TableCell key={cell.id} style={{ fontSize: '0.75rem' }}>
                                                                {cell.info.header === 'status' ? (
                                                                    <Tag
                                                                        type={cell.value === 'Filled' ? 'green' : cell.value === 'Open' ? 'blue' : 'red'}
                                                                        size="sm"
                                                                    >
                                                                        {cell.value}
                                                                    </Tag>
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
                        </div>
                    </div>
                </div>

                {/* Right rail */}
                <div style={{
                    borderLeft: '1px solid var(--cds-border-subtle-00)',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'var(--cds-layer-02)',
                }}>
                    <div style={{ padding: '1rem', borderBottom: '1px solid var(--cds-border-subtle-00)' }}>
                        <h4 style={{
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            marginBottom: '0.75rem',
                            color: 'var(--cds-text-secondary)',
                            letterSpacing: '0.06em',
                        }}>
                            TRADER PROFILE
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem 1rem' }}>
                            <Field label="MTD net P&L" value={`${selected.pnlMtdLakhs >= 0 ? '+' : ''}${selected.pnlMtdLakhs.toFixed(1)} L`} intent={selected.pnlMtdLakhs >= 0 ? 'good' : 'bad'} />
                            <Field label="Active orders" value={`${selected.activeOrders}`} align="right" />
                            <Field label="Tier" value={selected.tier} />
                            <Field label="Trend" value={selected.pnlMtdLakhs >= 0 ? '▲ growing' : '▼ drawdown'} align="right" intent={selected.pnlMtdLakhs >= 0 ? 'good' : 'bad'} />
                        </div>
                    </div>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        <div style={{
                            padding: '0.75rem 1rem',
                            borderBottom: '1px solid var(--cds-border-subtle-00)',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            letterSpacing: '0.06em',
                            color: 'var(--cds-text-secondary)',
                        }}>
                            FILLS · BROKER JOIN
                        </div>
                        <div style={{ overflowY: 'auto', padding: '0 1rem' }}>
                            {traderTrades.length === 0 ? (
                                <div style={{ padding: '1rem 0', fontSize: '0.75rem', color: 'var(--cds-text-helper)' }}>
                                    No fills matched for this trader in current window.
                                </div>
                            ) : traderTrades.map(s => (
                                <div key={s.id} style={{
                                    padding: '0.75rem 0',
                                    borderBottom: '1px solid var(--cds-border-subtle-00)',
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                        <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{s.id}</span>
                                        <Tag
                                            type={s.damage === 'None' ? 'green' : 'red'}
                                            size="sm"
                                        >
                                            {s.damage === 'None' ? 'Clean fill' : s.damage}
                                        </Tag>
                                    </div>
                                    <div style={{ fontSize: '0.6875rem', color: 'var(--cds-text-secondary)' }}>
                                        {s.carrier} · {s.lane}
                                    </div>
                                    <div style={{ fontSize: '0.6875rem', color: 'var(--cds-text-helper)', display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
                                        <span>{s.transit} latency</span>
                                        <span>INR {s.cost.toLocaleString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{
                        padding: '1rem',
                        background: 'var(--cds-highlight)',
                        borderTop: '1px solid var(--cds-border-subtle-01)',
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: '0.5rem',
                            color: 'var(--cds-support-info)',
                        }}>
                            <WatsonHealthAiStatus size={16} />
                            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '0.04em' }}>AI INSIGHT</span>
                        </div>
                        <p style={{ fontSize: '0.75rem', lineHeight: 1.4, color: 'var(--cds-text-primary)', margin: 0 }}>
                            {selected.name === 'Trader 05 · Hyderabad'
                                ? 'Drawdown Sentinel: pattern matches two historical blow-up profiles. Recommend halving capital at next monthly review and revisit in 30 days.'
                                : selected.pnlMtdLakhs >= 8
                                ? `${selected.name} is in the top quartile this month. Capital scale candidate at next review (Reallocation Engine, Phase 2).`
                                : `${selected.name} is on track. Regime alignment score: 0.72. No flags raised in current window.`}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Field = ({ label, value, align, intent }: { label: string; value: string; align?: 'left' | 'right'; intent?: 'good' | 'bad' }) => (
    <div style={{ textAlign: align ?? 'left' }}>
        <div style={{ fontSize: '0.625rem', color: 'var(--cds-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {label}
        </div>
        <div style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: intent === 'good' ? 'var(--cds-support-success)' : intent === 'bad' ? 'var(--cds-support-error)' : 'var(--cds-text-primary)',
        }}>
            {value}
        </div>
    </div>
);

export default MarketDataPage;
