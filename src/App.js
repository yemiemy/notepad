import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import './App.css';
import NotesListPage from './pages/NotesListPage';
import Header from './components/Header';
import NotePage from './pages/NotePage'



function App() {
  return (
    <Router>
      <div className="container dark">
        <div className='app'>
          <Header />
          <Routes>
            <Route path='/' exact element={<NotesListPage />} />
            <Route path='note/:id' exact element={<NotePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
