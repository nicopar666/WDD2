import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../Contexts/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Inventory from './Inventory';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/inventory" element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          } />
          <Route path="*" element={<div>404 - Not Found</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;