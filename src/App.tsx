import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InputBriefing from './pages/InputBriefing';
import EstruturaAnalisada from './pages/EstruturaAnalisada';
import Acoes from './pages/Acoes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InputBriefing />} />
        <Route path="/estrutura-analisada" element={<EstruturaAnalisada />} />
        <Route path="/acoes" element={<Acoes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
