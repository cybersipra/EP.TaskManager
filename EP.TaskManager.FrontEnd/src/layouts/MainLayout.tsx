import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function MainLayout() {
    return (
        <div className="app-shell">
            <Navbar />

            <main className="container-fluid container-lg py-4 py-lg-5">
                <div className="mx-auto" style={{ maxWidth: '1280px' }}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
