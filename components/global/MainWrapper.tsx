interface mainWrapperProps {
    children: React.ReactNode
}

export default function MainWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="body-wrapper">
            {children}
        </div>
    )
}