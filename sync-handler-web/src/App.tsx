import './styles/App.css'

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import Rank from './pages/Rank';
import Player from './pages/Player';
import User from './pages/User';

const App = () => {
  if (!document.cookie) {
    return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Auth />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/rank" element={<Rank />} />
            <Route path="/player" element={<Player />} />
            <Route path="/user" element={<User />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
