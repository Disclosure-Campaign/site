import logo from './logo.svg';
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

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={handleClick}>
          Run Test Function
        </button>
      </header>
    </div>
  );
}

export default App;
