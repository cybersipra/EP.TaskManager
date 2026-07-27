import type { ReactNode } from 'react';

interface Props {
    message: string;
    action?: ReactNode;
    title?: string;
}

export default function EmptyState({ message, action, title = 'Nothing here yet' }: Props) {
    return (
        <div className="text-center py-5 px-3">
            <div
                className="mx-auto mb-3"
                style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '999px',
                    background: 'rgba(99,102,241,0.1)',
                }}
            />
            <h5 className="text-muted mb-2">{title}</h5>
            <p className="text-muted mb-3">{message}</p>
            {action}
        </div>
    );
}
