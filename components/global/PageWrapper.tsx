interface pageWrapper {
    children: React.ReactNode
}

export default function PageWrapper({children}) {
    return (
        <div className="body-wrapper-inner">
            <div className="container-fluid">
                {children}
            </div>
        </div>
    )
}