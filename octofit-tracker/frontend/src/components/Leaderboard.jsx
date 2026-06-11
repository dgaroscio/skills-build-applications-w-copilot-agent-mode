import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api';

// Codespaces endpoint example: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    fetchCollection('leaderboard')
      .then((items) => {
        if (active) {
          setEntries(items);
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
      <h2 className="h4 mb-3">Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry._id ?? entry.id ?? `${entry.rank}-${entry.user?.name}`}>
                  <td>{entry.rank ?? '-'}</td>
                  <td>{entry.user?.name ?? entry.userName ?? '-'}</td>
                  <td>{entry.score ?? entry.points ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Leaderboard;
