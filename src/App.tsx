import "./App.css";
import ContinumHeader from "./components/Headers/Header";
import Router from "./Router";

function App() {
  return (
    <>
    <div className="flex flex-col h-screen w-screen">
      <ContinumHeader/>
      <div className="flex-1">
        <Router/>
      </div>
    </div>
    </>
  );
}

export default App;
