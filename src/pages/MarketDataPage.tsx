import React, { useState } from 'react';
import {
    Search,
    Button,
    Tag,
    Tabs,
    TabList,
    Tab
} from '@carbon/react';
import {
    Settings, WatsonHealthAiStatus,
    ChartLine, ChartCandlestick
} from '@carbon/icons-react';
import { LineChart, SimpleBarChart, StackedBarChart } from '@carbon/charts-react';
import { ScaleTypes } from '@carbon/charts';
import '@carbon/charts-react/styles.css';

// --- Types ---
interface StockData {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    volume: string;
    open: number;
    high: number;
    low: number;
    prevClose: number;
    sparkline: number[];
}

// --- Mock Data ---
const watchlistData: StockData[] = [
    { symbol: 'AAPL', name: 'Apple Inc', price: 178.72, change: 2.34, changePercent: 1.33, volume: '52.3M', open: 176.38, high: 179.12, low: 175.89, prevClose: 176.38, sparkline: [170, 172, 171, 174, 173, 176, 178] },
    { symbol: 'MSFT', name: 'Microsoft Corp', price: 374.58, change: -1.24, changePercent: -0.33, volume: '18.7M', open: 375.82, high: 377.45, low: 373.21, prevClose: 375.82, sparkline: [370, 372, 375, 374, 376, 375, 374] },
    { symbol: 'GOOGL', name: 'Alphabet Inc', price: 139.69, change: 3.12, changePercent: 2.28, volume: '24.1M', open: 136.57, high: 140.25, low: 136.12, prevClose: 136.57, sparkline: [130, 132, 134, 133, 136, 138, 139] },
    { symbol: 'AMZN', name: 'Amazon.com Inc', price: 151.94, change: 1.87, changePercent: 1.25, volume: '35.8M', open: 150.07, high: 152.83, low: 149.65, prevClose: 150.07, sparkline: [145, 146, 148, 147, 149, 150, 151] },
    { symbol: 'NVDA', name: 'NVIDIA Corp', price: 495.22, change: 12.56, changePercent: 2.60, volume: '41.2M', open: 482.66, high: 498.75, low: 480.12, prevClose: 482.66, sparkline: [470, 475, 480, 485, 482, 490, 495] },
    { symbol: 'META', name: 'Meta Platforms', price: 353.96, change: -2.34, changePercent: -0.66, volume: '12.4M', open: 356.30, high: 358.42, low: 351.15, prevClose: 356.30, sparkline: [360, 358, 355, 357, 356, 354, 353] },
];

const newsData = [
    { headline: 'Apple Unveils New AI Features', time: '10m ago', source: 'Bloomberg', sentiment: 'Bullish', impact: 'High' },
    { headline: 'Tech Stocks Rally on Rate Cut Hopes', time: '32m ago', source: 'Reuters', sentiment: 'Bullish', impact: 'Medium' },
    { headline: 'Supply Chain Component Shortage Updates', time: '1h ago', source: 'WSJ', sentiment: 'Bearish', impact: 'Low' },
    { headline: 'Analyst Upgrades AAPL Target to $200', time: '2h ago', source: 'CNBC', sentiment: 'Bullish', impact: 'High' },
];

// --- Sub-components ---

// Simple SVG Sparkline
const Sparkline = ({ data, color, width = 60, height = 20 }: { data: number[], color: string, width?: number, height?: number }) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    // Create points for polyline
    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * height;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg width={width} height={height} style={{ overflow: 'visible' }}>
            <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

// --- Main Page Component ---
const MarketDataPage: React.FC = () => {
    const [selectedSecurity, setSelectedSecurity] = useState(watchlistData[0]);
    const [timeRange, setTimeRange] = useState('1D');

    // Generate Chart Data on the fly
    const generateChartData = (basePrice: number) => {
        const data = [];
        const volData = [];
        for (let i = 0; i < 50; i++) {
            const time = `${9 + Math.floor(i / 5)}:${(i % 5) * 12}`;
            const price = basePrice + (Math.random() - 0.5) * 5;
            data.push({ group: 'Price', time, value: price });
            volData.push({ group: 'Volume', time, value: Math.floor(Math.random() * 1000) + 500 });
        }
        return { priceData: data, volumeData: volData };
    };

    const { priceData, volumeData } = generateChartData(selectedSecurity.price);

    // Chart Options
    const priceOptions = {
        title: '',
        axes: {
            bottom: { mapsTo: 'time', scaleType: ScaleTypes.LABELS, visible: false },
            left: { mapsTo: 'value', scaleType: ScaleTypes.LINEAR, title: 'Price' }
        },
        height: '350px',
        color: { scale: { 'Price': selectedSecurity.change >= 0 ? '#198038' : '#da1e28' } },
        toolbar: { enabled: false },
        legend: { enabled: false },
        grid: { x: { enabled: false } }
    };

    const volumeOptions = {
        title: '',
        axes: {
            bottom: { mapsTo: 'time', scaleType: ScaleTypes.LABELS },
            left: { mapsTo: 'value', scaleType: ScaleTypes.LINEAR, title: 'Vol' }
        },
        height: '120px',
        color: { scale: { 'Volume': '#0f62fe' } },
        toolbar: { enabled: false },
        legend: { enabled: false }
    };

    return (
        <div style={{
            height: 'calc(100vh - 3rem)',
            display: 'flex',
            flexDirection: 'column',
            background: '#ffffff', // High contract Light Mode
            fontFamily: "'IBM Plex Sans', sans-serif"
        }}>

            {/* 1. Top Navigation Bar */}
            <div style={{ borderBottom: '1px solid #e0e0e0', padding: '0 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '48px' }}>
                <Tabs>
                    <TabList aria-label="Market Sections">
                        <Tab>Markets</Tab>
                        <Tab>Watchlists</Tab>
                        <Tab>Charts</Tab>
                        <Tab>News</Tab>
                        <Tab>Scanner</Tab> {/* Added for OpenBB feel */}
                    </TabList>
                </Tabs>
                <div style={{ width: '300px' }}>
                    <Search size="sm" placeholder="Search Symbol, Cmd+K..." labelText="Search" />
                </div>
            </div>

            {/* 2. Main Workspace - Grid Layout */}
            <div style={{
                flex: 1,
                display: 'grid',
                gridTemplateColumns: '280px 1fr 320px', // Left Sidebar, Center, Right Sidebar
                overflow: 'hidden'
            }}>

                {/* --- LEFT PANEL: Watchlist --- */}
                <div style={{ borderRight: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '0.5rem', borderBottom: '1px solid #e0e0e0', background: '#f4f4f4', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>WATCHLIST: TECH</span>
                        <Settings size={16} />
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ background: '#f4f4f4', fontSize: '0.625rem', color: '#525252' }}>
                                <tr>
                                    <th style={{ textAlign: 'left', padding: '0.5rem' }}>Sym</th>
                                    <th style={{ textAlign: 'right', padding: '0.5rem' }}>Price</th>
                                    <th style={{ textAlign: 'right', padding: '0.5rem' }}>%</th>
                                    <th style={{ textAlign: 'center', padding: '0.5rem' }}>Trend</th>
                                </tr>
                            </thead>
                            <tbody>
                                {watchlistData.map(stock => (
                                    <tr
                                        key={stock.symbol}
                                        onClick={() => setSelectedSecurity(stock)}
                                        style={{
                                            cursor: 'pointer',
                                            borderBottom: '1px solid #e0e0e0',
                                            background: selectedSecurity.symbol === stock.symbol ? '#e5f6ff' : 'transparent'
                                        }}
                                    >
                                        <td style={{ padding: '0.5rem' }}>
                                            <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{stock.symbol}</div>
                                            <div style={{ fontSize: '0.625rem', color: '#6f6f6f' }}>{stock.name}</div>
                                        </td>
                                        <td style={{ textAlign: 'right', padding: '0.5rem', fontWeight: 500 }}>
                                            {stock.price.toFixed(2)}
                                        </td>
                                        <td style={{ textAlign: 'right', padding: '0.5rem' }}>
                                            <Tag type={stock.change >= 0 ? 'green' : 'red'} size="sm">
                                                {stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                                            </Tag>
                                        </td>
                                        <td style={{ padding: '0.5rem', textAlign: 'center' }}>
                                            <Sparkline
                                                data={stock.sparkline}
                                                color={stock.change >= 0 ? '#198038' : '#da1e28'}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- CENTER PANEL: Charts --- */}
                <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

                    {/* Toolbar */}
                    <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e0e0e0', display: 'flex', gap: '0.5rem', alignItems: 'center', background: '#ffffff' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginRight: '1rem' }}>
                            <h2 style={{ margin: 0, fontSize: '1.25rem' }}>{selectedSecurity.symbol}</h2>
                            <span style={{ fontSize: '0.875rem', color: '#525252' }}>{selectedSecurity.name}</span>
                        </div>

                        <div style={{ height: '24px', width: '1px', background: '#e0e0e0', margin: '0 0.5rem' }} />

                        {['1D', '1W', '1M', '3M', '6M', 'YTD', '1Y'].map(t => (
                            <button
                                key={t}
                                onClick={() => setTimeRange(t)}
                                style={{
                                    border: 'none',
                                    background: timeRange === t ? '#e0e0e0' : 'transparent',
                                    padding: '2px 8px',
                                    borderRadius: '2px',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                {t}
                            </button>
                        ))}

                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
                            <Button kind="ghost" size="sm" renderIcon={ChartLine} iconDescription="Line" hasIconOnly />
                            <Button kind="ghost" size="sm" renderIcon={ChartCandlestick} iconDescription="Candle" hasIconOnly />
                            <Button kind="ghost" size="sm" renderIcon={WatsonHealthAiStatus} iconDescription="Indicators" hasIconOnly />
                        </div>
                    </div>

                    {/* Charts Container */}
                    <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                        {/* Price Chart Pane */}
                        <div style={{ border: '1px solid #e0e0e0', borderRadius: '4px', padding: '0.5rem' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                                <span>PRICE ACTION</span>
                                <span style={{ color: '#0f62fe' }}>SMA(20) • EMA(50)</span>
                            </div>
                            <LineChart data={priceData} options={priceOptions} />
                        </div>

                        {/* Volume Chart Pane */}
                        <div style={{ border: '1px solid #e0e0e0', borderRadius: '4px', padding: '0.5rem' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>VOLUME & LIQUIDITY</div>
                            <SimpleBarChart data={volumeData} options={volumeOptions} />
                        </div>

                        {/* Financials / Deep Dive Tabs */}
                        <div style={{ border: '1px solid #e0e0e0', borderRadius: '4px', flex: 1 }}>
                            <Tabs>
                                <TabList aria-label="Deep Dive">
                                    <Tab>Financials</Tab>
                                    <Tab>Analysis</Tab>
                                    <Tab>Options</Tab>
                                    <Tab>Holders</Tab>
                                </TabList>
                            </Tabs>
                            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
                                {/* Revenue & Segments Chart (Inspired by Image 0) */}
                                <div style={{ flex: 1, minHeight: '0', display: 'flex', gap: '1rem' }}>
                                    <div style={{ flex: 1, border: '1px solid #e0e0e0', borderRadius: '4px', padding: '0.5rem', display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>REVENUE BY GEOGRAPHY</div>
                                        <div style={{ flex: 1, overflow: 'hidden' }}>
                                            <StackedBarChart
                                                data={[
                                                    { group: 'Americas', key: 'Q1', value: 45 }, { group: 'Europe', key: 'Q1', value: 25 }, { group: 'China', key: 'Q1', value: 15 }, { group: 'Japan', key: 'Q1', value: 10 },
                                                    { group: 'Americas', key: 'Q2', value: 48 }, { group: 'Europe', key: 'Q2', value: 26 }, { group: 'China', key: 'Q2', value: 14 }, { group: 'Japan', key: 'Q2', value: 11 },
                                                    { group: 'Americas', key: 'Q3', value: 52 }, { group: 'Europe', key: 'Q3', value: 28 }, { group: 'China', key: 'Q3', value: 18 }, { group: 'Japan', key: 'Q3', value: 12 },
                                                    { group: 'Americas', key: 'Q4', value: 65 }, { group: 'Europe', key: 'Q4', value: 35 }, { group: 'China', key: 'Q4', value: 22 }, { group: 'Japan', key: 'Q4', value: 15 },
                                                ]}
                                                options={{
                                                    title: '',
                                                    // Fixed height to prevent vertical expansion bug
                                                    height: '220px',
                                                    toolbar: { enabled: false },
                                                    color: { scale: { 'Americas': '#0f62fe', 'Europe': '#8a3ffc', 'China': '#007d79', 'Japan': '#ff832b' } },
                                                    axes: {
                                                        left: { mapsTo: 'value', stacked: true },
                                                        bottom: { mapsTo: 'key', scaleType: ScaleTypes.LABELS }
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Valuation Multiples (Inspired by Image 1) */}
                                    <div style={{ flex: 1, border: '1px solid #e0e0e0', borderRadius: '4px', padding: '0.5rem', display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>VALUATION MULTIPLES TREND</div>
                                        <div style={{ flex: 1, overflow: 'hidden' }}>
                                            <LineChart
                                                data={[
                                                    { group: 'P/E', date: '2023', value: 25 }, { group: 'P/E', date: '2024', value: 28 }, { group: 'P/E', date: '2025', value: 32 },
                                                    { group: 'P/S', date: '2023', value: 6 }, { group: 'P/S', date: '2024', value: 7 }, { group: 'P/S', date: '2025', value: 8.5 },
                                                    { group: 'EV/EBITDA', date: '2023', value: 18 }, { group: 'EV/EBITDA', date: '2024', value: 20 }, { group: 'EV/EBITDA', date: '2025', value: 24 }
                                                ]}
                                                options={{
                                                    title: '',
                                                    // Fixed height to prevent vertical expansion bug
                                                    height: '220px',
                                                    toolbar: { enabled: false },
                                                    color: { scale: { 'P/E': '#0f62fe', 'P/S': '#fa4d56', 'EV/EBITDA': '#007d79' } },
                                                    axes: {
                                                        bottom: { mapsTo: 'date', scaleType: ScaleTypes.LABELS },
                                                        left: { mapsTo: 'value', scaleType: ScaleTypes.LINEAR }
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Key Metrics Row */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.5rem', background: '#f4f4f4', padding: '0.5rem', borderRadius: '4px' }}>
                                    {[
                                        { l: 'Market Cap', v: '2.8T' }, { l: 'Beta', v: '1.24' }, { l: 'Div Yield', v: '0.52%' },
                                        { l: 'EPS', v: '6.16' }, { l: 'P/E', v: '28.4' }, { l: 'Short Float', v: '0.8%' }
                                    ].map((m, i) => (
                                        <div key={i} style={{ textAlign: 'center' }}>
                                            <div style={{ fontSize: '0.625rem', color: '#525252' }}>{m.l}</div>
                                            <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{m.v}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* --- RIGHT PANEL: Details & News --- */}
                <div style={{ borderLeft: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column', background: '#fcfcfc' }}>

                    {/* Intelligent Quote */}
                    <div style={{ padding: '1rem', borderBottom: '1px solid #e0e0e0' }}>
                        <h4 style={{ fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#525252' }}>SMART QUOTE</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem 1rem' }}>
                            <div>
                                <div style={{ fontSize: '0.6875rem', color: '#525252' }}>bid</div>
                                <div style={{ fontWeight: 600, color: '#198038' }}>{(selectedSecurity.price - 0.05).toFixed(2)}</div>
                                <div style={{ fontSize: '0.625rem' }}>x200</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.6875rem', color: '#525252' }}>ask</div>
                                <div style={{ fontWeight: 600, color: '#da1e28' }}>{(selectedSecurity.price + 0.05).toFixed(2)}</div>
                                <div style={{ fontSize: '0.625rem' }}>x500</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.6875rem', color: '#525252' }}>day range</div>
                                <div style={{ fontSize: '0.75rem' }}>{selectedSecurity.low} - {selectedSecurity.high}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.6875rem', color: '#525252' }}>52w range</div>
                                <div style={{ fontSize: '0.75rem' }}>{(selectedSecurity.low * 0.8).toFixed(2)} - {(selectedSecurity.high * 1.1).toFixed(2)}</div>
                            </div>
                        </div>
                    </div>

                    {/* News Feed */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #e0e0e0', fontSize: '0.75rem', fontWeight: 'bold' }}>
                            NEWS & SENTIMENT
                        </div>
                        <div style={{ overflowY: 'auto', padding: '0 1rem' }}>
                            {newsData.map((news, i) => (
                                <div key={i} style={{ padding: '0.75rem 0', borderBottom: '1px solid #e0e0e0' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                        <Tag type={news.sentiment === 'Bullish' ? 'green' : 'red'} size="sm" title="Sentiment">
                                            {news.sentiment}
                                        </Tag>
                                        <Tag type="outline" size="sm" title="Impact">
                                            {news.impact} Impact
                                        </Tag>
                                    </div>
                                    <div style={{ fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.25rem', lineHeight: '1.2' }}>
                                        {news.headline}
                                    </div>
                                    <div style={{ fontSize: '0.6875rem', color: '#525252', display: 'flex', justifyContent: 'space-between' }}>
                                        <span>{news.source}</span>
                                        <span>{news.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Insight Box */}
                    <div style={{ padding: '1rem', background: '#e5f6ff', borderTop: '1px solid #a6c8ff' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#0043ce' }}>
                            <WatsonHealthAiStatus size={16} />
                            <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>AI INSIGHT</span>
                        </div>
                        <p style={{ fontSize: '0.75rem', lineHeight: '1.4', color: '#161616' }}>
                            High volatility detected. {selectedSecurity.symbol} is trading above its 20-day SMA, indicating short-term bullish momentum supported by recent earnings news.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MarketDataPage;
