import React from 'react';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;

    error?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, Props>(({ label, error, ...props }, ref) => {
    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>

            <textarea
                ref={ref}
                className={`form-control ${error ? 'is-invalid' : ''}`}
                {...props}
            />

            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
});

TextArea.displayName = 'TextArea';

export default TextArea;
