'use client';

interface InputProps {
    label?: string;
    type: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    noMargin?: boolean;
    min?: string;
    max?: string;
}

export function Input({label, type, placeholder, value, onChange, noMargin, min, max} : InputProps) {
    return (
        <div className={noMargin ? "" : "mb-3"}>
            {label && <label className="form-label">{label}</label>}
            <input
                type={type}
                className="form-control"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange?.((e.target as HTMLInputElement).value)}
                min={(type == "number" && min) ? min : undefined}
                max={(type == "number" && max) ? max : undefined}
            />
        </div>
    )
}

interface SelectProps {
    label?: string;
    options: Record<string, string>;
    value: string;
    onChange: (value: string) => void;
}

export function Select({ label, options, value, onChange } : SelectProps) {
    return (
        <div className="mb-3">
            {label && <label className="form-label">{label}</label>}
            <select 
                className="form-select" 
                value={value} 
                onChange={(e) => onChange((e.target as HTMLSelectElement).value)}
            >
                {Object.entries(options).map(([val, label]) => (
                    <option key={val} value={val}>{label}</option>
                ))}
            </select>
        </div>
    )
}