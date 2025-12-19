import React from 'react';
import { Button, Tile, DataTable, TableContainer, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, TableToolbar, TableToolbarContent, TableToolbarSearch, TableToolbarMenu, TableToolbarAction } from '@carbon/react';
import { Add, Connect, Activity, Dashboard } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';

export const RiskHome = () => {
    const navigate = useNavigate();

    const pipelineHeaders = [
        { key: 'name', header: 'Pipeline Name' },
        { key: 'status', header: 'Status' },
        { key: 'lastrun', header: 'Last Run' }
    ];

    const pipelineRows = [
        { id: '1', name: 'EOD_Global_Equity', status: '● Running', lastrun: 'Now' },
        { id: '2', name: 'Intraday_FixedIncome', status: '● Scheduled', lastrun: '10:30 AM' },
        { id: '3', name: 'Weekly_Rebalance', status: '● Idle', lastrun: 'Fri 5:00 PM' }
    ];

    return (
        <div style={{ padding: '2rem' }}>
            <h1 style={{ marginBottom: '2rem', fontWeight: 300, fontSize: '2.625rem' }}>Overview</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
                <Tile style={{ height: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                        <div>
                            <h4 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Create Workflow</h4>
                            <p style={{ marginBottom: '2rem', color: '#525252' }}>Start a new Portfolio Returns calculation pipeline.</p>
                        </div>
                        <Button renderIcon={Add} onClick={() => navigate('/packs/risk/portfolio-returns/workflow')}>
                            New Workflow
                        </Button>
                    </div>
                </Tile>
                <Tile style={{ height: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                        <div>
                            <h4 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Data Sources</h4>
                            <p style={{ marginBottom: '2rem', color: '#525252' }}>Manage connections to Portfolio, Market, and FX data.</p>
                        </div>
                        <Button kind="tertiary" renderIcon={Connect} onClick={() => navigate('/packs/risk/data-connections')}>
                            Manage Connections
                        </Button>
                    </div>
                </Tile>
                <Tile style={{ height: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                        <div>
                            <h4 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Job Monitor</h4>
                            <p style={{ marginBottom: '2rem', color: '#525252' }}>View status of running and scheduled pipelines.</p>
                        </div>
                        <Button kind="ghost" renderIcon={Activity} onClick={() => navigate('/packs/risk/job-monitor')}>
                            View Jobs
                        </Button>
                    </div>
                </Tile>
            </div>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 2, minWidth: '300px' }}>
                    <h4 style={{ marginBottom: '1rem' }}>Active Pipelines</h4>
                    <DataTable rows={pipelineRows} headers={pipelineHeaders} isSortable>
                        {({ rows, headers, getTableProps, getHeaderProps }) => (
                            <TableContainer title="" description="">
                                <Table {...getTableProps()} size="md">
                                    <TableHead>
                                        <TableRow>
                                            {headers.map(header => (
                                                <TableHeader key={header.key} {...getHeaderProps({ header })}>{header.header}</TableHeader>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map(row => (
                                            <TableRow key={row.id}>
                                                {row.cells.map(cell => (
                                                    <TableCell key={cell.id}>{cell.value}</TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </DataTable>
                </div>

                <div style={{ flex: 1, minWidth: '300px' }}>
                    <h4 style={{ marginBottom: '1rem' }}>Overall System Status</h4>
                    <Tile style={{ marginBottom: '1rem', borderLeft: '4px solid #198038' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 600, color: '#198038' }}>99.9%</div>
                        <div>Uptime</div>
                    </Tile>
                    <Tile style={{ borderLeft: '4px solid #f1c21b' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 600, color: '#f1c21b' }}>2</div>
                        <div>Pending Approvals</div>
                    </Tile>
                </div>
            </div>
        </div>
    );
};

export const DataConnections = () => {
    return (
            <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontWeight: 300, fontSize: '2.625rem' }}>Data Connections</h1>
                <Button renderIcon={Add}>Add Connection</Button>
            </div>
            <DataTable
                rows={[
                    { id: 'c1', name: 'Portfolio_Master_DB', type: 'PostgreSQL', status: 'Connected', last: '2m ago', action: 'Edit' },
                    { id: 'c2', name: 'Bloomberg_Feed', type: 'API Stream', status: 'Connected', last: 'Live', action: 'Edit' },
                    { id: 'c3', name: 'Manual_Correction_Sheet', type: 'Google Sheets', status: 'Error', last: 'Yesterday', action: 'Reconnect' }
                ]}
                headers={[
                    { key: 'name', header: 'Connection Name' },
                    { key: 'type', header: 'Type' },
                    { key: 'status', header: 'Status' },
                    { key: 'last', header: 'Last Sync' },
                    { key: 'action', header: 'Actions' }
                ]}
            >
                {({ rows, headers, getTableProps, getHeaderProps }) => (
                    <TableContainer title="" description="">
                        <Table {...getTableProps()}>
                            <TableHead>
                                <TableRow>
                                    {headers.map(header => (
                                        <TableHeader key={header.key} {...getHeaderProps({ header })}>{header.header}</TableHeader>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map(row => (
                                    <TableRow key={row.id}>
                                        {row.cells.map(cell => (
                                            <TableCell key={cell.id}>{cell.value}</TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </DataTable>
        </div>
    );
};

export const DashboardStub = ({ title }: { title: string }) => (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh', color: '#8d8d8d' }}>
        <Dashboard size={64} style={{ marginBottom: '1rem' }} />
        <h2 style={{ fontWeight: 400 }}>{title}</h2>
        <p style={{ marginTop: '1rem', fontSize: '1.25rem', fontWeight: 600 }}>Build in Progress</p>
    </div>
);

export const PlaceholderStub = ({ title }: { title: string }) => (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh', color: '#8d8d8d' }}>
        <h2 style={{ fontWeight: 400 }}>{title}</h2>
        <p style={{ marginTop: '1rem', fontSize: '1.25rem', fontWeight: 600 }}>Build in Progress</p>
    </div>
);
