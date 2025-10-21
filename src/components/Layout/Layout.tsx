import { Direction, DockviewApi, DockviewReact } from "dockview";
import { useRef, useState } from "react";
import useCanvasStore from "../../pages/Canvas/data/store/CanvasStore";
import ComponentHolder from "./ComponentHolder";


const components = {
  componentHolder: ComponentHolder,
};

const ContinumLayout = () => {
    const canvasStore = useCanvasStore();

  const apiRef = useRef<DockviewApi | null>(null);

  const handleSplit = (
    panelId: string,
    direction: Direction
  ) => {

    if (!apiRef.current) return;
      debugger;
    const newPanelId = `panel_${Math.random() }`;

    const newPanel = apiRef.current.addPanel({
      id: newPanelId,
      component: "componentHolder",
      params: {
        panelId: newPanelId,
        onSplit: (dir: Direction) => handleSplit(newPanelId, dir),
        onRemove: () => removeTile(newPanelId),
      },
      position: { referencePanel: panelId, direction },
    });

    newPanel.group.header.hidden = true;
    canvasStore.setLayoutEditableVisible(false);
  };
  const removeTile = (  panelId: string) => {
      if (!apiRef.current) return;
    
    const activePanel = apiRef.current.getPanel(panelId);
    if (!activePanel) {
      alert('No active panel to remove. Click on a panel first.');
      return;
    }

    apiRef.current.removePanel(activePanel);
    canvasStore.setLayoutEditableVisible(false);
  }

  return (
    <>
      <div className="h-full w-full ">
        <DockviewReact
          components={components}
          hideBorders={false}
          disableFloatingGroups={true}
          watermarkComponent={() => null}
          onReady={(event) => {
            apiRef.current = event.api;

            const newPanel = event.api.addPanel({
              id: "panel_0",
              component: "componentHolder",
              params: {
                panelId: "panel_0",   
                onSplit: (dir: Direction) => handleSplit("panel_0", dir),
                showSplitButtons: false,
              },
            });
            newPanel.group.header.hidden = true;
          }}
        />
      </div>
    </>
  );
};

export default ContinumLayout;
