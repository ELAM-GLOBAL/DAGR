import { useState } from 'react';
import { Tag } from '@carbon/react';
import { SITES, Site } from '../data/raghavTrading';
import { useDagrTheme } from './ThemeContext';

/**
 * Operator-console India site map for the trading-firm workspace.
 * Gotham-inspired layout (corner reticles, mono labels, crosshair pins, hover rail).
 * Palette flips between a dark "ops console" and a light "sat-track" variant.
 */

const VIEW_W = 800;
const VIEW_H = 480;

const LNG_MIN = 67;
const LNG_MAX = 98;
const LAT_MIN = 6;
const LAT_MAX = 37;

const project = (lng: number, lat: number) => ({
    x: ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * VIEW_W,
    y: ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * VIEW_H,
});

/* Indian subcontinent outline — hand-traced polygon, clockwise from NW Kashmir. */
const IN_OUTLINE_POINTS = [
    [74, 35.5], [76, 34.5], [78, 35], [79, 33.5], [80, 32], [81, 30.5], [83, 29],
    [85, 28], [88, 27.2], [89, 26.5], [90, 26.5], [92, 27.5], [94, 27.5], [95, 27],
    [97, 28], [97.5, 24.5], [94, 23.5], [93, 24], [91.5, 23], [91, 23.5], [89, 22],
    [88, 22], [87, 21.5], [86, 20.5], [85, 19.5], [83.5, 18], [82, 16.5], [80, 15.5],
    [80, 13], [80, 11], [79, 10], [78, 8.5], [77, 8], [76, 8.5], [75, 11], [74, 13],
    [73, 15], [73, 17.5], [72.7, 19], [72, 20.5], [71, 20.5], [70, 21], [69, 22],
    [68.5, 23], [68, 23.5], [69, 24], [70, 25], [71, 25], [72, 27], [74, 28], [76, 30],
    [74, 32], [73, 34], [74, 35.5],
];

const inOutlinePath = IN_OUTLINE_POINTS
    .map(([lng, lat], i) => {
        const { x, y } = project(lng, lat);
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ') + ' Z';

interface Palette {
    panelBg: string;
    panelBorder: string;
    rail: string;
    railBorder: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    accent: string;       // cyan / teal — for corner reticles & US outline stroke
    accentSoft: string;   // for eyebrow text
    outlineFill: string;
    gridDots: string;
    latLine: string;
    latLabel: string;
    chipBg: string;
    chipBorder: string;
    chipText: string;
    metricBg: string;
    metricBorder: string;
    pulse: string;
    liveGreen: string;
    commissioningBlue: string;
    plannedGray: string;
    labelFill: string;
    labelFillActive: string;
}

const darkPalette: Palette = {
    panelBg: '#0c0e10',
    panelBorder: '#2a2f36',
    rail: '#161a1d',
    railBorder: '#2a2f36',
    textPrimary: '#f4f4f4',
    textSecondary: '#a8b3c1',
    textMuted: '#6f7780',
    accent: '#3ddbd9',
    accentSoft: '#82cfff',
    outlineFill: 'rgba(34, 67, 84, 0.35)',
    gridDots: '#2a2f36',
    latLine: '#1f2429',
    latLabel: '#3d4148',
    chipBg: '#0c1e26',
    chipBorder: '#2a4d5e',
    chipText: '#82cfff',
    metricBg: '#0c0e10',
    metricBorder: '#2a2f36',
    pulse: '#82cfff',
    liveGreen: '#42be65',
    commissioningBlue: '#1192e8',
    plannedGray: '#525252',
    labelFill: '#a8b3c1',
    labelFillActive: '#f4f4f4',
};

const lightPalette: Palette = {
    panelBg: '#f4f4f4',
    panelBorder: '#c6c6c6',
    rail: '#ffffff',
    railBorder: '#c6c6c6',
    textPrimary: '#161616',
    textSecondary: '#525252',
    textMuted: '#8d8d8d',
    accent: '#007d79',
    accentSoft: '#005d5d',
    outlineFill: 'rgba(0, 125, 121, 0.06)',
    gridDots: '#d0d7de',
    latLine: '#e8eaed',
    latLabel: '#a8a8a8',
    chipBg: '#e5f6f4',
    chipBorder: '#9ef0f0',
    chipText: '#005d5d',
    metricBg: '#ffffff',
    metricBorder: '#e0e0e0',
    pulse: '#007d79',
    liveGreen: '#198038',
    commissioningBlue: '#0f62fe',
    plannedGray: '#a8a8a8',
    labelFill: '#525252',
    labelFillActive: '#161616',
};

const statusFill = (p: Palette, s: Site['status']) => {
    if (s === 'live') return p.liveGreen;
    if (s === 'commissioning') return p.commissioningBlue;
    return p.plannedGray;
};

const statusTagType = (s: Site['status']) => {
    if (s === 'live') return 'green';
    if (s === 'commissioning') return 'blue';
    return 'gray';
};

const LocationMap = () => {
    const { isDark } = useDagrTheme();
    const p = isDark ? darkPalette : lightPalette;

    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState<string>(SITES[0].id);

    const activeId = hoveredId ?? selectedId;
    const activeSite = SITES.find(s => s.id === activeId)!;

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 340px',
            gap: '1rem',
            background: p.panelBg,
            border: `1px solid ${p.panelBorder}`,
            color: p.textPrimary,
            fontFamily: "'IBM Plex Sans', sans-serif",
        }}>
            {/* Map panel */}
            <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <div>
                        <div style={{
                            fontSize: '0.625rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em',
                            color: p.accentSoft,
                            fontFamily: "'IBM Plex Mono', 'Menlo', monospace",
                        }}>
                            TRADER BENCH · INDIA · 5 NODES
                        </div>
                        <h3 style={{
                            margin: '0.25rem 0 0 0',
                            color: p.textPrimary,
                            fontSize: '1.125rem',
                            fontWeight: 400,
                            letterSpacing: '0.01em',
                        }}>
                            Trader bench footprint
                        </h3>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <LegendDot color={p.liveGreen} label="Live" textColor={p.textSecondary} />
                        <LegendDot color={p.commissioningBlue} label="Commissioning" textColor={p.textSecondary} />
                    </div>
                </div>

                <div style={{
                    background: isDark ? '#161a1d' : '#fafafa',
                    border: `1px solid ${p.panelBorder}`,
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    <CornerReticle position="tl" color={p.accent} />
                    <CornerReticle position="tr" color={p.accent} />
                    <CornerReticle position="bl" color={p.accent} />
                    <CornerReticle position="br" color={p.accent} />

                    <svg
                        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                        preserveAspectRatio="xMidYMid meet"
                        style={{ width: '100%', height: '440px', display: 'block' }}
                    >
                        <defs>
                            <pattern id="dot-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                                <circle cx="1" cy="1" r="0.6" fill={p.gridDots} />
                            </pattern>
                            <radialGradient id="pulse-gradient">
                                <stop offset="0%" stopColor={p.pulse} stopOpacity="0.7" />
                                <stop offset="100%" stopColor={p.pulse} stopOpacity="0" />
                            </radialGradient>
                        </defs>

                        <rect width={VIEW_W} height={VIEW_H} fill="url(#dot-grid)" pointerEvents="none" />

                        {[10, 15, 20, 25, 30, 35].map(lat => {
                            const { y } = project(0, lat);
                            return (
                                <g key={`lat-${lat}`} pointerEvents="none">
                                    <line x1="0" x2={VIEW_W} y1={y} y2={y} stroke={p.latLine} strokeWidth="0.6" />
                                    <text x="8" y={y - 4} fill={p.latLabel} fontSize="10" fontFamily="'IBM Plex Mono', monospace">
                                        {lat}°N
                                    </text>
                                </g>
                            );
                        })}

                        <path
                            d={inOutlinePath}
                            fill={p.outlineFill}
                            stroke={p.accent}
                            strokeOpacity={isDark ? 0.6 : 0.85}
                            strokeWidth="1.25"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            vectorEffect="non-scaling-stroke"
                            pointerEvents="none"
                        />

                        {SITES.map(site => {
                            const { x, y } = project(site.lng, site.lat);
                            const isActive = activeId === site.id;
                            const color = statusFill(p, site.status);
                            return (
                                <g
                                    key={site.id}
                                    onMouseEnter={() => setHoveredId(site.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    onClick={() => setSelectedId(site.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {isActive && (
                                        <circle cx={x} cy={y} r="22" fill="url(#pulse-gradient)" pointerEvents="none">
                                            <animate attributeName="r" values="14;26;14" dur="1.8s" repeatCount="indefinite" />
                                            <animate attributeName="opacity" values="0.6;0;0.6" dur="1.8s" repeatCount="indefinite" />
                                        </circle>
                                    )}

                                    <g stroke={color} strokeWidth="1" opacity={isActive ? 1 : 0.5} pointerEvents="none">
                                        <line x1={x - 12} x2={x - 5} y1={y} y2={y} />
                                        <line x1={x + 5} x2={x + 12} y1={y} y2={y} />
                                        <line x1={x} x2={x} y1={y - 12} y2={y - 5} />
                                        <line x1={x} x2={x} y1={y + 5} y2={y + 12} />
                                    </g>

                                    <circle cx={x} cy={y} r="4" fill={color} stroke={p.panelBg} strokeWidth="1.5" pointerEvents="none" />

                                    {/* Hit target — generous, transparent */}
                                    <circle cx={x} cy={y} r="22" fill="transparent" />

                                    <text
                                        x={x + 14}
                                        y={y + 4}
                                        fill={isActive ? p.labelFillActive : p.labelFill}
                                        fontSize="11"
                                        fontFamily="'IBM Plex Mono', 'Menlo', monospace"
                                        fontWeight={isActive ? 600 : 400}
                                        style={{ pointerEvents: 'none', textTransform: 'uppercase', letterSpacing: '0.04em' }}
                                    >
                                        {site.name}
                                    </text>
                                </g>
                            );
                        })}
                    </svg>
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.625rem',
                    color: p.textMuted,
                    fontFamily: "'IBM Plex Mono', 'Menlo', monospace",
                    letterSpacing: '0.04em',
                }}>
                    <span>HOVER A NODE FOR LIVE METRICS · CLICK TO PIN</span>
                    <span>PROJECTION · EQUIRECTANGULAR · INDIA · LAMBERT-ALIGNED</span>
                </div>
            </div>

            <SiteDetailRail site={activeSite} palette={p} />
        </div>
    );
};

const LegendDot = ({ color, label, textColor }: { color: string; label: string; textColor: string }) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.375rem',
        fontSize: '0.625rem',
        fontFamily: "'IBM Plex Mono', 'Menlo', monospace",
        color: textColor,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
    }}>
        <span style={{
            width: 8,
            height: 8,
            background: color,
            borderRadius: '50%',
            boxShadow: `0 0 8px ${color}`,
        }} />
        {label}
    </div>
);

const CornerReticle = ({ position, color }: { position: 'tl' | 'tr' | 'bl' | 'br'; color: string }) => {
    const offset = '8px';
    const styles: Record<string, React.CSSProperties> = {
        tl: { top: offset, left: offset, borderTop: `1px solid ${color}`, borderLeft: `1px solid ${color}` },
        tr: { top: offset, right: offset, borderTop: `1px solid ${color}`, borderRight: `1px solid ${color}` },
        bl: { bottom: offset, left: offset, borderBottom: `1px solid ${color}`, borderLeft: `1px solid ${color}` },
        br: { bottom: offset, right: offset, borderBottom: `1px solid ${color}`, borderRight: `1px solid ${color}` },
    };
    return (
        <div style={{
            position: 'absolute',
            width: 12,
            height: 12,
            zIndex: 2,
            pointerEvents: 'none',
            ...styles[position],
        }} />
    );
};

const SiteDetailRail = ({ site, palette: p }: { site: Site; palette: Palette }) => {
    return (
        <div style={{
            background: p.rail,
            borderLeft: `1px solid ${p.railBorder}`,
            padding: '1rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            position: 'relative',
        }}>
            <div style={{
                position: 'absolute', top: 0, right: 0, width: 16, height: 16,
                borderTop: `1px solid ${p.accent}`, borderRight: `1px solid ${p.accent}`,
            }} />

            <div>
                <div style={{
                    fontSize: '0.5625rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: p.accentSoft,
                    fontFamily: "'IBM Plex Mono', 'Menlo', monospace",
                    marginBottom: '0.25rem',
                }}>
                    NODE · {site.id.toUpperCase()} · {site.region.toUpperCase()}
                </div>
                <h4 style={{
                    margin: 0,
                    fontSize: '1.25rem',
                    fontWeight: 400,
                    color: p.textPrimary,
                    letterSpacing: '0.01em',
                }}>
                    {site.name}
                </h4>
                <div style={{
                    fontSize: '0.75rem',
                    color: p.textSecondary,
                    marginTop: '0.25rem',
                }}>
                    {site.role}
                </div>
                <div style={{ marginTop: '0.5rem' }}>
                    <Tag type={statusTagType(site.status)} size="sm">
                        {site.status.toUpperCase()}
                    </Tag>
                    <span style={{
                        fontSize: '0.6875rem',
                        color: p.textMuted,
                        marginLeft: '0.5rem',
                        fontFamily: "'IBM Plex Mono', 'Menlo', monospace",
                    }}>
                        {site.status === 'live' ? `Commissioned ${site.commissionedAt}` : `Target ${site.commissionedAt}`}
                    </span>
                </div>
            </div>

            <div style={{ height: 1, background: p.railBorder }} />

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.5rem',
            }}>
                <Metric palette={p} label="Capital (INR Cr)" value={`${site.chambers}`} />
                <Metric palette={p} label="Trades / mo" value={`${site.monthlyVolume}`} />
                <Metric palette={p} label="Win Rate" value={`${site.margin}%`} accent />
                <Metric palette={p} label="Drawdown" value={`${site.contamination}%`} />
                <Metric palette={p} label="Latency p95" value={`${site.latencyMs} ms`} />
                <Metric palette={p} label="Strategies" value={`${site.cultivars.length}`} />
            </div>

            <div>
                <div style={{
                    fontSize: '0.5625rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: p.textMuted,
                    marginBottom: '0.375rem',
                    fontFamily: "'IBM Plex Mono', 'Menlo', monospace",
                }}>
                    Strategies traded
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                    {site.cultivars.map(c => (
                        <span
                            key={c}
                            style={{
                                fontSize: '0.6875rem',
                                padding: '2px 8px',
                                border: `1px solid ${p.chipBorder}`,
                                background: p.chipBg,
                                color: p.chipText,
                                fontFamily: "'IBM Plex Mono', 'Menlo', monospace",
                                letterSpacing: '0.04em',
                            }}
                        >
                            {c}
                        </span>
                    ))}
                </div>
            </div>

            <div style={{
                paddingTop: '0.5rem',
                borderTop: `1px dashed ${p.railBorder}`,
            }}>
                <div style={{
                    fontSize: '0.5625rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: p.textMuted,
                    marginBottom: '0.25rem',
                    fontFamily: "'IBM Plex Mono', 'Menlo', monospace",
                }}>
                    Execution path · p95 {site.latencyMs} ms
                </div>
                <div style={{
                    fontSize: '0.6875rem',
                    color: p.accentSoft,
                    fontFamily: "'IBM Plex Mono', 'Menlo', monospace",
                    letterSpacing: '0.02em',
                    marginBottom: '0.5rem',
                }}>
                    {site.latencyPath}
                </div>
                <div style={{
                    fontSize: '0.75rem',
                    color: p.textSecondary,
                    lineHeight: 1.5,
                }}>
                    {site.note}
                </div>
            </div>
        </div>
    );
};

const Metric = ({ palette: p, label, value, accent }: { palette: Palette; label: string; value: string; accent?: boolean }) => (
    <div style={{
        background: p.metricBg,
        border: `1px solid ${p.metricBorder}`,
        padding: '0.5rem 0.625rem',
    }}>
        <div style={{
            fontSize: '0.5625rem',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: p.textMuted,
            fontFamily: "'IBM Plex Mono', 'Menlo', monospace",
        }}>
            {label}
        </div>
        <div style={{
            fontSize: '1.125rem',
            color: accent ? p.liveGreen : p.textPrimary,
            fontWeight: 500,
            marginTop: '2px',
        }}>
            {value}
        </div>
    </div>
);

export default LocationMap;
