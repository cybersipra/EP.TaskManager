interface Props {
    text?: string;
}

export default function Loader({ text = 'Loading...' }: Props) {
    return (
        <div className="text-center py-5">
            <div
                className="
spinner-border
text-primary
"

                role="status"
            />

            <p className="mt-2">{text}</p>
        </div>
    );
}
