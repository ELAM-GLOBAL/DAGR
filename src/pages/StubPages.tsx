import {
    Button,
    Tile,
    Tag,
    DataTable,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
} from '@carbon/react';
import {
    ArrowRight,
    FlowConnection,
    Dashboard,
    DataBase,
    DataVis_1,
    ChartLineSmooth,
} from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';
import {
    SOURCES,
    KPI_SNAPSHOT,
    CUSTOMER_MARGIN,
    OUTPUTS,
} from '../data/phoenixEbra';

const accent = '#3d5a4c';

const Kpi = ({ label, value, sub, intent }: { label: string; value: string; sub?: string; intent?: 'good' | 'warn' | 'neutral' }) => (
    <Tile style={{
        height: '100%',
        borderLeft: `4px solid ${intent === 'good'
            ? 'var(--cds-support-success, #24a148)'
            : intent === 'warn'
                ? 'var(--cds-support-warning, #f1c21b)'
                : accent}`,
    }}>
        <div style={{
            fontSize: '0.75rem',
            color: 'var(--cds-text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            marginBottom: '0.5rem',
        }}>
            {label}
        </div>
        <div style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--cds-text-primary)' }}>{value}</div>
        {sub && (
            <div style={{ fontSize: '0.75rem', color: 'var(--cds-text-helper)', marginTop: '0.25rem' }}>{sub}</div>
        )}
    </Tile>
);

const SourceChip = ({ name, operator, status }: { name: string; operator: string; status: string }) => {
    const tagType = status === 'live' ? 'green' : status === 'connected' ? 'blue' : 'gray';
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.625rem 0.75rem',
            background: 'var(--cds-layer-01)',
            border: '1px solid var(--cds-border-subtle-00)',
        }}>
            <div>
                <div style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{name}</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--cds-text-helper)' }}>{operator}</div>
            </div>
            <Tag type={tagType} size="sm">{status}</Tag>
        </div>
    );
};

export const PhoenixEbraHome = () => {
    const navigate = useNavigate();

    const day1Outputs = OUTPUTS.filter(o => o.phase === 'day-1');
    const dayNOutputs = OUTPUTS.filter(o => o.phase === 'day-n');

    const marginHeaders = [
        { key: 'customer', header: 'Customer' },
        { key: 'revenue', header: 'Revenue' },
        { key: 'trueMargin', header: 'True Margin' },
        { key: 'marginPct', header: 'Margin %' },
    ];

    const marginRows = CUSTOMER_MARGIN.map((c, i) => ({
        id: `m-${i}`,
        customer: c.customer,
        revenue: `$${c.revenue.toLocaleString()}`,
        trueMargin: `$${c.trueMargin.toLocaleString()}`,
        marginPct: c.marginPct,
    }));

    return (
        <div style={{ padding: '2rem', background: 'var(--cds-background)', minHeight: '100%' }}>
            {/* Hero */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.75rem',
                    color: 'var(--cds-text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '0.5rem',
                }}>
                    <span>Customer workspace</span>
                    <span>·</span>
                    <span>Texas, USA</span>
                    <span>·</span>
                    <span>Discovery sprint output</span>
                </div>
                <h1 style={{
                    fontWeight: 300,
                    fontSize: '2.625rem',
                    margin: 0,
                    color: 'var(--cds-text-primary)',
                }}>
                    Phoenix Ebra · Enterprise OS
                </h1>
                <p style={{
                    marginTop: '0.75rem',
                    fontSize: '1rem',
                    color: 'var(--cds-text-secondary)',
                    maxWidth: '900px',
                    lineHeight: 1.5,
                }}>
                    D.A.G.R. sits on top of Phoenix Ebra&apos;s operational stack. Day one, it joins OrderFlow (orders) and ShipTrack (shipping) to show
                    <strong> true margin per customer, product, and lane</strong> — not just top-line revenue. From there it expands into
                    chamber telemetry, lineage, and compliance as the moat grows.
                </p>
            </div>

            {/* KPI strip */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem',
            }}>
                <Kpi label="Monthly Revenue" value={`$${(KPI_SNAPSHOT.monthlyRevenue / 1000).toFixed(0)}K`} sub="$312K ARR baseline" intent="good" />
                <Kpi label="Blended Margin" value={`${KPI_SNAPSHOT.grossMargin}%`} sub="ASP $16.20 · COGS $2.78" intent="good" />
                <Kpi label="Plantlets / mo" value={`${(KPI_SNAPSHOT.currentMonthlyPlantlets / 1000).toFixed(0)}K`} sub={`Breakeven at ${(KPI_SNAPSHOT.breakevenTarget / 1000).toFixed(0)}K/mo`} />
                <Kpi label="Active Chambers" value={`${KPI_SNAPSHOT.activeChambers}`} sub={`${KPI_SNAPSHOT.cultivarsInProduction} cultivars in production`} />
                <Kpi label="Contamination" value={`${KPI_SNAPSHOT.contaminationRate}%`} sub="vs. industry 2.4%" intent="good" />
            </div>

            {/* Two-column: Day-1 narrative & data sources */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gap: '1.5rem',
                marginBottom: '2rem',
            }}>
                <Tile style={{ padding: '1.25rem' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.75rem',
                    }}>
                        <Tag type="green" size="sm">Day 1</Tag>
                        <span style={{ fontSize: '0.75rem', color: 'var(--cds-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            The two-source win
                        </span>
                    </div>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontWeight: 400 }}>True Margin by Customer</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--cds-text-secondary)', marginBottom: '1rem' }}>
                        OrderFlow alone can&apos;t tell you margin. ShipTrack alone can&apos;t tell you which customer relationship a shipment is supporting.
                        D.A.G.R. lives in the join.
                    </p>
                    <DataTable rows={marginRows} headers={marginHeaders} size="sm">
                        {({ rows, headers, getTableProps, getHeaderProps }) => (
                            <TableContainer>
                                <Table {...getTableProps()} size="sm">
                                    <TableHead>
                                        <TableRow>
                                            {headers.map((header, idx) => {
                                                const { key: _k, ...hp } = getHeaderProps({ header });
                                                return <TableHeader key={`mh-${idx}`} {...hp}>{header.header}</TableHeader>;
                                            })}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => {
                                            const pct = CUSTOMER_MARGIN.find(c => `m-${CUSTOMER_MARGIN.indexOf(c)}` === row.id)?.marginPct ?? 0;
                                            return (
                                                <TableRow key={row.id}>
                                                    {row.cells.map(cell => (
                                                        <TableCell key={cell.id}>
                                                            {cell.info.header === 'marginPct' ? (
                                                                <Tag
                                                                    type={pct >= 75 ? 'green' : pct >= 60 ? 'blue' : 'red'}
                                                                    size="sm"
                                                                >
                                                                    {pct.toFixed(1)}%
                                                                </Tag>
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
                    <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                        <Button kind="primary" renderIcon={ArrowRight} onClick={() => navigate('/workspace/dashboard')}>
                            Open insights dashboard
                        </Button>
                        <Button kind="tertiary" renderIcon={FlowConnection} onClick={() => navigate('/workspace/ontology')}>
                            See the join
                        </Button>
                    </div>
                </Tile>

                <Tile style={{ padding: '1.25rem' }}>
                    <h4 style={{
                        margin: '0 0 0.75rem 0',
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        color: 'var(--cds-text-secondary)',
                    }}>
                        Connected Sources
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {SOURCES.map(s => (
                            <SourceChip key={s.id} name={s.name} operator={s.operator} status={s.status} />
                        ))}
                    </div>
                </Tile>
            </div>

            {/* Outputs / "named systems" */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                }}>
                    <div>
                        <h3 style={{ margin: 0, fontWeight: 400 }}>What D.A.G.R. Delivers for Phoenix Ebra</h3>
                        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: 'var(--cds-text-secondary)' }}>
                            Eight customer-named outputs. Four ship in the first 30 days using only OrderFlow + ShipTrack.
                        </p>
                    </div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '1rem',
                }}>
                    {[...day1Outputs, ...dayNOutputs].map(o => (
                        <Tile key={o.id} style={{
                            padding: '1rem',
                            borderTop: `3px solid ${o.phase === 'day-1' ? accent : 'var(--cds-border-subtle-01)'}`,
                            opacity: o.phase === 'day-1' ? 1 : 0.85,
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '0.5rem',
                            }}>
                                <h5 style={{ margin: 0, fontSize: '0.9375rem' }}>{o.name}</h5>
                                <Tag type={o.phase === 'day-1' ? 'green' : 'gray'} size="sm">
                                    {o.phase === 'day-1' ? 'Day 1' : 'Day N'}
                                </Tag>
                            </div>
                            <p style={{
                                fontSize: '0.8125rem',
                                lineHeight: 1.45,
                                color: 'var(--cds-text-secondary)',
                                margin: 0,
                            }}>
                                {o.summary}
                            </p>
                        </Tile>
                    ))}
                </div>
            </div>

            {/* Quick links */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1rem',
            }}>
                <Tile style={{ padding: '1rem' }}>
                    <DataBase size={24} style={{ color: accent, marginBottom: '0.5rem' }} />
                    <h5 style={{ margin: '0 0 0.25rem 0' }}>Data Ontology</h5>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--cds-text-secondary)', marginBottom: '1rem' }}>
                        See how Order, Shipment, Customer, Cultivar, and Chamber link into one model.
                    </p>
                    <Button kind="ghost" renderIcon={ArrowRight} onClick={() => navigate('/workspace/ontology')}>
                        Open ontology
                    </Button>
                </Tile>
                <Tile style={{ padding: '1rem' }}>
                    <FlowConnection size={24} style={{ color: accent, marginBottom: '0.5rem' }} />
                    <h5 style={{ margin: '0 0 0.25rem 0' }}>Agent Workflow</h5>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--cds-text-secondary)', marginBottom: '1rem' }}>
                        Five AI agents (Architect → BI Developer) over the A→E production flow.
                    </p>
                    <Button kind="ghost" renderIcon={ArrowRight} onClick={() => navigate('/workspace/workflow')}>
                        Open workflow
                    </Button>
                </Tile>
                <Tile style={{ padding: '1rem' }}>
                    <Dashboard size={24} style={{ color: accent, marginBottom: '0.5rem' }} />
                    <h5 style={{ margin: '0 0 0.25rem 0' }}>Insights Dashboard</h5>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--cds-text-secondary)', marginBottom: '1rem' }}>
                        Margin, supply-demand, lane P&amp;L, cultivar contribution, and chamber telemetry.
                    </p>
                    <Button kind="ghost" renderIcon={ArrowRight} onClick={() => navigate('/workspace/dashboard')}>
                        Open dashboard
                    </Button>
                </Tile>
                <Tile style={{ padding: '1rem' }}>
                    <DataVis_1 size={24} style={{ color: accent, marginBottom: '0.5rem' }} />
                    <h5 style={{ margin: '0 0 0.25rem 0' }}>Data Visual</h5>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--cds-text-secondary)', marginBottom: '1rem' }}>
                        Browse the raw conformed mart: orders, shipments, cultivars, chambers.
                    </p>
                    <Button kind="ghost" renderIcon={ArrowRight} onClick={() => navigate('/workspace/data/orders')}>
                        Open data
                    </Button>
                </Tile>
                <Tile style={{ padding: '1rem' }}>
                    <ChartLineSmooth size={24} style={{ color: accent, marginBottom: '0.5rem' }} />
                    <h5 style={{ margin: '0 0 0.25rem 0' }}>Discovery Notes</h5>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--cds-text-secondary)', marginBottom: '1rem' }}>
                        Five-day sprint scope, open questions, and the 2026 USDA APHIS catalyst.
                    </p>
                    <Tag type="outline" size="sm">Draft v0.1</Tag>
                </Tile>
            </div>
        </div>
    );
};

/* Kept for backwards-compat with any old imports — not used by App.tsx anymore. */
export const RiskHome = PhoenixEbraHome;
export const DataConnections = PhoenixEbraHome;
export const DashboardStub = ({ title }: { title: string }) => (
    <div style={{ padding: '2rem', color: 'var(--cds-text-secondary)' }}>{title} — Build in Progress</div>
);
export const PlaceholderStub = ({ title }: { title: string }) => (
    <div style={{ padding: '2rem', color: 'var(--cds-text-secondary)' }}>{title} — Build in Progress</div>
);
