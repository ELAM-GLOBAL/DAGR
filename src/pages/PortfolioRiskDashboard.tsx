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
    CULTIVAR_MARGIN_CONTRIB,
    SAMPLE_CHAMBERS,
    SAMPLE_CULTIVARS,
    KPI_SNAPSHOT,
} from '../data/phoenixEbra';

const accent = '#3d5a4c';

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

const PortfolioRiskDashboard: React.FC = () => {
    const [dateRange] = useState('Last 30 days');
    const { chartTheme } = useDagrTheme();

    const customerHeaders = [
        { key: 'customer', header: 'Customer' },
        { key: 'revenue', header: 'Revenue' },
        { key: 'fulfillment', header: 'Fulfillment' },
        { key: 'service', header: 'Service' },
        { key: 'returns', header: 'Returns' },
        { key: 'trueMargin', header: 'True Margin' },
        { key: 'marginPct', header: 'Margin %' },
    ];

    const customerRows = CUSTOMER_MARGIN.map((c, i) => ({
        id: `cm-${i}`,
        customer: c.customer,
        revenue: `$${c.revenue.toLocaleString()}`,
        fulfillment: `$${c.fulfillment.toLocaleString()}`,
        service: `$${c.service.toLocaleString()}`,
        returns: `$${c.returns.toLocaleString()}`,
        trueMargin: `$${c.trueMargin.toLocaleString()}`,
        marginPct: c.marginPct,
    }));

    const laneHeaders = [
        { key: 'lane', header: 'Lane' },
        { key: 'carrier', header: 'Carrier' },
        { key: 'shipments', header: 'Shipments' },
        { key: 'costPerUnit', header: '$/unit' },
        { key: 'damageRate', header: 'Damage' },
        { key: 'marginImpact', header: 'Action' },
    ];
    const laneRows = LANE_PL.map((l, i) => ({
        id: `lp-${i}`,
        lane: l.lane,
        carrier: l.carrier,
        shipments: l.shipments,
        costPerUnit: `$${l.costPerUnit.toFixed(2)}`,
        damageRate: `${l.damageRate.toFixed(1)}%`,
        marginImpact: l.marginImpact,
    }));

    const chamberRows = SAMPLE_CHAMBERS.map(c => ({
        id: c.id,
        chamber: c.id,
        site: c.site,
        cultivar: c.cultivar,
        temp: `${c.temp}°C`,
        humidity: `${c.humidity}%`,
        co2: `${c.co2} ppm`,
        status: c.status,
    }));

    const chamberHeaders = [
        { key: 'chamber', header: 'Chamber' },
        { key: 'site', header: 'Site' },
        { key: 'cultivar', header: 'Cultivar' },
        { key: 'temp', header: 'Temp' },
        { key: 'humidity', header: 'Humidity' },
        { key: 'co2', header: 'CO₂' },
        { key: 'status', header: 'Status' },
    ];

    const cultivarHeaders = [
        { key: 'id', header: 'SKU' },
        { key: 'name', header: 'Cultivar' },
        { key: 'monthlyVolume', header: 'Volume/mo' },
        { key: 'cogsPerPlantlet', header: 'COGS' },
        { key: 'propSuccess', header: 'Success %' },
    ];
    const cultivarRows = SAMPLE_CULTIVARS.map(c => ({
        id: c.id,
        name: c.name,
        monthlyVolume: c.monthlyVolume.toLocaleString(),
        cogsPerPlantlet: `$${c.cogsPerPlantlet.toFixed(2)}`,
        propSuccess: c.propSuccess,
        triploid: c.triploid,
    }));

    const demandSupplyOptions = {
        title: '',
        theme: chartTheme,
        axes: {
            bottom: { mapsTo: 'month', scaleType: ScaleTypes.LABELS },
            left: { mapsTo: 'value', scaleType: ScaleTypes.LINEAR, title: 'Units' },
        },
        height: '220px',
        color: { scale: { 'Orders (units)': '#0f62fe', 'Propagation (units)': accent } },
        toolbar: { enabled: false },
        points: { enabled: true, radius: 4 },
    };

    const cultivarOptions = {
        title: '',
        theme: chartTheme,
        axes: {
            left: { mapsTo: 'cultivar', scaleType: ScaleTypes.LABELS },
            bottom: { mapsTo: 'value', scaleType: ScaleTypes.LINEAR, title: '$K' },
        },
        height: '220px',
        color: { scale: { 'Margin contrib ($K)': accent } },
        toolbar: { enabled: false },
        legend: { enabled: false },
    };

    const marginByCustomerData = CUSTOMER_MARGIN.map(c => ({
        group: 'Margin %',
        customer: c.customer,
        value: c.marginPct,
    }));
    const marginByCustomerOptions = {
        title: '',
        theme: chartTheme,
        axes: {
            left: { mapsTo: 'customer', scaleType: ScaleTypes.LABELS },
            bottom: { mapsTo: 'value', scaleType: ScaleTypes.LINEAR, title: '%', domain: [0, 100] },
        },
        height: '240px',
        color: { scale: { 'Margin %': '#0f62fe' } },
        toolbar: { enabled: false },
        legend: { enabled: false },
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
                        Layer 5 · Insights dashboard
                    </div>
                    <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 400, color: 'var(--cds-text-primary)' }}>
                        Phoenix Ebra · Day-1 Margin & Supply Chain
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

                {/* KPI strip */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '0.75rem',
                    marginBottom: '1rem',
                }}>
                    <KpiTile label="Revenue (MTD)" value={`$${(KPI_SNAPSHOT.monthlyRevenue / 1000).toFixed(0)}K`} sub="+18% MoM" intent="good" />
                    <KpiTile label="Blended Margin" value={`${KPI_SNAPSHOT.grossMargin}%`} sub="Target 88%" intent="good" />
                    <KpiTile label="ASP" value={`$${KPI_SNAPSHOT.blendedAsp}`} sub="vs. $15.00 plan" intent="good" />
                    <KpiTile label="COGS / unit" value={`$${KPI_SNAPSHOT.blendedCogs}`} sub="< $3 target" intent="good" />
                    <KpiTile label="Plantlets / mo" value={`${(KPI_SNAPSHOT.currentMonthlyPlantlets / 1000).toFixed(0)}K`} sub={`Breakeven ${(KPI_SNAPSHOT.breakevenTarget / 1000).toFixed(0)}K`} />
                    <KpiTile label="Contamination" value={`${KPI_SNAPSHOT.contaminationRate}%`} sub="industry: 2.4%" intent="good" />
                </div>

                {/* Customer margin table — the day-1 hero */}
                <DashboardCard
                    id="customer-margin"
                    title="True Margin by Customer — Day-1 join (OrderFlow + ShipTrack)"
                    subtitle="Revenue minus fulfillment, service, and returns. Margin % tag shows where to double down vs renegotiate."
                >
                    <DataTable rows={customerRows} headers={customerHeaders} size="sm">
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
                                                                type={CUSTOMER_MARGIN[ri].marginPct >= 75 ? 'green' : CUSTOMER_MARGIN[ri].marginPct >= 60 ? 'blue' : 'red'}
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

                {/* Charts row */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    marginTop: '1rem',
                }}>
                    <DashboardCard
                        id="demand-supply"
                        title="Demand ↔ Supply Window"
                        subtitle="Order velocity vs. propagation throughput. Misaligned windows = lost margin."
                    >
                        <LineChart data={DEMAND_SUPPLY_TREND} options={demandSupplyOptions} />
                    </DashboardCard>

                    <DashboardCard
                        id="cultivar-contrib"
                        title="Cultivar Margin Contribution"
                        subtitle="Where the gross-margin dollars actually come from."
                    >
                        <SimpleBarChart data={CULTIVAR_MARGIN_CONTRIB} options={cultivarOptions} />
                    </DashboardCard>
                </div>

                {/* Lane P&L and margin distribution */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    marginTop: '1rem',
                }}>
                    <DashboardCard
                        id="lane-pl"
                        title="Carrier & Lane P&L"
                        subtitle="Cost per unit and damage rate per origin-destination."
                    >
                        <DataTable rows={laneRows} headers={laneHeaders} size="sm">
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
                                                                        LANE_PL[ri].marginImpact === 'Strong' ? 'green'
                                                                        : LANE_PL[ri].marginImpact === 'Watch' ? 'blue'
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
                        title="Margin % by Customer"
                        subtitle="Anything under 60% is a renegotiate-or-drop candidate."
                    >
                        <GroupedBarChart
                            data={marginByCustomerData}
                            options={marginByCustomerOptions as any}
                        />
                    </DashboardCard>
                </div>

                {/* Chamber + cultivar tables (Day-N) */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    marginTop: '1rem',
                }}>
                    <DashboardCard
                        id="chambers"
                        title="Chamber Telemetry (live)"
                        subtitle="Day-N · Streamed from ChamberOS at 99% accuracy SLA"
                    >
                        <DataTable rows={chamberRows} headers={chamberHeaders} size="sm">
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
                        id="cultivars"
                        title="Cultivar Production"
                        subtitle="Day-N · Propagation success and unit economics per cultivar"
                    >
                        <DataTable rows={cultivarRows} headers={cultivarHeaders} size="sm">
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
                                                                    type={SAMPLE_CULTIVARS[ri].propSuccess >= 92 ? 'green' : SAMPLE_CULTIVARS[ri].propSuccess >= 86 ? 'blue' : 'red'}
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
                <span>● Ready · OrderFlow + ShipTrack live · LIMS / ChamberOS connected</span>
                <span>Phoenix Ebra workspace · 8 customers · 24 chambers · 7 cultivars</span>
            </div>
        </div>
    );
};

export default PortfolioRiskDashboard;
