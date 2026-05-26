import {
    Header,
    HeaderName,
    HeaderNavigation,
    HeaderMenu,
    HeaderMenuItem,
    HeaderGlobalBar,
    HeaderGlobalAction,
    SkipToContent,
    Content,
} from '@carbon/react';
import {
    Notification,
    User,
    Search,
    Asleep,
    Light,
    Switcher as SwitcherIcon,
} from '@carbon/icons-react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDagrTheme } from './ThemeContext';

const ShellLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isDark, toggle } = useDagrTheme();

    const inHome = location.pathname.endsWith('/home') || location.pathname === '/workspace' || location.pathname === '/workspace/';
    const inOntology = location.pathname.includes('/ontology');
    const inWorkflow = location.pathname.includes('/workflow');
    const inDashboard = location.pathname.includes('/dashboard');
    const inData = location.pathname.includes('/data');

    return (
        <>
            <Header aria-label="D.A.G.R. Enterprise OS">
                <SkipToContent />
                <HeaderName
                    href="#"
                    prefix="D.A.G.R."
                    onClick={(e) => { e.preventDefault(); navigate('/workspace/home'); }}
                >
                    <span className="customer-badge">Raghav Jain Trading</span>
                </HeaderName>
                <HeaderNavigation aria-label="Workspace navigation">
                    <HeaderMenuItem
                        isCurrentPage={inHome}
                        onClick={(e) => { e.preventDefault(); navigate('/workspace/home'); }}
                    >
                        Home
                    </HeaderMenuItem>
                    <HeaderMenuItem
                        isCurrentPage={inOntology}
                        onClick={(e) => { e.preventDefault(); navigate('/workspace/ontology'); }}
                    >
                        Ontology
                    </HeaderMenuItem>
                    <HeaderMenuItem
                        isCurrentPage={inWorkflow}
                        onClick={(e) => { e.preventDefault(); navigate('/workspace/workflow'); }}
                    >
                        Workflow
                    </HeaderMenuItem>
                    <HeaderMenuItem
                        isCurrentPage={inDashboard}
                        onClick={(e) => { e.preventDefault(); navigate('/workspace/dashboard'); }}
                    >
                        Dashboard
                    </HeaderMenuItem>
                    <HeaderMenu
                        aria-label="Data"
                        menuLinkName="Data"
                        isActive={inData}
                    >
                        <HeaderMenuItem
                            isCurrentPage={location.pathname.includes('/data/orders')}
                            onClick={(e) => { e.preventDefault(); navigate('/workspace/data/orders'); }}
                        >
                            Orders · Traders
                        </HeaderMenuItem>
                        <HeaderMenuItem
                            isCurrentPage={location.pathname.includes('/data/trades')}
                            onClick={(e) => { e.preventDefault(); navigate('/workspace/data/trades'); }}
                        >
                            Trades · Brokers
                        </HeaderMenuItem>
                        <HeaderMenuItem
                            isCurrentPage={location.pathname.includes('/data/strategies')}
                            onClick={(e) => { e.preventDefault(); navigate('/workspace/data/strategies'); }}
                        >
                            Strategies · Ledger
                        </HeaderMenuItem>
                        <HeaderMenuItem
                            isCurrentPage={location.pathname.includes('/data/regimes')}
                            onClick={(e) => { e.preventDefault(); navigate('/workspace/data/regimes'); }}
                        >
                            Market Regimes
                        </HeaderMenuItem>
                    </HeaderMenu>
                </HeaderNavigation>
                <HeaderGlobalBar>
                    <HeaderGlobalAction aria-label="Search" tooltipAlignment="center" onClick={() => { }}>
                        <Search size={20} />
                    </HeaderGlobalAction>
                    <HeaderGlobalAction aria-label="Notifications" tooltipAlignment="center" onClick={() => { }}>
                        <Notification size={20} />
                    </HeaderGlobalAction>
                    <HeaderGlobalAction
                        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                        tooltipAlignment="center"
                        onClick={toggle}
                    >
                        {isDark ? <Light size={20} /> : <Asleep size={20} />}
                    </HeaderGlobalAction>
                    <HeaderGlobalAction aria-label="App Switcher" tooltipAlignment="center" onClick={() => { }}>
                        <SwitcherIcon size={20} />
                    </HeaderGlobalAction>
                    <HeaderGlobalAction aria-label="User Avatar" tooltipAlignment="end" onClick={() => { }}>
                        <User size={20} />
                    </HeaderGlobalAction>
                </HeaderGlobalBar>
            </Header>
            <Content
                id="main-content"
                className="shell-content"
            >
                <Outlet />
            </Content>
        </>
    );
};

export default ShellLayout;
