import { useMemo, useState } from 'react';
import { Tag, Button, Tile } from '@carbon/react';
import { Close, FlowConnection, DataBase, View, ViewOff } from '@carbon/icons-react';
import { SOURCES, ENTITIES, OUTPUTS, OntologyEntity } from '../data/phoenixEbra';

const accent = '#3d5a4c';

const COL_WIDTH = 260;
const COL_GAP = 140;
const CARD_HEIGHT = 64;
const CARD_GAP = 14;
const TOP_PAD = 36;

const domainOrder: OntologyEntity['domain'][] = ['commerce', 'manufacturing', 'compliance'];
const domainLabel: Record<OntologyEntity['domain'], string> = {
    commerce: 'COMMERCE',
    manufacturing: 'MANUFACTURING',
    compliance: 'COMPLIANCE',
};
const domainColor: Record<OntologyEntity['domain'], string> = {
    commerce: '#0f62fe',
    manufacturing: '#3d5a4c',
    compliance: '#8a3ffc',
};

interface Layout {
    sources: Record<string, { x: number; y: number; w: number; h: number }>;
    entities: Record<string, { x: number; y: number; w: number; h: number }>;
    outputs: Record<string, { x: number; y: number; w: number; h: number }>;
    canvasHeight: number;
    canvasWidth: number;
}

const buildLayout = (showDayN: boolean): Layout => {
    const sources = SOURCES.filter(s => showDayN || s.phase === 'day-1');
    const entities = ENTITIES.filter(e => showDayN || e.phase === 'day-1');
    const outputs = OUTPUTS.filter(o => showDayN || o.phase === 'day-1');

    const srcPos: Layout['sources'] = {};
    sources.forEach((s, i) => {
        srcPos[s.id] = { x: 0, y: TOP_PAD + i * (CARD_HEIGHT + CARD_GAP), w: COL_WIDTH, h: CARD_HEIGHT };
    });

    // Group entities by domain with section spacing
    const entPos: Layout['entities'] = {};
    let runningY = TOP_PAD;
    const SECTION_GAP = 28;
    const colX = COL_WIDTH + COL_GAP;
    domainOrder.forEach((domain, dIdx) => {
        const inDomain = entities.filter(e => e.domain === domain);
        if (inDomain.length === 0) return;
        if (dIdx > 0) runningY += SECTION_GAP;
        inDomain.forEach(e => {
            entPos[e.id] = { x: colX, y: runningY, w: COL_WIDTH, h: CARD_HEIGHT };
            runningY += CARD_HEIGHT + CARD_GAP;
        });
    });

    const outPos: Layout['outputs'] = {};
    const outX = (COL_WIDTH + COL_GAP) * 2;
    outputs.forEach((o, i) => {
        outPos[o.id] = { x: outX, y: TOP_PAD + i * (CARD_HEIGHT + CARD_GAP), w: COL_WIDTH, h: CARD_HEIGHT };
    });

    const lastEntY = runningY;
    const lastSrcY = sources.length ? TOP_PAD + (sources.length - 1) * (CARD_HEIGHT + CARD_GAP) + CARD_HEIGHT : 0;
    const lastOutY = outputs.length ? TOP_PAD + (outputs.length - 1) * (CARD_HEIGHT + CARD_GAP) + CARD_HEIGHT : 0;
    const canvasHeight = Math.max(lastEntY, lastSrcY, lastOutY) + TOP_PAD;

    return {
        sources: srcPos,
        entities: entPos,
        outputs: outPos,
        canvasHeight,
        canvasWidth: (COL_WIDTH + COL_GAP) * 2 + COL_WIDTH,
    };
};

const CurvePath = ({
    from, to, color, dashed, opacity, strokeWidth,
}: {
    from: { x: number; y: number };
    to: { x: number; y: number };
    color: string;
    dashed?: boolean;
    opacity: number;
    strokeWidth: number;
}) => {
    const dx = Math.abs(to.x - from.x);
    const midX1 = from.x + dx * 0.45;
    const midX2 = to.x - dx * 0.45;
    const d = `M ${from.x} ${from.y} C ${midX1} ${from.y}, ${midX2} ${to.y}, ${to.x} ${to.y}`;
    return (
        <path
            d={d}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={dashed ? '4 4' : undefined}
            style={{ opacity, transition: 'opacity 0.2s, stroke-width 0.2s' }}
        />
    );
};

const OntologyPage = () => {
    const [showDayN, setShowDayN] = useState(true);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const layout = useMemo(() => buildLayout(showDayN), [showDayN]);

    const visibleEntities = ENTITIES.filter(e => showDayN || e.phase === 'day-1');
    const visibleSources = SOURCES.filter(s => showDayN || s.phase === 'day-1');
    const visibleOutputs = OUTPUTS.filter(o => showDayN || o.phase === 'day-1');

    const focusId = hoveredId ?? selectedId;
    const focusedEntity = ENTITIES.find(e => e.id === focusId) ?? null;

    // Connections: source -> entity, entity -> output
    const srcConnections = visibleEntities.flatMap(e =>
        e.sources
            .filter(srcId => layout.sources[srcId])
            .map(srcId => ({ from: srcId, to: e.id, kind: 'source' as const }))
    );
    const outConnections = visibleOutputs.flatMap(o =>
        o.feeds
            .filter(feedId => layout.entities[feedId])
            .map(feedId => ({ from: feedId, to: o.id, kind: 'output' as const }))
    );

    const isConnHighlighted = (from: string, to: string) => {
        if (!focusId) return false;
        return focusId === from || focusId === to;
    };

    const isNodeDimmed = (id: string) => {
        if (!focusId) return false;
        if (id === focusId) return false;
        // highlight neighbors
        const neighbors = new Set<string>();
        const focusEnt = ENTITIES.find(e => e.id === focusId);
        if (focusEnt) {
            focusEnt.sources.forEach(s => neighbors.add(s));
            visibleOutputs.forEach(o => {
                if (o.feeds.includes(focusId)) neighbors.add(o.id);
            });
        } else {
            // focus might be source: neighbors are entities that include it as source
            visibleEntities.forEach(e => { if (e.sources.includes(focusId)) neighbors.add(e.id); });
            // focus might be output: neighbors are entities in feeds
            const fOut = visibleOutputs.find(o => o.id === focusId);
            if (fOut) fOut.feeds.forEach(f => neighbors.add(f));
        }
        return !neighbors.has(id);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 3rem)',
            background: 'var(--cds-background)',
            color: 'var(--cds-text-primary)',
        }}>
            {/* Header */}
            <div style={{
                padding: '1rem 2rem',
                borderBottom: '1px solid var(--cds-border-subtle-00)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.6875rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: 'var(--cds-text-secondary)',
                        marginBottom: '0.25rem',
                    }}>
                        <DataBase size={14} />
                        <span>Layer 2 · Ontology</span>
                    </div>
                    <h2 style={{ margin: 0, fontWeight: 300, fontSize: '1.75rem' }}>
                        Phoenix Ebra Data Model
                    </h2>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: 'var(--cds-text-secondary)' }}>
                        Sources → Object types → Derived outputs. Hover any node to trace its joins.
                    </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Button
                        size="sm"
                        kind={showDayN ? 'secondary' : 'ghost'}
                        renderIcon={showDayN ? View : ViewOff}
                        onClick={() => setShowDayN(v => !v)}
                    >
                        {showDayN ? 'Showing Day-N entities' : 'Day-1 only'}
                    </Button>
                </div>
            </div>

            {/* Body: canvas + detail rail */}
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                {/* Canvas */}
                <div style={{
                    flex: 1,
                    overflow: 'auto',
                    padding: '1rem 2rem 2rem 2rem',
                    background: 'var(--cds-layer-01)',
                }}>
                    <div style={{
                        position: 'relative',
                        width: layout.canvasWidth,
                        height: layout.canvasHeight,
                        margin: '0 auto',
                    }}>
                        {/* Column headers */}
                        <ColumnHeader x={0} label="SOURCE SYSTEMS" sub="Where data lives today" />
                        <ColumnHeader x={COL_WIDTH + COL_GAP} label="OBJECT TYPES" sub="The Phoenix Ebra ontology" />
                        <ColumnHeader x={(COL_WIDTH + COL_GAP) * 2} label="DERIVED OUTPUTS" sub="What the business sees" />

                        {/* SVG overlay */}
                        <svg
                            width={layout.canvasWidth}
                            height={layout.canvasHeight}
                            style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
                        >
                            {srcConnections.map(({ from, to }, i) => {
                                const sp = layout.sources[from];
                                const ep = layout.entities[to];
                                if (!sp || !ep) return null;
                                const highlighted = isConnHighlighted(from, to);
                                const opacity = focusId ? (highlighted ? 1 : 0.06) : 0.32;
                                return (
                                    <CurvePath
                                        key={`s-${i}`}
                                        from={{ x: sp.x + sp.w, y: sp.y + sp.h / 2 }}
                                        to={{ x: ep.x, y: ep.y + ep.h / 2 }}
                                        color={highlighted ? accent : 'var(--cds-border-strong-01, #8d8d8d)'}
                                        opacity={opacity}
                                        strokeWidth={highlighted ? 2.5 : 1.25}
                                    />
                                );
                            })}
                            {outConnections.map(({ from, to }, i) => {
                                const sp = layout.entities[from];
                                const ep = layout.outputs[to];
                                if (!sp || !ep) return null;
                                const highlighted = isConnHighlighted(from, to);
                                const opacity = focusId ? (highlighted ? 1 : 0.06) : 0.32;
                                return (
                                    <CurvePath
                                        key={`o-${i}`}
                                        from={{ x: sp.x + sp.w, y: sp.y + sp.h / 2 }}
                                        to={{ x: ep.x, y: ep.y + ep.h / 2 }}
                                        color={highlighted ? accent : 'var(--cds-border-subtle-01, #c6c6c6)'}
                                        dashed
                                        opacity={opacity}
                                        strokeWidth={highlighted ? 2.5 : 1.25}
                                    />
                                );
                            })}
                        </svg>

                        {/* Source cards */}
                        {visibleSources.map(s => {
                            const pos = layout.sources[s.id];
                            const dimmed = isNodeDimmed(s.id);
                            const focused = focusId === s.id;
                            return (
                                <div
                                    key={s.id}
                                    onMouseEnter={() => setHoveredId(s.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    style={{
                                        position: 'absolute',
                                        left: pos.x,
                                        top: pos.y,
                                        width: pos.w,
                                        height: pos.h,
                                        background: 'var(--cds-layer-02)',
                                        border: `1px solid ${focused ? accent : 'var(--cds-border-subtle-00)'}`,
                                        borderLeft: `4px solid ${
                                            s.status === 'live' ? 'var(--cds-support-success, #24a148)'
                                            : s.status === 'connected' ? 'var(--cds-support-info, #0043ce)'
                                            : 'var(--cds-border-subtle-01)'
                                        }`,
                                        padding: '0.5rem 0.75rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        opacity: dimmed ? 0.25 : 1,
                                        transition: 'opacity 0.2s, border-color 0.2s',
                                        cursor: 'default',
                                        boxShadow: focused ? '0 4px 12px rgba(0,0,0,0.12)' : '0 1px 2px rgba(0,0,0,0.04)',
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{s.name}</span>
                                        <Tag
                                            type={s.status === 'live' ? 'green' : s.status === 'connected' ? 'blue' : 'gray'}
                                            size="sm"
                                        >
                                            {s.status}
                                        </Tag>
                                    </div>
                                    <span style={{ fontSize: '0.6875rem', color: 'var(--cds-text-helper)', marginTop: '2px' }}>
                                        {s.operator}
                                    </span>
                                </div>
                            );
                        })}

                        {/* Entity cards */}
                        {visibleEntities.map(e => {
                            const pos = layout.entities[e.id];
                            if (!pos) return null;
                            const dimmed = isNodeDimmed(e.id);
                            const focused = focusId === e.id;
                            const isSelected = selectedId === e.id;
                            return (
                                <div
                                    key={e.id}
                                    onMouseEnter={() => setHoveredId(e.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    onClick={() => setSelectedId(isSelected ? null : e.id)}
                                    style={{
                                        position: 'absolute',
                                        left: pos.x,
                                        top: pos.y,
                                        width: pos.w,
                                        height: pos.h,
                                        background: 'var(--cds-layer-02)',
                                        border: `1px solid ${isSelected ? accent : focused ? domainColor[e.domain] : 'var(--cds-border-subtle-00)'}`,
                                        borderTop: `3px solid ${domainColor[e.domain]}`,
                                        padding: '0.5rem 0.75rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        opacity: dimmed ? 0.25 : 1,
                                        transition: 'opacity 0.2s, border-color 0.2s, transform 0.15s',
                                        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                                        cursor: 'pointer',
                                        boxShadow: focused ? '0 4px 12px rgba(0,0,0,0.12)' : '0 1px 2px rgba(0,0,0,0.04)',
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{e.name}</span>
                                        <span style={{
                                            fontSize: '0.5625rem',
                                            color: domainColor[e.domain],
                                            fontWeight: 600,
                                            letterSpacing: '0.04em',
                                        }}>
                                            {domainLabel[e.domain]}
                                        </span>
                                    </div>
                                    <span style={{
                                        fontSize: '0.6875rem',
                                        color: 'var(--cds-text-helper)',
                                        marginTop: '2px',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}>
                                        {e.fields.length} fields · {e.sources.length} source{e.sources.length !== 1 ? 's' : ''}
                                    </span>
                                </div>
                            );
                        })}

                        {/* Output cards */}
                        {visibleOutputs.map(o => {
                            const pos = layout.outputs[o.id];
                            const dimmed = isNodeDimmed(o.id);
                            const focused = focusId === o.id;
                            return (
                                <div
                                    key={o.id}
                                    onMouseEnter={() => setHoveredId(o.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    style={{
                                        position: 'absolute',
                                        left: pos.x,
                                        top: pos.y,
                                        width: pos.w,
                                        height: pos.h,
                                        background: o.phase === 'day-1' ? 'var(--cds-layer-02)' : 'var(--cds-layer-01)',
                                        border: `1px solid ${focused ? accent : 'var(--cds-border-subtle-00)'}`,
                                        borderRight: `4px solid ${o.phase === 'day-1' ? accent : 'var(--cds-border-subtle-01)'}`,
                                        padding: '0.5rem 0.75rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        opacity: dimmed ? 0.25 : 1,
                                        transition: 'opacity 0.2s, border-color 0.2s',
                                        cursor: 'default',
                                        boxShadow: focused ? '0 4px 12px rgba(0,0,0,0.12)' : '0 1px 2px rgba(0,0,0,0.04)',
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{o.name}</span>
                                        <Tag type={o.phase === 'day-1' ? 'green' : 'gray'} size="sm">
                                            {o.phase === 'day-1' ? 'Day 1' : 'Day N'}
                                        </Tag>
                                    </div>
                                    <span style={{
                                        fontSize: '0.6875rem',
                                        color: 'var(--cds-text-helper)',
                                        marginTop: '2px',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}>
                                        feeds: {o.feeds.join(' · ')}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Detail rail */}
                <div style={{
                    width: '340px',
                    borderLeft: '1px solid var(--cds-border-subtle-00)',
                    background: 'var(--cds-layer-02)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                }}>
                    {focusedEntity ? (
                        <EntityDetail
                            entity={focusedEntity}
                            onClose={() => { setSelectedId(null); setHoveredId(null); }}
                        />
                    ) : (
                        <EmptyDetail />
                    )}
                </div>
            </div>
        </div>
    );
};

const ColumnHeader = ({ x, label, sub }: { x: number; label: string; sub: string }) => (
    <div style={{
        position: 'absolute',
        left: x,
        top: 0,
        width: COL_WIDTH,
        paddingBottom: '0.5rem',
    }}>
        <div style={{
            fontSize: '0.625rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: 'var(--cds-text-secondary)',
        }}>
            {label}
        </div>
        <div style={{ fontSize: '0.6875rem', color: 'var(--cds-text-helper)' }}>{sub}</div>
    </div>
);

const EmptyDetail = () => (
    <div style={{
        padding: '2rem 1.5rem',
        color: 'var(--cds-text-helper)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '0.75rem',
        marginTop: '4rem',
    }}>
        <FlowConnection size={32} />
        <div style={{ fontWeight: 600, color: 'var(--cds-text-secondary)' }}>Hover or click an entity</div>
        <div style={{ fontSize: '0.8125rem' }}>
            See its fields, source systems, and the outputs it feeds into.
        </div>
    </div>
);

const EntityDetail = ({ entity, onClose }: { entity: OntologyEntity; onClose: () => void }) => {
    const sources = SOURCES.filter(s => entity.sources.includes(s.id));
    const downstream = OUTPUTS.filter(o => o.feeds.includes(entity.id));

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{
                padding: '1rem 1.25rem',
                borderBottom: '1px solid var(--cds-border-subtle-00)',
                background: 'var(--cds-layer-01)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
            }}>
                <div>
                    <div style={{
                        fontSize: '0.625rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: domainColor[entity.domain],
                        fontWeight: 700,
                    }}>
                        {domainLabel[entity.domain]}
                    </div>
                    <h3 style={{ margin: '0.125rem 0 0 0', fontSize: '1.25rem', fontWeight: 400 }}>
                        {entity.name}
                    </h3>
                </div>
                <Button kind="ghost" size="sm" hasIconOnly renderIcon={Close} iconDescription="Close" onClick={onClose} />
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.25rem' }}>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.5, color: 'var(--cds-text-secondary)' }}>
                    {entity.description}
                </p>

                <Section title="Fields">
                    <Tile style={{ padding: '0.5rem 0.75rem' }}>
                        {entity.fields.map(f => (
                            <div
                                key={f.name}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '0.375rem 0',
                                    borderBottom: '1px solid var(--cds-border-subtle-00)',
                                    fontSize: '0.8125rem',
                                }}
                            >
                                <span style={{ fontFamily: 'monospace' }}>{f.name}</span>
                                <span style={{ color: 'var(--cds-text-helper)', fontSize: '0.75rem' }}>{f.type}</span>
                            </div>
                        ))}
                    </Tile>
                </Section>

                <Section title="Source systems">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                        {sources.map(s => (
                            <div key={s.id} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '0.5rem 0.75rem',
                                background: 'var(--cds-layer-01)',
                                border: '1px solid var(--cds-border-subtle-00)',
                            }}>
                                <div>
                                    <div style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{s.name}</div>
                                    <div style={{ fontSize: '0.6875rem', color: 'var(--cds-text-helper)' }}>{s.operator}</div>
                                </div>
                                <Tag
                                    type={s.status === 'live' ? 'green' : s.status === 'connected' ? 'blue' : 'gray'}
                                    size="sm"
                                >
                                    {s.status}
                                </Tag>
                            </div>
                        ))}
                    </div>
                </Section>

                <Section title="Downstream outputs">
                    {downstream.length === 0 ? (
                        <div style={{ fontSize: '0.8125rem', color: 'var(--cds-text-helper)' }}>
                            Joined into other entities, not yet exposed as a named output.
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                            {downstream.map(o => (
                                <div key={o.id} style={{
                                    padding: '0.5rem 0.75rem',
                                    background: 'var(--cds-layer-01)',
                                    border: '1px solid var(--cds-border-subtle-00)',
                                    borderLeft: `3px solid ${o.phase === 'day-1' ? accent : 'var(--cds-border-subtle-01)'}`,
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                        <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{o.name}</span>
                                        <Tag type={o.phase === 'day-1' ? 'green' : 'gray'} size="sm">
                                            {o.phase === 'day-1' ? 'Day 1' : 'Day N'}
                                        </Tag>
                                    </div>
                                    <div style={{
                                        fontSize: '0.6875rem',
                                        color: 'var(--cds-text-helper)',
                                        marginTop: '0.25rem',
                                        lineHeight: 1.4,
                                    }}>
                                        {o.summary}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Section>
            </div>
        </div>
    );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ marginTop: '1.25rem' }}>
        <h5 style={{
            fontSize: '0.625rem',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--cds-text-secondary)',
            margin: '0 0 0.5rem 0',
            fontWeight: 700,
        }}>
            {title}
        </h5>
        {children}
    </div>
);

export default OntologyPage;
