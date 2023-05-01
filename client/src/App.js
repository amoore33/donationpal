import './App.css';
import Header from './components/Header';
import AllCampaigns from './pages/AllCampaigns';
import Campaign from './pages/Campaign';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<AllCampaigns />} />
          <Route path='/campaigns/:id' element={<Campaign />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
