import type { ReactNode } from 'react';
import Button from '../Button/Button';

interface Props {
    title: ReactNode;

    buttonText?: ReactNode;

    onButtonClick?: () => void;
}

export default function PageHeader({
    title,

    buttonText,

    onButtonClick,
}: Props) {
    return (
        <div
            className="
d-flex
justify-content-between
align-items-center
mb-4
"
        >
            <h2>{title}</h2>

            {buttonText && (
                <Button
                    text={buttonText}

                    onClick={onButtonClick}
                />
            )}
        </div>
    );
}
