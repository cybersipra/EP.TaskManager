import React from "react";

interface Props
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
    ({ label, error, ...props }, ref) => {

        return (
            <div className="mb-3">

                <label className="form-label">
                    {label}
                </label>

                <input
                    ref={ref}
                    className={`form-control ${
                        error ? "is-invalid" : ""
                    }`}
                    {...props}
                />

                {
                    error &&
                    <div className="invalid-feedback">
                        {error}
                    </div>
                }

            </div>
        );
    }
);


Input.displayName = "Input";

export default Input;