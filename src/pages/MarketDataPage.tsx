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
import { SAMPLE_ORDERS, SAMPLE_SHIPMENTS } from '../data/phoenixEbra';

const TIME_RANGES = ['1D', '1W', '1M', '3M', 'YTD'];
const accent = '#3d5a4c';

interface CustomerSummary {
    name: string;
    activeOrders: number;
    revenueMtd: number;
    revenueTrend: number[];
    tier: 'T1' | 'T2' | 'T3';
}

const CUSTOMERS: CustomerSummary[] = [
    { name: 'Sunbelt Growers', activeOrders: 4, revenueMtd: 32250, revenueTrend: [18, 22, 25, 28, 32], tier: 'T2' },
    { name: 'Pacific Bloom Co.', activeOrders: 2, revenueMtd: 30000, revenueTrend: [12, 14, 18, 22, 30], tier: 'T1' },
    { name: 'Texas Nut Cooperative', activeOrders: 1, revenueMtd: 42000, revenueTrend: [25, 28, 32, 38, 42], tier: 'T2' },
    { name: 'Sonoma Vineyards', activeOrders: 3, revenueMtd: 32400, revenueTrend: [10, 18, 22, 28, 32], tier: 'T1' },
    { name: 'Heritage Orchard', activeOrders: 1, revenueMtd: 27000, revenueTrend: [30, 28, 28, 27, 27], tier: 'T2' },
    { name: 'Greenleaf Hemp', activeOrders: 5, revenueMtd: 63000, revenueTrend: [22, 30, 42, 55, 63], tier: 'T2' },
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
    const [selected, setSelected] = useState<CustomerSummary>(CUSTOMERS[0]);
    const [timeRange, setTimeRange] = useState('1M');
    const { chartTheme } = useDagrTheme();

    // Build chart data for selected customer
    const monthlyRevenue = selected.revenueTrend.map((v, i) => ({
        group: 'Revenue ($K)',
        month: ['Jan', 'Feb', 'Mar', 'Apr', 'May'][i] ?? `M${i + 1}`,
        value: v,
    }));

    const skuMix = SAMPLE_ORDERS
        .filter(o => o.customer === selected.name)
        .map(o => ({ group: o.sku, key: 'orders', value: o.gross / 1000 }));

    const customerOrders = SAMPLE_ORDERS.filter(o => o.customer === selected.name);
    const customerShipments = SAMPLE_SHIPMENTS.filter(s =>
        customerOrders.some(o => o.id === s.orderId)
    );

    const revenueOptions = {
        title: '',
        theme: chartTheme,
        axes: {
            bottom: { mapsTo: 'month', scaleType: ScaleTypes.LABELS, visible: true },
            left: { mapsTo: 'value', scaleType: ScaleTypes.LINEAR, title: 'Revenue ($K)' },
        },
        height: '300px',
        color: { scale: { 'Revenue ($K)': accent } },
        toolbar: { enabled: false },
        legend: { enabled: false },
        grid: { x: { enabled: false } },
        points: { enabled: true, radius: 4 },
    };

    const skuOptions = {
        title: '',
        theme: chartTheme,
        axes: {
            bottom: { mapsTo: 'value', scaleType: ScaleTypes.LINEAR, title: 'Gross ($K)' },
            left: { mapsTo: 'group', scaleType: ScaleTypes.LABELS },
        },
        height: '160px',
        color: { scale: skuMix.reduce((acc, m) => ({ ...acc, [m.group]: '#0f62fe' }), {}) },
        toolbar: { enabled: false },
        legend: { enabled: false },
    };

    const tierMixData = [
        { group: 'T1 ($60)', key: 'Mix', value: 18 },
        { group: 'T2 ($15)', key: 'Mix', value: 76 },
        { group: 'T3 ($6)', key: 'Mix', value: 6 },
    ];

    const orderHeaders = [
        { key: 'id', header: 'Order' },
        { key: 'sku', header: 'SKU' },
        { key: 'qty', header: 'Qty' },
        { key: 'gross', header: 'Gross' },
        { key: 'status', header: 'Status' },
    ];
    const orderRows = customerOrders.map(o => ({
        id: o.id,
        sku: o.sku,
        qty: o.qty.toLocaleString(),
        gross: `$${o.gross.toLocaleString()}`,
        status: o.status,
    }));

    const watchHeaders = [
        { key: 'name', header: 'Customer' },
        { key: 'tier', header: 'Tier' },
        { key: 'revenueMtd', header: 'MTD' },
        { key: 'trend', header: 'Trend' },
    ];
    const watchRows = CUSTOMERS.map(c => ({
        id: c.name,
        name: c.name,
        tier: c.tier,
        revenueMtd: `$${(c.revenueMtd / 1000).toFixed(0)}K`,
        trend: c.revenueTrend,
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
                        <Tab>Customers</Tab>
                        <Tab>Shipments</Tab>
                        <Tab>Returns</Tab>
                    </TabList>
                </Tabs>
                <div style={{ width: '300px' }}>
                    <Search size="sm" placeholder="Search customer, order, SKU..." labelText="Search" />
                </div>
            </div>

            <div style={{
                flex: 1,
                display: 'grid',
                gridTemplateColumns: '280px 1fr 320px',
                overflow: 'hidden',
            }}>
                {/* Customer list */}
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
                        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>CUSTOMERS · MTD</span>
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
                                                const cust = CUSTOMERS.find(c => c.name === row.id)!;
                                                return (
                                                    <TableRow
                                                        key={row.id}
                                                        onClick={() => setSelected(cust)}
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
                                                                    <Tag type={cust.tier === 'T1' ? 'purple' : 'blue'} size="sm">{cust.tier}</Tag>
                                                                ) : cell.info.header === 'trend' ? (
                                                                    <Sparkline
                                                                        data={cust.revenueTrend}
                                                                        color={accent}
                                                                    />
                                                                ) : cell.info.header === 'name' ? (
                                                                    <div style={{ fontWeight: 600 }}>{cust.name}</div>
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
                            <Tag type={selected.tier === 'T1' ? 'purple' : 'blue'} size="sm">{selected.tier}</Tag>
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
                                <span>REVENUE TREND</span>
                                <span style={{ color: 'var(--cds-text-helper)' }}>OrderFlow · last 5 months</span>
                            </div>
                            <LineChart data={monthlyRevenue} options={revenueOptions} />
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '1rem',
                        }}>
                            <div style={{ border: '1px solid var(--cds-border-subtle-00)', padding: '0.5rem', background: 'var(--cds-layer-02)' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                                    SKU MIX (this customer)
                                </div>
                                {skuMix.length > 0 ? (
                                    <SimpleBarChart data={skuMix} options={skuOptions} />
                                ) : (
                                    <div style={{ fontSize: '0.75rem', color: 'var(--cds-text-helper)', padding: '2rem 0', textAlign: 'center' }}>
                                        No recent orders for this customer.
                                    </div>
                                )}
                            </div>
                            <div style={{ border: '1px solid var(--cds-border-subtle-00)', padding: '0.5rem', background: 'var(--cds-layer-02)' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                                    TIER MIX (workspace-wide)
                                </div>
                                <StackedBarChart
                                    data={tierMixData}
                                    options={{
                                        title: '',
                                        theme: chartTheme,
                                        height: '160px',
                                        toolbar: { enabled: false },
                                        color: { scale: { 'T1 ($60)': '#8a3ffc', 'T2 ($15)': '#0f62fe', 'T3 ($6)': '#42be65' } },
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
                                ORDERS FOR {selected.name.toUpperCase()}
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
                                                                        type={cell.value === 'Shipped' ? 'green' : cell.value === 'In Chamber' ? 'blue' : 'red'}
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
                            CUSTOMER PROFILE
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem 1rem' }}>
                            <Field label="MTD revenue" value={`$${(selected.revenueMtd / 1000).toFixed(0)}K`} />
                            <Field label="Active orders" value={`${selected.activeOrders}`} align="right" />
                            <Field label="Tier" value={selected.tier} />
                            <Field label="Trend" value="▲ growing" align="right" intent="good" />
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
                            SHIPMENTS · SHIPTRACK JOIN
                        </div>
                        <div style={{ overflowY: 'auto', padding: '0 1rem' }}>
                            {customerShipments.length === 0 ? (
                                <div style={{ padding: '1rem 0', fontSize: '0.75rem', color: 'var(--cds-text-helper)' }}>
                                    No shipments matched for this customer in current window.
                                </div>
                            ) : customerShipments.map(s => (
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
                                            {s.damage === 'None' ? 'Clean' : s.damage}
                                        </Tag>
                                    </div>
                                    <div style={{ fontSize: '0.6875rem', color: 'var(--cds-text-secondary)' }}>
                                        {s.carrier} · {s.lane}
                                    </div>
                                    <div style={{ fontSize: '0.6875rem', color: 'var(--cds-text-helper)', display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
                                        <span>{s.transit} transit</span>
                                        <span>${s.cost.toLocaleString()}</span>
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
                            {selected.name === 'Heritage Orchard'
                                ? 'Margin compressed: 14% return rate on GoldRush Freight via TX-DFW → GA-ATL. Renegotiate carrier or shift to ColdLink.'
                                : `${selected.name} is in a growing-revenue cohort with clean shipments. Strong candidate for tier expansion.`}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Field = ({ label, value, align, intent }: { label: string; value: string; align?: 'left' | 'right'; intent?: 'good' }) => (
    <div style={{ textAlign: align ?? 'left' }}>
        <div style={{ fontSize: '0.625rem', color: 'var(--cds-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {label}
        </div>
        <div style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: intent === 'good' ? 'var(--cds-support-success)' : 'var(--cds-text-primary)',
        }}>
            {value}
        </div>
    </div>
);

export default MarketDataPage;
