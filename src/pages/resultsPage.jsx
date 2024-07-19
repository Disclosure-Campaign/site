import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ResultsPage() {
  const query = useQuery();
  const person = query.get('person');
  const searchQuery = query.get('query');

  return (
    <div>
      <h1>Search Results</h1>
      <p>Person: {person}</p>
      <p>Query: {searchQuery}</p>
    </div>
  );
}

export default ResultsPage;
