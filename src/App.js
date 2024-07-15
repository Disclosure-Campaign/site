import AppRouter from './components/appRouter';
import './App.css';

import api from './api';

const handleClick = async () => {
  try {
    const data = await api.requestData({
      data_type: 'congressMembers',
      api: 'congress_gov'
    });

  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

const App = () => (
    <div className="App">
        <AppRouter />
    </div>
);

export default App;
