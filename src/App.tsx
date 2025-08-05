import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Page2 from "./pages/page-2/page-2";
import Page1 from "./pages/page-1/page-1";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Page1 />} />
          <Route path="/page-two" element={<Page2 />} />
        </Routes>
    </Router>
  );
}

export default App;
