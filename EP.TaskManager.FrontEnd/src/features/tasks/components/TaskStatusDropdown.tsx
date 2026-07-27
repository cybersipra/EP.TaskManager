import { TaskStatus } from '../../../common/enums/TaskStatus';

interface Props {
    value: TaskStatus;

    onChange: (status: TaskStatus) => void;
}

export default function TaskStatusDropdown({
    value,

    onChange,
}: Props) {
    return (
        <select
            className="form-select"

            value={value}

            onChange={(e) => onChange(Number(e.target.value) as TaskStatus)}
        >
            <option value={TaskStatus.ToDo}>To Do</option>

            <option value={TaskStatus.InProgress}>In Progress</option>

            <option value={TaskStatus.Done}>Done</option>
        </select>
    );
}
