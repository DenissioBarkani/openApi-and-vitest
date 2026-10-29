
import { useEffect, useState } from 'react';
import { getUsers } from './api/client/sdk.gen';
import { client } from './api/client/client.gen';
import type { User } from './api/client/types.gen';

client.setConfig({
  baseUrl: 'https://jsonplaceholder.typicode.com',
});

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadUsers() {
      try {
        const result = await getUsers();

        if (!active) return;

        if (result.error) {
          setError('Ошибка получения пользователей');
          return;
        }

        setUsers(result.data ?? []);
      } catch {
        if (active) {
          setError('Ошибка сети');
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadUsers();

    return () => {
      active = false;
    };
  }, []);

  return (
    <main style={{ padding: '30px', maxWidth: '700px' }}>
      <h1>OpenAPI — Users</h1>
      <p>Данные получены через сгенерированный API-клиент.</p>

      {loading && <p>Загрузка...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <ul>
          {users.map((user) => (
            <li key={user.id} style={{ marginBottom: '16px' }}>
              <strong>{user.name}</strong>
              <div>{user.email}</div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
