interface props {
    children: React.ReactNode;
}

export default async function Table({ children } : props) {    
    return (
        <div className="table-responsive mt-4">
            <table className="table mb-0 text-nowrap varient-table align-middle fs-3">
                {children}
            </table>
        </div>
    )
}