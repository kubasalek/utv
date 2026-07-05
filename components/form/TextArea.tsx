'use client';

interface TextAreaProps {
    label?: string;
    placeholder?: string;
    value: string;
    rows: number;
    onChange?: (value: string) => void;
    onBlur?: (value: string) => void;
    className: string;
    disabled: boolean;
}

export default function TextArea({label, placeholder, value, rows, onChange, onBlur, className, disabled} : TextAreaProps) {
    return (
        <div className="mb-3">
            {label && <label className="form-label">{label}</label>}
            <textarea
                placeholder={placeholder}
                className={className}
                value={value}
                rows={rows}
                onChange={(e) => onChange?.((e.target as HTMLTextAreaElement).value)}
                onBlur={(e) => onBlur?.((e.target as HTMLTextAreaElement).value)}
                disabled={disabled}
            />
        </div>
    )
}