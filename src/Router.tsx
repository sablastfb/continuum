import { BrowserRouter , Routes, Route } from 'react-router-dom';
import CanvasPage from "./pages/Canvas/CanvasPage";
import MainMenue from './pages/MainMenue/MainMenuePage';

function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CanvasPage />} />
          <Route path="/main-menue" element={<MainMenue />} />
          <Route path="*" element={<MainMenue />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;