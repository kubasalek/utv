'use client';

interface InputProps {
    label?: string;
    type: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
}

export function Input({label, type, placeholder, value, onChange} : InputProps) {
    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <input
                type={type}
                className="form-control"
                placeholder={placeholder}
                value={value}
                onInput={(e) => onChange((e.target as HTMLInputElement).value)}
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
            <label className="form-label">{label}</label>
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