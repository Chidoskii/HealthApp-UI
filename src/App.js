import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//pages and components
import Home from './pages/Home';
import Navi from './components/Navi';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navi />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
