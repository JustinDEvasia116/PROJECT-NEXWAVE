import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';

import ProfilePage from './pages/ProfilePage';
import PendingConnectionsPage from './pages/Admins/PendingConnectionsPage';
import './App.css';
import AdminLogin from './components/adminComponent/AdminLogin';
import PrivateRoute from './features/auth/PrivateRoute';
import AdminPrivateRoute from './features/auth/AdminPrivateRoute';

import RechargePlansPage from './pages/Admins/RechargePlansPage';
import AdminPage from './pages/Admins/AdminPage';
import RechargePage from './pages/RechargePage';
import PaymentPage from './pages/PaymentPage';
import ChatbotPage from './pages/ChatbotPage';
import AddOptionPage from './pages/Admins/AddOptionPage';


function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/profile/*"
            element={
              (
                <PrivateRoute
                  element={<ProfilePage/>}
                />
              )
            }
          />
      <Route exact path="/"
            element={
              (
                <PrivateRoute
                  element={<ProfilePage/>}
                />
              )
            }
          />
          
        <Route exact path="/admins/"
            element={
              (
                <AdminPrivateRoute
                  element={<AdminPage/>}
                />
              )
            }
          />
          
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chatbot" element={<ChatbotPage/>} />
        <Route path="/admins/chatmanager" element={<AddOptionPage/>} />
        
        <Route path="/recharge" element={<RechargePage />} />
        <Route path="/payment" element={<PaymentPage />} />
        
       
        {/* <Route path="/admins" element={<AdminPage/>} /> */}
        <Route path="/admins/recharge-plans" element={<RechargePlansPage />} />


        {/* <Route path="/profile" element={<ProfilePage />} /> */}
        <Route path="/registration" element={<RegistrationPage />} />
        
        
        <Route path="/admins/pendingconnections" element={<PendingConnectionsPage/>} />
        <Route path="/admins/login" element={<AdminLogin/>} />
      </Routes>
    </Router>
  );
}

export default App;
