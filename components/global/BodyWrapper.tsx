'use client';

interface bodyWrapperProps {
    children: React.ReactNode;
    isSidebarOpen: boolean;
}

export default function BodyWrapper({ children, isSidebarOpen }: bodyWrapperProps) {
    return (
        <div className={isSidebarOpen ? "page-wrapper show-sidebar" : "page-wrapper mini-sidebar"} id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
            {children}
        </div>
    )
}