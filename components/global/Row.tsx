interface rowProps {
    children: React.ReactNode
}

export default function Row({ children }: { children: React.ReactNode }) {
    return (
        <div className="row">
            {children}
        </div>
    )
}