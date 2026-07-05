'use client';

import ProfileDropdown from '@/components/global/ProfileDropdown';

interface headerProps {
    toggleSidebar: () => void;
    full_name: string;
    avatar_url: string;
}

export default function Header({ toggleSidebar, full_name, avatar_url } : headerProps) {
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
            <ProfileDropdown full_name={full_name} avatar_url={avatar_url} />
            </nav>
        </header>
    )
}