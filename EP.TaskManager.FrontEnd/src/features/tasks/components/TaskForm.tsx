import { useEffect } from 'react';
import { FiPlusCircle, FiSave } from 'react-icons/fi';
import { useForm } from 'react-hook-form';

import Input from '../../../common/components/Input/Input';

import TextArea from '../../../common/components/TextArea/TextArea';

import Select from '../../../common/components/Select/Select';

import Button from '../../../common/components/Button/Button';

import type { TaskItem } from '../types/TaskItem';

import type { SaveTaskRequest } from '../types/SaveTaskRequest';

import { TaskStatus } from '../../../common/enums/TaskStatus';

interface Props {
    task?: TaskItem;

    projectId: number;

    onSubmit: (model: SaveTaskRequest) => void;

    isSubmitting?: boolean;
}

export default function TaskForm({
    task,

    projectId,

    onSubmit,

    isSubmitting = false,
}: Props) {
    const {
        register,

        handleSubmit,

        reset,

        formState: { errors },
    } = useForm<SaveTaskRequest>();

    useEffect(() => {
        if (!task) {
            return;
        }
        reset({
            
            id: task?.id,

            title: task?.title ?? '',

            description: task?.description ?? '',

            dueDate: task ? task.dueDate.substring(0, 10) : '',

            projectId: projectId,

            status: task?.status ?? TaskStatus.ToDo,
        });
    }, [task, projectId, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                id="title"

                label="Task Title"

                placeholder="Enter task title"

                {...register('title', {
                    required: 'Task title is required',

                    maxLength: {
                        value: 150,

                        message: 'Maximum 150 characters',
                    },
                })}

                error={errors.title?.message}
            />

            <TextArea
                id="description"

                label="Description"

                rows={4}

                {...register('description', {
                    maxLength: {
                        value: 500,

                        message: 'Maximum 500 characters',
                    },
                })}

                error={errors.description?.message}
            />

            <Input
                id="dueDate"

                type="date"

                label="Due Date"

                {...register('dueDate', {
                    required: 'Due date is required',

                    validate: (value) => {
                        const selected = new Date(value);

                        return selected > new Date() || 'Due date must be in future';
                    },
                })}

                error={errors.dueDate?.message}
            />

            <Select
                id="status"

                label="Status"

                options={[
                    {
                        value: TaskStatus.ToDo,
                        label: 'To Do',
                    },
                    {
                        value: TaskStatus.InProgress,
                        label: 'In Progress',
                    },
                    {
                        value: TaskStatus.Done,
                        label: 'Done',
                    },
                ]}

                {...register('status', {
                    valueAsNumber: true,
                })}
            />

            <Button
                type="submit"
                loading={isSubmitting}
                className="px-4"
                text={
                    <span className="d-flex align-items-center gap-2">
                        {task ? <FiSave /> : <FiPlusCircle />}
                        {task ? 'Update Task' : 'Create Task'}
                    </span>
                }
            />
        </form>
    );
}
