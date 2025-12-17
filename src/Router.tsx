import { BrowserRouter , Routes, Route } from 'react-router-dom';
import CanvasPage from "./pages/Canvas/CanvasPage";
import MainMenu from './pages/MainMenu/MainMenuPage.tsx';

function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CanvasPage />} />
          <Route path="/main-menu" element={<MainMenu />} />
          <Route path="*" element={<MainMenu />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;