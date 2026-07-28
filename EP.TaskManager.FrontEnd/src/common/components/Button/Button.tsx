import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';

import type { ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: ReactNode;

    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark';

    loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ text, variant = 'primary', loading = false, disabled, className = '', ...props }, ref) => {
        return (
            <button
                ref={ref}

                className={`btn btn-${variant} ${className}`}

                disabled={disabled || loading}

                {...props}
            >
                {loading && (
                    <span
                        className="
                        spinner-border 
                        spinner-border-sm 
                        me-2
                        "
                    />
                )}

                {text}
            </button>
        );
    },
);

export default Button;
