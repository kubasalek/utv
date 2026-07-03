'use client';

interface pageWrapper {
    children: React.ReactNode;
}

export default function PageWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="body-wrapper-inner">
            <div className="container-fluid">
                {children}
            </div>
        </div>
    )
}