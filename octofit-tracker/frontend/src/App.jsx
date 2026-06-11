import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { apiBaseUrl } from './lib/api';
import './App.css';

const navItems = [
  { to: '/users', label: 'Users' },
  { to: '/activities', label: 'Activities' },
  { to: '/teams', label: 'Teams' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="mb-2">OctoFit Tracker</h1>
        <p className="text-secondary mb-2">React 19 presentation tier for the OctoFit multi-tier app.</p>
        <p className="small mb-3">
          API base URL: <span className="api-base">{apiBaseUrl}</span>
        </p>
        {!codespaceName && (
          <div className="alert alert-warning" role="alert">
            VITE_CODESPACE_NAME is not set. Using localhost fallback to avoid undefined Codespaces URLs.
          </div>
        )}
        <nav className="d-flex flex-wrap gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline-primary'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="card shadow-sm">
        <div className="card-body">
          <Routes>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users" element={<Users />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
