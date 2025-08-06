import { Viewport } from "pixi-viewport";
import { Application, Graphics } from "pixi.js";
import { Button } from "primereact/button";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { getPixiApp, getViewPort } from "./services/pixi-app";

function CanvasPage() {
  const divContainer = useRef<HTMLDivElement>(null);

  async function SetUpPixi() {
    // if (app.current) return;
    const app = await getPixiApp();
    console.log("Createing new app. ");
    if (divContainer.current   ) {
      console.log(app);
      console.log(app.canvas);
      divContainer.current.appendChild(app.canvas);
    }
  }
  SetUpPixi();
  
  function AddCircle(){
    const viewport = getViewPort();
    viewport.addChild(new Graphics().circle(10, 54, 10).fill("red"));
  }

  return (
    <>
    <div>
      <Button onClick={()=>AddCircle()}></Button>
      <Link className="h-full w-full" to="/page-two">Go to page one</Link>AddCircle
      <div ref={divContainer} className="h-screen w-screen" />
    </div>
    </>
  );
}

export default CanvasPage;
