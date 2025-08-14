import {useEffect, useState} from 'react';
import {Loader} from './components/Loader';
import {Multiselect, type Option} from './components/Multiselect';
import {fetchTimezones} from './utils/fetchTimezones';

export const App = () => {
  const [options, setOptions] = useState<Option[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
    const loadTimezones = async () => {
      try {
        setLoading(true);
        const data = await fetchTimezones();
        setOptions(data);
        setError(null);
      } catch (error) {
        console.error('Loading error:', error);
        setError('Failed to load timezones. Please check the URL or your connection.');
      } finally {
        setLoading(false);
      }
    };

    loadTimezones();
  }, []);

  return (
    <main className="min-h-screen bg-teal-50 p-6">
      <h1 className="mb-4 text-2xl font-bold">Multiselect Component</h1>
      {loading && <Loader />}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <Multiselect
          options={options}
          selectedOptions={selected}
          onSelectionChange={setSelected}
          placeholder="Select one or more options"
        />
      )}
    </main>
  );
};
