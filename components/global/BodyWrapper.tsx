interface bodyWrapperProps {
    children: React.ReactNode
}

export default function BodyWrapper({ children }: bodyWrapperProps) {
    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
            {children}
        </div>
    )
}