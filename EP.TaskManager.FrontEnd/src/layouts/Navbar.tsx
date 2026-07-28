import { NavLink } from 'react-router-dom';
import { FiFolder, FiGrid } from 'react-icons/fi';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark shadow-sm bg-dark">
            <div className="container-fluid container-lg">
                {/* Brand */}
                <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/projects">
                    <div
                        className="bg-primary rounded-3 d-flex align-items-center justify-content-center"
                        style={{
                            width: 38,
                            height: 38,
                        }}
                    >
                        <FiGrid size={22} />
                    </div>

                    <div>
                        <div className="fw-bold ml-2">EP Task Manager</div>
                    </div>
                </NavLink>

                {/* Navigation */}
                <div className="d-flex align-items-center gap-3">
                    <NavLink
                        to="/projects"
                        className={({ isActive }) =>
                            `btn d-flex align-items-center gap-2 px-4 py-2 fw-semibold ${
                                isActive ? 'btn-primary' : 'btn-outline-light'
                            }`
                        }
                    >
                        <FiFolder size={20} />
                        Projects
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}
