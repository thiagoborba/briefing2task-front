import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import InputBriefing from './pages/InputBriefing';
import EstruturaAnalisada from './pages/EstruturaAnalisada';
import Acoes from './pages/Acoes';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/briefing" element={<InputBriefing />} />
        <Route path="/estrutura-analisada" element={<EstruturaAnalisada />} />
        <Route path="/acoes" element={<Acoes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
