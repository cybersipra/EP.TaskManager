import { TaskStatus } from '../../../common/enums/TaskStatus';

interface Props {
    status: TaskStatus;
}

export default function TaskStatusBadge({ status }: Props) {
    const getStatusText = () => {
        switch (status) {
            case TaskStatus.ToDo:
                return 'To Do';

            case TaskStatus.InProgress:
                return 'In Progress';

            case TaskStatus.Done:
                return 'Done';

            default:
                return 'Unknown';
        }
    };

    const getBadgeClass = () => {
        switch (status) {
            case TaskStatus.ToDo:
                return 'bg-secondary';

            case TaskStatus.InProgress:
                return 'bg-primary';

            case TaskStatus.Done:
                return 'bg-success';

            default:
                return 'bg-dark';
        }
    };

    return <span className={`badge ${getBadgeClass()}`}>{getStatusText()}</span>;
}
