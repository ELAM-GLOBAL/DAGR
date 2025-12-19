import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ShellLayout from './components/ShellLayout';
import WorkflowPage from './pages/WorkflowPage';
import { RiskHome, DataConnections, DashboardStub, PlaceholderStub } from './pages/StubPages';
import { DataVisualPage } from './pages/DataVisualPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Redirect root to Risk Home */}
                <Route path="/" element={<Navigate to="/packs/risk/home" replace />} />

                {/* Shell Layout Wrapper */}
                <Route path="/packs/risk" element={<ShellLayout />}>
                    {/* Pack Level Routes */}
                    <Route path="home" element={<RiskHome />} />
                    <Route path="data-connections" element={<DataConnections />} />
                    <Route path="job-monitor" element={<PlaceholderStub title="Job Monitor" />} />
                    <Route path="registry" element={<PlaceholderStub title="Pack Registry" />} />
                    <Route path="rbac" element={<PlaceholderStub title="Users & RBAC" />} />
                    <Route path="settings" element={<PlaceholderStub title="Workspace Settings" />} />

                    {/* Portfolio Returns Capability */}
                    <Route path="portfolio-returns">
                        <Route path="dashboard" element={<DashboardStub title="Portfolio Returns Dashboard" />} />
                        <Route path="workflow" element={<WorkflowPage />} />
                        <Route path="data-visual">
                            <Route path="portfolio" element={<DataVisualPage />} />
                            <Route path="market" element={<DataVisualPage />} />
                            <Route path="fx" element={<DataVisualPage />} />
                            <Route path="benchmark" element={<DataVisualPage />} />
                            <Route path="" element={<Navigate to="portfolio" replace />} />
                        </Route>
                    </Route>

                    {/* VaR / CVaR Capability */}
                    <Route path="var-cvar">
                        <Route path="dashboard" element={<DashboardStub title="VaR / CVaR Dashboard" />} />
                        <Route path="workflow" element={<PlaceholderStub title="VaR Model Workflow" />} />
                        <Route path="data-visual" element={<PlaceholderStub title="VaR Data Visual" />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
