import React, { useState } from 'react';
import Dashboard from '../../components/adminComponent/dashboard/dashboard';
import AdminHeader from '../../components/header/AdminHeader';
import RechargePlans from '../../components/adminComponent/plans&categories/RechargePlans';
import UserManagement from '../../components/adminComponent/usermanagement/UserManagement';
import PendingConnectionsPage from './PendingConnectionsPage';
import { updateToken,setLoading } from '../../features/auth/authSlice';
import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';

function AdminPage() {
  const [activeNavItem, setActiveNavItem] = useState('');
  const loading = useSelector(state => state.auth.isLoading);
  const authTokens = JSON.parse(localStorage.getItem('authTokens'));
  const dispatch = useDispatch();

  useEffect(()=>{
    if (loading) {
      dispatch(updateToken()).then(() => {
      dispatch(setLoading(false))
      });
    }
    let fourMinutes = 1000 *400
    let interval = setInterval(()=>{
      console.log("tokens ",authTokens)
      console.log("load ",loading)
      
         if (authTokens){
          dispatch(updateToken());
         }
     },fourMinutes)
     return () =>{

        clearInterval(interval)
     }

},[authTokens,loading])




  const handleNavItemClick = (navItem) => {
    setActiveNavItem(navItem);
  };

  let componentToRender = null;

  // Set the componentToRender based on the activeNavItem
  switch (activeNavItem) {
    case 'dashboard':
      componentToRender = <Dashboard />;
      break;
    case 'recharge-plans':
      componentToRender = <RechargePlans />;
      break;
    case 'user-management':
      componentToRender = <UserManagement/>;
      break;
    case 'pending-connections':
      componentToRender = <PendingConnectionsPage/>;
      break;
    // Add cases for other components as needed
    default:
      componentToRender = null;
  }

  return (
    <div>
      <AdminHeader handleNavItemClick={handleNavItemClick} activeNavItem={activeNavItem} />
      {componentToRender}
    </div>
  );
}

export default AdminPage;
