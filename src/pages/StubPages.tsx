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
    VALUE_LEVERS,
    VALUE_TOTAL_INR_LAKHS,
    PILOT_FEE_INR_LAKHS,
    VALUE_MULTIPLIER,
} from '../data/raghavTrading';
import LocationMap from '../components/LocationMap';

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

const fmtInrL = (lakhs: number) => {
    if (Math.abs(lakhs) >= 100) return `INR ${(lakhs / 100).toFixed(2)} Cr`;
    return `INR ${lakhs.toFixed(1)} L`;
};

/* ───────────────────────── Phase 3 — Execution OS roadmap strip ─────────────────────────
 * Schematic only. Per Brief §12, the Year-1 SOW is Phase 1; this strip exists to set the
 * direction-of-travel without implying a Year-1 deliverable. Lower-opacity treatment per §15.
 * Four cards: Order Console, Algo Container, Pre-Trade Risk Guard, Allocator Workbench.
 */

const phase3CardStyle: React.CSSProperties = {
    background: 'var(--cds-layer-02)',
    border: '1px dashed var(--cds-border-subtle-01)',
    padding: '0.875rem 1rem',
    opacity: 0.92,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
};

const phase3RowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.6875rem',
    padding: '0.25rem 0',
    borderBottom: '1px dotted var(--cds-border-subtle-00)',
    color: 'var(--cds-text-secondary)',
};

const phase3CardTitle = (title: string, sub: string) => (
    <div>
        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--cds-text-primary)' }}>{title}</div>
        <div style={{ fontSize: '0.6875rem', color: 'var(--cds-text-helper)' }}>{sub}</div>
    </div>
);

const OrderConsoleSchematic = () => (
    <div style={phase3CardStyle}>
        {phase3CardTitle('Order Console', 'Order ticket · broker-routed · audit-logged')}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.375rem', fontSize: '0.6875rem' }}>
            <SchematicField label="Side" value="BUY" />
            <SchematicField label="Instrument" value="NSE:RELIANCE" />
            <SchematicField label="Qty" value="800" />
            <SchematicField label="Limit" value="INR 2,840" />
            <SchematicField label="Trader" value="T01 · Mumbai" />
            <SchematicField label="Broker" value="Zerodha ▾" />
        </div>
        <button disabled style={{
            background: 'var(--cds-button-primary)',
            color: 'var(--cds-text-on-color)',
            border: 'none',
            padding: '0.375rem 0.625rem',
            fontSize: '0.6875rem',
            opacity: 0.55,
            cursor: 'not-allowed',
            fontFamily: 'inherit',
            textAlign: 'left',
        }}>
            Submit order → Zerodha · est. INR 264 brokerage
        </button>
    </div>
);

const AlgoContainerSchematic = () => {
    const algos = [
        { name: 'Momentum LC (Trader 03)', status: 'Running' },
        { name: 'Options-Income (Trader 02)', status: 'Running' },
        { name: 'Pairs · Sector-Neutral (T04)', status: 'Paused' },
        { name: 'MCX Macro (Trader 05)', status: 'Killed' },
    ];
    return (
        <div style={phase3CardStyle}>
            {phase3CardTitle('Algo Container', 'Deploy · monitor · kill · full audit trail')}
            <div>
                {algos.map(a => (
                    <div key={a.name} style={phase3RowStyle}>
                        <span>{a.name}</span>
                        <Tag
                            type={a.status === 'Running' ? 'green' : a.status === 'Paused' ? 'gray' : 'red'}
                            size="sm"
                        >
                            ● {a.status}
                        </Tag>
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
                <SchematicChip label="▶ Start" />
                <SchematicChip label="❚❚ Pause" />
                <SchematicChip label="■ Kill" />
            </div>
        </div>
    );
};

const PreTradeRiskGuardSchematic = () => {
    const rules = [
        { rule: 'Position size ≤ 5% of allocated capital', ok: true },
        { rule: 'Trader drawdown < 20% MTD', ok: true },
        { rule: 'Single-instrument concentration ≤ 30%', ok: false },
        { rule: 'Leverage ≤ 3× notional', ok: true },
        { rule: 'Pre-market intent logged with rationale', ok: true },
    ];
    return (
        <div style={phase3CardStyle}>
            {phase3CardTitle('Pre-Trade Risk Guard', 'Enforced before any order leaves')}
            <div>
                {rules.map(r => (
                    <div key={r.rule} style={phase3RowStyle}>
                        <span style={{ flex: 1 }}>{r.rule}</span>
                        <span style={{
                            fontWeight: 600,
                            color: r.ok ? 'var(--cds-support-success, #24a148)' : 'var(--cds-support-error, #fa4d56)',
                        }}>
                            {r.ok ? '✓ Pass' : '✗ Block'}
                        </span>
                    </div>
                ))}
            </div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--cds-text-helper)' }}>
                1 of 5 checks blocks current ticket. Override requires Raghav signature.
            </div>
        </div>
    );
};

const AllocatorWorkbenchSchematic = () => {
    const lps = [
        { name: 'Family Office · BLR', committed: 5.0, drawn: 2.5, nav: 2.78 },
        { name: 'HNI Pool · MUM', committed: 8.0, drawn: 4.0, nav: 4.42 },
        { name: 'Founder GP', committed: 2.0, drawn: 2.0, nav: 2.31 },
    ];
    return (
        <div style={phase3CardStyle}>
            {phase3CardTitle('Allocator Workbench', 'LP capital · NAV · fund accounting (AIF Cat-3)')}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.6875rem',
                padding: '0.25rem 0',
                background: 'var(--cds-layer-01)',
                paddingLeft: '0.375rem',
                paddingRight: '0.375rem',
            }}>
                <span style={{ color: 'var(--cds-text-secondary)' }}>Fund NAV</span>
                <span style={{ fontWeight: 600 }}>INR 9.51 Cr</span>
                <span style={{ color: 'var(--cds-support-success, #24a148)' }}>+8.2% MTD</span>
            </div>
            <div>
                {lps.map(lp => (
                    <div key={lp.name} style={phase3RowStyle}>
                        <span style={{ flex: 1 }}>{lp.name}</span>
                        <span style={{ fontSize: '0.625rem', color: 'var(--cds-text-helper)', marginRight: '0.5rem' }}>
                            {lp.drawn.toFixed(1)} / {lp.committed.toFixed(1)} Cr
                        </span>
                        <span style={{ fontWeight: 600 }}>{lp.nav.toFixed(2)} Cr</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SchematicField = ({ label, value }: { label: string; value: string }) => (
    <div style={{
        background: 'var(--cds-layer-01)',
        border: '1px solid var(--cds-border-subtle-00)',
        padding: '0.25rem 0.375rem',
    }}>
        <div style={{ fontSize: '0.5625rem', color: 'var(--cds-text-helper)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {label}
        </div>
        <div style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--cds-text-primary)' }}>
            {value}
        </div>
    </div>
);

const SchematicChip = ({ label }: { label: string }) => (
    <span style={{
        fontSize: '0.625rem',
        padding: '0.125rem 0.375rem',
        border: '1px solid var(--cds-border-subtle-01)',
        background: 'var(--cds-layer-01)',
        color: 'var(--cds-text-secondary)',
        fontFamily: "'IBM Plex Mono', monospace",
    }}>
        {label}
    </span>
);

const Phase3Strip = () => (
    <div style={{
        marginBottom: '2rem',
        background: 'var(--cds-layer-01)',
        border: '1px solid var(--cds-border-subtle-00)',
        padding: '1.25rem',
        position: 'relative',
    }}>
        {/* "Roadmap" diagonal ribbon */}
        <div style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            background: 'var(--cds-layer-02)',
            border: '1px dashed var(--cds-border-subtle-01)',
            padding: '0.125rem 0.5rem',
            fontSize: '0.625rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--cds-text-secondary)',
            fontFamily: "'IBM Plex Mono', monospace",
        }}>
            Phase 3 · on roadmap
        </div>

        <div style={{ marginBottom: '1rem' }}>
            <div style={{
                fontSize: '0.625rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--cds-text-secondary)',
                fontWeight: 600,
                marginBottom: '0.25rem',
            }}>
                Execution OS · Palantir Apollo analog
            </div>
            <h3 style={{ margin: 0, fontWeight: 400, color: 'var(--cds-text-primary)' }}>
                When D.A.G.R. becomes the platform traders log into
            </h3>
            <p style={{
                margin: '0.375rem 0 0 0',
                fontSize: '0.8125rem',
                color: 'var(--cds-text-secondary)',
                maxWidth: '800px',
                lineHeight: 1.5,
            }}>
                Order entry, algo lifecycle, enforced pre-trade risk, and LP allocator workflow — all inside D.A.G.R., not the broker
                terminal. Schematic here so you can verify the system you&apos;re buying into is the system you want to grow into.
                <strong> Not in the Year-1 SOW.</strong>
            </p>
        </div>

        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '0.75rem',
        }}>
            <OrderConsoleSchematic />
            <AlgoContainerSchematic />
            <PreTradeRiskGuardSchematic />
            <AllocatorWorkbenchSchematic />
        </div>
    </div>
);

export const RaghavTradingHome = () => {
    const navigate = useNavigate();

    const day1Outputs = OUTPUTS.filter(o => o.phase === 'day-1');
    const dayNOutputs = OUTPUTS.filter(o => o.phase === 'day-n');

    const marginHeaders = [
        { key: 'customer', header: 'Trader' },
        { key: 'revenue', header: 'Gross P&L' },
        { key: 'trueMargin', header: 'Net of Drag' },
        { key: 'marginPct', header: 'Net %' },
    ];

    const marginRows = CUSTOMER_MARGIN.map((c, i) => ({
        id: `m-${i}`,
        customer: c.customer,
        revenue: fmtInrL(c.revenue / 100),       // values are INR Thousands -> convert to Lakhs
        trueMargin: fmtInrL(c.trueMargin / 100),
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
                    <span>Mumbai · BKC</span>
                    <span>·</span>
                    <span>Discovery sprint output</span>
                </div>
                <h1 style={{
                    fontWeight: 300,
                    fontSize: '2.625rem',
                    margin: 0,
                    color: 'var(--cds-text-primary)',
                }}>
                    Raghav Jain Trading · D.A.G.R. Enterprise OS
                </h1>
                <p style={{
                    marginTop: '0.75rem',
                    fontSize: '1rem',
                    color: 'var(--cds-text-secondary)',
                    maxWidth: '900px',
                    lineHeight: 1.5,
                }}>
                    D.A.G.R. is the operating system for the trading firm. Day one, it joins Zerodha API (orders &amp; fills) with broker
                    spreadsheet ingest (the medium brokers without APIs) to produce <strong>trader-keyed P&amp;L,
                    win-rate, brokerage drag</strong> and the monthly report card Raghav hands a trader at commission time. From there
                    it expands into market regime, drawdown prediction, and a SEBI-ready audit trail for the fund-formation step.
                </p>
            </div>

            {/* KPI strip — executive view */}
            <div style={{ marginBottom: '0.5rem' }}>
                <div style={{
                    fontSize: '0.625rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--cds-text-secondary)',
                    fontWeight: 600,
                }}>
                    Executive scorecard · Raghav Jain
                </div>
            </div>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '0.75rem',
                marginBottom: '1.25rem',
            }}>
                <Kpi label="Book P&L (MTD)" value={fmtInrL(KPI_SNAPSHOT.monthlyRevenue / 100)} sub={`+${KPI_SNAPSHOT.revenueGrowthMoM}% MoM`} intent="good" />
                <Kpi label="Open Exposure" value={fmtInrL(KPI_SNAPSHOT.orderBacklogValue / 100)} sub={`${KPI_SNAPSHOT.orderBacklogUnits} positions · ${KPI_SNAPSHOT.avgDaysToPromise}d avg hold`} intent="good" />
                <Kpi label="Bench Win Rate" value={`${KPI_SNAPSHOT.grossMargin}%`} sub={`5 traders · 12 strategies`} intent="good" />
                <Kpi label="Review-Cycle TAT" value={`${KPI_SNAPSHOT.turnaroundDays}d`} sub={`Target ${KPI_SNAPSHOT.turnaroundTarget}d · trending down`} intent="good" />
                <Kpi label="Brokerage Drag (MTD)" value={fmtInrL(KPI_SNAPSHOT.inventorySpendMtd / 100)} sub="Equity + F&O + MCX + STT" />
                <Kpi label="Projected Drag (30d)" value={fmtInrL(KPI_SNAPSHOT.inventorySpendNext30d / 100)} sub="Driven by current trade velocity" />
                <Kpi label="Bench-to-Fund Progress" value={`${Math.round(KPI_SNAPSHOT.currentMonthlyPlantlets / KPI_SNAPSHOT.breakevenTarget * 100)}%`} sub={`${KPI_SNAPSHOT.currentMonthlyPlantlets} of ${KPI_SNAPSHOT.breakevenTarget} traders`} />
            </div>

            {/* Operator map — trader bench footprint */}
            <div style={{ marginBottom: '2rem' }}>
                <LocationMap />
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
                    <h3 style={{ margin: '0 0 0.5rem 0', fontWeight: 400 }}>True P&amp;L by Trader</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--cds-text-secondary)', marginBottom: '1rem' }}>
                        Zerodha alone can&apos;t tell you bench-level discipline. Spreadsheet ingest alone can&apos;t reconcile
                        across brokers. D.A.G.R. lives in the join — net of brokerage, slippage, STT, GST, every trader keyed.
                        Two traders making the same monthly P&amp;L are not the same trader. This view shows you which is which.
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
                                                                    type={pct >= 75 ? 'green' : pct >= 50 ? 'blue' : 'red'}
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
                            Open trader scorecards
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
                        Connected sources
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
                        <h3 style={{ margin: 0, fontWeight: 400 }}>What D.A.G.R. delivers for the trading firm</h3>
                        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: 'var(--cds-text-secondary)' }}>
                            Eight outputs configured on the five-agent platform. Four ship in the first 30 days using only
                            Zerodha API + broker RPA ingest.
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

            {/* Phase 3 — Execution OS roadmap strip (Brief §14 Section C). Schematic only. */}
            <Phase3Strip />

            {/* Value-math footer — the "this is what pays for the deployment" block */}
            <div style={{
                marginBottom: '2rem',
                background: 'var(--cds-layer-02)',
                border: '1px solid var(--cds-border-subtle-00)',
                padding: '1.5rem',
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                    flexWrap: 'wrap',
                    gap: '1rem',
                }}>
                    <div>
                        <div style={{
                            fontSize: '0.625rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            color: 'var(--cds-text-secondary)',
                            fontWeight: 600,
                        }}>
                            Value math · Year 1 on INR 30 Cr AUM
                        </div>
                        <h3 style={{ margin: '0.25rem 0 0 0', fontWeight: 400 }}>
                            Four levers. Editable inputs in Discovery.
                        </h3>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--cds-text-secondary)' }}>
                            Pilot fee {fmtInrL(PILOT_FEE_INR_LAKHS)} · Year-1 unlock {fmtInrL(VALUE_TOTAL_INR_LAKHS)}
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--cds-support-success, #24a148)', lineHeight: 1 }}>
                            ~{VALUE_MULTIPLIER}× return
                        </div>
                    </div>
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '0.75rem',
                }}>
                    {VALUE_LEVERS.map(lever => (
                        <div key={lever.id} style={{
                            background: 'var(--cds-layer-01)',
                            border: '1px solid var(--cds-border-subtle-00)',
                            borderLeft: `4px solid ${accent}`,
                            padding: '0.75rem 0.875rem',
                        }}>
                            <div style={{
                                fontSize: '0.6875rem',
                                color: 'var(--cds-text-secondary)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.04em',
                                marginBottom: '0.25rem',
                            }}>
                                {lever.label}
                            </div>
                            <div style={{ fontSize: '1.375rem', fontWeight: 600, color: 'var(--cds-text-primary)' }}>
                                {fmtInrL(lever.yearOneInrLakhs)}
                            </div>
                            <div style={{
                                fontSize: '0.6875rem',
                                color: 'var(--cds-text-helper)',
                                marginTop: '0.25rem',
                                lineHeight: 1.4,
                            }}>
                                {lever.formula}
                            </div>
                        </div>
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
                    <h5 style={{ margin: '0 0 0.25rem 0' }}>Data ontology</h5>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--cds-text-secondary)', marginBottom: '1rem' }}>
                        See how Order, Trade, Trader, Broker, Strategy, Regime, and Drawdown link into one model.
                    </p>
                    <Button kind="ghost" renderIcon={ArrowRight} onClick={() => navigate('/workspace/ontology')}>
                        Open ontology
                    </Button>
                </Tile>
                <Tile style={{ padding: '1rem' }}>
                    <FlowConnection size={24} style={{ color: accent, marginBottom: '0.5rem' }} />
                    <h5 style={{ margin: '0 0 0.25rem 0' }}>Agent workflow</h5>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--cds-text-secondary)', marginBottom: '1rem' }}>
                        Five AI agents (Architect → BI Developer) over the ingest-to-scorecard production flow.
                    </p>
                    <Button kind="ghost" renderIcon={ArrowRight} onClick={() => navigate('/workspace/workflow')}>
                        Open workflow
                    </Button>
                </Tile>
                <Tile style={{ padding: '1rem' }}>
                    <Dashboard size={24} style={{ color: accent, marginBottom: '0.5rem' }} />
                    <h5 style={{ margin: '0 0 0.25rem 0' }}>Trader dashboard</h5>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--cds-text-secondary)', marginBottom: '1rem' }}>
                        Trader Efficiency Scorecard, Risk &amp; P&amp;L Command Centre, Fundraising Calculator.
                    </p>
                    <Button kind="ghost" renderIcon={ArrowRight} onClick={() => navigate('/workspace/dashboard')}>
                        Open dashboard
                    </Button>
                </Tile>
                <Tile style={{ padding: '1rem' }}>
                    <DataVis_1 size={24} style={{ color: accent, marginBottom: '0.5rem' }} />
                    <h5 style={{ margin: '0 0 0.25rem 0' }}>Data tables</h5>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--cds-text-secondary)', marginBottom: '1rem' }}>
                        Browse the conformed mart: orders, trades, traders, brokers, strategies, regimes.
                    </p>
                    <Button kind="ghost" renderIcon={ArrowRight} onClick={() => navigate('/workspace/data/orders')}>
                        Open data
                    </Button>
                </Tile>
                <Tile style={{ padding: '1rem' }}>
                    <ChartLineSmooth size={24} style={{ color: accent, marginBottom: '0.5rem' }} />
                    <h5 style={{ margin: '0 0 0.25rem 0' }}>Discovery notes</h5>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--cds-text-secondary)', marginBottom: '1rem' }}>
                        Five-day sprint scope, open questions, and the 2026 SEBI / AIF Category-3 catalyst.
                    </p>
                    <Tag type="outline" size="sm">Draft v0.1</Tag>
                </Tile>
            </div>
        </div>
    );
};

/* Back-compat aliases (the App.tsx on `main` imports these names). */
export const PhoenixEbraHome = RaghavTradingHome;
export const RiskHome = RaghavTradingHome;
export const DataConnections = RaghavTradingHome;
export const DashboardStub = ({ title }: { title: string }) => (
    <div style={{ padding: '2rem', color: 'var(--cds-text-secondary)' }}>{title} — Build in Progress</div>
);
export const PlaceholderStub = ({ title }: { title: string }) => (
    <div style={{ padding: '2rem', color: 'var(--cds-text-secondary)' }}>{title} — Build in Progress</div>
);
