import Button from '../Button/Button';
import Modal from '../Modal/Modal';

interface Props {
    show: boolean;

    title: string;

    message: string;

    onClose: () => void;

    onConfirm: () => void;
}

export default function ConfirmDialog({
    show,

    title,

    message,

    onClose,

    onConfirm,
}: Props) {
    return (
        <Modal
            show={show}

            title={title}

            onClose={onClose}
        >
            <p>{message}</p>

            <div className="d-flex justify-content-end gap-2">
                <Button
                    text="Cancel"

                    variant="secondary"

                    onClick={onClose}
                />

                <Button
                    text="Delete"

                    variant="danger"

                    onClick={onConfirm}
                />
            </div>
        </Modal>
    );
}
