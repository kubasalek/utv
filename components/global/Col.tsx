'use client';

type props = {
    children: React.ReactNode;
    width: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
    centered?: boolean;
    withgap?: boolean;
}

export default function Col(props : props) {
    const widths = [props.width, props.sm, props.md, props.lg, props.xl, props.xxl]
    const widthsPrefix = ["col-", "col-sm-", "col-md-", "col-lg-", "col-xl-", "col-xxl-"]
    let classes = "";
    for (let width in widths) {
        if (widths[width] == undefined) continue;
        classes += " "+widthsPrefix[width]+widths[width];
    }

    const centered = props.centered ? " d-flex justify-content-center" : "";
    const withgap = props.withgap ? {gap: "5px"} : {}

    return (
        <div className={classes + centered} style={withgap}>
            {props.children}
        </div>
    )
}