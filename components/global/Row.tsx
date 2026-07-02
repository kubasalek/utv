interface rowProps {
    children: React.ReactNode
}

export default function Row({children}) {
    return (
        <div className="row">
            {children}
        </div>
    )
}