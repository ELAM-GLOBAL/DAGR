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
    TableToolbar,
    TableToolbarContent,
    TableToolbarSearch,
    TableToolbarMenu,
    TableToolbarAction,
    Pagination,
    Button
} from '@carbon/react';
import { Settings, Download } from '@carbon/icons-react';

const headers = [
    { key: 'id', header: 'ID' },
    { key: 'ticker', header: 'Ticker' },
    { key: 'securityName', header: 'Security Name' },
    { key: 'assetClass', header: 'Asset Class' },
    { key: 'cusip', header: 'CUSIP/ISIN' },
    { key: 'price', header: 'Price' },
    { key: 'currency', header: 'Currency' },
    { key: 'exposure', header: 'Exposure' },
];

const mockRows = Array.from({ length: 50 }).map((_, i) => ({
    id: `row-${i}`,
    ticker: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'JPM', 'V', 'NVDA', 'BRK.B', 'PG'][i % 10],
    securityName: `Security Name ${i + 1}`,
    assetClass: ['Equity', 'Fixed Income', 'Derivative', 'FX'][i % 4],
    cusip: `US${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    price: (Math.random() * 1000).toFixed(2),
    currency: ['USD', 'EUR', 'GBP', 'JPY'][i % 4],
    exposure: (Math.random() * 1000000).toFixed(2),
}));

export const DataVisualPage = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, mockRows.length);
    const currentPageRows = mockRows.slice(startIndex, endIndex);

    return (
        <div style={{ padding: '0', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ padding: '1rem 2rem', background: '#f4f4f4', borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Portfolio Data</h2>
                    <div style={{ fontSize: '0.75rem', color: '#525252' }}>
                        Source: Architect → Market Prices (mock) | Validated by: Engineer
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '2rem' }}>
                    <div>
                        <span style={{ fontWeight: 600, display: 'block' }}>50</span>
                        <span style={{ fontSize: '0.75rem' }}>Rows</span>
                    </div>
                    <div>
                        <span style={{ fontWeight: 600, display: 'block' }}>8</span>
                        <span style={{ fontSize: '0.75rem' }}>Columns</span>
                    </div>
                    <div>
                        <span style={{ fontWeight: 600, display: 'block' }}>Today, 10:45 AM</span>
                        <span style={{ fontSize: '0.75rem' }}>Last Update</span>
                    </div>
                </div>
            </div>

            <div style={{ flex: 1, overflow: 'hidden' }}>
                <DataTable rows={currentPageRows} headers={headers}>
                    {({
                        rows,
                        headers,
                        getHeaderProps,
                        getRowProps,
                        getTableProps,
                        onInputChange
                    }) => (
                        <TableContainer title="" description="" style={{ height: '100%', overflowY: 'auto' }}>
                            <TableToolbar>
                                <TableToolbarContent>
                                    <TableToolbarSearch onChange={onInputChange} />
                                    <TableToolbarMenu>
                                        <TableToolbarAction onClick={() => console.log('Action 1')}>
                                            Action 1
                                        </TableToolbarAction>
                                        <TableToolbarAction onClick={() => console.log('Action 2')}>
                                            Action 2
                                        </TableToolbarAction>
                                        <TableToolbarAction onClick={() => console.log('Action 3')}>
                                            Action 3
                                        </TableToolbarAction>
                                    </TableToolbarMenu>
                                    <Button renderIcon={Settings} hasIconOnly iconDescription="Settings" kind="ghost" size="sm" onClick={() => { }} />
                                    <Button renderIcon={Download} hasIconOnly iconDescription="Download" kind="ghost" size="sm" onClick={() => { }} />
                                </TableToolbarContent>
                            </TableToolbar>
                            <Table {...getTableProps()} isSortable stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        {headers.map((header) => (
                                            <TableHeader {...getHeaderProps({ header })}>
                                                {header.header}
                                            </TableHeader>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow {...getRowProps({ row })}>
                                            {row.cells.map((cell) => (
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
            <Pagination
                totalItems={mockRows.length}
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
