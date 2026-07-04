'use client';

interface props {
    text: string;
    color: string;
}

export default function Badge({ text, color } : props) {
    return (
        <span className={"badge me-1 bg-" + color}>{text}</span>
    )
}