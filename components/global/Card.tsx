'use client';

interface cardProps {
    title: string,
    subtitle: string,
    width: number,
    children: React.ReactNode
}

export default function Card({title, subtitle, width, children} : cardProps) {
    return (
        <div className={`col-${width}`}>
            <div className="card">
                <div className="card-body">
                    <div className="d-md-flex align-items-center">
                        <div>
                            <h4 className="card-title">{title}</h4>
                            <p className="card-subtitle">
                                {subtitle}
                            </p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}