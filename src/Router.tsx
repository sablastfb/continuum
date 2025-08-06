import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Page2 from "./pages/page-2/page-2";
import CanvasPage from "./pages/Canvas/CanvasPage";

function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CanvasPage />} />
          <Route path="/page-two" element={<Page2 />} />
          <Route path="*" element={<Page2 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;