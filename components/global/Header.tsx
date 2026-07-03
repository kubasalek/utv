'use client';

import ProfileDropdown from '@/components/global/ProfileDropdown';

interface headerProps {
    toggleSidebar: () => void;
    fullName: string;
}

export default function Header({ toggleSidebar, fullName } : headerProps) {
    return (
        <header className="app-header">
            <nav className="navbar navbar-expand-lg navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item d-block d-xl-none">
                <a className="nav-link sidebartoggler " id="headerCollapse" onClick={toggleSidebar}>
                    <i className="ti ti-menu-2"></i>
                </a>
                </li>
            </ul>
            <ProfileDropdown fullName={fullName} />
            </nav>
        </header>
    )
}