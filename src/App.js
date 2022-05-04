import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import './App.css';
import NotesListPage from './pages/NotesListPage';
import Header from './components/Header';
import NotePage from './pages/NotePage'
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';



function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="container dark">
          <div className='app'>
            <Header />
            <PrivateRoute element={<NotesListPage />} path="/" exact/>
            <PrivateRoute element={<NotePage />} path="/note/:id" exact/>
            <Routes>
              <Route path='/register' exact element={<RegisterPage />} />
              <Route path='/login' exact element={<LoginPage />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
