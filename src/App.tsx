import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ShellLayout from './components/ShellLayout';
import WorkflowPage from './pages/WorkflowPage';
import { PhoenixEbraHome } from './pages/StubPages';
import { DataVisualPage } from './pages/DataVisualPage';
import PortfolioRiskDashboard from './pages/PortfolioRiskDashboard';
import MarketDataPage from './pages/MarketDataPage';
import OntologyPage from './pages/OntologyPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/workspace/home" replace />} />
                <Route path="/packs/*" element={<Navigate to="/workspace/home" replace />} />

                <Route path="/workspace" element={<ShellLayout />}>
                    <Route index element={<Navigate to="home" replace />} />
                    <Route path="home" element={<PhoenixEbraHome />} />
                    <Route path="ontology" element={<OntologyPage />} />
                    <Route path="workflow" element={<WorkflowPage />} />
                    <Route path="dashboard" element={<PortfolioRiskDashboard />} />
                    <Route path="data">
                        <Route index element={<Navigate to="orders" replace />} />
                        <Route path="orders" element={<MarketDataPage />} />
                        <Route path="shipping" element={<DataVisualPage entity="shipping" />} />
                        <Route path="cultivars" element={<DataVisualPage entity="cultivars" />} />
                        <Route path="chambers" element={<DataVisualPage entity="chambers" />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
