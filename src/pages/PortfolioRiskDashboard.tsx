import React, { useState } from 'react';
import {
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
} from '@carbon/react';
import { Download, Settings, Draggable, OverflowMenuVertical } from '@carbon/icons-react';
import { LineChart, SimpleBarChart, GroupedBarChart } from '@carbon/charts-react';
import { ScaleTypes } from '@carbon/charts';
import { useDagrTheme } from '../components/ThemeContext';
import {
    CUSTOMER_MARGIN,
    LANE_PL,
    DEMAND_SUPPLY_TREND,
    SAMPLE_CHAMBERS,
    SAMPLE_CULTIVARS,
    KPI_SNAPSHOT,
    ORDER_BACKLOG,
    TAT_BY_CULTIVAR,
    TAT_TREND,
    INVENTORY_SPEND_TREND,
    INVENTORY_SPEND_BREAKDOWN,
    SCORECARD_TRADER_02,
    FORWARD_CASHFLOW,
    VALUE_TOTAL_INR_LAKHS,
    PILOT_FEE_INR_LAKHS,
    VALUE_MULTIPLIER,
    EXECUTION_LATENCY,
    EXECUTION_LATENCY_CHART,
} from '../data/raghavTrading';

const accent = '#3d5a4c';

const fmtInrL = (lakhs: number) => {
    if (Math.abs(lakhs) >= 100) return `INR ${(lakhs / 100).toFixed(2)} Cr`;
    return `INR ${lakhs.toFixed(1)} L`;
};

interface DashboardCardProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    id: string;
    headerRight?: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, subtitle, children, id, headerRight }) => (
    <div
        data-card-id={id}
        style={{
            background: 'var(--cds-layer-02)',
            border: '1px solid var(--cds-border-subtle-00)',
            display: 'flex',
            flexDirection: 'column',
        }}
    >
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.5rem 0.75rem',
            borderBottom: '1px solid var(--cds-border-subtle-00)',
            background: 'var(--cds-layer-01)',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Draggable size={12} style={{ color: 'var(--cds-icon-secondary)' }} />
                <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--cds-text-primary)' }}>
                        {title}
                    </div>
                    {subtitle && (
                        <div style={{ fontSize: '0.625rem', color: 'var(--cds-text-helper)' }}>{subtitle}</div>
                    )}
                </div>
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

const LatencyLegend = ({ label, color }: { label: string; color: string }) => (
    <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.25rem',
        fontSize: '0.625rem',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        color: 'var(--cds-text-secondary)',
    }}>
        <span style={{ width: 8, height: 8, background: color, borderRadius: '50%' }} />
        {label}
    </span>
);

const KpiTile = ({ label, value, sub, intent }: { label: string; value: string; sub?: string; intent?: 'good' | 'warn' | 'neutral' }) => (
    <div style={{
        background: 'var(--cds-layer-02)',
        border: '1px solid var(--cds-border-subtle-00)',
        borderLeft: `4px solid ${
            intent === 'good' ? 'var(--cds-support-success, #24a148)'
            : intent === 'warn' ? 'var(--cds-support-warning, #f1c21b)'
            : accent
        }`,
        padding: '0.75rem',
    }}>
        <div style={{
            fontSize: '0.625rem',
            color: 'var(--cds-text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            marginBottom: '0.25rem',
        }}>
            {label}
        </div>
        <div style={{ fontSize: '1.375rem', fontWeight: 600, color: 'var(--cds-text-primary)' }}>{value}</div>
        {sub && <div style={{ fontSize: '0.6875rem', color: 'var(--cds-text-helper)', marginTop: '0.125rem' }}>{sub}</div>}
    </div>
);

/** Trader Efficiency Scorecard — 12-category bar block per Section 7 of the brief. */
const TraderScorecard: React.FC = () => {
    const cats = SCORECARD_TRADER_02.filter(c => c.id !== 'composite');
    const composite = SCORECARD_TRADER_02.find(c => c.id === 'composite')!;
    const colorFor = (v: number) => v >= 80 ? '#24a148' : v >= 65 ? '#0f62fe' : v >= 50 ? '#f1c21b' : '#fa4d56';

    return (
        <div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.5rem 0.25rem 0.75rem',
                marginBottom: '0.75rem',
                borderBottom: '1px solid var(--cds-border-subtle-00)',
            }}>
                <div>
                    <div style={{ fontSize: '0.625rem', color: 'var(--cds-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Selected trader · May report card
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 600 }}>Trader 02 · Pune</div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--cds-text-helper)' }}>
                        Senior consultant · Options-income · INR 6 Cr capital · 184 trades / mo
                    </div>
                </div>
                <div style={{
                    marginLeft: 'auto',
                    textAlign: 'right',
                    padding: '0.5rem 0.75rem',
                    background: 'var(--cds-layer-01)',
                    border: `1px solid ${colorFor(composite.score)}`,
                }}>
                    <div style={{ fontSize: '0.625rem', color: 'var(--cds-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Composite
                    </div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 600, color: colorFor(composite.score), lineHeight: 1 }}>
                        {composite.score}
                    </div>
                    <div style={{ fontSize: '0.625rem', color: 'var(--cds-text-helper)', marginTop: '0.125rem' }}>
                        Commission: INR 1.42 L
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem 1rem' }}>
                {cats.map(c => (
                    <div key={c.id}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '2px' }}>
                            <span style={{ color: 'var(--cds-text-primary)' }}>{c.name}</span>
                            <span style={{ fontWeight: 600, color: colorFor(c.score) }}>{c.score}</span>
                        </div>
                        <div style={{ background: 'var(--cds-layer-01)', height: 6, position: 'relative', border: '1px solid var(--cds-border-subtle-00)' }}>
                            <div style={{
                                width: `${c.score}%`,
                                height: '100%',
                                background: colorFor(c.score),
                            }} />
                        </div>
                        <div style={{ fontSize: '0.625rem', color: 'var(--cds-text-helper)', marginTop: '2px' }}>{c.description}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const PortfolioRiskDashboard: React.FC = () => {
    const [dateRange] = useState('Last 30 days');
    const { chartTheme } = useDagrTheme();

    const traderHeaders = [
        { key: 'customer', header: 'Trader' },
        { key: 'revenue', header: 'Gross P&L' },
        { key: 'fulfillment', header: 'Brokerage' },
        { key: 'service', header: 'Slippage + STT' },
        { key: 'returns', header: 'SL Hits' },
        { key: 'trueMargin', header: 'Net P&L' },
        { key: 'marginPct', header: 'Net %' },
    ];

    const traderRows = CUSTOMER_MARGIN.map((c, i) => ({
        id: `cm-${i}`,
        customer: c.customer,
        revenue: fmtInrL(c.revenue / 100),
        fulfillment: fmtInrL(c.fulfillment / 100),
        service: fmtInrL(c.service / 100),
        returns: fmtInrL(c.returns / 100),
        trueMargin: fmtInrL(c.trueMargin / 100),
        marginPct: c.marginPct,
    }));

    const strategyHeaders = [
        { key: 'lane', header: 'Strategy' },
        { key: 'carrier', header: 'Broker' },
        { key: 'shipments', header: 'Trades' },
        { key: 'costPerUnit', header: 'INR/trade' },
        { key: 'damageRate', header: 'Slippage' },
        { key: 'marginImpact', header: 'Action' },
    ];
    const strategyRows = LANE_PL.map((l, i) => ({
        id: `lp-${i}`,
        lane: l.lane,
        carrier: l.carrier,
        shipments: l.shipments,
        costPerUnit: `INR ${l.costPerUnit.toFixed(2)}`,
        damageRate: `${l.damageRate.toFixed(1)} bps`,
        marginImpact: l.marginImpact,
    }));

    const regimeRows = SAMPLE_CHAMBERS.map(c => ({
        id: c.id,
        chamber: c.id,
        site: c.site,
        cultivar: c.cultivar,
        temp: `${c.temp}°C`,
        humidity: `${c.humidity}%`,
        co2: `${c.co2} ppm`,
        status: c.status,
    }));

    const regimeHeaders = [
        { key: 'chamber', header: 'Regime ID' },
        { key: 'site', header: 'Market State' },
        { key: 'cultivar', header: 'Strategy Exposure' },
        { key: 'status', header: 'Bench Status' },
    ];

    const strategyTableHeaders = [
        { key: 'id', header: 'Code' },
        { key: 'name', header: 'Strategy' },
        { key: 'monthlyVolume', header: 'Trades / mo' },
        { key: 'cogsPerPlantlet', header: 'Brokerage / trade' },
        { key: 'propSuccess', header: 'Win %' },
    ];
    const strategyTableRows = SAMPLE_CULTIVARS.map(c => ({
        id: c.id,
        name: c.name,
        monthlyVolume: c.monthlyVolume.toLocaleString(),
        cogsPerPlantlet: `INR ${c.cogsPerPlantlet.toFixed(0)}`,
        propSuccess: c.propSuccess,
        triploid: c.triploid,
    }));

    const demandSupplyOptions = {
        title: '',
        theme: chartTheme,
        axes: {
            bottom: { mapsTo: 'month', scaleType: ScaleTypes.LABELS },
            left: { mapsTo: 'value', scaleType: ScaleTypes.LINEAR, title: 'INR Lakhs' },
        },
        height: '220px',
        color: { scale: { 'Capital Deployed (INR L)': '#0f62fe', 'Allocation Ceiling (INR L)': accent } },
        toolbar: { enabled: false },
        points: { enabled: true, radius: 4 },
    };

    const marginByTraderData = CUSTOMER_MARGIN.filter(c => !c.customer.startsWith('Bench')).map(c => ({
        group: 'Net %',
        customer: c.customer,
        value: c.marginPct,
    }));
    const marginByTraderOptions = {
        title: '',
        theme: chartTheme,
        axes: {
            left: { mapsTo: 'customer', scaleType: ScaleTypes.LABELS },
            bottom: { mapsTo: 'value', scaleType: ScaleTypes.LINEAR, title: '%', domain: [-40, 100] },
        },
        height: '240px',
        color: { scale: { 'Net %': '#0f62fe' } },
        toolbar: { enabled: false },
        legend: { enabled: false },
    };

    const cashflowOptions = {
        title: '',
        theme: chartTheme,
        axes: {
            bottom: { mapsTo: 'month', scaleType: ScaleTypes.LABELS },
            left: { mapsTo: 'value', scaleType: ScaleTypes.LINEAR, title: 'INR Lakhs (cum.)' },
        },
        height: '240px',
        color: { scale: { 'At current bench': '#8d8d8d', 'With D.A.G.R. uplift': accent } },
        toolbar: { enabled: false },
        points: { enabled: true, radius: 3 },
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 3rem)',
            background: 'var(--cds-layer-01)',
        }}>
            {/* Header band */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.75rem 1.25rem',
                background: 'var(--cds-layer-02)',
                borderBottom: '1px solid var(--cds-border-subtle-00)',
            }}>
                <div>
                    <div style={{
                        fontSize: '0.625rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: 'var(--cds-text-secondary)',
                    }}>
                        Executive scorecard · Raghav Jain
                    </div>
                    <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 400, color: 'var(--cds-text-primary)' }}>
                        Trading firm · Bench, Risk, Brokerage &amp; Forward P&amp;L
                    </h2>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--cds-text-secondary)' }}>Range:</span>
                    <Tag type="outline" size="sm">{dateRange}</Tag>
                    <Button kind="ghost" size="sm" renderIcon={Download} hasIconOnly iconDescription="Export" />
                    <Button kind="ghost" size="sm" renderIcon={Settings} hasIconOnly iconDescription="Settings" />
                </div>
            </div>

            {/* Main content */}
            <div style={{ flex: 1, padding: '1rem', overflow: 'auto' }}>

                {/* KPI strip — executive view */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                    gap: '0.75rem',
                    marginBottom: '1rem',
                }}>
                    <KpiTile label="Book P&L (MTD)" value={fmtInrL(KPI_SNAPSHOT.monthlyRevenue / 100)} sub={`+${KPI_SNAPSHOT.revenueGrowthMoM}% MoM`} intent="good" />
                    <KpiTile label="Open Exposure" value={fmtInrL(KPI_SNAPSHOT.orderBacklogValue / 100)} sub={`${KPI_SNAPSHOT.orderBacklogUnits} positions`} intent="good" />
                    <KpiTile label="Bench Win Rate" value={`${KPI_SNAPSHOT.grossMargin}%`} sub="5-trader blended" intent="good" />
                    <KpiTile label="Review Cycle" value={`${KPI_SNAPSHOT.turnaroundDays}d`} sub={`Target ${KPI_SNAPSHOT.turnaroundTarget}d`} intent="good" />
                    <KpiTile label="Fill Alignment" value={`${KPI_SNAPSHOT.onTimeFulfillment}%`} sub="Intent vs execution" intent="good" />
                    <KpiTile label="Brokerage (MTD)" value={fmtInrL(KPI_SNAPSHOT.inventorySpendMtd / 100)} sub="Equity + F&O + MCX + STT" />
                    <KpiTile label="Projected 30d Drag" value={fmtInrL(KPI_SNAPSHOT.inventorySpendNext30d / 100)} sub="Current trade velocity" intent="warn" />
                    <KpiTile label="Drawdown Watch" value="1 trader" sub="Trader 05 · -12% MTD" intent="warn" />
                </div>

                {/* Open Positions — what's committed but not yet closed */}
                <DashboardCard
                    id="open-positions"
                    title="Open Positions — Live Exposure"
                    subtitle="Every trader, every open lot. Days held is the discipline clock; -SL on the right is the recovery clock."
                >
                    <DataTable rows={ORDER_BACKLOG.map(o => ({
                        id: o.id,
                        customer: o.customer,
                        cultivar: o.cultivar,
                        sku: o.sku,
                        qty: o.qty.toLocaleString(),
                        value: fmtInrL(o.value / 100),
                        daysToPromise: o.daysToPromise,
                        status: o.status,
                    }))} headers={[
                        { key: 'id', header: 'Pos ID' },
                        { key: 'customer', header: 'Trader' },
                        { key: 'sku', header: 'Instrument' },
                        { key: 'cultivar', header: 'Strategy' },
                        { key: 'qty', header: 'Qty' },
                        { key: 'value', header: 'Notional' },
                        { key: 'daysToPromise', header: 'Days Held' },
                        { key: 'status', header: 'Status' },
                    ]} size="sm">
                        {({ rows, headers, getTableProps, getHeaderProps }) => (
                            <TableContainer>
                                <Table {...getTableProps()} size="sm">
                                    <TableHead>
                                        <TableRow>
                                            {headers.map((header, idx) => {
                                                const { key: _k, ...hp } = getHeaderProps({ header });
                                                return <TableHeader key={`bh-${idx}`} {...hp} style={{ fontSize: '0.6875rem' }}>{header.header}</TableHeader>;
                                            })}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row, ri) => (
                                            <TableRow key={row.id}>
                                                {row.cells.map(cell => (
                                                    <TableCell key={cell.id} style={{ fontSize: '0.6875rem' }}>
                                                        {cell.info.header === 'status' ? (
                                                            <Tag
                                                                type={ORDER_BACKLOG[ri].status === 'In-Profit' ? 'green' : ORDER_BACKLOG[ri].status === 'Open' ? 'blue' : 'red'}
                                                                size="sm"
                                                            >
                                                                {ORDER_BACKLOG[ri].status}
                                                            </Tag>
                                                        ) : cell.info.header === 'daysToPromise' ? (
                                                            <Tag
                                                                type={ORDER_BACKLOG[ri].daysToPromise <= 5 ? 'green' : ORDER_BACKLOG[ri].daysToPromise <= 10 ? 'blue' : 'red'}
                                                                size="sm"
                                                            >
                                                                {ORDER_BACKLOG[ri].daysToPromise}d
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
                </DashboardCard>

                {/* Execution Latency — traders (by city) + algos */}
                <div style={{ marginTop: '1rem' }}>
                    <DashboardCard
                        id="execution-latency"
                        title="Execution Latency — Traders & Algos · p95 to NSE matching engine"
                        subtitle="Order-to-fill latency is opportunity cost. Slippage scales linearly with it. Algos in colo run sub-ms; cloud-deployed pairs sit at ~15 ms; remote discretionary seats vary by ISP."
                        headerRight={
                            <div style={{ display: 'flex', gap: '0.375rem', alignItems: 'center' }}>
                                <LatencyLegend label="optimal" color="#24a148" />
                                <LatencyLegend label="acceptable" color="#0f62fe" />
                                <LatencyLegend label="degraded" color="#fa4d56" />
                            </div>
                        }
                    >
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '1rem',
                        }}>
                            <div>
                                <GroupedBarChart
                                    data={EXECUTION_LATENCY_CHART}
                                    options={{
                                        title: '',
                                        theme: chartTheme,
                                        axes: {
                                            left: { mapsTo: 'entity', scaleType: ScaleTypes.LABELS },
                                            bottom: { mapsTo: 'value', scaleType: ScaleTypes.LINEAR, title: 'Latency (ms)' },
                                        },
                                        height: '420px',
                                        color: { scale: { 'p50': accent, 'p95': '#fa4d56' } },
                                        toolbar: { enabled: false },
                                    } as any}
                                />
                            </div>
                            <div style={{ overflowX: 'auto' }}>
                                <Table size="sm">
                                    <TableHead>
                                        <TableRow>
                                            <TableHeader style={{ fontSize: '0.6875rem' }}>Entity</TableHeader>
                                            <TableHeader style={{ fontSize: '0.6875rem' }}>Kind</TableHeader>
                                            <TableHeader style={{ fontSize: '0.6875rem' }}>Location</TableHeader>
                                            <TableHeader style={{ fontSize: '0.6875rem' }}>p50</TableHeader>
                                            <TableHeader style={{ fontSize: '0.6875rem' }}>p95</TableHeader>
                                            <TableHeader style={{ fontSize: '0.6875rem' }}>p99</TableHeader>
                                            <TableHeader style={{ fontSize: '0.6875rem' }}>Status</TableHeader>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {EXECUTION_LATENCY.map(e => (
                                            <TableRow key={e.id}>
                                                <TableCell style={{ fontSize: '0.6875rem', fontWeight: 600 }}>{e.name}</TableCell>
                                                <TableCell style={{ fontSize: '0.6875rem' }}>
                                                    <Tag type={e.kind === 'algo' ? 'purple' : 'blue'} size="sm">{e.kind}</Tag>
                                                </TableCell>
                                                <TableCell style={{ fontSize: '0.6875rem' }}>{e.location}</TableCell>
                                                <TableCell style={{ fontSize: '0.6875rem' }}>{e.p50.toFixed(1)} ms</TableCell>
                                                <TableCell style={{ fontSize: '0.6875rem', fontWeight: 600 }}>{e.p95.toFixed(1)} ms</TableCell>
                                                <TableCell style={{ fontSize: '0.6875rem' }}>{e.p99.toFixed(1)} ms</TableCell>
                                                <TableCell style={{ fontSize: '0.6875rem' }}>
                                                    <Tag
                                                        type={e.status === 'optimal' ? 'green' : e.status === 'acceptable' ? 'blue' : 'red'}
                                                        size="sm"
                                                    >
                                                        {e.status}
                                                    </Tag>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                        <div style={{
                            marginTop: '0.625rem',
                            padding: '0.5rem 0.75rem',
                            background: 'var(--cds-layer-01)',
                            borderLeft: `3px solid ${accent}`,
                            fontSize: '0.6875rem',
                            color: 'var(--cds-text-secondary)',
                            lineHeight: 1.5,
                        }}>
                            <strong style={{ color: 'var(--cds-text-primary)' }}>Why this matters:</strong> Trader 03 (Gurugram) sits at 31.6 ms p95 — that&apos;s ~10× Mumbai. On a Momentum LC trade, the quote you see is not the quote you fill. Move that seat onto a Mumbai VPS and the brokerage-drag lever in Discovery probably understates the real recovery. The SG disaster-recovery algo at 78 ms p95 is a failover backstop, not a live path — keep it labeled that way to avoid mis-reads.
                        </div>
                    </DashboardCard>
                </div>

                {/* The headline: Trader Efficiency Scorecard + Fundraising Calculator */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1fr',
                    gap: '1rem',
                    marginTop: '1rem',
                }}>
                    <DashboardCard
                        id="trader-scorecard"
                        title="Trader Efficiency Scorecard — 12-category report card"
                        subtitle="What Raghav hands a trader at commission time. Composite drives the bonus calculation."
                    >
                        <TraderScorecard />
                    </DashboardCard>

                    <DashboardCard
                        id="fundraising"
                        title="Fundraising Calculator — Forward 12-month P&L"
                        subtitle="Bench projection at current performance vs. with D.A.G.R. uplift. LP-ready."
                        headerRight={
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Tag type="green" size="sm">+{Math.round(((552 - 324) / 324) * 100)}% uplift</Tag>
                            </div>
                        }
                    >
                        <LineChart data={FORWARD_CASHFLOW} options={cashflowOptions as any} />
                        <div style={{
                            marginTop: '0.5rem',
                            padding: '0.5rem 0.625rem',
                            background: 'var(--cds-layer-01)',
                            border: '1px solid var(--cds-border-subtle-00)',
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr',
                            gap: '0.5rem',
                            fontSize: '0.6875rem',
                        }}>
                            <div>
                                <div style={{ color: 'var(--cds-text-secondary)' }}>Pilot fee</div>
                                <div style={{ fontWeight: 600, color: 'var(--cds-text-primary)' }}>{fmtInrL(PILOT_FEE_INR_LAKHS)}</div>
                            </div>
                            <div>
                                <div style={{ color: 'var(--cds-text-secondary)' }}>Year-1 unlock</div>
                                <div style={{ fontWeight: 600, color: 'var(--cds-text-primary)' }}>{fmtInrL(VALUE_TOTAL_INR_LAKHS)}</div>
                            </div>
                            <div>
                                <div style={{ color: 'var(--cds-text-secondary)' }}>Multiplier</div>
                                <div style={{ fontWeight: 700, color: 'var(--cds-support-success, #24a148)' }}>~{VALUE_MULTIPLIER}×</div>
                            </div>
                        </div>
                    </DashboardCard>
                </div>

                {/* Review-cycle trend + brokerage spend */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    marginTop: '1rem',
                }}>
                    <DashboardCard
                        id="review-trend"
                        title="Trader Review-Cycle TAT"
                        subtitle="Days from period close to scorecard delivery. Target 5 days."
                    >
                        <LineChart
                            data={TAT_TREND}
                            options={{
                                title: '',
                                theme: chartTheme,
                                axes: {
                                    bottom: { mapsTo: 'month', scaleType: ScaleTypes.LABELS },
                                    left: { mapsTo: 'value', scaleType: ScaleTypes.LINEAR, title: 'Days' },
                                },
                                height: '220px',
                                color: { scale: { 'Actual': accent, 'Target': '#fa4d56' } },
                                toolbar: { enabled: false },
                                points: { enabled: true, radius: 4 },
                            }}
                        />
                    </DashboardCard>

                    <DashboardCard
                        id="brokerage-spend"
                        title="Brokerage Drag — Actuals &amp; Projection"
                        subtitle="Equity + F&amp;O + MCX + STT. Projection driven by current trade velocity."
                    >
                        <LineChart
                            data={INVENTORY_SPEND_TREND}
                            options={{
                                title: '',
                                theme: chartTheme,
                                axes: {
                                    bottom: { mapsTo: 'month', scaleType: ScaleTypes.LABELS },
                                    left: { mapsTo: 'value', scaleType: ScaleTypes.LINEAR, title: 'INR K' },
                                },
                                height: '220px',
                                color: { scale: { 'Actual (INR K)': '#0f62fe', 'Projected (INR K)': '#fa4d56' } },
                                toolbar: { enabled: false },
                                points: { enabled: true, radius: 4 },
                            }}
                        />
                    </DashboardCard>
                </div>

                {/* Strategy cycle + brokerage breakdown */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    marginTop: '1rem',
                }}>
                    <DashboardCard
                        id="strategy-cycle"
                        title="Avg Holding Period by Strategy (days)"
                        subtitle="Bench discipline check. Long-tail holds in SmallCap Momentum are an early warning."
                    >
                        <GroupedBarChart
                            data={TAT_BY_CULTIVAR.flatMap(t => [
                                { group: 'Current', cultivar: t.cultivar, value: t.current },
                                { group: 'Target', cultivar: t.cultivar, value: t.target },
                            ])}
                            options={{
                                title: '',
                                theme: chartTheme,
                                axes: {
                                    left: { mapsTo: 'cultivar', scaleType: ScaleTypes.LABELS },
                                    bottom: { mapsTo: 'value', scaleType: ScaleTypes.LINEAR, title: 'Days' },
                                },
                                height: '240px',
                                color: { scale: { 'Current': accent, 'Target': '#c6c6c6' } },
                                toolbar: { enabled: false },
                            } as any}
                        />
                    </DashboardCard>

                    <DashboardCard
                        id="brokerage-breakdown"
                        title="Brokerage Breakdown — This Month"
                        subtitle="Where the INR 4.2 L is going. STT + GST are non-negotiable; broker rate is."
                    >
                        <SimpleBarChart
                            data={INVENTORY_SPEND_BREAKDOWN.map(b => ({ group: b.group, value: b.value }))}
                            options={{
                                title: '',
                                theme: chartTheme,
                                axes: {
                                    left: { mapsTo: 'group', scaleType: ScaleTypes.LABELS },
                                    bottom: { mapsTo: 'value', scaleType: ScaleTypes.LINEAR, title: 'INR K' },
                                },
                                height: '240px',
                                color: { scale: { 'Equity Brokerage': accent, 'F&O Brokerage': '#0f62fe', 'Commodity (MCX) Brokerage': '#8a3ffc', 'STT + GST + Stamp': '#f1c21b', 'Exchange Fees': '#fa4d56' } },
                                toolbar: { enabled: false },
                                legend: { enabled: false },
                            } as any}
                        />
                    </DashboardCard>
                </div>

                {/* Trader margin table — the moat metric */}
                <div style={{ marginTop: '1rem' }} />
                <DashboardCard
                    id="trader-margin"
                    title="True P&amp;L by Trader — Day-1 join (Zerodha + Broker RPA)"
                    subtitle="Gross P&L minus brokerage, slippage, STT/GST, stop-loss damage. Net % shows who is actually performing."
                >
                    <DataTable rows={traderRows} headers={traderHeaders} size="sm">
                        {({ rows, headers, getTableProps, getHeaderProps }) => (
                            <TableContainer>
                                <Table {...getTableProps()} size="sm">
                                    <TableHead>
                                        <TableRow>
                                            {headers.map((header, idx) => {
                                                const { key: _k, ...hp } = getHeaderProps({ header });
                                                return <TableHeader key={`ch-${idx}`} {...hp} style={{ fontSize: '0.6875rem' }}>{header.header}</TableHeader>;
                                            })}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row, ri) => (
                                            <TableRow key={row.id}>
                                                {row.cells.map(cell => (
                                                    <TableCell key={cell.id} style={{ fontSize: '0.6875rem' }}>
                                                        {cell.info.header === 'marginPct' ? (
                                                            <Tag
                                                                type={CUSTOMER_MARGIN[ri].marginPct >= 75 ? 'green' : CUSTOMER_MARGIN[ri].marginPct >= 50 ? 'blue' : 'red'}
                                                                size="sm"
                                                            >
                                                                {CUSTOMER_MARGIN[ri].marginPct.toFixed(1)}%
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
                </DashboardCard>

                {/* Capital utilization */}
                <div style={{ marginTop: '1rem' }}>
                    <DashboardCard
                        id="capital-utilization"
                        title="Capital Deployed vs Allocation Ceiling"
                        subtitle="Bench capacity utilization. Idle capital is opportunity cost; over-deployed capital is risk."
                    >
                        <LineChart data={DEMAND_SUPPLY_TREND} options={demandSupplyOptions} />
                    </DashboardCard>
                </div>

                {/* Strategy & broker P&L attribution */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    marginTop: '1rem',
                }}>
                    <DashboardCard
                        id="strategy-pl"
                        title="Broker &amp; Strategy P&amp;L"
                        subtitle="Cost per trade and slippage per strategy. Renegotiate / cut / scale."
                    >
                        <DataTable rows={strategyRows} headers={strategyHeaders} size="sm">
                            {({ rows, headers, getTableProps, getHeaderProps }) => (
                                <TableContainer>
                                    <Table {...getTableProps()} size="sm">
                                        <TableHead>
                                            <TableRow>
                                                {headers.map((header, idx) => {
                                                    const { key: _k, ...hp } = getHeaderProps({ header });
                                                    return <TableHeader key={`lh-${idx}`} {...hp} style={{ fontSize: '0.6875rem' }}>{header.header}</TableHeader>;
                                                })}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row, ri) => (
                                                <TableRow key={row.id}>
                                                    {row.cells.map(cell => (
                                                        <TableCell key={cell.id} style={{ fontSize: '0.6875rem' }}>
                                                            {cell.info.header === 'marginImpact' ? (
                                                                <Tag
                                                                    type={
                                                                        LANE_PL[ri].marginImpact === 'Scale' ? 'green'
                                                                        : LANE_PL[ri].marginImpact === 'Hold' ? 'blue'
                                                                        : LANE_PL[ri].marginImpact === 'Renegotiate' ? 'magenta'
                                                                        : 'red'
                                                                    }
                                                                    size="sm"
                                                                >
                                                                    {LANE_PL[ri].marginImpact}
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
                    </DashboardCard>

                    <DashboardCard
                        id="margin-distribution"
                        title="Net P&amp;L Margin by Trader"
                        subtitle="Anything under 50% net is a renegotiate-or-coach candidate. Negatives are reallocation candidates."
                    >
                        <GroupedBarChart
                            data={marginByTraderData}
                            options={marginByTraderOptions as any}
                        />
                    </DashboardCard>
                </div>

                {/* Risk & P&L Command Centre details */}
                <div style={{
                    marginTop: '2rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--cds-border-subtle-00)',
                }}>
                    <div style={{
                        fontSize: '0.625rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: 'var(--cds-text-secondary)',
                        marginBottom: '0.25rem',
                        fontWeight: 700,
                    }}>
                        Risk &amp; P&amp;L Command Centre — operational detail
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--cds-text-helper)' }}>
                        Live bench-wide risk view. Surfaces upward to the executive scorecard only on exceptions.
                    </div>
                </div>

                {/* Regime + strategy tables (Day-N) */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    marginTop: '1rem',
                }}>
                    <DashboardCard
                        id="regimes"
                        title="Market Regime Exposure"
                        subtitle="Bench-wide regime alignment. Nifty regime tag joined to every active position."
                    >
                        <DataTable rows={regimeRows} headers={regimeHeaders} size="sm">
                            {({ rows, headers, getTableProps, getHeaderProps }) => (
                                <TableContainer>
                                    <Table {...getTableProps()} size="sm">
                                        <TableHead>
                                            <TableRow>
                                                {headers.map((header, idx) => {
                                                    const { key: _k, ...hp } = getHeaderProps({ header });
                                                    return <TableHeader key={`chmh-${idx}`} {...hp} style={{ fontSize: '0.6875rem' }}>{header.header}</TableHeader>;
                                                })}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map(row => (
                                                <TableRow key={row.id}>
                                                    {row.cells.map(cell => (
                                                        <TableCell key={cell.id} style={{ fontSize: '0.6875rem' }}>
                                                            {cell.info.header === 'status' ? (
                                                                <Tag type={cell.value === 'Nominal' ? 'green' : 'blue'} size="sm">{cell.value}</Tag>
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

                    <DashboardCard
                        id="strategy-production"
                        title="Strategy Production"
                        subtitle="Trade count, brokerage drag, and win rate per active strategy."
                    >
                        <DataTable rows={strategyTableRows} headers={strategyTableHeaders} size="sm">
                            {({ rows, headers, getTableProps, getHeaderProps }) => (
                                <TableContainer>
                                    <Table {...getTableProps()} size="sm">
                                        <TableHead>
                                            <TableRow>
                                                {headers.map((header, idx) => {
                                                    const { key: _k, ...hp } = getHeaderProps({ header });
                                                    return <TableHeader key={`cvh-${idx}`} {...hp} style={{ fontSize: '0.6875rem' }}>{header.header}</TableHeader>;
                                                })}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row, ri) => (
                                                <TableRow key={row.id}>
                                                    {row.cells.map(cell => (
                                                        <TableCell key={cell.id} style={{ fontSize: '0.6875rem' }}>
                                                            {cell.info.header === 'propSuccess' ? (
                                                                <Tag
                                                                    type={SAMPLE_CULTIVARS[ri].propSuccess >= 70 ? 'green' : SAMPLE_CULTIVARS[ri].propSuccess >= 55 ? 'blue' : 'red'}
                                                                    size="sm"
                                                                >
                                                                    {SAMPLE_CULTIVARS[ri].propSuccess.toFixed(1)}%
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
                    </DashboardCard>
                </div>
            </div>

            {/* Status bar */}
            <div style={{
                padding: '0.25rem 1rem',
                background: 'var(--cds-layer-accent-01)',
                borderTop: '1px solid var(--cds-border-subtle-01)',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.6875rem',
                color: 'var(--cds-text-secondary)',
            }}>
                <span>● Ready · Zerodha API + Broker RPA live · Broker P&amp;L connected · Bloomberg / Reuters / MSCI planned</span>
                <span>Trading firm workspace · 5 traders · 12 active strategies · 28 instruments</span>
            </div>
        </div>
    );
};

export default PortfolioRiskDashboard;
