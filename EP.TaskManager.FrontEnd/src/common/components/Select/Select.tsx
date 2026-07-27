import { forwardRef } from 'react';

interface Option {
    value: string | number;

    label: string;
}

interface Props {
    id: string;

    label: string;

    options: Option[];

    error?: string;
}

const Select = forwardRef<HTMLSelectElement, Props & React.SelectHTMLAttributes<HTMLSelectElement>>(
    (
        {
            id,

            label,

            options,

            error,

            ...props
        },
        ref,
    ) => {
        return (
            <div className="mb-3">
                <label htmlFor={id} className="form-label">
                    {label}
                </label>

                <select
                    id={id}

                    className="form-select"

                    ref={ref}

                    {...props}
                >
                    <option value="">Select...</option>

                    {options.map((option) => (
                        <option
                            key={option.value}

                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>

                {error && <div className="text-danger">{error}</div>}
            </div>
        );
    },
);

export default Select;
