import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import ProjectList from '../features/projects/pages/ProjectList';
import ProjectDetails from '../features/projects/pages/ProjectDetails';
import ProjectSavePage from '../features/projects/pages/ProjectSavePage';
import TaskSavePage from '../features/tasks/pages/TaskSavePage';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route index element={<Navigate to="/projects" replace />} />
                    <Route path="/projects" element={<ProjectList />} />
                    <Route path="/projects/list" element={<ProjectList />} />
                    <Route path="/projects/save" element={<ProjectSavePage />} />
                    <Route path="/projects/save/:id" element={<ProjectSavePage />} />
                    <Route path="/projects/:id" element={<ProjectDetails />} />
                    <Route path="/projects/:projectId/tasks/save" element={<TaskSavePage />} />
                    <Route path="/projects/:projectId/tasks/save/:id" element={<TaskSavePage />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
