'use client';

interface props {
    text: string;
    color: string;
}

export default function Badge({ text, color } : props) {
    return (
        <span className={"badge bg-" + color}>{text}</span>
    )
}