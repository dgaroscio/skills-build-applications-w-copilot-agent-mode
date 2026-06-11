import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api';

// Codespaces endpoint example: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    fetchCollection('workouts')
      .then((items) => {
        if (active) {
          setWorkouts(items);
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
      <h2 className="h4 mb-3">Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>Level</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id ?? workout.id ?? workout.title}>
                  <td>{workout.title ?? workout.name ?? '-'}</td>
                  <td>{workout.level ?? '-'}</td>
                  <td>{workout.durationMinutes ?? workout.duration ?? '-'} min</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Workouts;
