import { useMemo, useState } from 'react';
import {
    DataTable,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
    TableContainer,
    TableToolbar,
    TableToolbarContent,
    TableToolbarSearch,
    Pagination,
    Button,
    Tag,
} from '@carbon/react';
import { Settings, Download } from '@carbon/icons-react';
import {
    SAMPLE_SHIPMENTS,
    SAMPLE_CULTIVARS,
    SAMPLE_CHAMBERS,
} from '../data/phoenixEbra';

type EntityKey = 'shipping' | 'cultivars' | 'chambers';

interface EntityConfig {
    title: string;
    source: string;
    description: string;
    headers: { key: string; header: string }[];
    rows: ({ id: string } & Record<string, any>)[];
    statusKey?: string;
    statusMap?: (v: string) => 'green' | 'blue' | 'red' | 'gray';
}

const buildConfig = (entity: EntityKey): EntityConfig => {
    if (entity === 'shipping') {
        return {
            title: 'Shipments · ShipTrack',
            source: "Scott's platform · Joined to OrderFlow on order_id",
            description: 'Per-shipment fulfillment cost, carrier, lane, and damage events.',
            headers: [
                { key: 'id', header: 'Shipment' },
                { key: 'orderId', header: 'Order' },
                { key: 'carrier', header: 'Carrier' },
                { key: 'lane', header: 'Lane' },
                { key: 'cost', header: 'Cost' },
                { key: 'transit', header: 'Transit' },
                { key: 'damage', header: 'Damage' },
            ],
            rows: SAMPLE_SHIPMENTS.map(s => ({
                id: s.id,
                orderId: s.orderId,
                carrier: s.carrier,
                lane: s.lane,
                cost: `$${s.cost.toLocaleString()}`,
                transit: s.transit,
                damage: s.damage,
            })),
            statusKey: 'damage',
            statusMap: (v) => v === 'None' ? 'green' : 'red',
        };
    }
    if (entity === 'cultivars') {
        return {
            title: 'Cultivars · LIMS',
            source: 'Phoenix Ebra lab · Joined to Cohort and Product',
            description: 'Genetic lines in production, propagation success, and per-plantlet COGS.',
            headers: [
                { key: 'id', header: 'SKU' },
                { key: 'name', header: 'Cultivar' },
                { key: 'triploid', header: '3n?' },
                { key: 'monthlyVolume', header: 'Vol/mo' },
                { key: 'cogsPerPlantlet', header: 'COGS' },
                { key: 'propSuccess', header: 'Success %' },
            ],
            rows: SAMPLE_CULTIVARS.map(c => ({
                id: c.id,
                name: c.name,
                triploid: c.triploid ? 'Yes' : 'No',
                monthlyVolume: c.monthlyVolume.toLocaleString(),
                cogsPerPlantlet: `$${c.cogsPerPlantlet.toFixed(2)}`,
                propSuccess: `${c.propSuccess.toFixed(1)}%`,
            })),
        };
    }
    return {
        title: 'Chambers · ChamberOS',
        source: 'Biora controlled-environment chambers · 99% accuracy SLA',
        description: 'Live telemetry per chamber: temperature, humidity, CO₂, PAR.',
        headers: [
            { key: 'id', header: 'Chamber' },
            { key: 'site', header: 'Site' },
            { key: 'cultivar', header: 'Cultivar' },
            { key: 'temp', header: 'Temp' },
            { key: 'humidity', header: 'Humidity' },
            { key: 'co2', header: 'CO₂' },
            { key: 'par', header: 'PAR' },
            { key: 'status', header: 'Status' },
        ],
        rows: SAMPLE_CHAMBERS.map(c => ({
            id: c.id,
            site: c.site,
            cultivar: c.cultivar,
            temp: `${c.temp}°C`,
            humidity: `${c.humidity}%`,
            co2: `${c.co2} ppm`,
            par: c.par,
            status: c.status,
        })),
        statusKey: 'status',
        statusMap: (v) => v === 'Nominal' ? 'green' : v === 'Watch' ? 'blue' : 'red',
    };
};

interface Props { entity?: EntityKey }

export const DataVisualPage = ({ entity = 'shipping' }: Props) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const config = useMemo(() => buildConfig(entity), [entity]);

    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, config.rows.length);
    const currentRows = config.rows.slice(startIndex, endIndex);

    return (
        <div style={{ padding: 0, display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--cds-background)' }}>
            {/* Page header */}
            <div style={{
                padding: '1rem 2rem',
                background: 'var(--cds-layer-01)',
                borderBottom: '1px solid var(--cds-border-subtle-00)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <div>
                    <h2 style={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: 'var(--cds-text-primary)',
                        margin: 0,
                    }}>
                        {config.title}
                    </h2>
                    <div style={{
                        fontSize: '0.75rem',
                        color: 'var(--cds-text-secondary)',
                        marginTop: '0.125rem',
                    }}>
                        {config.source}
                    </div>
                    <div style={{
                        fontSize: '0.75rem',
                        color: 'var(--cds-text-helper)',
                        marginTop: '0.25rem',
                    }}>
                        {config.description}
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '2rem' }}>
                    <div>
                        <span style={{ fontWeight: 600, display: 'block' }}>{config.rows.length}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--cds-text-secondary)' }}>Rows</span>
                    </div>
                    <div>
                        <span style={{ fontWeight: 600, display: 'block' }}>{config.headers.length}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--cds-text-secondary)' }}>Columns</span>
                    </div>
                    <div>
                        <span style={{ fontWeight: 600, display: 'block' }}>Live</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--cds-text-secondary)' }}>Last sync</span>
                    </div>
                </div>
            </div>

            <div style={{ flex: 1, overflow: 'hidden' }}>
                <DataTable rows={currentRows} headers={config.headers}>
                    {({ rows, headers, getHeaderProps, getRowProps, getTableProps, onInputChange }) => (
                        <TableContainer style={{ height: '100%', overflowY: 'auto' }}>
                            <TableToolbar>
                                <TableToolbarContent>
                                    <TableToolbarSearch onChange={onInputChange as any} />
                                    <Button renderIcon={Settings} hasIconOnly iconDescription="Settings" kind="ghost" size="sm" />
                                    <Button renderIcon={Download} hasIconOnly iconDescription="Download" kind="ghost" size="sm" />
                                </TableToolbarContent>
                            </TableToolbar>
                            <Table {...getTableProps()} isSortable stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        {headers.map(header => (
                                            <TableHeader {...getHeaderProps({ header })}>
                                                {header.header}
                                            </TableHeader>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map(row => (
                                        <TableRow {...getRowProps({ row })}>
                                            {row.cells.map(cell => {
                                                const isStatusCell = config.statusKey && cell.info.header === config.statusKey;
                                                return (
                                                    <TableCell key={cell.id}>
                                                        {isStatusCell && config.statusMap ? (
                                                            <Tag type={config.statusMap(String(cell.value))} size="sm">
                                                                {cell.value}
                                                            </Tag>
                                                        ) : cell.value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </DataTable>
            </div>
            <Pagination
                totalItems={config.rows.length}
                backwardText="Previous page"
                forwardText="Next page"
                itemsPerPageText="Items per page:"
                page={page}
                pageSize={pageSize}
                pageSizes={[10, 20, 50]}
                size="md"
                onChange={({ page, pageSize }) => {
                    setPage(page);
                    setPageSize(pageSize);
                }}
            />
        </div>
    );
};
