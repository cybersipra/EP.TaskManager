import type { ReactNode } from 'react';

interface Props {
    show: boolean;

    title: string;

    children: ReactNode;

    onClose: () => void;
}

export default function Modal({
    show,

    title,

    children,

    onClose,
}: Props) {
    if (!show) return null;

    return (
        <>
            <div className="modal fade show d-block" tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>

                            <button
                                type="button"

                                className="btn-close"

                                onClick={onClose}
                            />
                        </div>

                        <div className="modal-body">{children}</div>
                    </div>
                </div>
            </div>

            <div className="modal-backdrop fade show" onClick={onClose} />
        </>
    );
}
