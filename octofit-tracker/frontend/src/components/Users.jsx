import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api';

// Codespaces endpoint example: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    fetchCollection('users')
      .then((items) => {
        if (active) {
          setUsers(items);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Fitness Level</th>
                <th>Goal</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id ?? user.id ?? user.email}>
                  <td>{user.name ?? '-'}</td>
                  <td>{user.email ?? '-'}</td>
                  <td>{user.fitnessLevel ?? '-'}</td>
                  <td>{user.goal ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Users;
