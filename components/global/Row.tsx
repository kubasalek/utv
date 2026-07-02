interface rowProps {
    children: React.ReactNode
}

export default function Row({ children }: rowProps) {
    return (
        <div className="row">
            {children}
        </div>
    )
}