import './App.css';
import Header from 'components/Header';
import AllCampaigns from 'pages/AllCampaigns';
import Campaign from 'pages/Campaign';
import LoginPage from 'pages/LoginPage';
import LogoutPage from 'pages/LogoutPage';
import ProfilePage from 'pages/ProfilePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<AllCampaigns />} />
          <Route path='/campaigns/:id' element={<Campaign />} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/logout' element={<LogoutPage/>} />
          <Route path='/me' element={<ProfilePage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
