interface mainWrapperProps {
    children: React.ReactNode
}

export default function MainWrapper({ children }: mainWrapperProps) {
    return (
        <div className="body-wrapper">
            {children}
        </div>
    )
}