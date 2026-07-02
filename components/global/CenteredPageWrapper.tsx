interface pageWrapperProps {
    children: React.ReactNode
}

export default function CenteredPageWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="position-relative overflow-hidden text-bg-light min-vh-100 d-flex align-items-center justify-content-center">
            {children}
        </div>
    )
}