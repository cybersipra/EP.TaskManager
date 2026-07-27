import type { ReactNode } from 'react';

interface Props {
    children: ReactNode;

    title?: string;

    className?: string;
}

export default function Card({
    children,

    title,

    className = '',
}: Props) {
    return (
        <div
            className={`
card shadow-sm
${className}
`}
        >
            {title && <div className="card-header fw-bold">{title}</div>}

            <div className="card-body">{children}</div>
        </div>
    );
}
