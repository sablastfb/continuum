import "./App.css";
import ContinumLogo from "./components/Headers/ContinumLogo";
import ContinumHeader from "./components/Headers/Header";
import WindowsHeader from "./components/Headers/WindowsHeader";
import Router from "./Router";

function App() {
  return (
    <>
    <div className="flex flex-col h-screen w-screen">
    <ContinumHeader/>
    <Router/>
    </div>
    </>
  );
}

export default App;
