interface mainWrapperProps {
    children: React.ReactNode
}

export default function MainWrapper({children}) {
    return (
        <div className="body-wrapper">
            {children}
        </div>
    )
}