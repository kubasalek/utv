'use client';

interface props {
    text: string;
    color: string;
    small?: boolean;
}

export default function Badge({ text, color, small } : props) {
    return (
        <span className={(small ? "badge-sm" : "badge") + " me-1 bg-" + color}>{text}</span>
    )
}