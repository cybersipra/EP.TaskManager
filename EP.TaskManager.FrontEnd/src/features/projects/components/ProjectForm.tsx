import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FiPlusCircle, FiSave } from 'react-icons/fi';
import Input from '../../../common/components/Input/Input';
import TextArea from '../../../common/components/TextArea/TextArea';
import Button from '../../../common/components/Button/Button';

import type { Project } from '../types/Project';
import type { SaveProjectRequest } from '../types/SaveProjectRequest';

interface Props {
    project?: Project;
    onSubmit: (model: SaveProjectRequest) => void;
    isSubmitting?: boolean;
}

export default function ProjectForm({ project, onSubmit, isSubmitting = false }: Props) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SaveProjectRequest>({
        defaultValues: {
            name: '',
            description: '',
        },
    });

    useEffect(() => {
        if (!project) {
            return;
        }
        reset({
            name: project.name,
            description: project.description,
        });
    }, [project, reset]);

    const handleFormSubmit = (data: SaveProjectRequest) => {
        console.log('ProjectForm handleFormSubmit', data);
        onSubmit({
            ...data,
            name: data.name.trim(),
            description: data.description.trim(),
        });
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Input
                id="name"
                label="Project Name"
                placeholder="Enter project name"
                {...register('name', {
                    required: 'Project name is required',
                    setValueAs: (value: unknown) =>
                        typeof value === 'string' ? value.trim() : value,
                })}
                error={errors.name?.message}
            />

            <TextArea
                id="description"
                label="Description"
                rows={4}
                {...register('description', {
                    required: 'Description is required',
                    setValueAs: (value: unknown) =>
                        typeof value === 'string' ? value.trim() : value,
                })}
                error={errors.description?.message}
            />

            <Button
                text={
                    <span className="d-flex align-items-center gap-2">
                        {project ? <FiSave /> : <FiPlusCircle />}
                        {project ? 'Update Project' : 'Create Project'}
                    </span>
                }
                type="submit"
                loading={isSubmitting}
                className="px-4"
            />
        </form>
    );
}
