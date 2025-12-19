import {
    Header,
    HeaderName,
    HeaderNavigation,
    HeaderMenuItem,
    HeaderGlobalBar,
    HeaderGlobalAction,
    SkipToContent,
    HeaderContainer,
    SideNav,
    SideNavItems,
    SideNavLink,
    SideNavMenu,
    SideNavMenuItem,
    HeaderMenuButton,
    HeaderSideNavItems,
    Content,
} from '@carbon/react';
import {
    Notification,
    User,
    Grid,
    Search,
    Home,
    Connect,
    Activity,
    Dashboard,
    DataVis_1,
    Settings,
    IbmCloud,
    UserAdmin,
    Menu
} from '@carbon/icons-react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const ShellLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isPortfolioReturns = location.pathname.includes('/portfolio-returns');
    const isVarCvar = location.pathname.includes('/var-cvar');
    const isRiskHome = location.pathname.includes('/home') || location.pathname === '/packs/risk' || location.pathname === '/packs/risk/';

    const renderSideNavItems = () => {
        if (isPortfolioReturns) {
            return (
                <SideNavItems>
                    <HeaderSideNavItems hasDivider={true}>
                        <HeaderMenuItem onClick={() => navigate('/packs/risk/home')}>Home</HeaderMenuItem>
                        <HeaderMenuItem isCurrentPage onClick={() => navigate('/packs/risk/portfolio-returns/dashboard')}>Portfolio Returns</HeaderMenuItem>
                        <HeaderMenuItem onClick={() => navigate('/packs/risk/var-cvar/dashboard')}>VaR / CVaR</HeaderMenuItem>
                        <HeaderMenuItem>Dashboards</HeaderMenuItem>
                    </HeaderSideNavItems>
                    <SideNavLink
                        renderIcon={Dashboard}
                        isActive={location.pathname.includes('/dashboard')}
                        onClick={() => navigate('/packs/risk/portfolio-returns/dashboard')}
                    >
                        Dashboard
                    </SideNavLink>
                    <SideNavLink
                        renderIcon={Activity}
                        isActive={location.pathname.includes('/workflow')}
                        onClick={() => navigate('/packs/risk/portfolio-returns/workflow')}
                    >
                        Workflow Builder
                    </SideNavLink>
                    <SideNavMenu title="Data Visual" renderIcon={DataVis_1} defaultExpanded={true}>
                        <SideNavMenuItem
                            isActive={location.pathname.includes('/data-visual/portfolio')}
                            onClick={() => navigate('/packs/risk/portfolio-returns/data-visual/portfolio')}
                        >
                            Portfolio Data
                        </SideNavMenuItem>
                        <SideNavMenuItem
                            isActive={location.pathname.includes('/data-visual/market')}
                            onClick={() => navigate('/packs/risk/portfolio-returns/data-visual/market')}
                        >
                            Market Data
                        </SideNavMenuItem>
                        <SideNavMenuItem
                            isActive={location.pathname.includes('/data-visual/fx')}
                            onClick={() => navigate('/packs/risk/portfolio-returns/data-visual/fx')}
                        >
                            FX Rates
                        </SideNavMenuItem>
                        <SideNavMenuItem
                            isActive={location.pathname.includes('/data-visual/benchmark')}
                            onClick={() => navigate('/packs/risk/portfolio-returns/data-visual/benchmark')}
                        >
                            Benchmark
                        </SideNavMenuItem>
                        <SideNavMenuItem aria-disabled>
                            Macro (Coming Soon)
                        </SideNavMenuItem>
                    </SideNavMenu>
                </SideNavItems>
            );
        }

        if (isVarCvar) {
            return (
                <SideNavItems>
                    <HeaderSideNavItems hasDivider={true}>
                        <HeaderMenuItem onClick={() => navigate('/packs/risk/home')}>Home</HeaderMenuItem>
                        <HeaderMenuItem onClick={() => navigate('/packs/risk/portfolio-returns/dashboard')}>Portfolio Returns</HeaderMenuItem>
                        <HeaderMenuItem isCurrentPage onClick={() => navigate('/packs/risk/var-cvar/dashboard')}>VaR / CVaR</HeaderMenuItem>
                        <HeaderMenuItem>Dashboards</HeaderMenuItem>
                    </HeaderSideNavItems>
                    <SideNavLink
                        renderIcon={Dashboard}
                        isActive={location.pathname.includes('/dashboard')}
                        onClick={() => navigate('/packs/risk/var-cvar/dashboard')}
                    >
                        Dashboard
                    </SideNavLink>
                    <SideNavLink
                        renderIcon={Activity}
                        isActive={location.pathname.includes('/workflow')}
                        onClick={() => navigate('/packs/risk/var-cvar/workflow')}
                    >
                        Workflow
                    </SideNavLink>
                    <SideNavLink
                        renderIcon={DataVis_1}
                        isActive={location.pathname.includes('/data-visual')}
                        onClick={() => navigate('/packs/risk/var-cvar/data-visual')}
                    >
                        Data Visual
                    </SideNavLink>
                </SideNavItems>
            );
        }

        return (
            <SideNavItems>
                <HeaderSideNavItems hasDivider={true}>
                    <HeaderMenuItem isCurrentPage onClick={() => navigate('/packs/risk/home')}>Home</HeaderMenuItem>
                    <HeaderMenuItem onClick={() => navigate('/packs/risk/portfolio-returns/dashboard')}>Portfolio Returns</HeaderMenuItem>
                    <HeaderMenuItem onClick={() => navigate('/packs/risk/var-cvar/dashboard')}>VaR / CVaR</HeaderMenuItem>
                    <HeaderMenuItem>Dashboards</HeaderMenuItem>
                </HeaderSideNavItems>
                <SideNavLink
                    renderIcon={Home}
                    isActive={location.pathname.includes('/home')}
                    onClick={() => navigate('/packs/risk/home')}
                >
                    Overview
                </SideNavLink>
                <SideNavLink
                    renderIcon={Connect}
                    isActive={location.pathname.includes('/data-connections')}
                    onClick={() => navigate('/packs/risk/data-connections')}
                >
                    Data Connections
                </SideNavLink>
                <SideNavLink
                    renderIcon={Activity}
                    isActive={location.pathname.includes('/job-monitor')}
                    onClick={() => navigate('/packs/risk/job-monitor')}
                >
                    Job Monitor
                </SideNavLink>
                <SideNavLink
                    renderIcon={IbmCloud}
                    isActive={location.pathname.includes('/registry')}
                    onClick={() => navigate('/packs/risk/registry')}
                >
                    Pack Registry
                </SideNavLink>
                <SideNavLink
                    renderIcon={UserAdmin}
                    isActive={location.pathname.includes('/rbac')}
                    onClick={() => navigate('/packs/risk/rbac')}
                >
                    Users & RBAC
                </SideNavLink>
                <SideNavLink
                    renderIcon={Settings}
                    isActive={location.pathname.includes('/settings')}
                    onClick={() => navigate('/packs/risk/settings')}
                >
                    Workspace Settings
                </SideNavLink>
            </SideNavItems>
        );
    };

    return (
        <HeaderContainer
            render={({ isSideNavExpanded, onClickSideNavExpand }: { isSideNavExpanded: boolean; onClickSideNavExpand: () => void }) => (
                <>
                    <Header aria-label="D.A.G.R. Risk Returns">
                        <SkipToContent />
                        <HeaderMenuButton
                            aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
                            onClick={onClickSideNavExpand}
                            isActive={isSideNavExpanded}
                            aria-expanded={isSideNavExpanded}
                            isCollapsible
                            renderMenuIcon={<Menu />}
                        />
                        <HeaderName
                            href="#"
                            prefix="D.A.G.R."
                            onClick={(e) => { e.preventDefault(); navigate('/packs/risk/home'); }}
                        >
                            | RISK
                        </HeaderName>
                        <HeaderNavigation aria-label="D.A.G.R. Risk Pack">
                            <HeaderMenuItem
                                isCurrentPage={isRiskHome}
                                onClick={(e) => { e.preventDefault(); navigate('/packs/risk/home'); }}
                            >
                                Home
                            </HeaderMenuItem>
                            <HeaderMenuItem
                                isCurrentPage={isPortfolioReturns}
                                onClick={(e) => { e.preventDefault(); navigate('/packs/risk/portfolio-returns/dashboard'); }}
                            >
                                Portfolio Returns
                            </HeaderMenuItem>
                            <HeaderMenuItem
                                isCurrentPage={isVarCvar}
                                onClick={(e) => { e.preventDefault(); navigate('/packs/risk/var-cvar/dashboard'); }}
                            >
                                VaR / CVaR
                            </HeaderMenuItem>
                            <HeaderMenuItem href="#" onClick={(e) => e.preventDefault()}>
                                Dashboards
                            </HeaderMenuItem>
                        </HeaderNavigation>
                        <HeaderGlobalBar>
                            <HeaderGlobalAction aria-label="Search" onClick={() => { }}>
                                <Search size={20} />
                            </HeaderGlobalAction>
                            <HeaderGlobalAction aria-label="Notifications" onClick={() => { }}>
                                <Notification size={20} />
                            </HeaderGlobalAction>
                            <HeaderGlobalAction aria-label="App Switcher" onClick={() => { }}>
                                <Grid size={20} />
                            </HeaderGlobalAction>
                            <HeaderGlobalAction aria-label="User Avatar" onClick={() => { }}>
                                <User size={20} />
                            </HeaderGlobalAction>
                        </HeaderGlobalBar>
                        <SideNav
                            aria-label="Side navigation"
                            expanded={isSideNavExpanded}
                            onSideNavBlur={onClickSideNavExpand}
                            isFixedNav
                        >
                            {renderSideNavItems()}
                        </SideNav>
                    </Header>
                    <Content className="shell-content" style={{ marginTop: '3rem', marginLeft: isSideNavExpanded ? '16rem' : '0', padding: 0, height: 'calc(100vh - 3rem)', width: '100%', transition: 'margin-left 0.11s cubic-bezier(0.2, 0, 1, 0.9)' }}>
                        <Outlet />
                    </Content>
                </>
            )}
        />
    );
};

export default ShellLayout;
