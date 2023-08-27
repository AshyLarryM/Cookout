import './App.css';

import { useAuthContext } from './hooks/useAuthContext';
import { Routes, Route, Navigate } from 'react-router-dom';

//pages and components
import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Recipe from './pages/recipe/Recipe';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/landing-page/LandingPage';
import OnlineUsers from './components/OnlineUsers';
import MyRecipes from './pages/profile/MyRecipes';


function App() {

  const { user, authIsReady } = useAuthContext();


  return (
    <>
    <div className='app'>
      <Navbar />
      {user && <Sidebar />}
      {user && <OnlineUsers />}
        <div className="container">
          {authIsReady && (
            <>
            <Routes>
              <Route path="/" 
              element={!user ? <LandingPage /> : <Dashboard />} 
              />
              <Route path="/create" 
              element={user ? <Create /> : <Navigate to="/login" />} 
              />
              <Route path="/MyRecipes" 
              element={user ? <MyRecipes/> : <Navigate to="/login" />} 
              />
              <Route path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
              />
              <Route path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
              />
              <Route path="/recipes/:id" 
              element={user ? <Recipe /> : <Navigate to="/login" />} 
              />
            </Routes>
          </>
        )}
      </div>
    </div>
    </>
  );
}

export default App;
