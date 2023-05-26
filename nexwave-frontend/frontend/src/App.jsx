import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import MedicineForm from './pages/Samplepage';
import ProfilePage from './pages/ProfilePage';
import PendingConnectionsPage from './pages/Admins/PendingConnectionsPage';
import './App.css';
import AdminLogin from './components/adminComponent/AdminLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/sample" element={<MedicineForm/>} />
        <Route path="/admins/pendingconnections" element={<PendingConnectionsPage/>} />
        <Route path="/admins/" element={<AdminLogin/>} />
      </Routes>
    </Router>
  );
}

export default App;
